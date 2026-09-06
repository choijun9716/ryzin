'use client';

import React, { useState } from 'react';
import { LiveConfig } from '@/types/live';
import { Save, Radio, Share2, LayoutTemplate, ShieldCheck, Check } from 'lucide-react';

interface SettingsTabProps {
  config: LiveConfig;
  onUpdateConfig: (newConfig: LiveConfig) => void;
  onSaveManual: () => Promise<void>;
  isSaving: boolean;
}

export default function SettingsTab({
  config,
  onUpdateConfig,
  onSaveManual,
  isSaving,
}: SettingsTabProps) {
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof LiveConfig, value: any) => {
    onUpdateConfig({
      ...config,
      [field]: value,
    });
  };

  const handleSave = async () => {
    try {
      await onSaveManual();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err: any) {
      alert('저장 실패: ' + err.message);
    }
  };

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9]">
        <div>
          <h2 className="text-sm font-bold text-[#0f172a]">방송 기본 정보 설정</h2>
          <p className="text-xs text-[#64748b]">
            라이브 스트리밍 송출 주소와 시청자 화면에 표시될 브랜드/제목 정보를 관리합니다.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary text-xs py-2 px-4 bg-[#0f172a]"
        >
          {saveSuccess ? (
            <>
              <Check size={14} className="text-[#10b981]" />
              저장 완료
            </>
          ) : isSaving ? (
            '저장 중...'
          ) : (
            <>
              <Save size={14} />
              설정 저장
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 브랜드명 */}
        <div>
          <label className="block text-xs font-bold text-[#334155] mb-1.5">
            브랜드명 (회사명)
          </label>
          <input
            type="text"
            className="admin-input font-bold"
            placeholder="예: 라이진 스튜디오"
            value={config.brandName || ''}
            onChange={(e) => handleChange('brandName', e.target.value)}
          />
        </div>

        {/* 라이브 방송 제목 */}
        <div>
          <label className="block text-xs font-bold text-[#334155] mb-1.5">
            라이브 방송 제목
          </label>
          <input
            type="text"
            className="admin-input font-bold"
            placeholder="예: 추석특집 릴레이 LIVE"
            value={config.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        {/* HLS 스트리밍 송출 URL */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-[#334155] mb-1.5 flex items-center gap-1.5">
            <Radio size={14} className="text-[#ef4444]" />
            HLS 스트림 m3u8 재생 주소
          </label>
          <input
            type="url"
            className="admin-input font-mono text-xs"
            placeholder="https://.../stream.m3u8"
            value={config.streamUrl || ''}
            onChange={(e) => handleChange('streamUrl', e.target.value)}
          />
        </div>

        {/* 썸네일 이미지 URL */}
        <div>
          <label className="block text-xs font-bold text-[#334155] mb-1.5">
            대기화면 썸네일 이미지 URL
          </label>
          <input
            type="url"
            className="admin-input text-xs font-mono"
            placeholder="https://.../thumbnail.jpg"
            value={config.thumbnailUrl || ''}
            onChange={(e) => handleChange('thumbnailUrl', e.target.value)}
          />
        </div>

        {/* 로고 이미지 URL */}
        <div>
          <label className="block text-xs font-bold text-[#334155] mb-1.5">
            상단 프로필 로고 URL
          </label>
          <input
            type="url"
            className="admin-input text-xs font-mono"
            placeholder="https://.../logo.png"
            value={config.logoUrl || ''}
            onChange={(e) => handleChange('logoUrl', e.target.value)}
          />
        </div>

        {/* 시청자 수 노출 여부 */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="showViewers"
            checked={config.showViewers !== false}
            onChange={(e) => handleChange('showViewers', e.target.checked)}
            className="rounded border-[#cbd5e1] text-[#2563eb]"
          />
          <label htmlFor="showViewers" className="text-xs font-bold text-[#334155] cursor-pointer">
            시청자 화면에 실시간 시청자 수 공개
          </label>
        </div>
      </div>

      {/* SNS 공유 설정 카드 */}
      <div className="pt-6 border-t border-[#f1f5f9] space-y-4">
        <div className="flex items-center gap-2">
          <Share2 size={16} className="text-[#2563eb]" />
          <h3 className="text-xs font-bold text-[#0f172a]">카카오톡 및 SNS 공유 메타 태그</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">공유 제목</label>
            <input
              type="text"
              className="admin-input text-xs"
              placeholder="카카오톡 링크 공유 시 노출될 제목"
              value={config.shareTitle || ''}
              onChange={(e) => handleChange('shareTitle', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">공유 설명</label>
            <input
              type="text"
              className="admin-input text-xs"
              placeholder="카카오톡 링크 공유 시 노출될 설명"
              value={config.shareDesc || ''}
              onChange={(e) => handleChange('shareDesc', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
