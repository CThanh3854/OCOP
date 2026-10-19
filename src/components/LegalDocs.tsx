import React, { useState, useMemo } from 'react';
import { LegalDoc } from '../types';
import { Search, RotateCcw, Eye, Download, X, FileText, Calendar, Building, Scale } from 'lucide-react';

interface LegalDocsProps {
  docs: LegalDoc[];
}

export const LegalDocs: React.FC<LegalDocsProps> = ({ docs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [issuer, setIssuer] = useState('ALL');
  const [docType, setDocType] = useState('ALL');
  const [category, setCategory] = useState('ALL');
  const [selectedDoc, setSelectedDoc] = useState<LegalDoc | null>(null);

  const filteredDocs = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();

    return docs.filter((d) => {
      const matchQ =
        !q ||
        d.code.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q);

      const matchIss = issuer === 'ALL' || d.issuer === issuer;
      const matchType = docType === 'ALL' || d.type === docType;
      const matchCat = category === 'ALL' || d.category === category;

      return matchQ && matchIss && matchType && matchCat;
    });
  }, [docs, searchTerm, issuer, docType, category]);

  const handleReset = () => {
    setSearchTerm('');
    setIssuer('ALL');
    setDocType('ALL');
    setCategory('ALL');
  };

  const downloadDocument = (doc: LegalDoc) => {
    const fileContent =
      `========================================================\n` +
      `CỔNG THÔNG TIN SỐ HÓA OCOP ĐỊA PHƯƠNG\n` +
      `VĂN BẢN QUY PHẠM: ${doc.code}\n` +
      `Cơ quan ban hành: ${doc.issuer}\n` +
      `Ngày ký ban hành: ${doc.signDate}\n` +
      `Chủ đề: ${doc.category}\n` +
      `========================================================\n\n` +
      `TRÍCH YẾU:\n${doc.summary}\n\n` +
      `NỘI DUNG CHI TIẾT:\n${doc.contentDetails}\n\n` +
      `Trích xuất ngày: ${new Date().toLocaleDateString('vi-VN')}.`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.code.replace(/[\/\\]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Filter Box */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Số hiệu / Từ khóa trích yếu
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="VD: 919/QĐ-TTg, bộ tiêu chí..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-600 outline-none transition"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Cơ quan ban hành
            </label>
            <select
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-600 outline-none transition"
            >
              <option value="ALL">Tất cả cơ quan</option>
              <option value="Thủ tướng Chính phủ">Thủ tướng Chính phủ</option>
              <option value="Bộ Nông nghiệp & PTNT">Bộ Nông nghiệp & PTNT</option>
              <option value="UBND Tỉnh">UBND Tỉnh</option>
              <option value="HĐND Tỉnh">HĐND Tỉnh</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Loại văn bản
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-600 outline-none transition"
            >
              <option value="ALL">Tất cả loại văn bản</option>
              <option value="Quyết định">Quyết định</option>
              <option value="Nghị quyết">Nghị quyết (Hỗ trợ kinh phí)</option>
              <option value="Kế hoạch">Kế hoạch triển khai</option>
              <option value="Thông tư">Thông tư hướng dẫn</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Chủ đề chính sách
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-600 outline-none transition"
            >
              <option value="ALL">Tất cả chủ đề</option>
              <option value="Tiêu chí đánh giá">Bộ tiêu chí đánh giá</option>
              <option value="Công nhận sản phẩm">Quyết định công nhận</option>
              <option value="Cơ chế hỗ trợ">Chính sách thưởng & Vốn</option>
              <option value="Đề án giai đoạn">Đề án phát triển OCOP</option>
            </select>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
          <span className="text-gray-500">
            Tìm thấy <strong className="text-green-700 font-bold">{filteredDocs.length}</strong> văn bản quy phạm
          </span>
          <button
            onClick={handleReset}
            className="text-green-700 hover:text-green-900 font-semibold flex items-center cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span>Đặt lại</span>
          </button>
        </div>
      </div>

      {/* Docs Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Số hiệu / Ngày ký</th>
                <th className="py-3 px-4">Cơ quan</th>
                <th className="py-3 px-6">Trích yếu nội dung</th>
                <th className="py-3 px-4">Chủ đề</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-green-50/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-green-800 whitespace-nowrap">
                    <div>{doc.code}</div>
                    <div className="text-[10px] font-normal text-gray-400 mt-0.5">
                      {doc.signDate}
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        doc.issuer.includes('Thủ tướng')
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {doc.issuer}
                    </span>
                  </td>
                  <td className="py-3 px-6 max-w-xs sm:max-w-md">
                    <div className="font-semibold text-gray-900 mb-1 leading-snug">
                      {doc.summary}
                    </div>
                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px]">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-1.5">
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition flex items-center cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1 text-gray-500" />
                        <span>Xem</span>
                      </button>
                      <button
                        onClick={() => downloadDocument(doc)}
                        className="px-2.5 py-1 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-semibold transition flex items-center cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" />
                        <span>Tải về</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doc Detail Modal */}
      {selectedDoc && (
        <div
          onClick={() => setSelectedDoc(null)}
          className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 z-10 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-5 sm:p-7">
              <div className="border-b border-gray-100 pb-3 mb-3 pr-8">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800 inline-block mb-2">
                  {selectedDoc.type}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                  {selectedDoc.summary}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs mb-3">
                <div>
                  <span className="text-gray-400 block text-[10px] font-bold uppercase flex items-center">
                    <FileText className="w-3 h-3 mr-1" /> Số hiệu:
                  </span>
                  <strong className="text-green-800 font-mono mt-0.5 block">
                    {selectedDoc.code}
                  </strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] font-bold uppercase flex items-center">
                    <Calendar className="w-3 h-3 mr-1" /> Ngày ký:
                  </span>
                  <strong className="text-gray-700 mt-0.5 block">
                    {selectedDoc.signDate}
                  </strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] font-bold uppercase flex items-center">
                    <Building className="w-3 h-3 mr-1" /> Cơ quan:
                  </span>
                  <strong className="text-gray-700 mt-0.5 block">
                    {selectedDoc.issuer}
                  </strong>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center">
                  <Scale className="w-3.5 h-3.5 mr-1" /> Trích yếu & nội dung chi tiết:
                </h5>
                <div className="text-xs text-gray-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-gray-200">
                  {selectedDoc.contentDetails}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-[10px] text-gray-400 italic">
                  * Lưu trữ số tại Sở Nông nghiệp & PTNT
                </span>
                <button
                  onClick={() => downloadDocument(selectedDoc)}
                  className="px-3.5 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition flex items-center shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  <span>Tải file văn bản (.txt)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
