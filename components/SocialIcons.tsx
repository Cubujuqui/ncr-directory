import React from 'react';
type Tier = 'premium' | 'contact' | 'free';

type Props = {
  tier: Tier;
  whatsapp: string | null;
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
  linkedin: string | null;
  activeColor: string;
  grayColor: string;
  size?: number;
};

const ICONOS = {
  whatsapp: (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}><path d="M3 21l1.65-4.95A9 9 0 1 1 8.05 19.35L3 21z"></path></svg>
  ),
  instagram: (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.4" cy="6.6" r="1.1" fill={color} stroke="none"></circle></svg>
  ),
  tiktok: (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}><path d="M14 3v10.5a3.5 3.5 0 1 1-2-3.163V3h2z"></path><path d="M14 6a5 5 0 0 0 5 5"></path></svg>
  ),
  youtube: (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}><rect x="3" y="6" width="18" height="12" rx="4"></rect><path d="M10 9l6 3-6 3V9z" fill={color} stroke="none"></path></svg>
  ),
  linkedin: (color: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  ),
};

function getHref(platform: keyof typeof ICONOS, value: string) {
  if (platform === 'whatsapp') return 'https://wa.me/' + value;
  if (platform === 'instagram') return 'https://instagram.com/' + value;
  if (platform === 'tiktok') return 'https://tiktok.com/@' + value;
  return value;
}

export default function SocialIcons(props: Props) {
  const tier = props.tier;
  const activeColor = props.activeColor;
  const grayColor = props.grayColor;
  const size = props.size || 30;
  const iconSize = Math.round(size * 0.5);

  const valores: Record<keyof typeof ICONOS, string | null> = {
    whatsapp: props.whatsapp,
    instagram: props.instagram,
    tiktok: props.tiktok,
    youtube: props.youtube,
    linkedin: props.linkedin,
  };

  const orden: (keyof typeof ICONOS)[] = ['whatsapp', 'instagram', 'tiktok', 'youtube', 'linkedin'];

  const items = orden.map(function (platform) {
    const permitido = tier === 'premium' || (tier === 'contact' && platform === 'whatsapp');
    const valor = valores[platform];
    const activo = permitido && !!valor;

    if (activo) {
      const enlace = getHref(platform, valor as string);
      return React.createElement(
        'a',
        {
          key: platform,
          href: enlace,
          target: '_blank',
          rel: 'noopener noreferrer',
          title: platform,
          style: {
            width: size,
            height: size,
            borderRadius: '50%',
            background: activeColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
        <span key="icon" style={{ width: iconSize, height: iconSize }}>{ICONOS[platform]('#ffffff')}</span>
      );
    }

    return (
      <div
        key={platform}
        title={platform + ' — no disponible'}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: '1.5px dashed ' + grayColor + '55',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ width: iconSize, height: iconSize }}>{ICONOS[platform](grayColor + '99')}</span>
      </div>
    );
  });

  return <div style={{ display: 'flex', gap: '8px' }}>{items}</div>;
}