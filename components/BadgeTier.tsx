type Tier = 'free' | 'contact' | 'premium';

const COLORES: Record<'premium' | 'contact', string> = {
  premium: '#FF6A4D',
  contact: '#7370E0',
};

const ETIQUETAS: Record<'premium' | 'contact', string> = {
  premium: 'Perfil Premium',
  contact: 'Perfil Contacto',
};

const PETALOS = [
  { cx: 10, cy: 3.6 },
  { cx: 13.76, cy: 4.82 },
  { cx: 16.09, cy: 8.02 },
  { cx: 16.09, cy: 11.98 },
  { cx: 13.76, cy: 15.18 },
  { cx: 10, cy: 16.4 },
  { cx: 6.24, cy: 15.18 },
  { cx: 3.91, cy: 11.98 },
  { cx: 3.91, cy: 8.02 },
  { cx: 6.24, cy: 4.82 },
];

export default function BadgeTier({ tier, size = 18 }: { tier: Tier; size?: number }) {
  if (tier === 'free') return null;

  const color = COLORES[tier];
  const etiqueta = ETIQUETAS[tier];

  return (
    <span role="img" aria-label={etiqueta} title={etiqueta} style={{ display: 'inline-flex', flexShrink: 0, verticalAlign: 'middle' }}>
      <svg viewBox="0 0 20 20" width={size} height={size}>
        <circle cx="10" cy="10" r="5.6" fill={color}></circle>
        {PETALOS.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r="3.1" fill={color}></circle>
        ))}
        <path d="M6 10.3l2.6 2.6L14.5 6.7" stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    </span>
  );
}
