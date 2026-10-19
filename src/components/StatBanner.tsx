import React from 'react';
import { Product } from '../types';

interface StatBannerProps {
  products: Product[];
}

export const StatBanner: React.FC<StatBannerProps> = ({ products }) => {
  const total = products.length;
  const star5 = products.filter((p) => p.stars === 5).length;
  const star4 = products.filter((p) => p.stars === 4).length;
  const star3 = products.filter((p) => p.stars === 3).length;

  return (
    <section className="bg-gradient-to-r from-green-950 via-green-800 to-emerald-900 text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <span className="inline-block py-1 px-3 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3">
          Dữ Liệu Quốc Gia & Tỉnh Được Số Hóa
        </span>
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3">
          Cổng Tra Cứu & Bản Đồ Số Nông Sản OCOP
        </h2>
        <p className="text-green-100 text-xs sm:text-sm max-w-2xl mx-auto mb-6">
          Tra cứu nguồn gốc xuất xứ, tọa độ vệ tinh vùng sản xuất và văn bản cơ chế chính sách địa phương.
        </p>

        {/* Stat Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20 text-left">
          <div className="px-2.5 sm:px-4 border-r border-white/10">
            <div className="text-xl sm:text-3xl font-bold text-yellow-300">{total}</div>
            <div className="text-[11px] sm:text-xs text-green-100">Sản phẩm chứng nhận</div>
          </div>
          <div className="px-2.5 sm:px-4 border-r border-white/10">
            <div className="text-xl sm:text-3xl font-bold text-yellow-400">{star5}</div>
            <div className="text-[11px] sm:text-xs text-green-100">5 Sao Quốc gia</div>
          </div>
          <div className="px-2.5 sm:px-4 border-r border-white/10">
            <div className="text-xl sm:text-3xl font-bold text-emerald-300">{star4}</div>
            <div className="text-[11px] sm:text-xs text-green-100">4 Sao Cấp tỉnh</div>
          </div>
          <div className="px-2.5 sm:px-4">
            <div className="text-xl sm:text-3xl font-bold text-blue-200">{star3}</div>
            <div className="text-[11px] sm:text-xs text-green-100">3 Sao Cấp huyện</div>
          </div>
        </div>
      </div>
    </section>
  );
};
