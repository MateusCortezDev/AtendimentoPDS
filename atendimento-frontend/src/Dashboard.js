import React, { useEffect, useState } from "react";
import { getMetricas } from "./services/apiService";

function Dashboard() {
  const [metricas, setMetricas] = useState({ abertos: 0, concluidos: 0 });

  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        const data = await getMetricas();
        setMetricas(data);
      } catch (err) {
        console.error("Erro ao buscar métricas:", err);
      }
    };
    fetchMetricas();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard de Chamados</h2>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ backgroundColor: "#1976d2", color: "white", padding: "20px", borderRadius: "8px" }}>
          <h3>Abertos Hoje</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{metricas.abertos}</p>
        </div>
        <div style={{ backgroundColor: "green", color: "white", padding: "20px", borderRadius: "8px" }}>
          <h3>Concluídos Hoje</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{metricas.concluidos}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
