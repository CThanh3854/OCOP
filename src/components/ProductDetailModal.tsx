import React from 'react';
import { Product } from '../types';
import { FALLBACK_IMG } from '../data/mockData';
import { X, BookOpen, Award, CheckCircle2, Phone, MapPin, Building2, Calendar, FileText } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  if (!product) return null;

  const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=OCOP-VERIFY:${
    product.id
  }|${encodeURIComponent(product.name)}|${product.decisionNumber}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 z-10 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-5 sm:p-7">
          {/* Header */}
          <div className="border-b border-gray-100 pb-3 mb-4 pr-8">
            <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-1">
              <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-md">
                {product.category}
              </span>
              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {product.id}
              </span>
              <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded flex items-center">
                <Award className="w-3.5 h-3.5 mr-1 text-yellow-500" />
                {product.stars} SAO OCOP
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
              {product.name}
            </h3>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-xs">
            <div className="relative rounded-xl overflow-hidden shadow-xs h-48 bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMG;
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2.5 flex flex-col justify-center">
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold flex items-center">
                  <Building2 className="w-3 h-3 mr-1" />
                  Chủ thể sản xuất:
                </span>
                <strong className="text-gray-800 text-xs mt-0.5 block">
                  {product.producer}
                </strong>
              </div>

              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  Đại diện pháp luật & SĐT:
                </span>
                <div className="mt-0.5">
                  <span className="text-gray-700">{product.representative}</span> -{' '}
                  <strong className="text-green-700">{product.phone}</strong>
                </div>
              </div>

              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  Địa chỉ cơ sở:
                </span>
                <span className="text-gray-700 text-xs mt-0.5 block">
                  {product.address}
                </span>
              </div>
            </div>
          </div>

          {/* Standards / Chứng nhận */}
          {product.standards && product.standards.length > 0 && (
            <div className="mb-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                Tiêu chuẩn & Chứng nhận đã đạt:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.standards.map((std, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                    {std}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Product Story */}
          <div className="bg-green-50/70 p-3.5 rounded-xl border border-green-100 text-xs text-gray-700 mb-4 leading-relaxed">
            <strong className="text-green-800 block mb-1 text-xs font-bold flex items-center">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              Câu chuyện sản phẩm:
            </strong>
            <p className="italic text-gray-700">{product.story}</p>
          </div>

          {/* Footer Info & Verification QR */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs flex-wrap gap-2">
            <div className="space-y-1">
              <div className="text-gray-500 flex items-center">
                <FileText className="w-3.5 h-3.5 mr-1 text-gray-400" />
                <span>Quyết định công nhận:</span>
                <strong className="ml-1 text-gray-800">{product.decisionNumber}</strong>
              </div>
              <div className="text-gray-500 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-gray-400" />
                <span>Hiệu lực giấy chứng nhận:</span>
                <strong className="ml-1 text-gray-800">Đến {product.validUntil}</strong>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <img
                src={qrDataUrl}
                alt="QR Code Xác thực OCOP"
                className="w-12 h-12 rounded bg-white p-0.5"
              />
              <div className="text-[10px] leading-tight">
                <strong className="text-green-800 block font-bold">Tem Số QR</strong>
                <span className="text-gray-500">Xác thực OCOP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
