import { Product, LegalDoc, SubmittedApplication } from '../types';

export const FALLBACK_IMG = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';

export const DISTRICTS = [
  'Huyện Tam Đảo',
  'Huyện Lập Thạch',
  'Thành phố Vĩnh Yên',
  'Huyện Yên Lạc',
  'Huyện Vĩnh Tường'
];

export const CATEGORIES = [
  { value: 'Thực phẩm', label: 'Thực phẩm & Nông sản' },
  { value: 'Đồ uống', label: 'Đồ uống & Trà' },
  { value: 'Thảo dược', label: 'Thảo dược & Y dược' },
  { value: 'Thủ công', label: 'Thủ công mỹ nghệ' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'OCOP-001',
    name: 'Trà Hoa Vàng Tam Đảo Thượng Hạng',
    category: 'Đồ uống',
    stars: 5,
    lat: 21.4582,
    lng: 105.6456,
    decisionNumber: 'QĐ 1428/QĐ-UBND',
    validUntil: '2027-11-20',
    district: 'Huyện Tam Đảo',
    producer: 'Hợp tác xã Dược liệu Tam Đảo',
    representative: 'Nguyễn Văn Hùng',
    phone: '0912.345.678',
    address: 'Thị trấn Tam Đảo, Huyện Tam Đảo',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    story: 'Trà hoa vàng được trồng trên vùng núi cao Tam Đảo, thu hái thủ công và sấy thăng hoa giữ trọn 100% hoạt chất sinh học quý, đạt chứng nhận OCOP 5 sao Quốc gia.',
    standards: ['ISO 22000:2018', 'VietGAP Dược liệu']
  },
  {
    id: 'OCOP-002',
    name: 'Mật Ong Rừng Hoa Rừng Tam Đảo',
    category: 'Thực phẩm',
    stars: 4,
    lat: 21.4120,
    lng: 105.6120,
    decisionNumber: 'QĐ 852/QĐ-UBND',
    validUntil: '2026-08-15',
    district: 'Huyện Tam Đảo',
    producer: 'Công ty TNHH Ong Tam Đảo',
    representative: 'Trần Thị Lan',
    phone: '0988.765.432',
    address: 'Xã Minh Quang, Huyện Tam Đảo',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    story: 'Mật ong tự nhiên thu hoạch từ cánh rừng nguyên sinh chân núi Tam Đảo. Hạ thủy phần chân không đảm bảo tiêu chuẩn xuất khẩu.',
    standards: ['HACCP', 'An toàn VSTP']
  },
  {
    id: 'OCOP-003',
    name: 'Đông Trùng Hạ Thảo Khô Sấy Thăng Hoa',
    category: 'Thảo dược',
    stars: 4,
    lat: 21.3128,
    lng: 105.6040,
    decisionNumber: 'QĐ 990/QĐ-UBND',
    validUntil: '2027-03-10',
    district: 'Thành phố Vĩnh Yên',
    producer: 'HTX Nấm & Thảo dược Công nghệ cao',
    representative: 'Lê Hoàng Quân',
    phone: '0903.112.233',
    address: 'Khu Đô thị Hà Tiên, TP. Vĩnh Yên',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    story: 'Nuôi cấy trong phòng sạch khép kín, hoạt chất Adenosine và Cordycepin đạt chứng nhận dược liệu loại 1.',
    standards: ['GMP', 'ISO 9001:2015']
  },
  {
    id: 'OCOP-004',
    name: 'Gốm Hương Canh Men Tro Truyền Thống',
    category: 'Thủ công',
    stars: 4,
    lat: 21.2840,
    lng: 105.6320,
    decisionNumber: 'QĐ 640/QĐ-UBND',
    validUntil: '2027-06-30',
    district: 'Huyện Vĩnh Tường',
    producer: 'Hợp tác xã Gốm Mỹ Nghệ Dân Gian',
    representative: 'Nghệ nhân Giang Thị Hạnh',
    phone: '0915.223.344',
    address: 'Làng nghề Gốm cổ Hương Canh',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
    story: 'Sản phẩm đất sét đặc thù chống thấm nước không cần tráng men hóa chất, lưu giữ tinh hoa 300 năm làng nghề.',
    standards: ['Làng nghề truyền thống']
  },
  {
    id: 'OCOP-005',
    name: 'Gạo Nếp Nương Yên Lạc Hạt Dài',
    category: 'Thực phẩm',
    stars: 3,
    lat: 21.2210,
    lng: 105.5890,
    decisionNumber: 'QĐ 515/QĐ-UBND',
    validUntil: '2027-01-10',
    district: 'Huyện Yên Lạc',
    producer: 'Hợp tác xã Nông nghiệp Yên Lạc',
    representative: 'Đỗ Văn Toàn',
    phone: '0918.552.119',
    address: 'Xã Đồng Cương, Huyện Yên Lạc',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    story: 'Canh tác hữu cơ vùng phù sa sông Hồng, hạt gạo dẻo thơm tự nhiên.',
    standards: ['VietGAP Trồng trọt']
  }
];

export const INITIAL_LEGAL_DOCS: LegalDoc[] = [
  {
    id: 'DOC-01',
    code: '919/QĐ-TTg',
    issuer: 'Thủ tướng Chính phủ',
    signDate: '2022-08-01',
    type: 'Quyết định',
    category: 'Đề án giai đoạn',
    summary: 'Phê duyệt Chương trình Mỗi xã một sản phẩm (OCOP) giai đoạn 2021 - 2025 trên toàn quốc.',
    contentDetails: 'Mục tiêu trọng tâm: đến năm 2025 đạt ít nhất 10.000 sản phẩm OCOP từ 3 sao trở lên; nâng cao năng lực cho các HTX nông nghiệp và xây dựng chuỗi giá trị tiêu thụ.',
    fileType: 'PDF'
  },
  {
    id: 'DOC-02',
    code: '148/QĐ-TTg',
    issuer: 'Thủ tướng Chính phủ',
    signDate: '2023-02-24',
    type: 'Quyết định',
    category: 'Tiêu chí đánh giá',
    summary: 'Ban hành Bộ tiêu chí và quy trình đánh giá, phân hạng sản phẩm Chương trình Mỗi xã một sản phẩm.',
    contentDetails: 'Ban hành bộ thang điểm 100 mới nhất. Phân cấp thẩm quyền: Huyện thẩm định 3 sao, Tỉnh thẩm định 4 sao và Bộ Nông nghiệp thẩm định công nhận 5 sao.',
    fileType: 'PDF'
  },
  {
    id: 'DOC-03',
    code: '18/2023/NQ-HĐND',
    issuer: 'HĐND Tỉnh',
    signDate: '2023-07-20',
    type: 'Nghị quyết',
    category: 'Cơ chế hỗ trợ',
    summary: 'Quy định chính sách hỗ trợ phát triển sản phẩm OCOP: Thưởng 50 triệu cho 3 sao, 80 triệu cho 4 sao.',
    contentDetails: 'Thưởng nóng 50 triệu đồng cho sản phẩm mới đạt 3 sao; 80 triệu đồng cho sản phẩm 4 sao; hỗ trợ thiết kế bao bì tối đa 30 triệu/sản phẩm; hỗ trợ máy móc chế biến tối đa 300 triệu/HTX.',
    fileType: 'PDF'
  },
  {
    id: 'DOC-04',
    code: '1428/QĐ-UBND',
    issuer: 'UBND Tỉnh',
    signDate: '2024-11-20',
    type: 'Quyết định',
    category: 'Công nhận sản phẩm',
    summary: 'Phê duyệt kết quả đánh giá, phân hạng và cấp Giấy chứng nhận sản phẩm OCOP tỉnh đợt 2 năm 2024.',
    contentDetails: 'Công nhận danh sách các sản phẩm OCOP mới đạt tiêu chuẩn 3 sao và 4 sao. Giấy chứng nhận có giá trị 36 tháng kể từ ngày ký.',
    fileType: 'PDF'
  }
];

export const INITIAL_SUBMITTED_APPS: SubmittedApplication[] = [
  {
    id: 'OCOP-REG-8492',
    producer: 'HTX Nấm Sạch Tam Đảo',
    product: 'Nấm Sò Tươi',
    district: 'Huyện Tam Đảo',
    representative: 'Nguyễn Văn Minh',
    phone: '0981.234.567',
    status: 'Đang thụ lý hồ sơ',
    submittedAt: '2026-03-15'
  }
];
