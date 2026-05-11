const axios = require("axios");
const api = axios.create({
  baseURL: process.env.BACKEND_BASE_URL || "http://localhost:3000",
});

const Register = async () => {
  const response = await api.post("/api/register");
  return response.data;
};

module.exports = { Register };
