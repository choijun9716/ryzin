'use client';

import React, { useRef, useEffect } from 'react';
import { LiveConfig, LiveStats, ProductItem } from '@/types/live';
import { RotateCw, Copy, Check, Smartphone } from 'lucide-react';

interface PreviewPanelProps {
  liveId: string;
  config: LiveConfig;
  stats: LiveStats;
  products: ProductItem[];
}

export default function PreviewPanel({
  liveId,
  config,
  stats,
  products,
}: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [copied, setCopied] = React.useState(false);

  // 실시간 postMessage 동기화
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          {
            type: 'sync_preview',
            config,
            stats,
            products,
          },
          '*'
        );
      } catch (e) {}
    }
  }, [config, stats, products]);

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = `/live/${liveId}`;
    }
  };

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/live/${liveId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <aside className="w-[420px] border-l border-[#e2e8f0] bg-white p-6 flex flex-col items-center justify-start flex-shrink-0 hidden xl:flex">
      <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-[#f1f5f9]">
        <div className="flex items-center gap-2">
          <Smartphone size={16} className="text-[#3b82f6]" />
          <h3 className="text-xs font-bold text-[#0f172a]">모바일 실시간 미리보기</h3>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          className="p-1.5 text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] rounded-lg transition-all"
          title="미리보기 새로고침"
        >
          <RotateCw size={14} />
        </button>
      </div>

      {/* 모바일 디바이스 프레임 (390 x 693) */}
      <div className="relative w-[360px] h-[640px] bg-black rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#0f172a] flex-shrink-0">
        <iframe
          ref={iframeRef}
          src={`/live/${liveId}`}
          className="w-full h-full border-none select-none"
          title="라이브 모바일 미리보기"
        />
      </div>

      {/* 하단 공유 액션 */}
      <div className="w-full mt-4 p-3 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] space-y-2">
        <div className="flex items-center justify-between text-xs text-[#64748b]">
          <span className="font-bold">시청자 URL</span>
          <span className="font-mono text-[11px] truncate max-w-[180px]">
            ryzincorp.com/live/{liveId}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopyUrl}
          className="w-full btn-secondary text-xs py-1.5"
        >
          {copied ? (
            <>
              <Check size={13} className="text-[#10b981]" />
              링크 복사 완료
            </>
          ) : (
            <>
              <Copy size={13} />
              시청자 링크 복사
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
