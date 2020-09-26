import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("@auth:token");
    config.headers["x-auth-token"] = token;
    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default api;
