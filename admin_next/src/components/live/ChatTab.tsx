'use client';

import React, { useState, useEffect } from 'react';
import { LiveConfig, ChatMessage } from '@/types/live';
import { Award, Timer, Send, ShieldAlert, Trash2, CheckCircle2 } from 'lucide-react';

interface ChatTabProps {
  config: LiveConfig;
  chats: ChatMessage[];
  onStartWinner: (type: '소통왕' | '구매인증', nickname: string, minutes: number) => Promise<void>;
  onStopWinner: () => Promise<void>;
  onUpdateBanned: (words: string, users: string) => Promise<void>;
  onSendAdminChat: (message: string) => Promise<void>;
}

export default function ChatTab({
  config,
  chats,
  onStartWinner,
  onStopWinner,
  onUpdateBanned,
  onSendAdminChat,
}: ChatTabProps) {
  // 소통왕 / 구매인증 상태
  const isWinnerActive = Boolean(
    config.winner_timestamp && Number(config.winner_timestamp) > Date.now()
  );

  let initialType: '소통왕' | '구매인증' = '소통왕';
  let initialNickname = '';
  if (config.winner_name) {
    if (config.winner_name.startsWith('구매인증')) {
      initialType = '구매인증';
    }
    if (config.winner_name.includes('|')) {
      initialNickname = config.winner_name.split('|')[1] || '';
    } else {
      initialNickname = config.winner_name;
    }
  }

  const [winnerType, setWinnerType] = useState<'소통왕' | '구매인증'>(initialType);
  const [winnerNickname, setWinnerNickname] = useState(initialNickname);
  const [winnerMinutes, setWinnerMinutes] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [remainingSec, setRemainingSec] = useState(0);

  // 어드민 채팅 입력
  const [adminMsg, setAdminMsg] = useState('');

  // 금칙어 / 차단
  const [bannedWords, setBannedWords] = useState(config.bannedWords || '');
  const [bannedUsers, setBannedUsers] = useState(config.bannedUsers || '');
  const [isSavingBanned, setIsSavingBanned] = useState(false);

  // 카운트다운 타이머 계산
  useEffect(() => {
    if (!config.winner_timestamp) {
      setRemainingSec(0);
      return;
    }
    const endTS = Number(config.winner_timestamp);
    const updateCountdown = () => {
      const diff = Math.max(0, Math.floor((endTS - Date.now()) / 1000));
      setRemainingSec(diff);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [config.winner_timestamp]);

  const handleStart = async () => {
    if (!winnerNickname.trim()) {
      alert('당첨자 닉네임을 입력해 주세요.');
      return;
    }
    setIsProcessing(true);
    try {
      await onStartWinner(winnerType, winnerNickname.trim(), winnerMinutes);
    } catch (err: any) {
      alert('시작 처리에 실패했습니다: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStop = async () => {
    setIsProcessing(true);
    try {
      await onStopWinner();
    } catch (err: any) {
      alert('종료 처리에 실패했습니다: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveBanned = async () => {
    setIsSavingBanned(true);
    try {
      await onUpdateBanned(bannedWords, bannedUsers);
      alert('금칙어 및 차단 목록이 저장되었습니다.');
    } catch (err: any) {
      alert('저장 실패: ' + err.message);
    } finally {
      setIsSavingBanned(false);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminMsg.trim()) return;
    try {
      await onSendAdminChat(adminMsg.trim());
      setAdminMsg('');
    } catch (err: any) {
      alert('전송 실패: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. 소통왕 / 구매인증 당첨 배너 제어 카드 */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9] mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#eff6ff] text-[#2563eb] rounded-lg">
              <Award size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0f172a]">
                소통왕 및 구매인증 실시간 당첨 배너
              </h2>
              <p className="text-xs text-[#64748b]">
                시청자 라이브 화면 상단에 골드 당첨 배너와 꽃가루 폭사 효과를 즉시 송출합니다.
              </p>
            </div>
          </div>

          {/* 현재 진행 상태 */}
          {isWinnerActive ? (
            <div className="flex items-center gap-2 bg-[#ecfdf5] text-[#10b981] px-3 py-1.5 rounded-lg border border-[#a7f3d0] text-xs font-bold">
              <Timer size={14} className="animate-spin" />
              <span>
                {config.winner_name?.split('|')[0] || '당첨자'} 진행 중 (남은 시간: {remainingSec}초)
              </span>
            </div>
          ) : (
            <span className="text-xs text-[#94a3b8] bg-[#f8fafc] px-2.5 py-1 rounded border border-[#e2e8f0]">
              현재 비활성
            </span>
          )}
        </div>

        {/* 제어 폼 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* 타입 선택 (세그먼트) */}
          <div className="md:col-span-3 flex items-center bg-[#f1f5f9] p-1 rounded-lg border border-[#e2e8f0]">
            <button
              type="button"
              onClick={() => setWinnerType('소통왕')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                winnerType === '소통왕'
                  ? 'bg-[#2563eb] text-white shadow-sm'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              소통왕
            </button>
            <button
              type="button"
              onClick={() => setWinnerType('구매인증')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                winnerType === '구매인증'
                  ? 'bg-[#2563eb] text-white shadow-sm'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              구매인증
            </button>
          </div>

          {/* 당첨자 닉네임 입력 */}
          <div className="md:col-span-4">
            <input
              type="text"
              className="admin-input"
              placeholder="당첨자 닉네임 입력 (예: 라이진)"
              value={winnerNickname}
              onChange={(e) => setWinnerNickname(e.target.value)}
              disabled={isProcessing}
            />
          </div>

          {/* 노출 시간 선택 */}
          <div className="md:col-span-2">
            <select
              className="admin-input"
              value={winnerMinutes}
              onChange={(e) => setWinnerMinutes(Number(e.target.value))}
              disabled={isProcessing}
            >
              <option value={1}>1분 노출</option>
              <option value={2}>2분 노출</option>
              <option value={3}>3분 노출</option>
              <option value={5}>5분 노출</option>
              <option value={10}>10분 노출</option>
            </select>
          </div>

          {/* 시작 / 종료 버튼 */}
          <div className="md:col-span-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleStart}
              disabled={isProcessing}
              className="flex-1 btn-primary text-xs py-2 bg-[#2563eb] hover:bg-[#1d4ed8]"
            >
              시작
            </button>
            {isWinnerActive && (
              <button
                type="button"
                onClick={handleStop}
                disabled={isProcessing}
                className="btn-danger text-xs py-2"
              >
                종료
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. 실시간 채팅 모니터링 & 관리자 메시지 전송 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 채팅 피드 */}
        <div className="md:col-span-8 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm flex flex-col h-[480px]">
          <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9] mb-3">
            <h3 className="text-xs font-bold text-[#0f172a]">실시간 채팅 피드</h3>
            <span className="text-[11px] text-[#64748b]">총 {chats.length}개 메시지</span>
          </div>

          {/* 메시지 목록 스크롤 */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-2">
            {chats.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-[#94a3b8]">
                아직 수신된 채팅이 없습니다.
              </div>
            ) : (
              chats.map((c, i) => (
                <div
                  key={c.id || i}
                  className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#f1f5f9] text-xs hover:bg-[#f1f5f9] transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#334155]">{c.nickname}</span>
                    <span className="text-[10px] text-[#94a3b8]">
                      {c.created_at ? new Date(Number(c.created_at)).toLocaleTimeString() : ''}
                    </span>
                  </div>
                  <p className="text-[#0f172a] leading-relaxed break-words">{c.content}</p>
                </div>
              ))
            )}
          </div>

          {/* 관리자 공지/채팅 전송 인풋 */}
          <form onSubmit={handleSendChat} className="mt-3 pt-3 border-t border-[#f1f5f9] flex gap-2">
            <input
              type="text"
              className="admin-input"
              placeholder="관리자 공지 또는 메시지 입력..."
              value={adminMsg}
              onChange={(e) => setAdminMsg(e.target.value)}
            />
            <button type="submit" className="btn-primary text-xs px-4">
              <Send size={14} />
              전송
            </button>
          </form>
        </div>

        {/* 금칙어 및 차단 설정 */}
        <div className="md:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm flex flex-col justify-between h-[480px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#f1f5f9]">
              <ShieldAlert size={16} className="text-[#ef4444]" />
              <h3 className="text-xs font-bold text-[#0f172a]">채팅 필터링 및 보안</h3>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                금칙어 필터 (쉼표 구분)
              </label>
              <textarea
                className="admin-input h-24 resize-none text-xs"
                placeholder="비속어, 욕설, 타사링크 등"
                value={bannedWords}
                onChange={(e) => setBannedWords(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                차단할 닉네임/IP (쉼표 구분)
              </label>
              <textarea
                className="admin-input h-24 resize-none text-xs"
                placeholder="어그로1, 악플러2 등"
                value={bannedUsers}
                onChange={(e) => setBannedUsers(e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveBanned}
            disabled={isSavingBanned}
            className="w-full btn-secondary text-xs py-2 mt-4"
          >
            <CheckCircle2 size={14} />
            {isSavingBanned ? '저장 중...' : '필터링 설정 저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
