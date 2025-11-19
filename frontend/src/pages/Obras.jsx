import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import TableObras from "../components/TableObras";

export default function Obras() {
  const [obras, setObras] = useState([]);

  const carregarObras = async () => {
    const res = await api.get("/obras");
    setObras(res.data);
  };

  useEffect(() => {
    carregarObras();
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "var(--text)",
          textAlign: "center"
        }}>
          Monitoramento de Obras Públicas
        </h1>

        {/* Tabela de obras com filtros e paginação */}

        {/* Exibir apenas a tabela de obras conforme solicitado */}
        <div>
          <TableObras obras={obras} />
        </div>
      </main>
    </div>
  );
}
