'use client';

import React, { useEffect, useState } from 'react';
import { LiveConfig, LiveStats } from '@/types/live';
import { Radio, Users, Heart, Clock, ArrowLeft, ExternalLink } from 'lucide-react';

interface TopBarProps {
  config: LiveConfig;
  stats: LiveStats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onToggleLive: () => void;
  isSaving: boolean;
}

export default function TopBar({
  config,
  stats,
  activeTab,
  setActiveTab,
  onToggleLive,
  isSaving,
}: TopBarProps) {
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    if (!config.isLive || !config.liveStartTime) {
      setElapsedTime('00:00:00');
      return;
    }

    const start = new Date(config.liveStartTime).getTime();
    if (isNaN(start)) return;

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((Date.now() - start) / 1000));
      const h = String(Math.floor(diff / 3600)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      setElapsedTime(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [config.isLive, config.liveStartTime]);

  const tabs = [
    { id: 'settings', label: '기본설정' },
    { id: 'chat', label: '채팅관리' },
    { id: 'products', label: '상품관리' },
    { id: 'orders', label: '주문 통계' },
    { id: 'leads', label: '상담 DB' },
  ];

  return (
    <header className="bg-white border-b border-[#e2e8f0] px-6 py-3 flex items-center justify-between gap-4 flex-wrap select-none shadow-sm">
      {/* 좌측: 타이틀 및 방송 상태 */}
      <div className="flex items-center gap-3">
        <a
          href="/admin/"
          className="p-1.5 text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] rounded-lg transition-all"
          title="대시보드로 돌아가기"
        >
          <ArrowLeft size={18} />
        </a>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded border border-[#e2e8f0]">
            {config.liveId}
          </span>
          <h1 className="text-base font-bold text-[#0f172a] truncate max-w-[280px]">
            {config.title || '라이브 방송'}
          </h1>
        </div>

        {/* 상태 뱃지 */}
        {config.isLive ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#fef2f2] text-[#ef4444] border border-[#fecaca]">
            <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
            라이브 중
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0]">
            <span className="w-2 h-2 rounded-full bg-[#94a3b8]" />
            송출 대기
          </div>
        )}

        {/* 방송 중 타이머 */}
        {config.isLive && (
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#ef4444] bg-[#fff1f2] px-2.5 py-1 rounded-md border border-[#ffe4e6]">
            <Clock size={13} />
            {elapsedTime}
          </div>
        )}
      </div>

      {/* 중앙: 탭 전환 */}
      <nav className="flex items-center gap-1 bg-[#f1f5f9] p-1 rounded-lg border border-[#e2e8f0]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                isActive
                  ? 'bg-white text-[#0f172a] shadow-sm'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* 우측: 실시간 통계 및 라이브 ON/OFF 토글 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-xs font-medium text-[#64748b] bg-[#f8fafc] px-3 py-1.5 rounded-lg border border-[#e2e8f0]">
          <div className="flex items-center gap-1" title="현재 시청자 수">
            <Users size={14} className="text-[#3b82f6]" />
            <span className="font-bold text-[#0f172a]">{stats.viewers.toLocaleString()}</span>
          </div>
          <span className="text-[#cbd5e1]">|</span>
          <div className="flex items-center gap-1" title="누적 좋아요 수">
            <Heart size={14} className="text-[#ec4899]" />
            <span className="font-bold text-[#0f172a]">{stats.hearts.toLocaleString()}</span>
          </div>
        </div>

        {/* 방송 시작/종료 버튼 */}
        <button
          type="button"
          onClick={onToggleLive}
          disabled={isSaving}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
            config.isLive
              ? 'bg-[#ef4444] hover:bg-[#dc2626] text-white'
              : 'bg-[#10b981] hover:bg-[#059669] text-white'
          }`}
        >
          {config.isLive ? '라이브 종료' : '라이브 시작'}
        </button>

        {/* 시청자 링크 바로가기 */}
        <a
          href={`/live/${config.liveId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] rounded-lg transition-all"
          title="시청자 화면 새창 열기"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </header>
  );
}
