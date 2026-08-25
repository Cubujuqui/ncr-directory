import { cookies } from 'next/headers';
import { isValidAdminToken } from '@/lib/admin-auth';
import LoginForm from '../LoginForm';
import EditorPerfil from './EditorPerfil';
import Link from 'next/link';

export default async function EditarPerfilPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('ncr_admin')?.value;

  if (!isValidAdminToken(token)) {
    return <LoginForm />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F3F0FF', fontFamily: "'Mulish', system-ui, sans-serif", color: '#10004C', padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Link href="/admin" style={{ color: '#10004C', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>← Solicitudes pendientes</Link>
        <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '16px 0 24px' }}>Editar perfil de nutricionista</h1>
        <EditorPerfil />
      </div>
    </div>
  );
}