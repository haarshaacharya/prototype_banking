import axios from "axios";

const api = axios.create({
    baseURL: "https://prototype-banking.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// 🔥 AUTO ATTACH TOKEN
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;