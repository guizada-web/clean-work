import { supabase } from "./src/config/db.js";

const obras = [
  {
    titulo: "Reforma da Praça Central",
    descricao: "Reforma completa da praça central com novo paisagismo, iluminação LED e área de lazer",
    bairro: "Centro",
    latitude: -2.5307,
    longitude: -44.3068,
    usuario_id: 1,
    status: "em_andamento",
    progresso: 45,
    data_inicio: "2024-01-15",
    data_fim: "2024-06-30",
    valor_estimado: 1500000
  },
  {
    titulo: "Construção de Creche Municipal",
    descricao: "Construção de nova creche com capacidade para 200 crianças, incluindo salas de aula, refeitório e área de recreação",
    bairro: "Vila Nova",
    latitude: -2.5457,
    longitude: -44.3208,
    usuario_id: 1,
    status: "em_andamento",
    progresso: 30,
    data_inicio: "2024-02-01",
    data_fim: "2024-08-15",
    valor_estimado: 2800000
  },
  {
    titulo: "Pavimentação da Rua das Flores",
    descricao: "Pavimentação asfáltica completa da Rua das Flores, incluindo calçadas acessíveis e sinalização",
    bairro: "Jardim Primavera",
    latitude: -2.5207,
    longitude: -44.2908,
    usuario_id: 1,
    status: "em_andamento",
    progresso: 60,
    data_inicio: "2024-01-20",
    data_fim: "2024-05-10",
    valor_estimado: 850000
  },
  {
    titulo: "Reforma do Centro Esportivo",
    descricao: "Modernização do ginásio poliesportivo com novas quadras, vestiários e iluminação",
    bairro: "Centro",
    latitude: -2.5357,
    longitude: -44.3108,
    usuario_id: 1,
    status: "planejada",
    progresso: 0,
    data_inicio: "2024-04-01",
    data_fim: "2024-09-30",
    valor_estimado: 2200000
  },
  {
    titulo: "Construção de Unidade Básica de Saúde",
    descricao: "Nova UBS com consultórios médicos, sala de vacinação e farmácia popular",
    bairro: "São Francisco",
    latitude: -2.5507,
    longitude: -44.3308,
    usuario_id: 1,
    status: "em_andamento",
    progresso: 25,
    data_inicio: "2024-03-01",
    data_fim: "2024-10-15",
    valor_estimado: 3200000
  },
  {
    titulo: "Reforma da Biblioteca Municipal",
    descricao: "Ampliação e modernização da biblioteca com acervo digital e salas de estudo",
    bairro: "Centro",
    latitude: -2.5287,
    longitude: -44.3058,
    usuario_id: 1,
    status: "concluida",
    progresso: 100,
    data_inicio: "2023-08-01",
    data_fim: "2024-02-28",
    valor_estimado: 950000
  },
  {
    titulo: "Sistema de Drenagem Pluvial",
    descricao: "Instalação de sistema completo de drenagem pluvial no bairro Cohab",
    bairro: "Cohab",
    latitude: -2.5607,
    longitude: -44.3408,
    usuario_id: 1,
    status: "em_andamento",
    progresso: 40,
    data_inicio: "2024-01-10",
    data_fim: "2024-07-20",
    valor_estimado: 1800000
  },
  {
    titulo: "Iluminação Pública LED",
    descricao: "Substituição de todas as lâmpadas por LED na Avenida Beira-Mar",
    bairro: "Beira-Mar",
    latitude: -2.5257,
    longitude: -44.3008,
    usuario_id: 1,
    status: "em_andamento",
    progresso: 75,
    data_inicio: "2023-12-01",
    data_fim: "2024-04-30",
    valor_estimado: 650000
  },
  {
    titulo: "Parque Linear do Rio Anil",
    descricao: "Criação de parque linear às margens do Rio Anil com ciclovia e áreas de lazer",
    bairro: "Anil",
    latitude: -2.5707,
    longitude: -44.3508,
    usuario_id: 1,
    status: "planejada",
    progresso: 0,
    data_inicio: "2024-05-01",
    data_fim: "2024-11-30",
    valor_estimado: 4100000
  },
  {
    titulo: "Reforma da Escola Municipal João Paulo II",
    descricao: "Reforma completa da escola incluindo salas de aula, laboratório e quadra esportiva",
    bairro: "João Paulo",
    latitude: -2.5407,
    longitude: -44.3158,
    usuario_id: 1,
    status: "em_andamento",
    progresso: 50,
    data_inicio: "2024-02-15",
    data_fim: "2024-08-30",
    valor_estimado: 1950000
  },
  {
    titulo: "Mercado Público Moderno",
    descricao: "Construção de novo mercado público com boxes climatizados e área de alimentação",
    bairro: "Centro",
    latitude: -2.5327,
    longitude: -44.3088,
    usuario_id: 1,
    status: "planejada",
    progresso: 0,
    data_inicio: "2024-06-01",
    data_fim: "2024-12-15",
    valor_estimado: 3800000
  },
  {
    titulo: "Sistema de Videomonitoramento",
    descricao: "Instalação de câmeras de segurança em pontos estratégicos da cidade",
    bairro: "Centro",
    latitude: -2.5307,
    longitude: -44.3068,
    usuario_id: 1,
    status: "em_andamento",
    progresso: 35,
    data_inicio: "2024-01-05",
    data_fim: "2024-05-30",
    valor_estimado: 1200000
  },
  {
    titulo: "Requalificação da Praia do Meio",
    descricao: "Requalificação urbana da orla da Praia do Meio com calçadão e iluminação",
    bairro: "Praia do Meio",
    latitude: -2.5157,
    longitude: -44.2858,
    usuario_id: 1,
    status: "concluida",
    progresso: 100,
    data_inicio: "2023-09-01",
    data_fim: "2024-03-15",
    valor_estimado: 2750000
  },
  {
    titulo: "Centro de Confinamento do Zoonoses",
    descricao: "Construção de centro veterinário para animais abandonados",
    bairro: "Industrial",
    latitude: -2.5807,
    longitude: -44.3608,
    usuario_id: 1,
    status: "em_andamento",
    progresso: 20,
    data_inicio: "2024-03-10",
    data_fim: "2024-09-20",
    valor_estimado: 1600000
  },
  {
    titulo: "Terminal Rodoviário Moderno",
    descricao: "Reforma e ampliação do terminal rodoviário com plataformas cobertas",
    bairro: "Centro",
    latitude: -2.5277,
    longitude: -44.3038,
    usuario_id: 1,
    status: "planejada",
    progresso: 0,
    data_inicio: "2024-07-01",
    data_fim: "2025-01-15",
    valor_estimado: 4500000
  }
];

async function populateObras() {
  try {
    console.log("Inserindo obras de exemplo...");

    for (const obra of obras) {
      const { data, error } = await supabase
        .from('obras')
        .insert({
          titulo: obra.titulo,
          descricao: obra.descricao,
          bairro: obra.bairro,
          latitude: obra.latitude,
          longitude: obra.longitude,
          usuario_id: obra.usuario_id,
          status: obra.status,
          progresso: obra.progresso,
          data_inicio: obra.data_inicio,
          data_fim: obra.data_fim,
          valor_estimado: obra.valor_estimado
        })
        .select();

      if (error) {
        console.error(`Erro ao inserir ${obra.titulo}:`, error);
      } else {
        console.log(`✓ Inserida: ${obra.titulo}`);
      }
    }

    console.log("Todas as obras foram inseridas com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir obras:", error);
  }
}

populateObras();
