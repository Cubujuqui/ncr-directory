import { cookies } from 'next/headers';
import type { CSSProperties } from 'react';
import { isValidAdminToken } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase-admin';
import LoginForm from './LoginForm';
import Link from 'next/link';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('ncr_admin')?.value;

  if (!isValidAdminToken(token)) {
    return <LoginForm />;
  }

  const { count: solicitudesPendientes } = await supabaseAdmin
    .from('solicitudes')
    .select('*', { count: 'exact', head: true })
    .eq('estado_revision', 'pendiente');

  const pillStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#ffffff',
    color: '#10004C',
    textDecoration: 'none',
    borderRadius: '999px',
    padding: '16px 26px',
    fontWeight: 800,
    fontSize: '16px',
    boxShadow: '0 4px 14px rgba(16,0,76,0.06)',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F3F0FF', fontFamily: "'Mulish', system-ui, sans-serif", color: '#10004C', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 24px' }}>Panel de administración</h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          <Link href="/admin/solicitudes" style={pillStyle}>
            Solicitudes
            {!!solicitudesPendientes && (
              <span style={{ color: '#E24B4A' }}>({solicitudesPendientes})</span>
            )}
          </Link>
          <Link href="/admin/editar" style={pillStyle}>Editar perfil</Link>
          <Link href="/admin/pagos" style={pillStyle}>Pagos</Link>
          <Link href="/admin/reportes" style={pillStyle}>Reportes</Link>
        </div>
      </div>
    </div>
  );
}
