import { getNutricionistas, Nutricionista } from './nutricionistas';
import { perfilesManual, PerfilManual } from './perfiles-manual';

export type PerfilCompleto = {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  especialidad: string | null;
  whatsapp: string | null;
 instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
  linkedin: string | null;
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
    primerApellido: csvRow ? csvRow['Primer Apellido'] : manual.apellidoManual || '',
    segundoApellido: csvRow ? csvRow['Segundo Apellido'] : '',
    especialidad: manual.especialidadManual || null,
    whatsapp: manual.whatsapp || null,
  instagram: manual.instagram || null,
    tiktok: manual.tiktok || null,
    youtube: manual.youtube || null,
    linkedin: manual.linkedin || null,
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