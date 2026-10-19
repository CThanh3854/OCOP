import React from 'react';
import { ActiveTab } from '../types';
import { Leaf, Boxes, MapPin, Scale, FileCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onToggleAiChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onToggleAiChat,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer select-none"
            onClick={() => onTabChange('products')}
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-green-700 text-white rounded-xl flex items-center justify-center font-bold shadow-md">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-green-700 block">
                Ủy Ban Nhân Dân Tỉnh
              </span>
              <h1 className="text-base sm:text-lg lg:text-xl font-extrabold text-gray-900 leading-tight">
                Cổng Dữ Liệu Số OCOP
              </h1>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex space-x-1 h-full items-end pb-1 text-sm font-semibold text-gray-600">
            <button
              onClick={() => onTabChange('products')}
              className={`px-4 py-4 border-b-2 transition flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'products'
                  ? 'text-green-800 border-green-700 bg-green-50/60 font-bold'
                  : 'border-transparent hover:text-green-800'
              }`}
            >
              <Boxes className="w-4 h-4" />
              <span>Sản Phẩm OCOP</span>
            </button>
            <button
              onClick={() => onTabChange('map')}
              className={`px-4 py-4 border-b-2 transition flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'map'
                  ? 'text-green-800 border-green-700 bg-green-50/60 font-bold'
                  : 'border-transparent hover:text-green-800'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Bản Đồ Số GIS</span>
            </button>
            <button
              onClick={() => onTabChange('docs')}
              className={`px-4 py-4 border-b-2 transition flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'docs'
                  ? 'text-green-800 border-green-700 bg-green-50/60 font-bold'
                  : 'border-transparent hover:text-green-800'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Văn Bản Pháp Lý</span>
            </button>
            <button
              onClick={() => onTabChange('guide')}
              className={`px-4 py-4 border-b-2 transition flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'guide'
                  ? 'text-green-800 border-green-700 bg-green-50/60 font-bold'
                  : 'border-transparent hover:text-green-800'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Quy Trình & Nộp Hồ Sơ</span>
            </button>
          </nav>

          {/* AI Gemini Assistant Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleAiChat}
              className="px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 rounded-xl shadow transition flex items-center cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-yellow-300" />
              <span>Trợ lý AI Gemini</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
