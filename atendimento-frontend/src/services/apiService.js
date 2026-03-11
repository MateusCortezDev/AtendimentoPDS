import axios from "axios";

export const API_URL = "https://atendimentopds.onrender.com/api";

export const getHello = async () => {
  const response = await axios.get(`${API_URL}/hello`);
  return response.data;
};

// endereço do backend
