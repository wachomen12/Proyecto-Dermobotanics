import { supabase } from './supabaseClient';

const PRODUCTS_TABLE = 'products';

export async function addProduct(product: any) {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .insert([product])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function getAllProducts() {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select('*')
    .order('orden', { ascending: true });
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from(PRODUCTS_TABLE)
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function reorderProducts(updates: { id: string; orden: number }[]) {
  const updatesPromises = updates.map(update =>
    supabase.from(PRODUCTS_TABLE).update({ orden: update.orden }).eq('id', update.id)
  );
  const results = await Promise.all(updatesPromises);
  const errors = results.filter(r => r.error);
  if (errors.length) throw errors[0].error;
  return await getAllProducts();
}
