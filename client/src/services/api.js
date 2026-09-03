import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
});

/*
  Automatically attach admin JWT
  when admin is logged in.
*/
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "shozenAdminToken"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;