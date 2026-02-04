import { supabase } from './supabaseClient';

const CONFIG_TABLE = 'config';
const ADMIN_ID = 'admin';

export async function getAdminCredentials() {
  const { data, error } = await supabase
    .from(CONFIG_TABLE)
    .select('*')
    .eq('id', ADMIN_ID)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  if (data) return data; // { username, pass }
  // Si no existe, retorna valores por defecto
  return { username: 'admin', pass: 'admin123' };
}

export async function setAdminCredentials({ username, pass }: { username: string; pass: string }) {
  const { error } = await supabase
    .from(CONFIG_TABLE)
    .upsert([{ id: ADMIN_ID, username, pass }], { onConflict: ['id'] });
  if (error) throw error;
}
