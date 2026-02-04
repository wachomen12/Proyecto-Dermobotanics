import { supabase } from './supabaseClient';

const SERVICES_TABLE = 'services';

export async function addService(service: any) {
  const { data, error } = await supabase
    .from(SERVICES_TABLE)
    .insert([service])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function getAllServices() {
  const { data, error } = await supabase
    .from(SERVICES_TABLE)
    .select('*');
  if (error) throw error;
  return data;
}

export async function deleteService(id: string) {
  const { error } = await supabase
    .from(SERVICES_TABLE)
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function updateService(id: string, data: any) {
  const { error } = await supabase
    .from(SERVICES_TABLE)
    .update(data)
    .eq('id', id);
  if (error) throw error;
}
