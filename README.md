# CIVIC SAFE – phiên bản một trang (HTML, CSS, JavaScript)

Giao diện chỉ có tiêu đề, một ô nhập liệu, nút gửi và khu vực hiển thị kết quả.

## Chạy trên máy tính
1. Cài Node.js phiên bản LTS từ https://nodejs.org/
2. Giải nén thư mục dự án.
3. Mở Terminal tại thư mục dự án, chạy:
   `npm install`
4. Sao chép `.env.example` thành `.env`.
5. Điền OpenAI API key vào `.env`.
6. Chạy `npm start`.
7. Mở http://localhost:3000

## Lưu ý quan trọng
- `index.html`, `style.css`, `script.js` là giao diện thuần HTML/CSS/JS.
- `server.js` là backend JavaScript tối giản để giữ bí mật API key. Không thể bảo vệ API key nếu gọi OpenAI trực tiếp từ mã JavaScript chạy trong trình duyệt.
- Bản đơn giản này gửi văn bản đến AI. Nếu học sinh nhập URL, AI chưa tự tải nội dung trang; hãy dán nội dung bài viết/video transcript để phân tích.
- Model mặc định trong `.env.example` là `gpt-4.1-mini`. Có thể đổi sang model mà tài khoản API của bạn được cấp quyền.
- API key và việc sử dụng API được tính phí theo tài khoản OpenAI API; ChatGPT Plus/Free không tự động bao gồm API credit.
- Bản này không có cơ sở dữ liệu, đăng nhập hoặc lưu lịch sử.
- Cần kiểm tra căn cứ pháp luật từ nguồn chính thống và nhờ giáo viên/người có chuyên môn xác nhận.
