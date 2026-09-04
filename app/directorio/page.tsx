import { ordenarResultadosDirectorio } from '@/lib/perfiles';
import Link from 'next/link';
import FiltrosDirectorio from '@/components/FiltrosDirectorio';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import DirectorioGrilla from '@/components/DirectorioGrilla';
import BadgeTier from '@/components/BadgeTier';
import styles from './page.module.css';

export default async function Directorio({
  searchParams,
}: {
  searchParams: Promise<{ especialidad?: string; online?: string; domicilio?: string; consultorio?: string; premium?: string; grupal?: string; empresas?: string; ingles?: string }>;
}) {
  const { especialidad, online, domicilio, consultorio, premium, grupal, empresas, ingles } = await searchParams;
  const { resultados, total } = await ordenarResultadosDirectorio(especialidad, 50, {
    online: online === '1',
    domicilio: domicilio === '1',
    consultorio: consultorio === '1',
    premiumSolamente: premium === '1',
    grupal: grupal === '1',
    serviciosEmpresas: empresas === '1',
    hablaIngles: ingles === '1',
  });

  return (
    <div className={styles.pagina}>
      <SiteHeader />
      <div className={styles.contenedor}>
        <Link href="/" className={styles.volver}>
          ← Volver al inicio
        </Link>

        <h1 className={styles.titulo}>
          {especialidad ? especialidad : 'Todos los nutricionistas activos'}
        </h1>

        <FiltrosDirectorio />

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16, margin: '4px 0 16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(16,0,76,0.6)' }}>
            <BadgeTier tier="premium" size={16} /> Premium
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(16,0,76,0.6)' }}>
            <BadgeTier tier="contact" size={16} /> Contacto
          </span>
        </div>

        <p className={styles.conteo}>{total} nutricionistas encontrados</p>
        <p className={styles.notaUltima}>Mostrando 50 resultados solamente para garantizar igualdad y performance del sitio.</p>

        <DirectorioGrilla resultados={resultados} />
      </div>
      <SiteFooter />
    </div>
  );
}
