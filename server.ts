import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const host = '0.0.0.0';

app.use(cors());
app.use(express.json());

// Knowledge base summary for grounding Gemini AI
const OCOP_KNOWLEDGE_CONTEXT = `
Bạn là Trợ lý AI Cổng Thông tin & Dữ liệu Số OCOP Địa phương (Sở Nông nghiệp & PTNT).
Nhiệm vụ: Trả lời công dân, hợp tác xã, doanh nghiệp về các sản phẩm OCOP, chính sách hỗ trợ kinh phí, bản đồ số GIS và quy trình nộp hồ sơ.

Dữ liệu sản phẩm OCOP tiêu biểu:
1. Trà Hoa Vàng Tam Đảo Thượng Hạng: 5 Sao Quốc gia. Chủ thể: Hợp tác xã Dược liệu Tam Đảo. Đ/c: Thị trấn Tam Đảo, Huyện Tam Đảo. ĐT: 0912.345.678. Tiêu chuẩn: ISO 22000:2018, VietGAP.
2. Mật Ong Rừng Hoa Rừng Tam Đảo: 4 Sao Cấp tỉnh. Chủ thể: Công ty TNHH Ong Tam Đảo. Đ/c: Xã Minh Quang, Huyện Tam Đảo. ĐT: 0988.765.432. Tiêu chuẩn: HACCP, ATVSTP.
3. Đông Trùng Hạ Thảo Khô Sấy Thăng Hoa: 4 Sao Cấp tỉnh. Chủ thể: HTX Nấm & Thảo dược Công nghệ cao. Đ/c: TP. Vĩnh Yên. ĐT: 0903.112.233. Tiêu chuẩn: GMP, ISO 9001:2015.
4. Gốm Hương Canh Men Tro Truyền Thống: 4 Sao Cấp tỉnh. Chủ thể: Hợp tác xã Gốm Mỹ Nghệ Dân Gian. Đ/c: Làng nghề Hương Canh, Huyện Vĩnh Tường. ĐT: 0915.223.344.
5. Gạo Nếp Nương Yên Lạc Hạt Dài: 3 Sao Cấp huyện. Chủ thể: Hợp tác xã Nông nghiệp Yên Lạc. Đ/c: Xã Đồng Cương, Huyện Yên Lạc. ĐT: 0918.552.119.

Chính sách hỗ trợ theo Nghị quyết số 18/2023/NQ-HĐND:
- Thưởng nóng: 50.000.000 đồng/sản phẩm mới đạt 3 sao; 80.000.000 đồng/sản phẩm đạt 4 sao.
- Hỗ trợ thiết kế bao bì, nhãn mác: 100% chi phí, tối đa 30.000.000 đồng/sản phẩm.
- Hỗ trợ máy móc trang thiết bị chế biến: tối đa 300.000.000 đồng/hợp tác xã.

Quy trình đánh giá 6 bước theo Quyết định số 148/QĐ-TTg của Thủ tướng Chính phủ:
Bước 1: Đăng ký ý tưởng sản phẩm tại UBND cấp Xã.
Bước 2: Xây dựng phương án sản xuất kinh doanh, nhãn mác, tem truy xuất QR, kiểm nghiệm VSATTP.
Bước 3: Đánh giá phân hạng cấp Huyện (UBND huyện cấp chứng nhận 3 sao).
Bước 4: Đánh giá phân hạng cấp Tỉnh (UBND tỉnh cấp chứng nhận 4 sao và đề xuất 5 sao).
Bước 5: Đánh giá phân hạng cấp Quốc gia (Bộ Nông nghiệp & PTNT chủ trì, Thủ tướng Chính phủ công nhận 5 sao).
Bước 6: Xúc tiến thương mại, thương mại điện tử và kiểm soát chất lượng định kỳ (hiệu lực giấy chứng nhận 36 tháng).

Hồ sơ online: Có thể đăng ký trực tuyến ngay trên Cổng thông tin tại tab "Quy Trình & Nộp Hồ Sơ".
`;

// Helper fallback function in case Gemini API key is missing or quota/network fails
function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('5 sao') || q.includes('năm sao') || q.includes('tam đảo')) {
    return `Hiện tại địa phương có **Trà Hoa Vàng Tam Đảo Thượng Hạng** đạt chuẩn **5 Sao OCOP Quốc gia** do Hợp tác xã Dược liệu Tam Đảo sản xuất. Ngoài ra tại Tam Đảo còn có **Mật Ong Rừng Hoa Rừng Tam Đảo** (4 Sao). Quý vị có thể xem vị trí cụ thể trên **Bản Đồ Số GIS**!`;
  }

  if (q.includes('thưởng') || q.includes('kinh phí') || q.includes('hỗ trợ') || q.includes('tiền')) {
    return `Theo **Nghị quyết số 18/2023/NQ-HĐND** của HĐND Tỉnh:\n• 💰 **Thưởng 50 triệu đồng** cho mỗi sản phẩm mới đạt chuẩn OCOP 3 sao.\n• 💰 **Thưởng 80 triệu đồng** cho sản phẩm đạt OCOP 4 sao.\n• 📦 **Hỗ trợ 100% chi phí thiết kế bao bì, tem nhãn** (tối đa 30 triệu đồng/sản phẩm).\n• ⚙️ **Hỗ trợ máy móc, thiết bị tiên tiến** tối đa 300 triệu đồng/HTX.`;
  }

  if (q.includes('đăng ký') || q.includes('quy trình') || q.includes('thủ tục') || q.includes('hồ sơ') || q.includes('bước')) {
    return `Chu trình đánh giá OCOP gồm **6 bước** theo Quyết định 148/QĐ-TTg của Thủ tướng Chính phủ:\n1. Nộp phiếu đăng ký ý tưởng sản phẩm tại UBND cấp xã.\n2. Lập phương án kinh doanh, chuẩn hóa bao bì tem nhãn và kiểm nghiệm ATTP.\n3. Hội đồng cấp Huyện đánh giá chấm điểm (công nhận 3 sao).\n4. Hội đồng cấp Tỉnh đánh giá (công nhận 4 sao).\n5. Bộ Nông nghiệp & PTNT thẩm định trình Thủ tướng công nhận 5 sao.\n👉 Bạn có thể chuyển sang tab **"Quy Trình & Nộp Hồ Sơ"** để nộp hồ sơ trực tuyến và nhận mã biên nhận ngay!`;
  }

  if (q.includes('liên hệ') || q.includes('hotline') || q.includes('sở')) {
    return `Cơ quan thường trực Chương trình OCOP tỉnh:\n• **Chi cục Phát triển Nông thôn** (Sở Nông nghiệp & PTNT)\n• **Hotline:** (0211) 3868 999\n• **Email tiếp nhận:** ocop@diaphuong.gov.vn`;
  }

  return `Hệ thống Cổng Dữ Liệu Số OCOP hiện quản lý các sản phẩm OCOP 3 sao, 4 sao và 5 sao cùng toàn bộ hệ thống văn bản pháp lý. Quý vị có thể tra cứu chi tiết tại danh mục sản phẩm, xem tọa độ trên Bản đồ số GIS hoặc đặt câu hỏi cụ thể hơn về các cơ chế hỗ trợ!`;
}

// API Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `${OCOP_KNOWLEDGE_CONTEXT}\n\nNgười dân/HTX hỏi: "${message}"\nHãy trả lời bằng tiếng Việt thân thiện, rõ ràng, chính xác, định dạng súc tích kèm emoji phù hợp.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt
        });

        const reply = response.text;
        if (reply) {
          res.json({ reply });
          return;
        }
      } catch (geminiError) {
        console.warn('Gemini API request failed, falling back to local rule-based response:', geminiError);
      }
    }

    // Fallback response
    const fallbackReply = getLocalFallbackResponse(message);
    res.json({ reply: fallbackReply });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ reply: 'Đã có lỗi xảy ra khi xử lý phản hồi. Vui lòng thử lại sau.' });
  }
});

// Setup dev server with Vite or static serving in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
  });
}

startServer();
