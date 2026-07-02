import { PerfilCompleto } from '@/lib/perfiles';

const CORAL = {
  background: '#FFA589',
  light: '#FFE7E1',
  primary: '#FF6A4D',
  dark: '#510F00',
};

function Avatar() {
  return (
    <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '1.5px dashed rgba(81,15,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'repeating-linear-gradient(135deg, rgba(81,15,0,0.08) 0 6px, rgba(81,15,0,0.02) 6px 12px)', flexShrink: 0 }}>
      <span style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: '9px', color: 'rgba(81,15,0,0.6)', textAlign: 'center' }}>foto</span>
    </div>
  );
}

function SpotlightCard({ perfil }: { perfil: PerfilCompleto }) {
  const nombreCompleto = `${perfil.nombre} ${perfil.primerApellido} ${perfil.segundoApellido}`.trim();

  return (
    <div style={{ background: CORAL.light, borderRadius: '18px', padding: '22px', display: 'flex', gap: '18px', alignItems: 'center', flex: '1 1 300px', maxWidth: '380px' }}>
      <Avatar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'inline-block', background: CORAL.primary, color: '#ffffff', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', marginBottom: '8px', letterSpacing: '0.3px' }}>
          PERFIL PREMIUM
        </span>
        <p style={{ margin: 0, fontWeight: 800, fontSize: '17px', color: CORAL.dark }}>{nombreCompleto}</p>
        <p style={{ margin: '4px 0 12px', fontSize: '13px', color: 'rgba(81,15,0,0.55)', fontStyle: 'italic' }}>
          {perfil.especialidad || 'Especialidad por confirmar'}
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', border: '1.5px dashed rgba(81,15,0,0.35)', borderRadius: '999px', padding: '7px 16px', fontSize: '13px', fontWeight: 700, color: 'rgba(81,15,0,0.55)' }}>
          WhatsApp — próximamente
        </div>
      </div>
    </div>
  );
}

export default function Spotlight({ perfiles }: { perfiles: PerfilCompleto[] }) {
  if (perfiles.length === 0) return null;

  return (
    <section style={{ background: CORAL.background, padding: '50px 40px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: 800, color: CORAL.dark, fontFamily: "'Mulish', system-ui, sans-serif" }}>
          Nutricionistas destacados
        </h2>
        <p style={{ margin: '0 0 26px', color: 'rgba(81,15,0,0.7)', fontFamily: "'Mulish', system-ui, sans-serif" }}>
          Perfiles premium — próximamente más nutricionistas destacados
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {perfiles.map((p, i) => (
            <SpotlightCard key={i} perfil={p} />
          ))}
        </div>
      </div>
    </section>
  );
}