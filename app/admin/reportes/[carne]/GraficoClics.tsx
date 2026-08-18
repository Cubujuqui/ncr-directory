'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const NOMBRES_CANAL: Record<string, string> = {
  whatsapp: 'WhatsApp',
  email: 'Email',
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
};

type Props = {
  historial: { etiqueta: string; porCanal: Record<string, number> }[];
  canalesActivos: string[];
};

export default function GraficoClics({ historial, canalesActivos }: Props) {
  if (canalesActivos.length === 0) {
    return <p style={{ color: 'rgba(16,0,76,0.5)', fontSize: '14px' }}>No hay canales con clics registrados todavía.</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
      {canalesActivos.map((canal) => {
        const datos = historial.map((h) => ({ mes: h.etiqueta, clics: h.porCanal[canal] || 0 }));
        return (
          <div key={canal} style={{ background: '#fff', borderRadius: '14px', padding: '16px', boxShadow: '0 4px 14px rgba(16,0,76,0.06)' }}>
            <p style={{ fontWeight: 800, fontSize: '14px', margin: '0 0 10px', color: '#10004C' }}>{NOMBRES_CANAL[canal]}</p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={datos}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F0FF" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="clics" stroke="#7370E0" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
}