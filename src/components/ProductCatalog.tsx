import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { DISTRICTS, CATEGORIES, FALLBACK_IMG } from '../data/mockData';
import { Search, RotateCcw, Award, MapPin, Building2, PackageOpen } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [district, setDistrict] = useState('ALL');
  const [category, setCategory] = useState('ALL');
  const [stars, setStars] = useState('ALL');
  const [sortBy, setSortBy] = useState<'star-desc' | 'star-asc' | 'name-asc'>('star-desc');

  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();

    const filtered = products.filter((p) => {
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.producer.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);

      const matchDist = district === 'ALL' || p.district === district;
      const matchCat = category === 'ALL' || p.category === category;
      const matchStar = stars === 'ALL' || p.stars.toString() === stars;

      return matchQ && matchDist && matchCat && matchStar;
    });

    if (sortBy === 'star-desc') {
      filtered.sort((a, b) => b.stars - a.stars);
    } else if (sortBy === 'star-asc') {
      filtered.sort((a, b) => a.stars - b.stars);
    } else if (sortBy === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    }

    return filtered;
  }, [products, searchTerm, district, category, stars, sortBy]);

  const handleReset = () => {
    setSearchTerm('');
    setDistrict('ALL');
    setCategory('ALL');
    setStars('ALL');
    setSortBy('star-desc');
  };

  const getBadgeClass = (s: number) => {
    if (s === 5) return 'badge-5star';
    if (s === 4) return 'badge-4star';
    return 'badge-3star';
  };

  return (
    <div className="space-y-6">
      {/* Filters Box */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Tìm kiếm từ khóa
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Tên sản phẩm, HTX, mã OCOP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-600 outline-none transition"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Địa bàn
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-600 outline-none transition"
            >
              <option value="ALL">Tất cả địa bàn</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Ngành hàng
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-600 outline-none transition"
            >
              <option value="ALL">Tất cả ngành hàng</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Phân hạng OCOP
            </label>
            <select
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-600 outline-none transition"
            >
              <option value="ALL">Tất cả hạng sao</option>
              <option value="5">⭐⭐⭐⭐⭐ OCOP 5 Sao</option>
              <option value="4">⭐⭐⭐⭐ OCOP 4 Sao</option>
              <option value="3">⭐⭐⭐ OCOP 3 Sao</option>
            </select>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
            <span className="text-gray-400 font-medium">Gợi ý:</span>
            <button
              type="button"
              onClick={() => setSearchTerm('Trà hoa vàng')}
              className="px-2.5 py-1 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-800 rounded-lg transition cursor-pointer"
            >
              Trà hoa vàng
            </button>
            <button
              type="button"
              onClick={() => setSearchTerm('Mật ong')}
              className="px-2.5 py-1 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-800 rounded-lg transition cursor-pointer"
            >
              Mật ong rừng
            </button>
            <button
              type="button"
              onClick={() => setSearchTerm('Gốm')}
              className="px-2.5 py-1 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-800 rounded-lg transition cursor-pointer"
            >
              Gốm Hương Canh
            </button>
            <button
              type="button"
              onClick={() => setSearchTerm('Đông trùng')}
              className="px-2.5 py-1 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-800 rounded-lg transition cursor-pointer"
            >
              Đông trùng hạ thảo
            </button>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-200 rounded-lg px-2 py-1 bg-white outline-none cursor-pointer"
              >
                <option value="star-desc">Số sao cao nhất</option>
                <option value="star-asc">Số sao thấp nhất</option>
                <option value="name-asc">Tên sản phẩm A-Z</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-green-700 hover:text-green-900 font-semibold flex items-center cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              <span>Đặt lại</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <PackageOpen className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-600">
            Không tìm thấy sản phẩm nào khớp với điều kiện lọc
          </p>
          <button
            onClick={handleReset}
            className="mt-3 px-3.5 py-1.5 bg-green-50 text-green-700 font-bold text-xs rounded-xl hover:bg-green-100 transition cursor-pointer"
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-lg transition flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={p.image}
                  alt={p.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMG;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg shadow-xs ${getBadgeClass(
                      p.stars
                    )} inline-flex items-center`}
                  >
                    <Award className="w-3.5 h-3.5 mr-1" />
                    {p.stars} SAO
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  {p.id}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                    <span className="text-green-700 font-semibold uppercase text-[10px] bg-green-50 px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                      {p.district}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1.5 group-hover:text-green-700 transition line-clamp-2">
                    {p.name}
                  </h4>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-1 flex items-center">
                    <Building2 className="w-3 h-3 mr-1 text-gray-400 shrink-0" />
                    <span className="truncate">{p.producer}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <div className="text-[10px] text-gray-400 truncate max-w-[120px]">
                    {p.decisionNumber}
                  </div>
                  <button
                    onClick={() => onSelectProduct(p)}
                    className="px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-700 hover:text-white rounded-lg transition cursor-pointer"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
