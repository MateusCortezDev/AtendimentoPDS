import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../services/apiService";

function CriarChamado({ usuarioId }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [setor, setSetor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !descricao || !setor) {
      setError("Preencha todos os campos antes de criar o chamado.");
      return;
    }

    try {
      await axios.post(`${API_URL}/chamados/${usuarioId}`, {
        titulo,
        descricao,
        setor,
        status: "ABERTO"
      });
      alert("Chamado criado com sucesso!");
      setTitulo("");
      setDescricao("");
      setSetor("");
      setError("");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar chamado");
    }
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer"
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <h2 style={{ marginBottom: "10px", color: "#1976d2" }}>Abrir Chamado</h2>

      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        style={inputStyle}
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        style={{ ...inputStyle, minHeight: "80px" }}
      />

      <select
        value={setor}
        onChange={(e) => setSetor(e.target.value)}
        style={inputStyle}
      >
        <option value="">Selecione o setor</option>
        <option value="TI">TI</option>
        <option value="RH">RH</option>
        <option value="Financeiro">Financeiro</option>
      </select>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" style={buttonStyle}>
          Criar Chamado
        </button>
      </div>
    </form>
  );
}

export default CriarChamado;
