'use client';

import styles from './FiltroToggle.module.css';

type Props = {
  activo: boolean;
  disabled?: boolean;
  onClick?: () => void;
  icono?: React.ReactNode;
  children: React.ReactNode;
};

export default function FiltroToggle({ activo, disabled, onClick, icono, children }: Props) {
  const clases = [
    styles.boton,
    activo && !disabled ? styles.activo : '',
    disabled ? styles.deshabilitado : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      title={disabled ? 'Próximamente' : undefined}
      className={clases}
    >
      {icono}
      {children}
    </button>
  );
}