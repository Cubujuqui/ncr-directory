'use client';

type Props = {
  href: string | null;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export default function TarjetaClicable({ href, onClick, children, style, className }: Props) {
  function manejarClick(e: React.MouseEvent<HTMLDivElement>) {
    const objetivo = e.target as HTMLElement;
    if (objetivo.closest('a')) return;
    if (onClick) {
      onClick();
      return;
    }
    if (!href) return;
    window.open(href, '_blank', 'noopener,noreferrer');
  }

  const esClicable = !!onClick || !!href;

  return (
    <div onClick={manejarClick} className={className} style={{ cursor: esClicable ? 'pointer' : 'default', ...style }}>
      {children}
    </div>
  );
}
