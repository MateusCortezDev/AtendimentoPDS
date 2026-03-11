import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../services/apiService";

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
      // Usando proxy: não precisa http://localhost:8080
      await axios.post(`${API_URL}/usuarios/cadastro`, {
        nome, email, senha, setor, perfil
      });


      alert("Usuário cadastrado com sucesso!");
      onCadastro(); // volta para tela de login
    } catch (err) {
      console.error(err);
      setError("Erro ao cadastrar usuário!");
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
      display: "flex", justifyContent: "center", alignItems: "center",
      height: "100vh", backgroundColor: "#f4f6f8"
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: "white", padding: "30px", borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)", width: "300px"
      }}>
        <h2 style={{ color: "#1976d2", textAlign: "center" }}>Cadastro</h2>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} style={inputStyle} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} style={inputStyle} />
        <select value={setor} onChange={e => setSetor(e.target.value)} style={inputStyle}>
          <option value="">Selecione o setor</option>
          <option value="TI">TI</option>
          <option value="RH">RH</option>
          <option value="Financeiro">Financeiro</option>
        </select>
        <select value={perfil} onChange={e => setPerfil(e.target.value)} style={inputStyle}>
          <option value="">Selecione o perfil</option>
          <option value="COLABORADOR">Colaborador</option>
          <option value="ATENDENTE">Atendente</option>
        </select>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button type="submit" style={{ ...buttonStyle, backgroundColor: "#1976d2" }}>Cadastrar</button>
          <button type="button" onClick={onCadastro} style={{ ...buttonStyle, backgroundColor: "#f44336" }}>Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastroUsuario;
