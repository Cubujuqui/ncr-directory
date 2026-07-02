import { getNutricionistas } from '@/lib/nutricionistas';
import Link from 'next/link';

export default async function Directorio({
  searchParams,
}: {
  searchParams: Promise<{ especialidad?: string; modo?: string; tipo?: string }>;
}) {
  const { especialidad, modo, tipo } = await searchParams;
  const all = getNutricionistas();

  const resultados = all.filter((n) => {
    if (n.Estado !== 'Activo') return false;
    if (especialidad && n.Especialidad?.trim() !== especialidad) return false;
    return true;
  });

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
          {resultados.length} nutricionistas encontrados
        </p>
        <p style={{ marginBottom: '30px', color: 'rgba(16,0,76,0.5)', fontSize: '13px' }}>
          Nota: aún no filtramos por modalidad o tipo de sesión — mostrando todos los que coinciden con la especialidad.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {resultados.slice(0, 50).map((n, i) => (
            <div key={i} style={{ background: '#F3F0FF', borderRadius: '14px', padding: '18px 22px' }}>
              <p style={{ fontWeight: 700, margin: 0, fontSize: '17px' }}>
                {n.Nombre} {n['Primer Apellido']} {n['Segundo Apellido']}
              </p>
              {n.Especialidad && (
                <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#5A57A8' }}>{n.Especialidad}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}