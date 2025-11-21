import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Obras() {
  const [obras, setObras] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroBairro, setFiltroBairro] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const carregarObras = async () => {
    const res = await api.get("/obras");
    setObras(res.data);
  };

  useEffect(() => {
    carregarObras();
  }, []);

  const obrasFiltradas = obras.filter((obra) => {
    const atendeStatus = (filtroStatus === "" || obra.status === filtroStatus);
    const atendeBairro = (filtroBairro === "" || (obra.bairro || '').toLowerCase().includes(filtroBairro.toLowerCase()));
    const atendeEstado = (filtroEstado === "" || (obra.estado ? obra.estado === filtroEstado : true));
    let atendeData = true;
    try {
      if (dataInicio) {
        const dInicio = new Date(dataInicio);
        const obraInicio = obra.data_inicio ? new Date(obra.data_inicio) : null;
        if (obraInicio && obraInicio < dInicio) atendeData = false;
      }
      if (dataFim && atendeData) {
        const dFim = new Date(dataFim);
        const obraFim = obra.data_fim ? new Date(obra.data_fim) : null;
        if (obraFim && obraFim > dFim) atendeData = false;
      }
    } catch (e) {
      atendeData = true;
    }
    return atendeStatus && atendeBairro && atendeEstado && atendeData;
  });

  const statusOptions = [
    { value: "", label: "Todos os Status" },
    { value: "planejada", label: "Planejada" },
    { value: "em_andamento", label: "Em Andamento" },
    { value: "concluida", label: "Concluída" },
    { value: "cancelada", label: "Cancelada" }
  ];

  const estados = [
    "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
  ];

  const imprimirTabela = () => {
    const html = document.getElementById('obras-table-root').outerHTML;
    const w = window.open('', '_blank');
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Imprimir Obras</title><style>body{font-family:Arial,Helvetica,sans-serif;padding:20px;}table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ddd;padding:8px;font-size:12px;}th{background:#f5f5f5}</style></head><body>${html}</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); w.close(); }, 500);
  };

  const exportarCSV = () => {
    const rows = [
      ["Nº","Título","Endereço / Bairro","Tipo","Status","Responsável","Progresso","Atualizado em"]
    ];
    obrasFiltradas.forEach((o, i) => {
      rows.push([
        i+1,
        o.titulo || '',
        o.bairro || '',
        o.tipo || '',
        o.status || '',
        o.responsavel || '',
        o.progresso != null ? `${o.progresso}%` : '',
        o.updated_at ? new Date(o.updated_at).toLocaleDateString('pt-BR') : ''
      ]);
    });
    const csvContent = rows.map(r => r.map(c => `"${(''+c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'obras_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportarPDF = () => {
    // Simples: gera uma nova janela com a tabela e aciona impressão em modo PDF
    imprimirTabela();
  };
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content" style={{ marginLeft: 240 }}>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "var(--text)",
          textAlign: "center"
        }}>
          Monitoramento de Obras Públicas
        </h1>

  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <aside style={{ width: 260, background: 'var(--card-bg)', padding: 16, borderRadius: 8, border: '1px solid var(--border)' }}>
            <h3 style={{ marginTop: 0, marginBottom: 12, color: 'var(--text)' }}>Filtros</h3>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, color: 'var(--muted)' }}>Buscar</label>
              <input type="text" placeholder="Pesquisar título ou bairro" onChange={(e) => setFiltroBairro(e.target.value)} value={filtroBairro} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid var(--border)' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, color: 'var(--muted)' }}>Região (Estado)</label>
              <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid var(--border)' }}>
                <option value="">Todos</option>
                {estados.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, color: 'var(--muted)' }}>Tipo de Obra</label>
              <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid var(--border)' }}>
                {statusOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, color: 'var(--muted)' }}>Data Início (≥)</label>
              <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid var(--border)' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, color: 'var(--muted)' }}>Data Fim (≤)</label>
              <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid var(--border)' }} />
            </div>
            <div style={{ marginTop: 6 }}>
              <button onClick={() => { setFiltroBairro(''); setFiltroEstado(''); setFiltroStatus(''); setDataInicio(''); setDataFim(''); }} className="btn-secondary" style={{ width: '100%', padding: '0.5rem' }}>Limpar filtros</button>
            </div>
          </aside>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ color: 'var(--muted)' }}>{obrasFiltradas.length} resultado(s)</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={imprimirTabela} className="btn-ghost">Imprimir</button>
                <button onClick={exportarPDF} className="btn-ghost">Exportar PDF</button>
                <button onClick={exportarCSV} className="btn-primary">Exportar EXCEL</button>
              </div>
            </div>

            <div id="obras-table-root" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8, padding: 12 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: 8 }}>Nº</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Título</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Endereço / Bairro</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Tipo</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Status</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Responsável</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Progresso</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Atualizado em</th>
                  </tr>
                </thead>
                <tbody>
                  {obrasFiltradas.length === 0 ? (
                    <tr><td colSpan={8} style={{ padding: 16, color: 'var(--muted)' }}>Nenhuma obra encontrada.</td></tr>
                  ) : obrasFiltradas.map((obra, i) => (
                    <tr key={obra.id}>
                      <td style={{ padding: 8, borderTop: '1px solid var(--border)' }}>{i+1}</td>
                      <td style={{ padding: 8, borderTop: '1px solid var(--border)' }}>{obra.titulo}</td>
                      <td style={{ padding: 8, borderTop: '1px solid var(--border)' }}>{obra.endereco || obra.bairro || ''}</td>
                      <td style={{ padding: 8, borderTop: '1px solid var(--border)' }}>{obra.tipo || '-'}</td>
                      <td style={{ padding: 8, borderTop: '1px solid var(--border)' }}>{obra.status}</td>
                      <td style={{ padding: 8, borderTop: '1px solid var(--border)' }}>{obra.responsavel || '-'}</td>
                      <td style={{ padding: 8, borderTop: '1px solid var(--border)' }}>{obra.progresso != null ? `${obra.progresso}%` : '-'}</td>
                      <td style={{ padding: 8, borderTop: '1px solid var(--border)' }}>{obra.updated_at ? new Date(obra.updated_at).toLocaleDateString('pt-BR') : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
