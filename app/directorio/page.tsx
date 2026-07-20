import { getNutricionistas } from '@/lib/nutricionistas';
import { perfilesManual } from '@/lib/perfiles-manual';
import SocialIcons from '@/components/SocialIcons';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
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
<p style={{ marginBottom: '10px', color: 'rgba(16,0,76,0.5)', fontSize: '13px' }}>
          Nota: aún no filtramos por modalidad o tipo de sesión — mostrando todos los que coinciden con la especialidad.
        </p>
        <p style={{ marginBottom: '30px', color: 'rgba(16,0,76,0.5)', fontSize: '13px' }}>
          Mostrando 50 resultados solamente para garantizar igualdad y performance del sitio.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {shuffle(resultados).slice(0, 50).map((n, i) => {
            const tieneEspecialidad = !!n.Especialidad?.trim();
            const manual = perfilesManual.find((m) => m.carne === n['Carné'].trim());
            const tier = manual?.tier ?? 'free';
            return (
              <div key={i} style={{ background: '#F3F0FF', borderRadius: '14px', padding: '16px 20px' }}>
                <p style={{ fontWeight: 700, margin: 0, fontSize: '16px', color: '#10004C' }}>
                  {n.Nombre} {n['Primer Apellido']} {n['Segundo Apellido']}
                </p>
                <p style={{ margin: '4px 0 10px', fontSize: '12px', color: 'rgba(16,0,76,0.5)' }}>
                  Carné {n['Carné']}
                </p>
<p style={{ margin: '0 0 2px', fontSize: '12px', color: 'rgba(16,0,76,0.4)' }}>
                  Especialidades: {tieneEspecialidad ? 'Sí' : 'No'}
                </p>
                <p style={{ margin: '0 0 2px', fontSize: '12px', color: 'rgba(16,0,76,0.4)' }}>
                  Citas online: No indica
                </p>
                <p style={{ margin: '0 0 12px', fontSize: '12px', color: 'rgba(16,0,76,0.4)' }}>
                  Visita a domicilio: No indica
                </p>
<SocialIcons
                  tier={tier}
                  whatsapp={manual?.whatsapp ?? null}
                  instagram={manual?.instagram ?? null}
                  tiktok={manual?.tiktok ?? null}
                  youtube={manual?.youtube ?? null}
                  linkedin={manual?.linkedin ?? null}
                  activeColor="#7370E0"
                  grayColor="#10004C"
                  size={26}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}