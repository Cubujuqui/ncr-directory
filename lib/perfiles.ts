import { getNutricionistas } from './nutricionistas';
import { perfilesManual, PerfilManual } from './perfiles-manual';

export type PerfilCompleto = {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  especialidad: string | null;
  whatsapp: string | null;
  instagram: string | null;
  fotoUrl: string | null;
  tier: PerfilManual['tier'];
};

export function getPerfilesDestacados(): PerfilCompleto[] {
  const csv = getNutricionistas();

  return perfilesManual
    .filter((p) => p.tier === 'premium')
    .map((manual) => {
      const csvRow = manual.carne
        ? csv.find((n) => n['Carné'].trim() === manual.carne)
        : undefined;

      return {
        nombre: csvRow ? csvRow.Nombre : manual.nombreManual || '',
        primerApellido: csvRow ? csvRow['Primer Apellido'] : manual.apellidoManual || '',
        segundoApellido: csvRow ? csvRow['Segundo Apellido'] : '',
        especialidad: manual.especialidadManual || null,
        whatsapp: manual.whatsapp || null,
        instagram: manual.instagram || null,
        fotoUrl: manual.fotoUrl || null,
        tier: manual.tier,
      };
    });
}