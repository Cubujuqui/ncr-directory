import { supabase } from './supabase';

export async function getTestimoniosAleatorios() {
  const { data } = await supabase.from('testimonios').select('*');

  if (!data || data.length < 3) return [];

  const mezclados = [...data].sort(() => Math.random() - 0.5);
  return mezclados;
}
