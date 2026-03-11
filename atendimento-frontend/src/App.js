import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import CadastroUsuario from "./CadastroUsuario";
import CriarChamado from "./CriarChamado";
import ListarChamados from "./ListarChamados";
import Dashboard from "./Dashboard";

function App() {

  const [usuario, setUsuario] = useState(null);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  // 🔹 Carregar usuário salvo ao abrir o site
  useEffect(() => {

    const usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }

  }, []);

  // 🔹 Sempre que usuario mudar, salvar no navegador
  useEffect(() => {

    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    }

  }, [usuario]);

  // 🔹 botão sair
  const sair = () => {

    localStorage.removeItem("usuario");
    setUsuario(null);

  };

  if (!usuario) {

    if (mostrarCadastro) {
      return <CadastroUsuario onCadastro={() => setMostrarCadastro(false)} />;
    }

    return (
      <Login
        onLogin={setUsuario}
        onCadastroClick={() => setMostrarCadastro(true)}
      />
    );

  }

  const isAtendente = usuario.perfil === "ATENDENTE";

  return (

    <div style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
      padding: "20px"
    }}>

      <header style={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "15px",
        borderRadius: "5px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>

        <div>
          <h1>Sistema de Atendimento</h1>
          <p>Bem-vindo, {usuario.nome} ({usuario.perfil})</p>
        </div>

        <button
          onClick={sair}
          style={{
            backgroundColor: "#e53935",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Sair
        </button>

      </header>

      <main style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap"
      }}>

        {usuario.perfil === "COLABORADOR" && (

          <div style={{
            flex: "1",
            minWidth: "300px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <CriarChamado usuarioId={usuario.id} />
          </div>

        )}

        <div style={{
          flex: "2",
          minWidth: "300px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}>
          <ListarChamados
            isAtendente={isAtendente}
            usuarioId={usuario.id}
          />
        </div>

        {isAtendente && (

          <div style={{
            flex: "1",
            minWidth: "300px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <Dashboard />
          </div>

        )}

      </main>

    </div>

  );
}

export default App;