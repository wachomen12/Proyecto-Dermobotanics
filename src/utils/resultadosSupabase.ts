import { supabase } from './supabaseClient';

const RESULTADOS_TABLE = 'resultados';

export async function addResultado(resultado: any) {
  const { data, error } = await supabase
    .from(RESULTADOS_TABLE)
    .insert([resultado])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function getAllResultados() {
  const { data, error } = await supabase
    .from(RESULTADOS_TABLE)
    .select('*')
    .order('fecha', { ascending: false });
  if (error) throw error;
  return data;
}

export async function deleteResultado(id: string) {
  const { error } = await supabase
    .from(RESULTADOS_TABLE)
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

export async function updateResultado(id: string, data: any) {
  const { error } = await supabase
    .from(RESULTADOS_TABLE)
    .update(data)
    .eq('id', id);
  if (error) throw error;
  return true;
}
