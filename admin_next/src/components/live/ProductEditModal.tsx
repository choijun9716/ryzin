'use client';

import React, { useState, useEffect } from 'react';
import { ProductItem } from '@/types/live';
import { X, Upload, Plus, Trash2, Check, AlertCircle } from 'lucide-react';

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  onSave: (savedProduct: ProductItem) => void;
}

export default function ProductEditModal({
  isOpen,
  onClose,
  product,
  onSave,
}: ProductEditModalProps) {
  const [formData, setFormData] = useState<ProductItem>({
    id: Date.now(),
    name: '',
    price: '',
    normalPrice: '',
    discountRate: 0,
    stock: '',
    maxPerUser: '',
    image: '',
    url: '',
    hideByDefault: false,
    isLeadForm: false,
    giveawayStock: 3,
    detailImage: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    } else {
      setFormData({
        id: Date.now(),
        name: '',
        price: '',
        normalPrice: '',
        discountRate: 0,
        stock: '',
        maxPerUser: '',
        image: '',
        url: '',
        hideByDefault: false,
        isLeadForm: false,
        giveawayStock: 3,
        detailImage: '',
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof ProductItem, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'price' || field === 'normalPrice') {
        const normal = Number(field === 'normalPrice' ? value : updated.normalPrice || 0);
        const price = Number(field === 'price' ? value : updated.price || 0);
        if (normal > 0 && normal >= price && price > 0) {
          updated.discountRate = Math.floor(((normal - price) / normal) * 100);
        } else {
          updated.discountRate = 0;
        }
      }
      return updated;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        handleChange('image', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('상품명을 입력해 주세요.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9] bg-[#f8fafc]">
          <div>
            <h3 className="text-sm font-bold text-[#0f172a]">
              {product ? '상품 상세 설정 및 정보 수정' : '새 상품 추가'}
            </h3>
            <p className="text-xs text-[#64748b]">
              방송 중 표시될 상품의 가격, 이미지, 링크 및 판매 정책을 설정합니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* 모달 바디 (스크롤) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* 상품 이미지 & 기본명 */}
          <div className="flex gap-4 items-start">
            {/* 썸네일 */}
            <div className="relative w-24 h-24 rounded-xl bg-[#f1f5f9] border border-[#cbd5e1] overflow-hidden flex-shrink-0 flex items-center justify-center group">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#94a3b8] text-[11px] gap-1">
                  <Upload size={20} />
                  <span>사진 추가</span>
                </div>
              )}
              <label className="absolute inset-0 bg-black/50 text-white text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                변경
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* 상품명 & 이미지 URL 직접 입력 */}
            <div className="flex-1 space-y-2.5">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  상품명 <span className="text-[#ef4444]">*</span>
                </label>
                <input
                  type="text"
                  className="admin-input font-bold"
                  placeholder="예: 모이스처 밸런싱 마스크 10매"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#64748b] mb-1">
                  이미지 웹 URL (직접 입력 시)
                </label>
                <input
                  type="url"
                  className="admin-input text-xs font-mono"
                  placeholder="https://.../image.jpg"
                  value={formData.image || ''}
                  onChange={(e) => handleChange('image', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 가격 정책 (정상가, 판매가, 할인율) */}
          <div className="grid grid-cols-3 gap-3 bg-[#f8fafc] p-4 rounded-xl border border-[#e2e8f0]">
            <div>
              <label className="block text-xs font-bold text-[#475569] mb-1">
                정상가 (원)
              </label>
              <input
                type="text"
                className="admin-input text-right font-mono"
                placeholder="10,000"
                value={formData.normalPrice ? Number(formData.normalPrice).toLocaleString() : ''}
                onChange={(e) =>
                  handleChange('normalPrice', e.target.value.replace(/[^0-9]/g, ''))
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2563eb] mb-1">
                라이브 특가 (판매가)
              </label>
              <input
                type="text"
                className="admin-input text-right font-bold font-mono text-[#2563eb]"
                placeholder="7,900"
                value={formData.price ? Number(formData.price).toLocaleString() : ''}
                onChange={(e) =>
                  handleChange('price', e.target.value.replace(/[^0-9]/g, ''))
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#10b981] mb-1">
                할인율 (자동 계산)
              </label>
              <div className="h-9 px-3 bg-[#f1f5f9] border border-[#cbd5e1] rounded-lg flex items-center justify-end text-xs font-bold font-mono text-[#10b981]">
                {formData.discountRate ? `${formData.discountRate}% OFF` : '0%'}
              </div>
            </div>
          </div>

          {/* 재고 및 1인 구매제한 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                방송 판매 재고 수량
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  className="admin-input text-right font-mono text-xs"
                  placeholder="비워두면 무제한"
                  value={formData.stock ?? ''}
                  onChange={(e) => handleChange('stock', e.target.value)}
                />
                <span className="text-xs text-[#64748b]">개</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                1인당 최대 구매 제한
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  className="admin-input text-right font-mono text-xs"
                  placeholder="비워두면 무제한"
                  value={formData.maxPerUser ?? ''}
                  onChange={(e) => handleChange('maxPerUser', e.target.value)}
                />
                <span className="text-xs text-[#64748b]">개</span>
              </div>
            </div>
          </div>

          {/* 구매 링크 URL */}
          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">
              구매 링크 URL (스마트스토어, 쿠팡, 자사몰 등)
            </label>
            <input
              type="url"
              className="admin-input font-mono text-xs"
              placeholder="https://smartstore.naver.com/..."
              value={formData.url || ''}
              onChange={(e) => handleChange('url', e.target.value)}
            />
          </div>

          {/* 옵션 토글 */}
          <div className="pt-3 border-t border-[#f1f5f9] space-y-2.5">
            <label className="flex items-center justify-between p-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] cursor-pointer hover:bg-[#f1f5f9] transition-all">
              <div>
                <span className="text-xs font-bold text-[#0f172a] block">평소 숨김 처리</span>
                <span className="text-[11px] text-[#64748b]">
                  시청자 화면의 전체 상품 목록에서 숨기고, 지금소개 중일 때만 깜짝 노출합니다.
                </span>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.hideByDefault)}
                onChange={(e) => handleChange('hideByDefault', e.target.checked)}
                className="w-4 h-4 rounded border-[#cbd5e1] text-[#2563eb] accent-[#2563eb]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] cursor-pointer hover:bg-[#f1f5f9] transition-all">
              <div>
                <span className="text-xs font-bold text-[#0f172a] block">상담 문의 전용 상품</span>
                <span className="text-[11px] text-[#64748b]">
                  구매 링크 대신 고객 연락처 상담 신청 팝업을 엽니다.
                </span>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.isLeadForm)}
                onChange={(e) => handleChange('isLeadForm', e.target.checked)}
                className="w-4 h-4 rounded border-[#cbd5e1] text-[#2563eb] accent-[#2563eb]"
              />
            </label>
          </div>
        </form>

        {/* 모달 푸터 */}
        <div className="px-6 py-4 border-t border-[#f1f5f9] bg-[#f8fafc] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary text-xs py-2 px-4"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn-primary text-xs py-2 px-5 bg-[#0f172a] hover:bg-[#1e293b]"
          >
            <Check size={14} />
            저장 완료
          </button>
        </div>
      </div>
    </div>
  );
}
