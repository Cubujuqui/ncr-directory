import { supabaseAdmin } from './supabase-admin';

const ESTADOS_ELEGIBLES = ['Activo', 'Colegiatura Especial'];

export async function getElegibilidadMap(): Promise<Map<string, boolean>> {
  const mapa = new Map<string, boolean>();
  let desde = 0;
  const tamanoPagina = 1000;

  while (true) {
    const { data, error } = await supabaseAdmin
      .from('registro_colegio')
      .select('Carné,Estado,created_at')
      .order('created_at', { ascending: false })
      .range(desde, desde + tamanoPagina - 1);

    if (error || !data || data.length === 0) break;

    for (const fila of data as any[]) {
      const carne: string = fila['Carné'];
      const estado: string = fila['Estado'];
      if (!mapa.has(carne)) {
        mapa.set(carne, ESTADOS_ELEGIBLES.includes(estado));
      }
    }

    if (data.length < tamanoPagina) break;
    desde += tamanoPagina;
  }

  return mapa;
}