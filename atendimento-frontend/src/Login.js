import React, { useState } from "react";
import { loginUsuario } from "../services/apiService";

function Login({ onLogin, onCadastroClick }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setError("Preencha todos os campos!");
      return;
    }

    try {
      const usuario = await loginUsuario(email, senha);

      if (usuario) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
        onLogin(usuario);
      } else {
        setError("Usuário ou senha inválidos!");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Erro ao tentar logar!");
    }
  };

  // estilos e JSX continuam iguais
}

export default Login;
