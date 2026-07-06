import { PerfilCompleto, FilaSecundaria } from '@/lib/perfiles';

const PALETAS = [
  { background: '#BFB6FF', light: '#F3F0FF', primary: '#7370E0', dark: '#10004C' },
  { background: '#FFA589', light: '#FFE7E1', primary: '#FF6A4D', dark: '#510F00' },
  { background: '#AFE8E8', light: '#E8FCFB', primary: '#4ECECE', dark: '#003333' },
  { background: '#FFBD66', light: '#FFEFD9', primary: '#EF8800', dark: '#5B2F00' },
];

const SECTION_BG = '#FFA589';

function PremiumCard({ perfil, paleta }: { perfil: PerfilCompleto; paleta: typeof PALETAS[number] }) {
  const nombreCompleto = `${perfil.nombre} ${perfil.primerApellido} ${perfil.segundoApellido}`.trim();

  return (
    <div style={{ background: paleta.light, borderRadius: '18px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.08)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', aspectRatio: '1 / 1', background: `${paleta.dark}0d` }}>
        {perfil.fotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={perfil.fotoUrl} alt={nombreCompleto} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', border: `1.5px dashed ${paleta.dark}66`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `repeating-linear-gradient(135deg, ${paleta.dark}14 0 6px, ${paleta.dark}05 6px 12px)` }}>
            <span style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: '11px', color: `${paleta.dark}99`, textAlign: 'center' }}>foto</span>
          </div>
        )}
      </div>

      <div style={{ padding: '18px 22px 22px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
        <span style={{ display: 'inline-block', background: paleta.primary, color: '#ffffff', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', marginBottom: '10px', letterSpacing: '0.3px' }}>
          PERFIL PREMIUM
        </span>
        <p style={{ margin: 0, fontWeight: 800, fontSize: '16px', color: paleta.dark }}>{nombreCompleto}</p>
        <p style={{ margin: '4px 0 14px', fontSize: '13px', color: `${paleta.dark}99`, fontStyle: 'italic' }}>
          {perfil.especialidad || 'Especialidad por confirmar'}
        </p>

        <div style={{ display: 'flex', gap: '8px' }}>
          {perfil.whatsapp ? (
            <a href={`https://wa.me/${perfil.whatsapp}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{ width: '30px', height: '30px', borderRadius: '50%', background: paleta.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#ffffff" strokeWidth={2}><path d="M3 21l1.65-4.95A9 9 0 1 1 8.05 19.35L3 21z"></path></svg>
            </a>
          ) : (
            <div title="WhatsApp — próximamente" style={{ width: '30px', height: '30px', borderRadius: '50%', border: `1.5px dashed ${paleta.dark}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={`${paleta.dark}99`} strokeWidth={2}><path d="M3 21l1.65-4.95A9 9 0 1 1 8.05 19.35L3 21z"></path></svg>
            </div>
          )}
          {perfil.instagram ? (
            <a href={`https://instagram.com/${perfil.instagram}`} target="_blank" rel="noopener noreferrer" title="Instagram" style={{ width: '30px', height: '30px', borderRadius: '50%', background: paleta.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#ffffff" strokeWidth={1.8}><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.4" cy="6.6" r="1.1" fill="#ffffff" stroke="none"></circle></svg>
            </a>
          ) : (
            <div title="Instagram — próximamente" style={{ width: '30px', height: '30px', borderRadius: '50%', border: `1.5px dashed ${paleta.dark}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={`${paleta.dark}99`} strokeWidth={1.8}><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.4" cy="6.6" r="1.1" fill={`${paleta.dark}99`} stroke="none"></circle></svg>
            </div>
          )}
          {perfil.linkedin ? (
            <a href={perfil.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ width: '30px', height: '30px', borderRadius: '50%', background: paleta.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#ffffff" strokeWidth={1.8}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          ) : (
            <div title="LinkedIn — próximamente" style={{ width: '30px', height: '30px', borderRadius: '50%', border: `1.5px dashed ${paleta.dark}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={`${paleta.dark}99`} strokeWidth={1.8}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function FilaSecundariaRow({ fila }: { fila: FilaSecundaria }) {
  const nombreCompleto = `${fila.nombre} ${fila.primerApellido} ${fila.segundoApellido}`.trim();
  return (
    <div style={{ background: '#ffffff', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
      <span style={{ fontSize: '14px', fontWeight: 600, color: '#510F00', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {nombreCompleto}
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {fila.tier === 'contact' && (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#25D366" strokeWidth={2}><path d="M3 21l1.65-4.95A9 9 0 1 1 8.05 19.35L3 21z"></path></svg>
        )}
        <span style={{ fontSize: '10px', fontWeight: 800, color: fila.tier === 'contact' ? '#FF6A4D' : 'rgba(81,15,0,0.4)' }}>
          {fila.tier === 'contact' ? 'CONTACTO' : 'GRATIS'}
        </span>
      </span>
    </div>
  );
}

export default function Spotlight({ perfiles }: { perfiles: PerfilCompleto[] }) {
  if (perfiles.length === 0) return null;

  return (
    <section style={{ background: SECTION_BG, padding: '50px 40px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: 800, color: '#510F00', fontFamily: "'Mulish', system-ui, sans-serif" }}>
          Nutricionistas destacados
        </h2>
        <p style={{ margin: '0 0 26px', color: 'rgba(81,15,0,0.7)', fontFamily: "'Mulish', system-ui, sans-serif" }}>
          Perfiles premium — próximamente más nutricionistas destacados
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${perfiles.length}, 1fr)`, gap: '20px' }}>
          {perfiles.map((p, i) => (
            <PremiumCard key={i} perfil={p} paleta={PALETAS[i % PALETAS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}