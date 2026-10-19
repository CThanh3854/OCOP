import React, { useState } from 'react';
import { SubmittedApplication } from '../types';
import { DISTRICTS } from '../data/mockData';
import { Send, CheckCircle2, FileCheck, Layers } from 'lucide-react';

interface DossierSubmissionProps {
  applications: SubmittedApplication[];
  onAddApplication: (app: SubmittedApplication) => void;
}

export const DossierSubmission: React.FC<DossierSubmissionProps> = ({
  applications,
  onAddApplication,
}) => {
  const [producer, setProducer] = useState('');
  const [representative, setRepresentative] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('');
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!producer || !representative || !phone || !product) return;

    const receiptCode = 'OCOP-REG-' + Math.floor(1000 + Math.random() * 9000);
    const newApp: SubmittedApplication = {
      id: receiptCode,
      producer: producer.trim(),
      product: product.trim(),
      district,
      representative: representative.trim(),
      phone: phone.trim(),
      status: 'Tiếp nhận thành công (Chờ thẩm định)',
      submittedAt: new Date().toISOString().split('T')[0],
    };

    onAddApplication(newApp);
    setSuccessNotice(`🎉 Đã nộp hồ sơ thành công! Mã biên nhận: ${receiptCode} cho sản phẩm "${product}"`);

    // Reset inputs
    setProducer('');
    setRepresentative('');
    setPhone('');
    setProduct('');
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: 6-Step Guide */}
        <div>
          <span className="text-xs font-bold uppercase text-green-700 tracking-wider flex items-center">
            <FileCheck className="w-4 h-4 mr-1 text-green-700" />
            Theo Quyết định số 148/QĐ-TTg
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-4 mt-1">
            Chu Trình 6 Bước Đánh Giá OCOP
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-green-700 text-white font-bold flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <strong className="text-gray-800 block mb-0.5">
                  Đăng ký ý tưởng sản phẩm OCOP:
                </strong>
                Chủ thể nộp phiếu đăng ký ý tưởng tại UBND cấp xã/phường để được hướng dẫn khởi tạo.
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-green-700 text-white font-bold flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <strong className="text-gray-800 block mb-0.5">
                  Xây dựng phương án sản xuất kinh doanh:
                </strong>
                Hoàn thiện quy trình kỹ thuật, nhãn mác, bao bì, tem số QR truy xuất và hồ sơ kiểm nghiệm ATTP.
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-green-700 text-white font-bold flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <strong className="text-gray-800 block mb-0.5">
                  Đánh giá cấp Huyện (Hạng 3 Sao):
                </strong>
                Hội đồng chấm điểm cấp huyện thẩm định thực tế; UBND cấp huyện cấp Giấy chứng nhận 3 sao.
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-green-700 text-white font-bold flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <strong className="text-gray-800 block mb-0.5">
                  Đánh giá cấp Tỉnh (Hạng 4 Sao):
                </strong>
                Hội đồng cấp tỉnh đánh giá sản phẩm đạt 4 sao và hoàn tất hồ sơ thi nâng hạng 5 sao lên Trung ương.
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-green-700 text-white font-bold flex items-center justify-center shrink-0">
                5
              </div>
              <div>
                <strong className="text-gray-800 block mb-0.5">
                  Đánh giá cấp Quốc gia (Hạng 5 Sao):
                </strong>
                Bộ Nông nghiệp & PTNT chủ trì thẩm định chuyên sâu, trình Thủ tướng Chính phủ công nhận 5 sao.
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-green-700 text-white font-bold flex items-center justify-center shrink-0">
                6
              </div>
              <div>
                <strong className="text-gray-800 block mb-0.5">
                  Xúc tiến thương mại & Duy trì tiêu chuẩn:
                </strong>
                Đưa sản phẩm lên sàn thương mại điện tử, xúc tiến thị trường quốc tế (thời hạn 36 tháng).
              </div>
            </div>
          </div>
        </div>

        {/* Right: Registration Form & Submitted Dossiers */}
        <div className="bg-gray-50 p-5 sm:p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-gray-900 mb-1 flex items-center">
              <Layers className="w-4 h-4 mr-1.5 text-green-700" />
              Đăng Ký Hồ Sơ Tham Gia OCOP Trực Tuyến
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              Hệ thống cấp mã biên nhận tự động ngay sau khi hoàn tất gửi hồ sơ điện tử.
            </p>

            {successNotice && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="leading-snug">{successNotice}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Tên Hợp tác xã / Cơ sở sản xuất (*)
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Hợp tác xã Nông nghiệp Bình Minh..."
                  value={producer}
                  onChange={(e) => setProducer(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Người đại diện (*)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Họ và tên"
                    value={representative}
                    onChange={(e) => setRepresentative(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Số điện thoại (*)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="09xx.xxx.xxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Sản phẩm đăng ký (*)
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Rượu gạo hoa cúc lên men tự nhiên..."
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Địa bàn Huyện / Thị xã (*)
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition"
                >
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl transition shadow-xs mt-2 flex items-center justify-center cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                <span>Gửi Hồ Sơ & Nhận Mã Biên Nhận</span>
              </button>
            </form>
          </div>

          {/* Dossiers List */}
          <div className="mt-5 pt-4 border-t border-gray-200">
            <span className="text-[11px] font-bold text-gray-600 block mb-2">
              Hồ sơ đã nộp trong phiên làm việc ({applications.length}):
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {applications.length === 0 ? (
                <div className="text-gray-400 text-[11px] italic">
                  Chưa có hồ sơ nào được gửi.
                </div>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white p-2.5 rounded-lg border border-gray-200 text-[11px] flex items-center justify-between"
                  >
                    <div className="truncate mr-2">
                      <span className="font-mono font-bold text-green-800">
                        {app.id}
                      </span>{' '}
                      - <strong className="text-gray-800">{app.product}</strong>
                      <span className="text-gray-500 block text-[10px] truncate">
                        {app.producer} ({app.district})
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-yellow-50 text-yellow-800 font-semibold rounded text-[10px] whitespace-nowrap border border-yellow-200 shrink-0">
                      {app.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
