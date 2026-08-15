import { supabaseAdmin } from './supabase-admin';
import { getElegibilidadMap } from './elegibilidad';

export type PerfilCompleto = {
  carne: string | null;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  especialidad: string | null;
  whatsapp: string | null;
  email: string | null;
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
  linkedin: string | null;
  fotoUrl: string | null;
  tier: 'free' | 'contact' | 'premium';
  citasOnline: boolean | null;
  visitaDomicilio: boolean | null;
  puntoContactoPrimario: 'whatsapp' | 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'email';
};

function toTitleCase(texto: string | null): string {
  if (!texto) return '';
  return texto
    .toLowerCase()
    .split(' ')
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
}

function mapearPerfil(fila: any): PerfilCompleto {
  return {
    carne: fila.carne,
    nombre: fila.nombre_preferido ? toTitleCase(fila.nombre_preferido) : toTitleCase(fila.nombre_manual),
    primerApellido: toTitleCase(fila.apellido_manual),
    segundoApellido: toTitleCase(fila.segundo_apellido_manual),
    especialidad: fila.especialidad_manual,
    whatsapp: fila.whatsapp,
email: fila.email,
    facebook: fila.facebook,
    instagram: fila.instagram,
    tiktok: fila.tiktok,
    youtube: fila.youtube,
    linkedin: fila.linkedin,
    fotoUrl: fila.foto_url,
    tier: (fila.tier as 'free' | 'contact' | 'premium') || 'free',
    citasOnline: fila.citas_online,
    visitaDomicilio: fila.visita_domicilio,
    puntoContactoPrimario: (fila.punto_contacto_primario as PerfilCompleto['puntoContactoPrimario']) || 'whatsapp',
  };
}

async function getTodosLosPerfiles(): Promise<any[]> {
  const todos: any[] = [];
  let desde = 0;
  const tamanoPagina = 1000;

  while (true) {
    const { data, error } = await supabaseAdmin
      .from('perfiles')
      .select('*')
      .order('id', { ascending: true })
      .range(desde, desde + tamanoPagina - 1);

    if (error || !data) break;
    todos.push(...data);
    if (data.length < tamanoPagina) break;
    desde += tamanoPagina;
  }

  return todos;
}

async function getPerfilesElegibles(): Promise<PerfilCompleto[]> {
  const [data, elegibilidad] = await Promise.all([
    getTodosLosPerfiles(),
    getElegibilidadMap(),
  ]);

  return data
    .filter((fila) => fila.carne && elegibilidad.get(fila.carne) !== false)
    .map(mapearPerfil);
}

export async function getPerfilesDestacados(): Promise<PerfilCompleto[]> {
  const perfiles = await getPerfilesElegibles();
  return perfiles.filter((p) => p.tier === 'premium').slice(0, 3);
}

export async function ordenarResultadosDirectorio(especialidad?: string, maxTotal = 50): Promise<{ resultados: PerfilCompleto[]; total: number }> {
  let perfiles = await getPerfilesElegibles();

  if (especialidad) {
    perfiles = perfiles.filter((p) => p.especialidad === especialidad);
  }

  const total = perfiles.length;
  const premium = perfiles.filter((p) => p.tier === 'premium').slice(0, 3);
  const contacto = perfiles.filter((p) => p.tier === 'contact').slice(0, 3);
  const gratis = perfiles
    .filter((p) => p.tier === 'free')
    .sort(() => Math.random() - 0.5);

  const restantes = Math.max(0, maxTotal - premium.length - contacto.length);
  const resultados = [...premium, ...contacto, ...gratis.slice(0, restantes)];
  return { resultados, total };
}