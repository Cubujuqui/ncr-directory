'use client';

import { useRouter } from 'next/navigation';

export default function SelectorMes({ mesActual, opciones }: { mesActual: string; opciones: string[] }) {
  const router = useRouter();

  return (
    <select
      value={mesActual}
      onChange={(e) => router.push(`/admin/reportes?mes=${e.target.value}`)}
      style={{ padding: '9px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.2)', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, color: '#10004C', background: '#fff' }}
    >
      {opciones.map((mes) => (
        <option key={mes} value={mes}>{formatearMes(mes)}</option>
      ))}
    </select>
  );
}

function formatearMes(mes: string): string {
  const [anio, mesNum] = mes.split('-');
  const nombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return `${nombres[parseInt(mesNum, 10) - 1]} ${anio}`;
}