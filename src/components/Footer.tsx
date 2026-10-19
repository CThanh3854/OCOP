import React from 'react';
import { ActiveTab } from '../types';
import { Leaf, Building2, Phone, Mail, ArrowRight } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div>
          <div className="flex items-center space-x-2 text-white font-bold text-sm mb-2">
            <Leaf className="w-4 h-4 text-green-500" />
            <span>Cổng Dữ Liệu Số OCOP Tỉnh</span>
          </div>
          <p className="text-gray-400 leading-relaxed mb-2">
            Hệ thống minh bạch hóa dữ liệu sản phẩm nông nghiệp nông thôn đạt chuẩn 3 sao - 4 sao - 5 sao trên bản đồ số GIS.
          </p>
          <div className="text-gray-500">
            © 2026 Bản quyền thuộc Sở Nông nghiệp & Phát triển Nông thôn.
          </div>
        </div>

        <div>
          <h5 className="text-white font-bold uppercase mb-2">Đơn Vị Quản Lý Vận Hành</h5>
          <ul className="space-y-1.5 text-gray-400">
            <li className="flex items-center">
              <Building2 className="w-3.5 h-3.5 mr-2 text-green-500 shrink-0" />
              <span>Chi cục Phát triển Nông thôn</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-3.5 h-3.5 mr-2 text-green-500 shrink-0" />
              <span>Hotline: (0211) 3868 999</span>
            </li>
            <li className="flex items-center">
              <Mail className="w-3.5 h-3.5 mr-2 text-green-500 shrink-0" />
              <span>ocop@diaphuong.gov.vn</span>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold uppercase mb-2">Đường Dẫn Nhanh</h5>
          <ul className="space-y-1.5 text-gray-400">
            <li>
              <button
                onClick={() => {
                  onTabChange('map');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-green-400 flex items-center transition cursor-pointer"
              >
                <ArrowRight className="w-3 h-3 mr-1.5" />
                <span>Bản đồ số vệ tinh định vị OCOP</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onTabChange('docs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-green-400 flex items-center transition cursor-pointer"
              >
                <ArrowRight className="w-3 h-3 mr-1.5" />
                <span>Tra cứu Nghị quyết chính sách thưởng</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onTabChange('guide');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-green-400 flex items-center transition cursor-pointer"
              >
                <ArrowRight className="w-3 h-3 mr-1.5" />
                <span>Nộp hồ sơ đăng ký OCOP online</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
