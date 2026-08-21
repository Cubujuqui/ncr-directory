'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import FiltroToggle from './FiltroToggle';
import styles from './FiltrosDirectorio.module.css';

export default function FiltrosDirectorio() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const online = searchParams.get('online') === '1';
  const presencial = searchParams.get('presencial') === '1';
  const premium = searchParams.get('premium') === '1';
  const grupal = searchParams.get('grupal') === '1';
  const empresas = searchParams.get('empresas') === '1';
  const ingles = searchParams.get('ingles') === '1';

  function alternar(clave: string, valorActual: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    if (valorActual) {
      params.delete(clave);
    } else {
      params.set(clave, '1');
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.contenedor}>
      <FiltroToggle activo={online} onClick={() => alternar('online', online)}>Online</FiltroToggle>
      <FiltroToggle activo={presencial} onClick={() => alternar('presencial', presencial)}>Visita presencial</FiltroToggle>
      <FiltroToggle activo={grupal} onClick={() => alternar('grupal', grupal)}>Citas grupales</FiltroToggle>
      <FiltroToggle activo={empresas} onClick={() => alternar('empresas', empresas)}>Servicios a empresas</FiltroToggle>
      <FiltroToggle activo={ingles} onClick={() => alternar('ingles', ingles)}>Habla inglés</FiltroToggle>
      <FiltroToggle activo={premium} onClick={() => alternar('premium', premium)}>Miembros Premium</FiltroToggle>
      <FiltroToggle activo={false} disabled>¿Acepta seguros?</FiltroToggle>
    </div>
  );
}