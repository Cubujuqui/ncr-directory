'use client';

type Props = {
  href: string | null;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export default function TarjetaClicable({ href, children, style, className }: Props) {
  function manejarClick(e: React.MouseEvent<HTMLDivElement>) {
    const objetivo = e.target as HTMLElement;
    if (objetivo.closest('a')) return;
    if (!href) return;
    window.open(href, '_blank', 'noopener,noreferrer');
  }

  return (
    <div onClick={manejarClick} className={className} style={{ cursor: href ? 'pointer' : 'default', ...style }}>
      {children}
    </div>
  );
}