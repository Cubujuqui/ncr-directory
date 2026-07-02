import { getEspecialidades } from '@/lib/nutricionistas';
import SearchBar from '@/components/SearchBar';
import Spotlight from '@/components/Spotlight';
import { getPerfilesDestacados, getFilasSecundarias } from '@/lib/perfiles';

export default function Home() {
  const especialidades = getEspecialidades();
  const perfilesDestacados = getPerfilesDestacados();
  const filasSecundarias = getFilasSecundarias();

  return (
    <div style={{ minHeight: '100vh', background: '#BFB6FF', fontFamily: "'Mulish', system-ui, sans-serif", color: '#10004C', overflow: 'hidden', position: 'relative' }}>

      {/* NAV */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', maxWidth: '1400px', margin: '0 auto', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px dashed rgba(16,0,76,0.5)', borderRadius: '8px', backgroundImage: 'repeating-linear-gradient(135deg, rgba(16,0,76,0.10) 0 6px, rgba(16,0,76,0.02) 6px 12px)' }}>
            <span style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: '8px', lineHeight: 1.05, color: 'rgba(16,0,76,0.85)', textAlign: 'center', letterSpacing: '0.2px' }}>logo.svg</span>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '30px', marginLeft: 'auto' }}>
          <a href="#" style={{ color: '#10004C', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}></a>
          <a href="#" style={{ color: '#10004C', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}></a>
          <a href="#" style={{ color: '#10004C', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}></a>
          <a href="#" style={{ color: '#10004C', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}></a>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1.5px solid rgba(16,0,76,0.55)', borderRadius: '999px', padding: '11px 22px', color: '#10004C', textDecoration: 'none', fontSize: '15px', fontWeight: 700, textAlign: 'center' }}>
            Acceso VIP para Nutri&apos;s
          </a>
        </nav>
      </header>

      {/* HERO */}
      <main style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '70px 40px 90px', display: 'flex', alignItems: 'center', gap: '48px' }}>
        <div style={{ flex: '1 1 600px', maxWidth: '760px', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '42px', lineHeight: 1.12, fontWeight: 800, margin: '0 0 18px', letterSpacing: '-0.5px' }}>¿Buscás nutricionistas en Costa Rica?</h1>
          <p style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 34px' }}>¿Agendamos una cita?</p>

          <SearchBar especialidades={especialidades} />
        </div>

        {/* ILLUSTRATION PLACEHOLDER */}
        <div style={{ position: 'relative', order: -1, flex: '0 0 480px', width: '480px', height: '420px', zIndex: 1, marginRight: '-70px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(closest-side, rgba(243,240,255,0.55), transparent 72%)' }}></div>
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '18px', border: '1.5px dashed rgba(16,0,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'repeating-linear-gradient(135deg, rgba(16,0,76,0.06) 0 10px, rgba(16,0,76,0.02) 10px 20px)' }}>
            <span style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: '13px', color: 'rgba(16,0,76,0.7)', letterSpacing: '0.3px', textAlign: 'center', padding: '0 20px' }}>illustration — group of doctors &amp; patients</span>
          </div>
        </div>
      </main>
<Spotlight perfiles={perfilesDestacados} filasSecundarias={filasSecundarias} />
      {/* FOOTER */}
      <footer style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <a href="#" aria-label="Instagram" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '999px', color: '#10004C', textDecoration: 'none' }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#10004C" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5"></rect>
              <circle cx="12" cy="12" r="4"></circle>
              <circle cx="17.4" cy="6.6" r="1.1" fill="#10004C" stroke="none"></circle>
            </svg>
          </a>
        </div>
        <a href="#" style={{ color: 'rgba(16,0,76,0.6)', textDecoration: 'none', fontSize: '13px', fontWeight: 400 }}>Lo que debes saber</a>
      </footer>
    </div>
  );
}