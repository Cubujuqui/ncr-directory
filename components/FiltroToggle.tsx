'use client';

type Props = {
  activo: boolean;
  disabled?: boolean;
  onClick?: () => void;
  icono?: React.ReactNode;
  children: React.ReactNode;
};

export default function FiltroToggle({ activo, disabled, onClick, icono, children }: Props) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      title={disabled ? 'Próximamente' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: disabled ? '#F0F0F0' : activo ? '#E4E0FB' : '#ffffff',
        color: disabled ? '#B0AEB8' : activo ? '#10004C' : '#5A57A8',
        borderRadius: '999px',
        padding: '9px 18px',
        fontFamily: 'inherit',
        fontSize: '15px',
        fontWeight: activo ? 800 : 700,
        opacity: disabled ? 0.65 : 1,
      }}
    >
      {icono}
      {children}
    </button>
  );
}