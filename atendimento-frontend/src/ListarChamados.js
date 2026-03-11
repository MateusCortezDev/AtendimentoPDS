import React, { useEffect, useState, useCallback } from "react";
import "./Chamados.css";
import {
  listarChamadosAtendente,
  listarChamadosColaborador,
  abrirChamado,
  adicionarComentario,
  concluirChamado,
  excluirChamado
} from "../services/apiService";

function ListarChamados({ isAtendente, usuarioId }) {
  const [chamados, setChamados] = useState([]);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
  const [novoComentario, setNovoComentario] = useState("");

  const carregarChamados = useCallback(async () => {
    try {
      let data = isAtendente
        ? await listarChamadosAtendente()
        : await listarChamadosColaborador(usuarioId);

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

  const abrirChamadoHandler = async (chamado) => {
    try {
      let comentarios = await abrirChamado(chamado.id);
      if (!Array.isArray(comentarios)) comentarios = [comentarios];

      setChamadoSelecionado({ ...chamado, comentarios });
    } catch (err) {
      console.error("Erro ao carregar comentários:", err);
      setChamadoSelecionado({ ...chamado, comentarios: [] });
    }
  };

  const adicionarComentarioHandler = async () => {
    if (!novoComentario.trim()) return;
    try {
      await adicionarComentario(chamadoSelecionado.id, usuarioId, novoComentario);
      setNovoComentario("");
      abrirChamadoHandler(chamadoSelecionado);
    } catch (err) {
      console.error("Erro ao adicionar comentário:", err);
    }
  };

  const concluirChamadoHandler = async () => {
    try {
      await concluirChamado(chamadoSelecionado.id);
      alert("Chamado concluído!");
      setChamadoSelecionado(null);
      carregarChamados();
    } catch (err) {
      console.error("Erro ao concluir chamado:", err);
    }
  };

  const excluirChamadoHandler = async () => {
    if (!window.confirm("Tem certeza que deseja excluir este chamado?")) return;
    try {
      await excluirChamado(chamadoSelecionado.id);
      alert("Chamado excluído!");
      setChamadoSelecionado(null);
      carregarChamados();
    } catch (err) {
      console.error("Erro ao excluir chamado:", err);
    }
  };

  // JSX continua igual, só trocando chamadas para os novos handlers
}

export default ListarChamados;
