import React, { useState } from "react";
import axios from "axios";

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

      const response = await axios.post(
        "http://localhost:8080/api/usuarios/login",
        {
          email: email,
          senha: senha
        }
      );

      const usuario = response.data;

      if (usuario) {

        // salva no navegador (para não deslogar no F5)
        localStorage.setItem("usuario", JSON.stringify(usuario));

        // envia para o App.js
        onLogin(usuario);

      } else {

        setError("Usuário ou senha inválidos!");

      }

    } catch (err) {

      console.error("Erro no login:", err);

      setError("Erro ao tentar logar!");

    }

  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    color: "white"
  };

  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f6f8"
    }}>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          width: "300px"
        }}
      >

        <h2 style={{ color: "#1976d2", textAlign: "center" }}>
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={inputStyle}
        />

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            {error}
          </p>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

          <button
            type="submit"
            style={{ ...buttonStyle, backgroundColor: "#1976d2" }}
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={onCadastroClick}
            style={{ ...buttonStyle, backgroundColor: "#4caf50" }}
          >
            Cadastrar
          </button>

        </div>

      </form>

    </div>

  );
}

export default Login;