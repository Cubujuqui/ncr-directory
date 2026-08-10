import { getNutricionistas, Nutricionista } from './nutricionistas';
import { perfilesManual, PerfilManual } from './perfiles-manual';

export type PerfilCompleto = {
  nombre: string;
  carne: string | null;
  primerApellido: string;
  segundoApellido: string;
  especialidad: string | null;
  whatsapp: string | null;
 instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
linkedin: string | null;
  citasOnline: boolean | null;
  visitaDomicilio: boolean | null;
  puntoContactoPrimario: 'whatsapp' | 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'email';
  email: string | null;
  fotoUrl: string | null;
  tier: PerfilManual['tier'];
};

export type FilaSecundaria = {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  tier: 'contact' | 'free';
};

function mergePerfil(manual: PerfilManual, csv: Nutricionista[]): PerfilCompleto {
  const csvRow = manual.carne ? csv.find((n) => n['Carné'].trim() === manual.carne) : undefined;
  return {
    nombre: csvRow ? csvRow.Nombre : manual.nombreManual || '',
    carne: manual.carne,
    primerApellido: csvRow ? csvRow['Primer Apellido'] : manual.apellidoManual || '',
    segundoApellido: csvRow ? csvRow['Segundo Apellido'] : '',
especialidad: manual.especialidadManual || csvRow?.Especialidad?.trim() || null,
    whatsapp: manual.whatsapp || null,
  instagram: manual.instagram || null,
    tiktok: manual.tiktok || null,
    youtube: manual.youtube || null,
    linkedin: manual.linkedin || null,
    citasOnline: manual.citasOnline ?? null,
    visitaDomicilio: manual.visitaDomicilio ?? null,
    puntoContactoPrimario: manual.puntoContactoPrimario ?? 'whatsapp',
    email: manual.email || null,
    fotoUrl: manual.fotoUrl || null,
    tier: manual.tier,
  };
}

export function getPerfilesDestacados(): PerfilCompleto[] {
  const csv = getNutricionistas();
  return perfilesManual.filter((p) => p.tier === 'premium').map((m) => mergePerfil(m, csv));
}

function getSegundoNivel(): FilaSecundaria[] {
  const csv = getNutricionistas();
  return perfilesManual
    .filter((p) => p.tier === 'contact')
    .map((m) => {
      const perfil = mergePerfil(m, csv);
      return { nombre: perfil.nombre, primerApellido: perfil.primerApellido, segundoApellido: perfil.segundoApellido, tier: 'contact' as const };
    });
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function ordenarResultadosDirectorio(
  nutricionistas: Nutricionista[],
  maxTotal = 50,
  maxPremiumDestacado = 3,
  maxContactoDestacado = 3
): Nutricionista[] {
  const tierDe = (n: Nutricionista) => {
    const m = perfilesManual.find((p) => p.carne === n['Carné'].trim());
    return m?.tier ?? 'free';
  };

  const premium = shuffle(nutricionistas.filter((n) => tierDe(n) === 'premium'));
  const contacto = shuffle(nutricionistas.filter((n) => tierDe(n) === 'contact'));
  const gratis = nutricionistas.filter((n) => tierDe(n) === 'free');

  const premiumDestacados = premium.slice(0, maxPremiumDestacado);
  const contactoDestacados = contacto.slice(0, maxContactoDestacado);

  const premiumResto = premium.slice(maxPremiumDestacado);
  const contactoResto = contacto.slice(maxContactoDestacado);

  const pool = shuffle([...premiumResto, ...contactoResto, ...gratis]);
  const espacioRestante = Math.max(maxTotal - premiumDestacados.length - contactoDestacados.length, 0);

  return [...premiumDestacados, ...contactoDestacados, ...pool.slice(0, espacioRestante)];
}

export function getFilasSecundarias(totalFilas = 4): FilaSecundaria[] {
  const segundoNivel = getSegundoNivel();
  const carnesExcluidos = new Set(perfilesManual.filter((p) => p.carne).map((p) => p.carne));
  const csv = getNutricionistas();

  const activosDisponibles = csv.filter(
    (n) => n.Estado === 'Activo' && !carnesExcluidos.has(n['Carné'].trim())
  );

  const espaciosLibres = Math.max(totalFilas - segundoNivel.length, 0);
  const muestraGratuita: FilaSecundaria[] = shuffle(activosDisponibles)
    .slice(0, espaciosLibres)
    .map((n) => ({
      nombre: n.Nombre,
      primerApellido: n['Primer Apellido'],
      segundoApellido: n['Segundo Apellido'],
      tier: 'free' as const,
    }));

  return shuffle([...segundoNivel, ...muestraGratuita]);
}