'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import FiltroToggle from './FiltroToggle';

export default function FiltrosDirectorio() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const online = searchParams.get('online') === '1';
  const presencial = searchParams.get('presencial') === '1';
  const premium = searchParams.get('premium') === '1';

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
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
      <FiltroToggle activo={online} onClick={() => alternar('online', online)}>Online</FiltroToggle>
      <FiltroToggle activo={presencial} onClick={() => alternar('presencial', presencial)}>Visita presencial</FiltroToggle>
      <FiltroToggle activo={false} disabled>Individual</FiltroToggle>
      <FiltroToggle activo={false} disabled>Grupal</FiltroToggle>
      <FiltroToggle activo={premium} onClick={() => alternar('premium', premium)}>Miembros Premium</FiltroToggle>
      <FiltroToggle activo={false} disabled>¿Acepta seguros?</FiltroToggle>
    </div>
  );
}