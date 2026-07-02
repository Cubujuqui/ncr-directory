import { getNutricionistas } from '@/lib/nutricionistas';
import Link from 'next/link';

export default async function Directorio({
  searchParams,
}: {
  searchParams: Promise<{ especialidad?: string }>;
}) {
  const { especialidad } = await searchParams;
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
        <p style={{ marginBottom: '30px', color: 'rgba(16,0,76,0.7)' }}>
          {resultados.length} nutricionistas encontrados
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