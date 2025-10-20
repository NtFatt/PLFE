import axios from "axios";

// ⚙️ Tạo axios instance mặc định
const api = axios.create({
  baseURL: "http://localhost:3000/api", // 👉 đổi URL nếu BE bạn chạy port khác
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // nếu BE có cookie/token
});

// 🧩 Thêm interceptor để tự động chèn token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🧠 Xử lý lỗi chung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Hết hạn đăng nhập, chuyển hướng login...");
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;
