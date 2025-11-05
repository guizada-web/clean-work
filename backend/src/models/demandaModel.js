import { supabase } from "../config/db.js";

export const criarDemanda = async (titulo, descricao, bairro, estado, cidade, latitude, longitude, usuario_id) => {
  const { data, error } = await supabase
    .from('demandas')
    .insert({
      titulo,
      descricao,
      bairro,
      estado,
      cidade,
      latitude,
      longitude,
      usuario_id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const listarDemandas = async () => {
  const { data, error } = await supabase
    .from('demandas')
    .select('*')
    .order('id', { ascending: false });

  if (error) throw error;
  return data;
};

export const atualizarDemanda = async (id, status) => {
  const { data, error } = await supabase
    .from('demandas')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletarDemanda = async (id) => {
  const { data, error } = await supabase
    .from('demandas')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
