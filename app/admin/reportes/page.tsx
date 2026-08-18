import { cookies } from 'next/headers';
import { isValidAdminToken } from '@/lib/admin-auth';
import LoginForm from '../LoginForm';
import { getReporteClicks } from '@/lib/reportes';
import TablaReportes from './TablaReportes';
import SelectorMes from './SelectorMes';
import Link from 'next/link';

function generarOpcionesMes(): string[] {
  const inicio = new Date('2026-08-01T00:00:00Z');
  const ahora = new Date();
  const opciones: string[] = [];
  const cursor = new Date(inicio);
  while (cursor <= ahora) {
    opciones.push(cursor.toISOString().slice(0, 7));
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return opciones.reverse();
}

export default async function ReportesPage({
  searchParams,
}: {
  searchParams: Promise<{ mes?: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('ncr_admin')?.value;

  if (!isValidAdminToken(token)) {
    return <LoginForm />;
  }

  const opciones = generarOpcionesMes();
  const { mes: mesParam } = await searchParams;
  const mes = mesParam && opciones.includes(mesParam) ? mesParam : opciones[0];

  const datos = await getReporteClicks(mes);

  return (
    <div style={{ minHeight: '100vh', background: '#F3F0FF', fontFamily: "'Mulish', system-ui, sans-serif", color: '#10004C', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Link href="/admin" style={{ color: '#10004C', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>← Solicitudes pendientes</Link>
        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '16px 0 20px' }}>Reporte de clics</h1>

        <div style={{ marginBottom: '20px' }}>
          <SelectorMes mesActual={mes} opciones={opciones} />
        </div>

        <TablaReportes datos={datos} />
      </div>
    </div>
  );
}