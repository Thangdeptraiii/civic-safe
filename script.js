const form = document.getElementById("check-form");
const input = document.getElementById("user-input");
const counter = document.getElementById("counter");
const button = document.getElementById("submit-btn");
const buttonLabel = document.getElementById("button-label");
const statusBox = document.getElementById("status");
const resultSection = document.getElementById("result-section");
const resultContent = document.getElementById("result-content");

input.addEventListener("input", () => {
  counter.textContent = `${input.value.length.toLocaleString("vi-VN")}/12.000`;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = input.value.trim();

  if (value.length < 10) {
    showStatus("Vui lòng nhập ít nhất 10 ký tự.", "error");
    return;
  }

  button.disabled = true;
  buttonLabel.textContent = "Đang kiểm chứng...";
  statusBox.className = "status loading";
  statusBox.textContent = "CIVIC SAFE đang phân tích nhận định và tìm căn cứ pháp luật. Vui lòng chờ...";
  resultSection.classList.add("hidden");

  try {
    // Frontend gửi dữ liệu đến backend. Backend giữ API key an toàn
    // và gọi OpenAI API; không đặt API key trong file này.
    const response = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: value })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Không thể xử lý yêu cầu.");

    resultContent.textContent = data.answer;
    resultSection.classList.remove("hidden");
    showStatus("Đã hoàn thành phân tích.", "");
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    showStatus(error.message || "Có lỗi kết nối. Hãy thử lại.", "error");
  } finally {
    button.disabled = false;
    buttonLabel.textContent = "Gửi để kiểm chứng";
  }
});

function showStatus(message, type) {
  statusBox.className = `status ${type}`;
  statusBox.textContent = message;
}
