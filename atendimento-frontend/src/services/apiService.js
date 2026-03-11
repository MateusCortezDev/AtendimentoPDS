import axios from "axios";

// endereço do backend
const API_URL = "https://atendimentopds.onrender.com/api";

export const getHello = async () => {
  const response = await axios.get(`${BASE_URL}/hello`);
  return response.data;
};