type Tier = 'free' | 'contact' | 'premium';

const COLORES: Record<'premium' | 'contact', string> = {
  premium: '#FF6A4D',
  contact: '#7370E0',
};

const ETIQUETAS: Record<'premium' | 'contact', string> = {
  premium: 'Perfil Premium',
  contact: 'Perfil Contacto',
};

export default function BadgeTier({ tier, size = 16 }: { tier: Tier; size?: number }) {
  if (tier === 'free') return null;

  const color = COLORES[tier];
  const etiqueta = ETIQUETAS[tier];

  return (
    <span role="img" aria-label={etiqueta} title={etiqueta} style={{ display: 'inline-flex', verticalAlign: 'middle', marginLeft: 6 }}>
      <svg viewBox="0 0 20 20" width={size} height={size}>
        <circle cx="10" cy="10" r="10" fill={color}></circle>
        <path d="M6 10.3l2.6 2.6L14.5 6.7" stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    </span>
  );
}
