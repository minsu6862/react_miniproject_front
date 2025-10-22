import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8889",
  withCredentials: true, // 세션 쿠키 전송
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터: 401 에러 시 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 세션이 만료되었거나 로그인이 필요한 경우
      localStorage.removeItem("username");
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        alert("로그인이 필요합니다.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
