import axios from "axios";

// ✅ Tạo instance Axios chung cho toàn bộ FE
const api = axios.create({
  baseURL: "http://localhost:3001/api", // ← đọc URL BE từ .env
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ (Tùy chọn) Tự động đính token vào header nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
