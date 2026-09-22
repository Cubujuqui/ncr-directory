'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import styles from './SelectorOrden.module.css';

const OPCIONES: { valor: string; etiqueta: string }[] = [
  { valor: '', etiqueta: 'Aleatorio' },
  { valor: 'experiencia_desc', etiqueta: 'Más experiencia' },
  { valor: 'experiencia_asc', etiqueta: 'Menos experiencia' },
];

type Props = {
  colorEtiqueta?: string;
  colorTexto?: string;
  colorFondo?: string;
  colorFondoActivo?: string;
  colorTextoActivo?: string;
};

export default function SelectorOrden({
  colorEtiqueta = 'rgba(16,0,76,0.6)',
  colorTexto = '#5A57A8',
  colorFondo = '#ffffff',
  colorFondoActivo = '#E4E0FB',
  colorTextoActivo = '#10004C',
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ordenActual = searchParams.get('orden') || '';

  function seleccionar(valor: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (valor) {
      params.set('orden', valor);
    } else {
      params.delete('orden');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className={styles.contenedor}>
      <span className={styles.etiqueta} style={{ color: colorEtiqueta }}>Ordenar por:</span>
      {OPCIONES.map((op) => {
        const activo = ordenActual === op.valor;
        return (
          <button
            key={op.valor || 'aleatorio'}
            onClick={() => seleccionar(op.valor)}
            className={styles.boton}
            style={{
              background: activo ? colorFondoActivo : colorFondo,
              color: activo ? colorTextoActivo : colorTexto,
              fontWeight: activo ? 800 : 700,
            }}
          >
            {op.etiqueta}
          </button>
        );
      })}
    </div>
  );
}
