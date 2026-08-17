import Link from 'next/link';
import { getEspecialidades } from '@/lib/nutricionistas';
import SearchBar from '@/components/SearchBar';
import Spotlight from '@/components/Spotlight';
import { getPerfilesDestacados } from '@/lib/perfiles';
import Image from 'next/image';
import SocialIcons from '@/components/SocialIcons';
import { whatsappAdmin } from '@/lib/contacto-admin';

export default async function Home() {
  const especialidades = getEspecialidades();
  const perfilesDestacados = await getPerfilesDestacados();

  return (
    <div style={{ minHeight: '100vh', background: '#BFB6FF', fontFamily: "'Mulish', system-ui, sans-serif", color: '#10004C', overflow: 'hidden', position: 'relative' }}>

      {/* NAV */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', maxWidth: '1400px', margin: '0 auto', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
<Image src="/ncr-disc.svg" alt="Nutricionistas en Costa Rica" width={44} height={44} />        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '30px', marginLeft: 'auto' }}>
          <a href="#" style={{ color: '#10004C', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}></a>
          <a href="#" style={{ color: '#10004C', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}></a>
          <a href="#" style={{ color: '#10004C', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}></a>
          <a href="#" style={{ color: '#10004C', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}></a>
          <a href="/go/whatsapp/solicitar" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1.5px solid rgba(16,0,76,0.55)', borderRadius: '999px', padding: '11px 22px', color: '#10004C', textDecoration: 'none', fontSize: '15px', fontWeight: 700, textAlign: 'center' }}>
            ¿Sos nutricionista? Escribinos
          </a>
        </nav>
      </header>

      {/* HERO */}
      <main style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '70px 40px 90px', display: 'flex', alignItems: 'center', gap: '48px' }}>
        <div style={{ flex: '1 1 600px', maxWidth: '760px', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '42px', lineHeight: 1.12, fontWeight: 800, margin: '0 0 18px', letterSpacing: '-0.5px' }}>¿Buscás nutricionistas en Costa Rica?</h1>

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
<Spotlight perfiles={perfilesDestacados} />
      {/* FOOTER */}
      <footer style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>          <SocialIcons
            tier="premium"
            whatsapp={whatsappAdmin}
            email="nutricionistasencostarica@gmail.com"
            facebook={null}
            instagram="nutricionistasencostarica"
            tiktok={null}
            youtube={null}
            linkedin={null}
            activeColor="#10004C"
            grayColor="#10004C"
            size={36}
          />
        </div>
<Link href="/aviso-legal" style={{ color: 'rgba(16,0,76,0.6)', textDecoration: 'none', fontSize: '13px', fontWeight: 400 }}>Información Importante</Link>
        <p style={{ color: 'rgba(16,0,76,0.4)', fontSize: '12px', fontWeight: 400, margin: 0 }}>Construido en conjunto con Claude (Anthropic)</p>      </footer>
    </div>
  );
}