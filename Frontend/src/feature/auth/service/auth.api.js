import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const loginApi = async (username, password) => {
  const response = await api.post("/api/auth/login", {
    username,
    password,
  });
  return response.data;
};

export const RegisterApi = async (username, email, password) => {
  const response = await api.post("/api/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const logoutApi = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};
