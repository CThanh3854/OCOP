# Cổng Dữ Liệu Số OCOP Địa Phương

Ứng dụng Cổng Thông Tin Số Hóa OCOP Địa Phương được tái cấu trúc hoàn chỉnh sang kiến trúc **React + Vite + TypeScript + Tailwind CSS** với backend **Express** tích hợp **Google Gemini AI**.

## Các tính năng chính

1. **Tra Cứu & Bộ Lọc Sản Phẩm OCOP**:
   - Tìm kiếm từ khóa đa trường (Tên sản phẩm, HTX, mã OCOP).
   - Bộ lọc theo địa bàn (Huyện Tam Đảo, Huyện Lập Thạch, TP. Vĩnh Yên, Huyện Yên Lạc, Huyện Vĩnh Tường).
   - Lọc theo ngành hàng (Thực phẩm & Nông sản, Đồ uống & Trà, Thảo dược & Y dược, Thủ công mỹ nghệ).
   - Lọc theo hạng sao OCOP (3 Sao, 4 Sao, 5 Sao Quốc gia).
   - Sắp xếp linh hoạt (Số sao cao nhất, thấp nhất, Tên A-Z).
   - Thẻ sản phẩm với nhãn sao chuyên nghiệp, thông tin quyết định và cơ sở.

2. **Hồ Sơ Chi Tiết Sản Phẩm & Tem Số QR Xác Thực**:
   - Hiển thị đầy đủ thông tin: Chủ thể sản xuất, đại diện pháp luật, số điện thoại, địa chỉ cơ sở.
   - Các chứng nhận tiêu chuẩn (ISO 22000, VietGAP, HACCP, GMP...).
   - Câu chuyện sản phẩm chi tiết.
   - Tem số QR code tạo động cho việc xác thực nguồn gốc OCOP.

3. **Bản Đồ Số GIS Định Vị Vệ Tinh (Leaflet)**:
   - Tọa độ vệ tinh các vùng nguyên liệu và cơ sở sản xuất trên bản đồ số GIS.
   - Marker phân màu theo phân hạng sao (5 sao vàng gold, 4 sao xanh ngọc lục bảo, 3 sao xanh dương).
   - Popup tương tác trực tiếp với liên kết mở hồ sơ chi tiết.
   - Danh sách cơ sở bên cạnh bản đồ với tính năng bay mượt (`flyTo`) đến vị trí chính xác.
   - Bộ lọc hạng sao ngay trên giao diện bản đồ.

4. **Tra Cứu Văn Bản Pháp Lý & Tải Tài Liệu**:
   - Hệ thống văn bản quy phạm: Quyết định, Nghị quyết cơ chế hỗ trợ, tiêu chí đánh giá OCOP.
   - Bộ lọc theo cơ quan ban hành (Thủ tướng Chính phủ, Bộ Nông nghiệp & PTNT, UBND Tỉnh, HĐND Tỉnh), loại văn bản, chủ đề chính sách.
   - Xem trích yếu và tải file văn bản quy phạm dưới dạng tài liệu lưu trữ chuẩn.

5. **Quy Trình 6 Bước & Nộp Hồ Sơ Trực Tuyến**:
   - Hướng dẫn trực quan chu trình 6 bước đánh giá phân hạng OCOP theo Quyết định 148/QĐ-TTg.
   - Form nộp hồ sơ đăng ký tham gia OCOP trực tuyến hoạt động thực tế.
   - Cấp mã biên nhận tự động (`OCOP-REG-xxxx`) và lưu trữ theo dõi danh sách hồ sơ trong phiên.

6. **Trợ Lý AI OCOP (Tích hợp Google Gemini)**:
   - Cửa sổ chat AI nổi tương tác đa nền tảng với biểu tượng trạng thái sẵn sàng.
   - Tích hợp mô hình `gemini-3.8-flash` qua SDK `@google/genai` với proxy bảo mật server-side `/api/chat`.
   - Cơ chế hồi đáp thông minh, nắm bắt toàn bộ dữ liệu OCOP, mức thưởng chính sách (Nghị quyết 18/2023/NQ-HĐND) và quy trình 6 bước.
   - Bộ câu hỏi nhanh gợi ý cho người dùng.

## Công nghệ sử dụng

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, Leaflet.
- **Backend / Dev Server**: Node.js 22, Express, Vite middleware.
- **AI Engine**: `@google/genai` với mô hình `gemini-3.8-flash` và cơ chế fallback tự động.
- **Build tool**: Vite 6.
