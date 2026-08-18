import { cookies } from 'next/headers';
import { isValidAdminToken } from '@/lib/admin-auth';
import LoginForm from '../../LoginForm';
import { getHistorialPersona, CANALES } from '@/lib/reportes';
import GraficoClics from './GraficoClics';
import Link from 'next/link';

const NOMBRES_CANAL: Record<string, string> = {
  whatsapp: 'WhatsApp',
  email: 'Email',
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
};

export default async function ReporteIndividual({
  params,
}: {
  params: Promise<{ carne: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('ncr_admin')?.value;

  if (!isValidAdminToken(token)) {
    return <LoginForm />;
  }

  const { carne } = await params;
  const { nombre, historial, canalesActivos } = await getHistorialPersona(carne);

  return (
    <div style={{ minHeight: '100vh', background: '#F3F0FF', fontFamily: "'Mulish', system-ui, sans-serif", color: '#10004C', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Link href="/admin/reportes" style={{ color: '#10004C', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>← Reporte de clics</Link>
        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '16px 0 4px' }}>{nombre}</h1>
        <p style={{ color: 'rgba(16,0,76,0.6)', marginBottom: '30px' }}>Carné {carne} · Historial desde Agosto 2026</p>

        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '14px', boxShadow: '0 4px 14px rgba(16,0,76,0.06)', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #F3F0FF' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '12px', fontWeight: 800 }}>Mes</th>
                {CANALES.map((canal) => (
                  <th key={canal} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '12px', fontWeight: 800 }}>{NOMBRES_CANAL[canal]}</th>
                ))}
                <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '12px', fontWeight: 800 }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((fila) => (
                <tr key={fila.mes} style={{ borderBottom: '1px solid #F3F0FF' }}>
                  <td style={{ padding: '10px 14px', fontSize: '13px', fontWeight: 700 }}>{fila.etiqueta}</td>
                  {CANALES.map((canal) => (
                    <td key={canal} style={{ padding: '10px 14px', fontSize: '13px' }}>{fila.porCanal[canal] || 0}</td>
                  ))}
                  <td style={{ padding: '10px 14px', fontSize: '13px', fontWeight: 800 }}>{fila.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Tendencia por canal</h2>
        <GraficoClics historial={historial} canalesActivos={canalesActivos} />
      </div>
    </div>
  );
}