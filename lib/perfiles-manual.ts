export type PerfilManual = {
  carne: string | null; // Carné from the CSV, or null if not registered yet
  tier: 'free' | 'contact' | 'premium';
  nombreManual?: string; // only used when carne is null
  apellidoManual?: string; // only used when carne is null
  especialidadManual?: string; // leave unset to show placeholder
  whatsapp?: string; // leave unset to show placeholder
instagram?: string;
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
  fotoUrl?: string; // leave unset to show placeholder
};

export const perfilesManual: PerfilManual[] = [
{
    carne: '1987-15', // Eva Mena Xatruch
    tier: 'premium',
    whatsapp: '50686140824',
    instagram: 'nutrimorfosiscr',
    linkedin: 'https://www.linkedin.com/in/eva-mena-xatruch/',
    fotoUrl: '/1987-15.jpg',
  },
  {
    carne: '2680-19', // Génesis Mayela Soto Sagot
    tier: 'premium',
    whatsapp: '50687161848',
    instagram: 'merezconutricion',
  },
  {
    carne: '3570-25', // Ines Miranda Duran
    tier: 'premium',
    whatsapp: '50685179448',
  },
];