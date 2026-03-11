import React, { useState } from "react";
import { cadastrarUsuario } from "./services/apiService";

function CadastroUsuario({ onCadastro }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [setor, setSetor] = useState("");
  const [perfil, setPerfil] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha || !setor || !perfil) {
      setError("Preencha todos os campos!");
      return;
    }

    try {
      await cadastrarUsuario({ nome, email, senha, setor, perfil });
      alert("Usuário cadastrado com sucesso!");
      onCadastro(); // volta para tela de login
    } catch (err) {
      console.error(err);
      setError("Erro ao cadastrar usuário!");
    }
  };

  // estilos e JSX continuam iguais
}

export default CadastroUsuario;
