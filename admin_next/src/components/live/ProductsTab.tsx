'use client';

import React, { useState } from 'react';
import { ProductItem } from '@/types/live';
import ProductEditModal from './ProductEditModal';
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit2,
  Sparkles,
  Gift,
  Zap,
  Check,
  Eye,
  ShoppingBag,
  Clock
} from 'lucide-react';

interface ProductsTabProps {
  products: ProductItem[];
  onUpdateProducts: (newProducts: ProductItem[]) => void;
  onSaveManual: () => Promise<void>;
  isSaving: boolean;
}

export default function ProductsTab({
  products,
  onUpdateProducts,
  onSaveManual,
  isSaving,
}: ProductsTabProps) {
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [dealPopoverIdx, setDealPopoverIdx] = useState<number | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 1. 상품 추가 모달 열기
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  // 2. 상품 수정 모달 열기
  const handleOpenEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // 3. 모달에서 저장 완료 시
  const handleSaveModalProduct = (savedProduct: ProductItem) => {
    const exists = products.some((p) => p.id === savedProduct.id);
    let updated: ProductItem[];
    if (exists) {
      updated = products.map((p) => (p.id === savedProduct.id ? savedProduct : p));
    } else {
      updated = [...products, savedProduct];
    }
    onUpdateProducts(updated);
  };

  // 4. '지금소개중' 원클릭 토글
  const handleToggleFeatured = (index: number) => {
    const isCurrentlyFeatured = Boolean(products[index].isFeatured);
    const updated = products.map((p, idx) => ({
      ...p,
      isFeatured: idx === index ? !isCurrentlyFeatured : false,
    }));
    onUpdateProducts(updated);
  };

  // 5. '선착순 무료나눔' 토글
  const handleToggleGiveaway = (index: number) => {
    const updated = [...products];
    const item = updated[index];
    const willActive = !item.isGiveawayActive;
    item.isGiveawayActive = willActive;
    item.isFreeGiveaway = willActive;
    if (willActive) {
      item.price = '0';
      item.hideByDefault = true;
      item.giveawayStock = item.giveawayStock || 3;
      item.giveawayClaimed = 0;
      item.giveawayStartedAt = Date.now();
    } else {
      item.giveawayStartedAt = 0;
    }
    onUpdateProducts(updated);
  };

  // 6. '깜짝딜' 제어
  const handleStartDeal = (index: number, minutes: number) => {
    const updated = [...products];
    updated[index].dealEndTime = Date.now() + minutes * 60 * 1000;
    updated[index].dealText = updated[index].dealText || '깜짝딜 종료까지';
    onUpdateProducts(updated);
    setDealPopoverIdx(null);
  };

  const handleCancelDeal = (index: number) => {
    const updated = [...products];
    updated[index].dealEndTime = 0;
    onUpdateProducts(updated);
    setDealPopoverIdx(null);
  };

  // 7. 순서 변경
  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === products.length - 1)
    ) {
      return;
    }
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...products];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    onUpdateProducts(updated);
  };

  // 8. 상품 삭제
  const handleDelete = (index: number) => {
    const name = products[index]?.name || '이 상품';
    if (!confirm(`정말 "${name}" 상품을 삭제하시겠습니까?`)) return;
    const updated = products.filter((_, idx) => idx !== index);
    onUpdateProducts(updated);
  };

  // 수동 저장 트리거
  const handleManualSave = async () => {
    try {
      await onSaveManual();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err: any) {
      alert('저장 실패: ' + err.message);
    }
  };

  const featuredProduct = products.find((p) => p.isFeatured);

  return (
    <div className="space-y-4">
      {/* 1. 상단 관제 서머리 & 액션 바 */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0f172a]">등록 상품</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0]">
              {products.length}개
            </span>
          </div>

          <span className="text-[#cbd5e1]">|</span>

          {/* 현재 소개중 상품 표시 */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#64748b]">지금소개중:</span>
            {featuredProduct ? (
              <span className="font-bold text-[#2563eb] bg-[#eff6ff] px-2 py-0.5 rounded border border-[#bfdbfe] truncate max-w-[200px]">
                {featuredProduct.name}
              </span>
            ) : (
              <span className="text-[#94a3b8] italic">선택된 상품 없음</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="btn-primary text-xs py-2 px-3.5 bg-[#2563eb] hover:bg-[#1d4ed8]"
          >
            <Plus size={14} />
            상품 등록
          </button>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#10b981] bg-[#ecfdf5] px-3 py-1.5 rounded-lg border border-[#a7f3d0]">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            실시간 자동 반영
          </div>

          <button
            type="button"
            onClick={handleManualSave}
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
              '확정 저장'
            )}
          </button>
        </div>
      </div>

      {/* 2. 초슬림 온에어 관제 테이블 */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xs text-[#94a3b8] mb-3">등록된 상품이 없습니다.</p>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="btn-primary text-xs mx-auto"
            >
              <Plus size={14} />첫 상품 등록하기
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#f1f5f9]">
            {products.map((item, idx) => {
              const isDealActive = Boolean(
                item.dealEndTime && Number(item.dealEndTime) > Date.now()
              );

              return (
                <div
                  key={item.id || idx}
                  className={`flex items-center gap-4 px-4 py-3 transition-colors ${
                    item.isFeatured
                      ? 'bg-[#eff6ff]/60 border-l-4 border-l-[#2563eb]'
                      : 'hover:bg-[#f8fafc]'
                  }`}
                >
                  {/* 순서 조정 */}
                  <div className="flex items-center gap-1 text-[#64748b]">
                    <span className="w-5 text-center text-xs font-mono font-bold">
                      {idx + 1}
                    </span>
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => handleMove(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 hover:text-[#0f172a] disabled:opacity-20"
                        title="위로"
                      >
                        <ArrowUp size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(idx, 'down')}
                        disabled={idx === products.length - 1}
                        className="p-1 hover:text-[#0f172a] disabled:opacity-20"
                        title="아래로"
                      >
                        <ArrowDown size={13} />
                      </button>
                    </div>
                  </div>

                  {/* 썸네일 */}
                  <div className="w-12 h-12 rounded-lg bg-[#f1f5f9] border border-[#e2e8f0] overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#94a3b8]">
                        <ShoppingBag size={18} />
                      </div>
                    )}
                  </div>

                  {/* 상품명 및 가격 요약 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-xs font-bold text-[#0f172a] truncate">
                        {item.name}
                      </h4>
                      {item.hideByDefault && (
                        <span className="text-[10px] bg-[#f1f5f9] text-[#64748b] px-1.5 py-0.5 rounded">
                          평소숨김
                        </span>
                      )}
                      {item.isLeadForm && (
                        <span className="text-[10px] bg-[#fdf4ff] text-[#a855f7] border border-[#f0abfc] px-1.5 py-0.5 rounded font-bold">
                          상담문의
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#64748b]">
                      <span className="font-bold font-mono text-[#2563eb]">
                        {item.price ? `${Number(item.price).toLocaleString()}원` : '0원'}
                      </span>
                      {item.normalPrice && Number(item.normalPrice) > Number(item.price) && (
                        <span className="line-through text-[11px] text-[#94a3b8]">
                          {Number(item.normalPrice).toLocaleString()}원
                        </span>
                      )}
                      {item.discountRate ? (
                        <span className="text-[10px] font-bold text-[#ef4444] bg-[#fee2e2] px-1.5 py-0.2 rounded">
                          {item.discountRate}%
                        </span>
                      ) : null}
                      <span className="text-[11px]">
                        재고: {item.stock ? `${item.stock}개` : '무제한'}
                      </span>
                      <span className="text-[11px] text-[#3b82f6]">
                        조회 {item.clicks || 0}
                      </span>
                    </div>
                  </div>

                  {/* 온에어 제어 버튼 (방송 중 1초 컷 조작) */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* 1. 지금소개중 토글 */}
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        item.isFeatured
                          ? 'bg-[#2563eb] text-white shadow-sm ring-2 ring-[#93c5fd]'
                          : 'bg-[#f8fafc] text-[#64748b] border border-[#cbd5e1] hover:bg-[#f1f5f9]'
                      }`}
                    >
                      <Sparkles size={13} />
                      {item.isFeatured ? '지금소개 ON' : '지금소개'}
                    </button>

                    {/* 2. 선착순 무료나눔 토글 */}
                    <button
                      type="button"
                      onClick={() => handleToggleGiveaway(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        item.isGiveawayActive
                          ? 'bg-[#ef4444] text-white shadow-sm ring-2 ring-[#fca5a5]'
                          : 'bg-white text-[#ef4444] border border-[#fca5a5] hover:bg-[#fef2f2]'
                      }`}
                    >
                      <Gift size={13} />
                      {item.isGiveawayActive ? '나눔 진행중' : '무료나눔'}
                    </button>

                    {/* 3. 깜짝딜 팝오버 */}
                    <div className="relative">
                      {isDealActive ? (
                        <button
                          type="button"
                          onClick={() => handleCancelDeal(idx)}
                          className="px-2.5 py-1.5 bg-[#f59e0b] text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"
                        >
                          <Zap size={13} />
                          깜짝딜 종료
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setDealPopoverIdx(dealPopoverIdx === idx ? null : idx)
                          }
                          className="px-2.5 py-1.5 bg-white text-[#d97706] border border-[#fcd34d] hover:bg-[#fffbeb] rounded-lg text-xs font-bold flex items-center gap-1"
                        >
                          <Clock size={13} />
                          깜짝딜
                        </button>
                      )}

                      {dealPopoverIdx === idx && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-xl border border-[#e2e8f0] p-2 z-20 space-y-1">
                          <span className="block text-[10px] font-bold text-[#64748b] px-2 py-1">
                            깜짝딜 시간 선택
                          </span>
                          {[1, 3, 5, 10].map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => handleStartDeal(idx, m)}
                              className="w-full text-left px-2 py-1.5 text-xs font-medium rounded hover:bg-[#f1f5f9] transition-all"
                            >
                              {m}분 깜짝딜 시작
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 관리 (수정 모달 & 삭제) */}
                  <div className="flex items-center gap-1 border-l border-[#f1f5f9] pl-3 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 text-[#3b82f6] hover:bg-[#eff6ff] rounded-lg transition-all"
                      title="상세 수정"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      className="p-1.5 text-[#ef4444] hover:bg-[#fef2f2] rounded-lg transition-all"
                      title="삭제"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. 상품 상세 설정 전용 모달 */}
      <ProductEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleSaveModalProduct}
      />
    </div>
  );
}
