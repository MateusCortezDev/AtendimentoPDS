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
      await criarChamado(usuarioId, {
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

  // JSX continua igual
}

export default CriarChamado;
