import { cookies } from 'next/headers';
import { isValidAdminToken } from '@/lib/admin-auth';
import LoginForm from '../LoginForm';
import Link from 'next/link';
import { listarTestimonios } from '../actions';
import TestimoniosAdmin from './TestimoniosAdmin';

export default async function TestimoniosPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('ncr_admin')?.value;

  if (!isValidAdminToken(token)) {
    return <LoginForm />;
  }

  const testimonios = await listarTestimonios();

  return (
    <div style={{ minHeight: '100vh', background: '#F3F0FF', fontFamily: "'Mulish', system-ui, sans-serif", color: '#10004C', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/admin" style={{ color: '#10004C', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>← Volver al panel</Link>
        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '16px 0 6px' }}>Testimonios</h1>
        <p style={{ color: 'rgba(16,0,76,0.6)', marginBottom: '30px' }}>
          {testimonios.length} testimonio{testimonios.length === 1 ? '' : 's'} guardado{testimonios.length === 1 ? '' : 's'} — se muestran en el sitio a partir de 3.
        </p>

        <TestimoniosAdmin testimoniosIniciales={testimonios} />
      </div>
    </div>
  );
}
