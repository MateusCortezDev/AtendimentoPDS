import React, { useState } from "react";
import { criarChamado } from "./services/apiService";

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
      await criarChamado(usuarioId, { titulo, descricao, setor, status: "ABERTO" });
      alert("Chamado criado com sucesso!");
      setTitulo(""); setDescricao(""); setSetor(""); setError("");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar chamado");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <textarea placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
      <select value={setor} onChange={e => setSetor(e.target.value)}>
        <option value="">Selecione o setor</option>
        <option value="TI">TI</option>
        <option value="RH">RH</option>
        <option value="Financeiro">Financeiro</option>
      </select>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Criar Chamado</button>
    </form>
  );
}

export default CriarChamado;
