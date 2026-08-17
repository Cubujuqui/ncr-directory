import { cookies } from 'next/headers';
import { isValidAdminToken } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase-admin';
import LoginForm from './LoginForm';
import { aprobarSolicitud, rechazarSolicitud } from './actions';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('ncr_admin')?.value;

  if (!isValidAdminToken(token)) {
    return <LoginForm />;
  }

  const { data: solicitudes } = await supabaseAdmin
    .from('solicitudes')
    .select('*')
    .eq('estado_revision', 'pendiente')
    .order('created_at', { ascending: true });

  const solicitudesConFoto = await Promise.all(
    (solicitudes || []).map(async (s) => {
      let fotoUrl: string | null = null;
      if (s.carne_foto_url) {
        const { data } = await supabaseAdmin.storage
          .from('carnes-verificacion')
          .createSignedUrl(s.carne_foto_url, 3600);
        fotoUrl = data?.signedUrl || null;
      }
      return { ...s, fotoUrlFirmada: fotoUrl };
    })
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F3F0FF', fontFamily: "'Mulish', system-ui, sans-serif", color: '#10004C', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>Solicitudes pendientes</h1>
        <p style={{ color: 'rgba(16,0,76,0.6)', marginBottom: '30px' }}>{solicitudesConFoto.length} esperando revisión</p>

        {solicitudesConFoto.length === 0 && (
          <p style={{ color: 'rgba(16,0,76,0.5)' }}>No hay solicitudes pendientes.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {solicitudesConFoto.map((s) => (
            <div key={s.id} style={{ background: '#fff', borderRadius: '16px', padding: '22px', boxShadow: '0 4px 14px rgba(16,0,76,0.06)' }}>
<div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
{s.fotoUrlFirmada && (
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(16,0,76,0.5)', margin: '0 0 4px' }}>Carné (verificación)</p>
                      <a href={s.fotoUrlFirmada} target="_blank" rel="noopener noreferrer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.fotoUrlFirmada} alt="Carné" style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '10px', cursor: 'zoom-in' }} />
                      </a>
                    </div>
                  )}                  
                  {s.foto_url && (
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(16,0,76,0.5)', margin: '0 0 4px' }}>Foto de perfil (pública)</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.foto_url} alt="Foto de perfil" style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '10px' }} />
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 800, fontSize: '17px', margin: '0 0 4px' }}>Carné {s.carne}</p>
                  <p style={{ fontSize: '13px', color: 'rgba(16,0,76,0.5)', margin: '0 0 10px' }}>
                    Enviado: {new Date(s.created_at).toLocaleString('es-CR')}
                  </p>

<div style={{ fontSize: '14px', lineHeight: 1.8 }}>
                    <p><strong>Nivel solicitado:</strong> {s.tier}</p>
                    <p><strong>Nombre preferido:</strong> {s.nombre_preferido || 'No indica'}</p>
<p><strong>WhatsApp:</strong> {s.whatsapp || 'No indica'}</p>
                    <p><strong>Email:</strong> {s.email || 'No indica'}</p>
                    <p><strong>Facebook:</strong> {s.facebook || 'No indica'}</p>
                    <p><strong>Instagram:</strong> {s.instagram || 'No indica'}</p>
                    <p><strong>TikTok:</strong> {s.tiktok || 'No indica'}</p>
                    <p><strong>YouTube:</strong> {s.youtube || 'No indica'}</p>
                    <p><strong>LinkedIn:</strong> {s.linkedin || 'No indica'}</p>
                    <p><strong>Canal principal:</strong> {s.punto_contacto_primario}</p>
                    <p><strong>Citas online:</strong> {s.citas_online ? 'Sí' : 'No'}</p>
                    <p><strong>Visita a domicilio:</strong> {s.visita_domicilio ? 'Sí' : 'No'}</p>
                    <p><strong>Referido por:</strong> {s.referido_por || 'No indica'}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                    <form action={aprobarSolicitud.bind(null, s.id)}>
                      <button type="submit" style={{ background: '#4ECECE', color: '#003333', border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                        Aprobar
                      </button>
                    </form>
                    <form action={rechazarSolicitud.bind(null, s.id)}>
                      <button type="submit" style={{ background: '#F3F0FF', color: '#10004C', border: '1.5px solid rgba(16,0,76,0.2)', borderRadius: '10px', padding: '10px 20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                        Rechazar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}