'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { getLiveSocket, broadcastToCluster } from '@/lib/socket';
import { LiveConfig, LiveStats, ProductItem, ChatMessage } from '@/types/live';
import TopBar from '@/components/live/TopBar';
import SettingsTab from '@/components/live/SettingsTab';
import ChatTab from '@/components/live/ChatTab';
import ProductsTab from '@/components/live/ProductsTab';
import PreviewPanel from '@/components/live/PreviewPanel';
import { Loader2 } from 'lucide-react';

export default function LiveControlPage() {
  const [liveId, setLiveId] = useState<string>('N45ZMPL');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('products');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // 1. 상태 관리 (React 19 State)
  const [config, setConfig] = useState<LiveConfig>({
    liveId: 'N45ZMPL',
    brandName: '',
    title: '',
    logoUrl: '',
    streamUrl: '',
    thumbnailUrl: '',
    isLive: false,
    liveStartTime: '',
    showViewers: true,
    winner_name: null,
    winner_timestamp: 0,
  });

  const [stats, setStats] = useState<LiveStats>({
    viewers: 0,
    cumViewers: 0,
    hearts: 0,
  });

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [chats, setChats] = useState<ChatMessage[]>([]);

  // 본인 저장 타임스탬프 (실시간 루프 방지)
  const lastSelfSaveTime = useRef<number>(0);

  // 2. 초기 liveId 추출 (URL 해시 또는 쿼리 파라미터)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('live_stream/')) {
        const extracted = hash.split('live_stream/')[1]?.split('?')[0];
        if (extracted) setLiveId(extracted);
      } else {
        const params = new URLSearchParams(window.location.search);
        const qId = params.get('id');
        if (qId) setLiveId(qId);
      }
    }
  }, []);

  // 3. 데이터 로드 및 Realtime 구독
  useEffect(() => {
    if (!liveId) return;

    let isMounted = true;

    // A. 원격 DB 초기 데이터 조회
    const fetchInitialData = async () => {
      try {
        const { data, error } = await supabase
          .from('live_control')
          .select('*')
          .eq('live_id', liveId)
          .maybeSingle();

        if (error) throw error;

        if (data && isMounted) {
          const parsedProducts: ProductItem[] = Array.isArray(data.products)
            ? data.products
            : typeof data.products === 'string'
            ? JSON.parse(data.products || '[]')
            : [];

          setConfig({
            liveId: data.live_id || liveId,
            brandName: data.title || '',
            title: data.subtitle || '',
            logoUrl: data.profile_image?.split('#')[0] || '',
            streamUrl: data.stream_url || '',
            thumbnailUrl: data.thumbnail_url || '',
            isLive: data.status === 'ON',
            liveStartTime: data.start_time || '',
            showViewers: data.show_viewers !== false,
            shareTitle: data.share_title || '',
            shareDesc: data.share_desc || '',
            bannedWords: data.banned_words || '',
            bannedUsers: data.banned_users || '',
            winner_name: data.winner_name || null,
            winner_timestamp: data.winner_timestamp ? Number(data.winner_timestamp) : 0,
          });

          setStats({
            viewers: parseInt(data.viewers) || 0,
            cumViewers: parseInt(data.cum_viewers) || 0,
            hearts: parseInt(data.hearts) || 0,
          });

          setProducts(parsedProducts);
        }
      } catch (err) {
        console.warn('초기 데이터 로드 실패 (로컬 데이터로 대체 가능):', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchInitialData();

    // B. Fly.io 소켓 클러스터 룸 입장
    const socket = getLiveSocket(liveId);

    // C. Supabase 실시간 채팅 구독
    const chatChannel = supabase
      .channel(`admin-chat-${liveId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'live_chats', filter: `live_id=eq.${liveId}` },
        (payload) => {
          const msg = payload.new as ChatMessage;
          if (msg && isMounted) {
            setChats((prev) => [...prev.slice(-100), msg]);
          }
        }
      )
      .subscribe();

    // D. Supabase live_control 실시간 구독
    const syncChannel = supabase
      .channel(`admin-sync-next-${liveId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'live_control', filter: `live_id=eq.${liveId}` },
        (payload) => {
          const newData = payload.new;
          if (!newData || !isMounted) return;

          // 본인이 최근 1.5초 이내에 저장한 변경사항이면 화면 덮어쓰기 방지
          if (Date.now() - lastSelfSaveTime.current < 1500) return;

          if (newData.winner_name !== undefined || newData.winner_timestamp !== undefined) {
            setConfig((prev) => ({
              ...prev,
              winner_name: newData.winner_name ?? prev.winner_name,
              winner_timestamp: newData.winner_timestamp ? Number(newData.winner_timestamp) : 0,
            }));
          }

          if (newData.viewers !== undefined || newData.hearts !== undefined) {
            setStats({
              viewers: parseInt(newData.viewers) || 0,
              cumViewers: parseInt(newData.cum_viewers) || 0,
              hearts: parseInt(newData.hearts) || 0,
            });
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(chatChannel);
      supabase.removeChannel(syncChannel);
    };
  }, [liveId]);

  // 4. 원격 동기화 (Supabase + Fly.io Socket 브로드캐스트)
  const syncRemote = useCallback(
    async (
      updatedConfig: LiveConfig,
      updatedStats: LiveStats,
      updatedProducts: ProductItem[]
    ) => {
      lastSelfSaveTime.current = Date.now();

      const payload = {
        config: updatedConfig,
        stats: updatedStats,
        products: updatedProducts,
        timestamp: Date.now(),
      };

      // 1) Fly.io 전용 소켓 클러스터 즉시 브로드캐스트 (0.05초)
      broadcastToCluster(liveId, payload);

      // 2) Supabase live_control upsert (영구 보존)
      const dbData = {
        live_id: liveId,
        title: updatedConfig.brandName,
        subtitle: updatedConfig.title,
        profile_image: updatedConfig.logoUrl || '',
        stream_url: updatedConfig.streamUrl || '',
        viewers: updatedStats.viewers,
        hearts: updatedStats.hearts,
        cum_viewers: updatedStats.cumViewers,
        products: updatedProducts,
        show_viewers: updatedConfig.showViewers !== false,
        thumbnail_url: updatedConfig.thumbnailUrl || '',
        start_time: updatedConfig.liveStartTime || '',
        status: updatedConfig.isLive ? 'ON' : 'OFF',
        share_title: updatedConfig.shareTitle || '',
        share_desc: updatedConfig.shareDesc || '',
        banned_words: updatedConfig.bannedWords || '',
        banned_users: updatedConfig.bannedUsers || '',
        winner_name: updatedConfig.winner_name || null,
        winner_timestamp: updatedConfig.winner_timestamp
          ? Number(updatedConfig.winner_timestamp)
          : 0,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('live_control').upsert(dbData);
      if (error) {
        console.warn('[Admin Next] Supabase upsert error:', error);
      }
    },
    [liveId]
  );

  // 방송 시작/종료 토글
  const handleToggleLive = async () => {
    setIsSaving(true);
    const willBeLive = !config.isLive;
    const newConfig = {
      ...config,
      isLive: willBeLive,
      liveStartTime: willBeLive ? new Date().toISOString() : config.liveStartTime,
    };
    setConfig(newConfig);
    await syncRemote(newConfig, stats, products);
    setIsSaving(false);
  };

  // 소통왕 / 구매인증 시작
  const handleStartWinner = async (
    type: '소통왕' | '구매인증',
    nickname: string,
    minutes: number
  ) => {
    const compositeName = `${type}|${nickname}`;
    const endTS = Date.now() + minutes * 60 * 1000;
    const newConfig = {
      ...config,
      winner_name: compositeName,
      winner_timestamp: endTS,
    };
    setConfig(newConfig);
    await syncRemote(newConfig, stats, products);
  };

  // 소통왕 / 구매인증 종료
  const handleStopWinner = async () => {
    const newConfig = {
      ...config,
      winner_timestamp: 0,
    };
    setConfig(newConfig);
    await syncRemote(newConfig, stats, products);
  };

  // 상품 변경 핸들러
  const handleUpdateProducts = (newProducts: ProductItem[]) => {
    setProducts(newProducts);
    syncRemote(config, stats, newProducts);
  };

  // 수동 저장 트리거
  const handleSaveManual = async () => {
    setIsSaving(true);
    await syncRemote(config, stats, products);
    setIsSaving(false);
  };

  // 관리자 채팅 전송
  const handleSendAdminChat = async (message: string) => {
    const chatData = {
      live_id: liveId,
      nickname: '관리자',
      content: message,
      created_at: Date.now().toString(),
    };
    await supabase.from('live_chats').insert([chatData]);
    const socket = getLiveSocket(liveId);
    if (socket && socket.connected) {
      socket.emit('send_chat', { liveId, chatData });
    }
  };

  // 금칙어 저장
  const handleUpdateBanned = async (words: string, users: string) => {
    const newConfig = {
      ...config,
      bannedWords: words,
      bannedUsers: users,
    };
    setConfig(newConfig);
    await syncRemote(newConfig, stats, products);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-3 bg-[#f8fafc]">
        <Loader2 size={32} className="animate-spin text-[#2563eb]" />
        <p className="text-xs font-bold text-[#64748b]">라이브 관제 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#f8fafc]">
      {/* 1. 상단 관제 바 */}
      <TopBar
        config={config}
        stats={stats}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onToggleLive={handleToggleLive}
        isSaving={isSaving}
      />

      {/* 2. 메인 컨텐츠 영역 (좌측 탭 패널 + 우측 모바일 프리뷰) */}
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'settings' && (
              <SettingsTab
                config={config}
                onUpdateConfig={(c) => {
                  setConfig(c);
                  syncRemote(c, stats, products);
                }}
                onSaveManual={handleSaveManual}
                isSaving={isSaving}
              />
            )}

            {activeTab === 'chat' && (
              <ChatTab
                config={config}
                chats={chats}
                onStartWinner={handleStartWinner}
                onStopWinner={handleStopWinner}
                onUpdateBanned={handleUpdateBanned}
                onSendAdminChat={handleSendAdminChat}
              />
            )}

            {activeTab === 'products' && (
              <ProductsTab
                products={products}
                onUpdateProducts={handleUpdateProducts}
                onSaveManual={handleSaveManual}
                isSaving={isSaving}
              />
            )}

            {activeTab === 'orders' && (
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center shadow-sm">
                <p className="text-xs text-[#64748b]">라이브 주문 통계 및 결제 연동 내역입니다.</p>
              </div>
            )}

            {activeTab === 'leads' && (
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center shadow-sm">
                <p className="text-xs text-[#64748b]">상담 신청 및 리드 DB 수집 내역입니다.</p>
              </div>
            )}
          </div>
        </main>

        {/* 우측 실시간 모바일 프리뷰 (iframe) */}
        <PreviewPanel
          liveId={liveId}
          config={config}
          stats={stats}
          products={products}
        />
      </div>
    </div>
  );
}
