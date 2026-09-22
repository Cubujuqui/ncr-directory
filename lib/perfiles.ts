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
    fotoPosicionY: number;
    fotoPosicionX: number;
    fotoZoom: number;
  acercaDe: string | null;
  tier: 'free' | 'contact' | 'premium';
  citasOnline: boolean | null;
  visitaDomicilio: boolean | null;
  atiendeConsultorio: boolean | null;
  citasGrupales: boolean | null;
  serviciosEmpresas: boolean | null;
  hablaIngles: boolean | null;
  puntoContactoPrimario: 'whatsapp' | 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'email' | 'facebook';
  aniosExperiencia: number | null;
};

// El campo especialidad_manual a veces trae literalmente el texto "Sin especialidad"
// (viene así registrado en el CPN), lo cual no es una especialidad real.
// Se trata igual que un campo vacío.
function normalizarEspecialidad(valor: string | null | undefined): string | null {
  if (!valor) return null;
  const limpio = valor.trim();
  if (!limpio) return null;
  if (limpio.toLowerCase() === 'sin especialidad') return null;
  return limpio;
}

// El carné tiene el formato {numero}-{AA}, donde AA son los últimos dos dígitos
// del año de incorporación al CPN (ej. "2925-20" = incorporado en 2020).
function calcularAniosExperiencia(carne: string | null): number | null {
  if (!carne) return null;
  const partes = carne.split('-');
  const aa = partes[partes.length - 1];
  if (!aa || !/^\d{2}$/.test(aa)) return null;
  const anioIncorporacion = 2000 + parseInt(aa, 10);
  const anioActual = new Date().getFullYear();
  const experiencia = anioActual - anioIncorporacion;
  return experiencia >= 0 ? experiencia : null;
}

export function toTitleCase(texto: string | null): string {  if (!texto) return '';
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
    especialidad: normalizarEspecialidad(fila.especialidad_manual),
    whatsapp: fila.whatsapp,
    email: fila.email,
    facebook: fila.facebook,
    instagram: fila.instagram,
    tiktok: fila.tiktok,
    youtube: fila.youtube,
    linkedin: fila.linkedin,
    fotoUrl: fila.foto_url,
        fotoPosicionY: typeof fila.foto_posicion_y === 'number' ? fila.foto_posicion_y : 50,
        fotoPosicionX: typeof fila.foto_posicion_x === 'number' ? fila.foto_posicion_x : 50,
        fotoZoom: typeof fila.foto_zoom === 'number' ? fila.foto_zoom : 100,
    acercaDe: fila.acerca_de || null,
    tier: (fila.tier as 'free' | 'contact' | 'premium') || 'free',
    citasOnline: fila.citas_online,
    visitaDomicilio: fila.visita_domicilio,
    atiendeConsultorio: fila.atiende_consultorio,
    citasGrupales: fila.citas_grupales,
    serviciosEmpresas: fila.servicios_empresas,
    hablaIngles: fila.habla_ingles,
    puntoContactoPrimario: (fila.punto_contacto_primario as PerfilCompleto['puntoContactoPrimario']) || 'whatsapp',
    aniosExperiencia: calcularAniosExperiencia(fila.carne),
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

// Orden visible al visitante. 'aleatorio' preserva el shuffle original (exposición
// pareja entre perfiles del mismo tier); las otras opciones ordenan por años de
// experiencia. El orden nunca se aplica entre tiers, solo dentro de cada uno.
export type OrdenDirectorio = 'aleatorio' | 'experiencia_desc' | 'experiencia_asc';

function aplicarOrden(lista: PerfilCompleto[], orden?: OrdenDirectorio): PerfilCompleto[] {
  if (orden === 'experiencia_desc' || orden === 'experiencia_asc') {
    const signo = orden === 'experiencia_desc' ? -1 : 1;
    return [...lista].sort((a, b) => {
      if (a.aniosExperiencia === null && b.aniosExperiencia === null) return 0;
      if (a.aniosExperiencia === null) return 1; // sin experiencia calculable va al final
      if (b.aniosExperiencia === null) return -1;
      return signo * (a.aniosExperiencia - b.aniosExperiencia);
    });
  }
  return [...lista].sort(() => Math.random() - 0.5);
}

  export async function getPerfilesDestacados(orden?: OrdenDirectorio): Promise<PerfilCompleto[]> {
  const perfiles = await getPerfilesElegibles();
  const premium = perfiles.filter((p) => p.tier === 'premium');
  return aplicarOrden(premium, orden).slice(0, 3);
}

export async function ordenarResultadosDirectorio(
  especialidad?: string[],
  maxTotal = 50,
  filtros?: { online?: boolean; domicilio?: boolean; consultorio?: boolean; premiumSolamente?: boolean; grupal?: boolean; serviciosEmpresas?: boolean; hablaIngles?: boolean },
  orden?: OrdenDirectorio
): Promise<{ resultados: PerfilCompleto[]; total: number }> {
  let perfiles = await getPerfilesElegibles();

  if (especialidad && especialidad.length > 0) {
    perfiles = perfiles.filter((p) => p.especialidad && especialidad.includes(p.especialidad));
  }

  if (filtros?.online || filtros?.domicilio || filtros?.consultorio) {
    perfiles = perfiles.filter((p) =>
      (filtros.online && p.citasOnline === true) ||
      (filtros.domicilio && p.visitaDomicilio === true) ||
      (filtros.consultorio && p.atiendeConsultorio === true)
    );
  }

  if (filtros?.grupal) {
    perfiles = perfiles.filter((p) => p.citasGrupales === true);
  }

  if (filtros?.serviciosEmpresas) {
    perfiles = perfiles.filter((p) => p.serviciosEmpresas === true);
  }

  if (filtros?.hablaIngles) {
    perfiles = perfiles.filter((p) => p.hablaIngles === true);
  }

  if (filtros?.premiumSolamente) {


    perfiles = perfiles.filter((p) => p.tier === 'premium');
    const total = perfiles.length;
    const resultados = aplicarOrden(perfiles, orden).slice(0, maxTotal);
    return { resultados, total };
  }

  const total = perfiles.length;
  const premium = aplicarOrden(perfiles.filter((p) => p.tier === 'premium'), orden);
  const contacto = aplicarOrden(perfiles.filter((p) => p.tier === 'contact'), orden);
  const gratis = aplicarOrden(perfiles.filter((p) => p.tier === 'free'), orden);

  const restantes = Math.max(0, maxTotal - premium.length - contacto.length);
  const resultados = [...premium, ...contacto, ...gratis.slice(0, restantes)];
  return { resultados, total };
}
