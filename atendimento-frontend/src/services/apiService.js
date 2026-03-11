import axios from "axios";

// endereço do backend
export const API_URL = "https://atendimentopds.onrender.com/api";

// exemplo simples
export const getHello = async () => {
  const response = await axios.get(`${API_URL}/hello`);
  return response.data;
};

// login
export const loginUsuario = async (email, senha) => {
  const response = await axios.post(`${API_URL}/usuarios/login`, { email, senha });
  return response.data;
};

// cadastro de usuário
export const cadastrarUsuario = async (dados) => {
  const response = await axios.post(`${API_URL}/usuarios/cadastro`, dados);
  return response.data;
};

// criar chamado
export const criarChamado = async (usuarioId, dados) => {
  const response = await axios.post(`${API_URL}/chamados/${usuarioId}`, dados);
  return response.data;
};

// métricas
export const getMetricas = async () => {
  const response = await axios.get(`${API_URL}/chamados/metricas`);
  return response.data;
};

// listar chamados
export const listarChamadosAtendente = async () => {
  const response = await axios.get(`${API_URL}/chamados/atendente`);
  return response.data;
};

export const listarChamadosColaborador = async (usuarioId) => {
  const response = await axios.get(`${API_URL}/chamados/colaborador/${usuarioId}`);
  return response.data;
};

// abrir chamado (comentários)
export const abrirChamado = async (id) => {
  const response = await axios.get(`${API_URL}/chamados/${id}/comentarios`);
  return response.data;
};

// adicionar comentário
export const adicionarComentario = async (id, usuarioId, texto) => {
  return axios.post(`${API_URL}/chamados/${id}/comentarios`, {
    texto,
    autor: { id: usuarioId }
  });
};

// concluir chamado
export const concluirChamado = async (id) => {
  return axios.put(`${API_URL}/chamados/${id}/concluir`);
};

// excluir chamado
export const excluirChamado = async (id) => {
  return axios.delete(`${API_URL}/chamados/${id}`);
};
