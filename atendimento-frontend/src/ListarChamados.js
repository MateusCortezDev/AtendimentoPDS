import React, { useEffect, useState, useCallback } from "react";
import "./Chamados.css";
import { API_URL } from "../services/apiService";
import axios from "axios";

function ListarChamados({ isAtendente, usuarioId }) {

  const [chamados, setChamados] = useState([]);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
  const [novoComentario, setNovoComentario] = useState("");

  const carregarChamados = useCallback(async () => {

    try {

      let response;

      if (isAtendente) {
        response = await axios.get(`${API_URL}/chamados/atendente`);
      } else {
        response = await axios.get(
          `${API_URL}/chamados/colaborador/${usuarioId}`
        );
      }

      let data = response.data;

      if (data.content) data = data.content;

      if (!Array.isArray(data)) data = [data];

      setChamados(data);

    } catch (err) {
      console.error("Erro ao buscar chamados:", err);
      setChamados([]);
    }

  }, [isAtendente, usuarioId]);

  useEffect(() => {
    carregarChamados();
  }, [carregarChamados]);

  const abrirChamado = async (chamado) => {

    try {

      const response = await axios.get(
        `${API_URL}/chamados/${chamado.id}/comentarios`
      );

      let comentarios = response.data;

      if (!Array.isArray(comentarios)) comentarios = [comentarios];

      setChamadoSelecionado({
        ...chamado,
        comentarios
      });

    } catch (err) {

      console.error("Erro ao carregar comentários:", err);

      setChamadoSelecionado({
        ...chamado,
        comentarios: []
      });

    }

  };

  const adicionarComentario = async () => {

    if (!novoComentario.trim()) return;

    try {

      await axios.post(
        `${API_URL}/chamados/${chamadoSelecionado.id}/comentarios`,
        {
          texto: novoComentario,
          autor: { id: usuarioId }
        }
      );

      setNovoComentario("");

      abrirChamado(chamadoSelecionado);

    } catch (err) {
      console.error("Erro ao adicionar comentário:", err);
    }

  };

  const concluirChamado = async () => {

    try {

      await axios.put(
        `${API_URL}/chamados/${chamadoSelecionado.id}/concluir`
      );

      alert("Chamado concluído!");

      setChamadoSelecionado(null);

      carregarChamados();

    } catch (err) {
      console.error("Erro ao concluir chamado:", err);
    }

  };

  const excluirChamado = async () => {

    if (!window.confirm("Tem certeza que deseja excluir este chamado?")) return;

    try {

      await axios.delete(
        `${API_URL}/chamados/${chamadoSelecionado.id}`
      );

      alert("Chamado excluído!");

      setChamadoSelecionado(null);

      carregarChamados();

    } catch (err) {
      console.error("Erro ao excluir chamado:", err);
    }

  };

  return (

    <div className="container-chamados">

      <h2>{isAtendente ? "Todos os Chamados" : "Meus Chamados"}</h2>

      <table className="tabela-chamados">

        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Setor</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {chamados.length > 0 ? (

            chamados.map((c) => (
              <tr
                key={c.id}
                className="linha-chamado"
                onClick={() => abrirChamado(c)}
              >
                <td>{c.id}</td>
                <td>{c.titulo}</td>
                <td>{c.setor}</td>
                <td className={`status ${c.status?.toLowerCase()}`}>
                  {c.status}
                </td>
              </tr>
            ))

          ) : (

            <tr>
              <td colSpan="4" className="sem-chamado">
                Nenhum chamado encontrado
              </td>
            </tr>

          )}

        </tbody>

      </table>

      {chamadoSelecionado && (

        <div className="detalhe-chamado">

          <h3>{chamadoSelecionado.titulo}</h3>

          <p>
            <strong>Descrição:</strong> {chamadoSelecionado.descricao}
          </p>

          <h4>Comentários</h4>

          <ul className="lista-comentarios">

            {chamadoSelecionado.comentarios &&
            chamadoSelecionado.comentarios.length > 0 ? (

              chamadoSelecionado.comentarios.map((com) => (

                <li key={com.id} className="comentario-item">

                  {com.texto}

                  <br />

                  <small>
                    {com.dataCriacao
                      ? new Date(com.dataCriacao).toLocaleString()
                      : ""}
                  </small>

                </li>

              ))

            ) : (

              <li className="sem-comentario">
                Nenhum comentário
              </li>

            )}

          </ul>

          <div className="area-comentario">

            <input
              type="text"
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Adicionar comentário..."
            />

            <button onClick={adicionarComentario}>
              Enviar
            </button>

          </div>

          {isAtendente && (

            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>

              {chamadoSelecionado.status !== "CONCLUIDO" && (

                <button
                  onClick={concluirChamado}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Concluir Chamado
                </button>

              )}

              <button
                onClick={excluirChamado}
                style={{
                  backgroundColor: "#e53935",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Excluir Chamado
              </button>

            </div>

          )}

        </div>

      )}

    </div>

  );

}

export default ListarChamados;