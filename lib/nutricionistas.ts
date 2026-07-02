import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export type Nutricionista = {
  'Primer Apellido': string;
  'Segundo Apellido': string;
  'Nombre': string;
  'Identificación': string;
  'Carné': string;
  'Estado': string;
  'Especialidad': string;
};

export function getNutricionistas(): Nutricionista[] {
  const filePath = path.join(process.cwd(), 'data', 'nutricionistas.csv');
  const csvText = fs.readFileSync(filePath, 'utf-8');
  const result = Papa.parse<Nutricionista>(csvText, {
    header: true,
    skipEmptyLines: true,
  });
  return result.data;
}

export function getEspecialidades(): string[] {
  const all = getNutricionistas();
  const set = new Set<string>();
  for (const n of all) {
    if (n.Especialidad && n.Especialidad.trim()) {
      set.add(n.Especialidad.trim());
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'es'));
}