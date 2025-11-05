import { supabase } from "../config/db.js";

export const criarObra = async (titulo, descricao, bairro, latitude, longitude, usuario_id, status = 'planejada', progresso = 0, data_inicio = null, data_fim = null, valor_estimado = null) => {
  const { data, error } = await supabase
    .from('obras')
    .insert({
      titulo,
      descricao,
      bairro,
      latitude,
      longitude,
      usuario_id,
      status,
      progresso,
      data_inicio,
      data_fim,
      valor_estimado
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const listarObras = async () => {
  const { data, error } = await supabase
    .from('obras')
    .select('*')
    .order('id', { ascending: false });

  if (error) throw error;
  return data;
};

export const atualizarObra = async (id, status, progresso = null, data_inicio = null, data_fim = null, valor_estimado = null) => {
  const updates = {};
  if (status !== undefined) updates.status = status;
  if (progresso !== null) updates.progresso = progresso;
  if (data_inicio !== null) updates.data_inicio = data_inicio;
  if (data_fim !== null) updates.data_fim = data_fim;
  if (valor_estimado !== null) updates.valor_estimado = valor_estimado;

  const { data, error } = await supabase
    .from('obras')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletarObra = async (id) => {
  const { data, error } = await supabase
    .from('obras')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
