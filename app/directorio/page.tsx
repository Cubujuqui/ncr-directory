import { ordenarResultadosDirectorio } from '@/lib/perfiles';
import SocialIcons, { getHref } from '@/components/SocialIcons';
import TarjetaClicable from '@/components/TarjetaClicable';
import Link from 'next/link';

function calcularEnlacePrincipal(perfil: { tier: string; puntoContactoPrimario: string; carne: string | null; whatsapp: string | null; email: string | null; facebook: string | null; instagram: string | null; tiktok: string | null; youtube: string | null; linkedin: string | null }) {
  const canal = perfil.puntoContactoPrimario as 'whatsapp' | 'email' | 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'linkedin';
  const esActivo = perfil.tier === 'premium' || (perfil.tier === 'contact' && (canal === 'whatsapp' || canal === 'email'));
  if (!esActivo) return null;
  const valor = perfil[canal];
  if (!valor) return null;
  return getHref(canal, valor, perfil.carne ?? undefined);
}

export default async function Directorio({
  searchParams,
}: {
  searchParams: Promise<{ especialidad?: string; modo?: string; tipo?: string }>;
}) {
  const { especialidad, modo, tipo } = await searchParams;
  const { resultados, total } = await ordenarResultadosDirectorio(especialidad, 50);

  return (
    <div style={{ minHeight: '100vh', background: '#BFB6FF', fontFamily: "'Mulish', system-ui, sans-serif", color: '#10004C', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#10004C', textDecoration: 'none', fontWeight: 700, fontSize: '15px' }}>← Volver</Link>

        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '20px 0 8px' }}>
          {especialidad ? especialidad : 'Todos los nutricionistas activos'}
        </h1>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {modo && (
            <span style={{ background: '#ffffff', color: '#5A57A8', borderRadius: '999px', padding: '5px 14px', fontSize: '13px', fontWeight: 700 }}>
              {modo === 'online' ? 'Online' : 'Visita presencial'}
            </span>
          )}
          {tipo && (
            <span style={{ background: '#ffffff', color: '#5A57A8', borderRadius: '999px', padding: '5px 14px', fontSize: '13px', fontWeight: 700 }}>
              {tipo === 'individual' ? 'Individual' : 'Grupal'}
            </span>
          )}
        </div>

        <p style={{ marginBottom: '10px', color: 'rgba(16,0,76,0.7)' }}>
          {total} nutricionistas encontrados
        </p>
        <p style={{ marginBottom: '10px', color: 'rgba(16,0,76,0.5)', fontSize: '13px' }}>
          Nota: aún no filtramos por modalidad o tipo de sesión — mostrando todos los que coinciden con la especialidad.
        </p>
        <p style={{ marginBottom: '30px', color: 'rgba(16,0,76,0.5)', fontSize: '13px' }}>
          Mostrando 50 resultados solamente para garantizar igualdad y performance del sitio.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {resultados.map((perfil, i) => {
            const tieneEspecialidad = !!perfil.especialidad;
            const citasTexto = perfil.citasOnline === true ? 'Sí' : perfil.citasOnline === false ? 'No' : 'No indica';
            const domicilioTexto = perfil.visitaDomicilio === true ? 'Sí' : perfil.visitaDomicilio === false ? 'No' : 'No indica';
const enlacePrincipal = calcularEnlacePrincipal(perfil);
            return (
              <TarjetaClicable key={perfil.carne ?? i} href={enlacePrincipal} style={{ background: '#F3F0FF', borderRadius: '14px', padding: '16px 20px' }}>                <p style={{ fontWeight: 700, margin: 0, fontSize: '16px', color: '#10004C' }}>
                  {perfil.nombre} {perfil.primerApellido} {perfil.segundoApellido}
                </p>
                <p style={{ margin: '4px 0 10px', fontSize: '12px', color: 'rgba(16,0,76,0.5)' }}>
                  Carné {perfil.carne}
                </p>
                <p style={{ margin: '0 0 2px', fontSize: '12px', color: 'rgba(16,0,76,0.4)' }}>
                  Especialidades: {tieneEspecialidad ? 'Sí' : 'No'}
                </p>
                <p style={{ margin: '0 0 2px', fontSize: '12px', color: 'rgba(16,0,76,0.4)' }}>
                  Citas online: {citasTexto}
                </p>
                <p style={{ margin: '0 0 12px', fontSize: '12px', color: 'rgba(16,0,76,0.4)' }}>
                  Visita a domicilio: {domicilioTexto}
                </p>
<SocialIcons
                  tier={perfil.tier}
                  identificador={perfil.carne ?? ''}
                  whatsapp={perfil.whatsapp}
                  email={perfil.email}
                  facebook={perfil.facebook}
                  instagram={perfil.instagram}
                  tiktok={perfil.tiktok}
                  youtube={perfil.youtube}
                  linkedin={perfil.linkedin}
                  activeColor="#7370E0"
                  grayColor="#10004C"
size={26}
                />
              </TarjetaClicable>
            );
          })}        </div>
      </div>
    </div>
  );
}