import axios from "axios";

export const getHello = async () => {
  const response = await axios.get(`${BASE_URL}/hello`);
  return response.data;
};

// endereço do backend
export const API_URL = "https://atendimentopds.onrender.com/api";