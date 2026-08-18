'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CANALES } from '@/lib/canales';
import type { FilaReporte } from '@/lib/reportes';

const NOMBRES_CANAL: Record<string, string> = {
  whatsapp: 'WhatsApp',
  email: 'Email',
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
};

type Columna = 'carne' | 'nombre' | 'tier' | 'total' | typeof CANALES[number];

export default function TablaReportes({ datos }: { datos: FilaReporte[] }) {
  const [columna, setColumna] = useState<Columna>('total');
  const [direccion, setDireccion] = useState<'asc' | 'desc'>('desc');

  function alternarOrden(col: Columna) {
    if (columna === col) {
      setDireccion((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setColumna(col);
      setDireccion('desc');
    }
  }

  const ordenados = [...datos].sort((a, b) => {
    let valorA: string | number;
    let valorB: string | number;
    if (columna === 'carne' || columna === 'nombre' || columna === 'tier') {
      valorA = a[columna];
      valorB = b[columna];
    } else if (columna === 'total') {
      valorA = a.total;
      valorB = b.total;
    } else {
      valorA = a.porCanal[columna] || 0;
      valorB = b.porCanal[columna] || 0;
    }
    if (typeof valorA === 'string') {
      return direccion === 'asc' ? valorA.localeCompare(valorB as string) : (valorB as string).localeCompare(valorA);
    }
    return direccion === 'asc' ? (valorA as number) - (valorB as number) : (valorB as number) - (valorA as number);
  });

  function encabezado(col: Columna, etiqueta: string) {
    return (
      <th
        onClick={() => alternarOrden(col)}
        style={{ cursor: 'pointer', padding: '10px 14px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#10004C', whiteSpace: 'nowrap', userSelect: 'none' }}
      >
        {etiqueta} {columna === col ? (direccion === 'asc' ? '↑' : '↓') : ''}
      </th>
    );
  }

  return (
    <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '14px', boxShadow: '0 4px 14px rgba(16,0,76,0.06)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #F3F0FF' }}>
            {encabezado('carne', 'Carné')}
            {encabezado('nombre', 'Nombre')}
            {encabezado('tier', 'Tier')}
            {encabezado('total', 'Total')}
            {CANALES.map((canal) => encabezado(canal, NOMBRES_CANAL[canal]))}
          </tr>
        </thead>
        <tbody>
          {ordenados.map((fila) => (
            <tr key={fila.carne} style={{ borderBottom: '1px solid #F3F0FF' }}>
              <td style={{ padding: '10px 14px', fontSize: '13px' }}>
                {fila.total > 0 ? (
                  <Link href={`/admin/reportes/${fila.carne}`} style={{ color: '#7370E0', fontWeight: 700, textDecoration: 'none' }}>
                    {fila.carne}
                  </Link>
                ) : (
                  fila.carne
                )}
              </td>
              <td style={{ padding: '10px 14px', fontSize: '13px' }}>{fila.nombre}</td>
              <td style={{ padding: '10px 14px', fontSize: '13px', textTransform: 'capitalize' }}>{fila.tier}</td>
              <td style={{ padding: '10px 14px', fontSize: '13px', fontWeight: 800 }}>{fila.total}</td>
              {CANALES.map((canal) => (
                <td key={canal} style={{ padding: '10px 14px', fontSize: '13px' }}>{fila.porCanal[canal] || 0}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {datos.length === 0 && (
        <p style={{ padding: '20px', color: 'rgba(16,0,76,0.5)', fontSize: '14px' }}>Todavía no hay clics registrados.</p>
      )}
    </div>
  );
}