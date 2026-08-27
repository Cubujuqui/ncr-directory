'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import FiltroToggle from './FiltroToggle';
import styles from './FiltrosDirectorio.module.css';

export default function FiltrosDirectorio() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const premium = searchParams.get('premium') === '1';
  const online = searchParams.get('online') === '1';
  const domicilio = searchParams.get('domicilio') === '1';
  const consultorio = searchParams.get('consultorio') === '1';
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
      <FiltroToggle activo={premium} onClick={() => alternar('premium', premium)}>Miembros Premium</FiltroToggle>
      <FiltroToggle activo={online} onClick={() => alternar('online', online)}>Atiende Online</FiltroToggle>
      <FiltroToggle activo={domicilio} onClick={() => alternar('domicilio', domicilio)}>Atiende a domicilio</FiltroToggle>
      <FiltroToggle activo={consultorio} onClick={() => alternar('consultorio', consultorio)}>Atiende en consultorio</FiltroToggle>
      <FiltroToggle activo={grupal} onClick={() => alternar('grupal', grupal)}>Ofrece citas grupales</FiltroToggle>
      <FiltroToggle activo={empresas} onClick={() => alternar('empresas', empresas)}>Ofrece servicios a empresas</FiltroToggle>
      <FiltroToggle activo={ingles} onClick={() => alternar('ingles', ingles)}>Habla inglés</FiltroToggle>
      div>
  );
}
