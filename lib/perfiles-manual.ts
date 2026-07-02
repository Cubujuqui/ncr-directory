export type PerfilManual = {
  carne: string | null; // Carné from the CSV, or null if not registered yet
  tier: 'free' | 'contact' | 'premium';
  nombreManual?: string; // only used when carne is null
  apellidoManual?: string; // only used when carne is null
  especialidadManual?: string; // leave unset to show placeholder
  whatsapp?: string; // leave unset to show placeholder
  instagram?: string;
  linkedin?: string;
  fotoUrl?: string; // leave unset to show placeholder
};

export const perfilesManual: PerfilManual[] = [
  {
    carne: '1987-15', // Eva Mena Xatruch
    tier: 'premium',
  },
  {
    carne: null,
    tier: 'premium',
    nombreManual: 'Dra.',
    apellidoManual: 'Ejemplo',
  },
];