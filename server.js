// Backend JavaScript tối giản để giữ OpenAI API key ở phía máy chủ.
// Giao diện vẫn chỉ dùng HTML, CSS và JavaScript thuần.
require("dotenv").config();
const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json({ limit: "30kb" }));
app.use(express.static("public"));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/check", async (req, res) => {
  try {
    const input = String(req.body?.input || "").trim();
    if (input.length < 10) return res.status(400).json({ error: "Nội dung quá ngắn." });
    if (input.length > 12000) return res.status(400).json({ error: "Nội dung vượt quá 12.000 ký tự." });
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Máy chủ chưa được cấu hình OpenAI API Key." });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `Bạn là CIVIC SAFE, trợ lý giáo dục pháp luật Việt Nam dành cho học sinh và giáo viên THPT.
Hãy hỗ trợ kiểm chứng thông tin thuộc các lĩnh vực hình sự, hành chính, dân sự, an toàn mạng và giao thông.
Trả lời bằng tiếng Việt, rõ ràng, dễ hiểu và có cấu trúc:
1. Tóm tắt nội dung cần kiểm chứng.
2. Tách các nhận định pháp lý cần xác minh.
3. Phân tích từng nhận định: lĩnh vực pháp luật, đánh giá (có căn cứ / thiếu căn cứ / có dấu hiệu sai lệch / chưa đủ dữ liệu), giải thích và căn cứ pháp lý nếu biết chắc.
4. Nêu tên văn bản, điều khoản và đường dẫn nguồn chính thức chỉ khi có thể xác định đáng tin cậy. Tuyệt đối không bịa số điều, khoản, văn bản hoặc URL.
5. Nêu thông tin còn thiếu và giới hạn của kết quả.
6. Đưa ra 3 câu hỏi phản biện phù hợp để giáo viên sử dụng trong lớp.
7. Kết luận thận trọng.
Nếu đầu vào là URL, bạn không thể tự mở/truy cập nội dung trang trong phiên bản đơn giản này; hãy nói rõ và đề nghị người dùng dán nội dung bài viết. Không khẳng định đã tra cứu văn bản hiện hành nếu chưa thực sự có dữ liệu nguồn.
Không đưa ra kết luận pháp lý chắc chắn khi thiếu căn cứ. Nhấn mạnh AI chỉ hỗ trợ học tập và cần giáo viên/người có chuyên môn xác nhận.`
        },
        { role: "user", content: input }
      ],
      temperature: 0.2
    });

    const answer = response.choices[0]?.message?.content || "AI chưa tạo được câu trả lời.";
    res.json({ answer });
  } catch (error) {
    console.error("OpenAI request failed:", error);
    res.status(500).json({ error: "Không gọi được AI. Kiểm tra API key, model và hạn mức API." });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`CIVIC SAFE đang chạy tại http://localhost:${port}`));
