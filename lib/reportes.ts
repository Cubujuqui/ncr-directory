import { supabaseAdmin } from './supabase-admin';
import { toTitleCase } from './perfiles';
import { CANALES } from './canales';

export { CANALES };

export type FilaReporte = {
  carne: string;
  nombre: string;
  tier: string;
  total: number;
  porCanal: Record<string, number>;
};

async function getTodosLosClics(): Promise<any[]> {
  const todos: any[] = [];
  let desde = 0;
  const tamanoPagina = 1000;

  while (true) {
    const { data, error } = await supabaseAdmin
      .from('clics')
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

export async function getReporteClicks(mes: string): Promise<FilaReporte[]> {
  const todos = await getTodosLosClics();

  const carnesConHistorial = Array.from(new Set(todos.map((c) => c.carne)));
  if (carnesConHistorial.length === 0) return [];

  const inicioMes = new Date(`${mes}-01T00:00:00Z`);
  const finMes = new Date(inicioMes);
  finMes.setUTCMonth(finMes.getUTCMonth() + 1);

  const delMes = todos.filter((c) => {
    const fecha = new Date(c.created_at);
    return fecha >= inicioMes && fecha < finMes;
  });

  const { data: perfilesData } = await supabaseAdmin
    .from('perfiles')
    .select('carne, nombre_manual, apellido_manual, segundo_apellido_manual, nombre_preferido, tier')
    .in('carne', carnesConHistorial);

  const perfilesMap = new Map((perfilesData || []).map((p) => [p.carne, p]));

  return carnesConHistorial.map((carne) => {
    const clicsDelMes = delMes.filter((c) => c.carne === carne);
    const porCanal: Record<string, number> = {};
    for (const canal of CANALES) {
      porCanal[canal] = clicsDelMes.filter((c) => c.canal === canal).length;
    }
    const total = clicsDelMes.length;

    const conteoTiers: Record<string, number> = {};
    for (const c of clicsDelMes) {
      if (c.tier) conteoTiers[c.tier] = (conteoTiers[c.tier] || 0) + 1;
    }
    let tierMasComun = Object.entries(conteoTiers).sort((a, b) => b[1] - a[1])[0]?.[0];

    const perfil = perfilesMap.get(carne);
    if (!tierMasComun) tierMasComun = perfil?.tier || 'free';

    const nombre = perfil
      ? `${perfil.nombre_preferido ? toTitleCase(perfil.nombre_preferido) : toTitleCase(perfil.nombre_manual)} ${toTitleCase(perfil.apellido_manual)} ${toTitleCase(perfil.segundo_apellido_manual)}`
      : carne;

    return { carne, nombre: nombre.trim(), tier: tierMasComun, total, porCanal };
  });
}