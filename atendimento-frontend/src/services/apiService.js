import axios from "axios";

// endereço do backend
const BASE_URL = "http://localhost:8080/api";

export const getHello = async () => {
  const response = await axios.get(`${BASE_URL}/hello`);
  return response.data;
};