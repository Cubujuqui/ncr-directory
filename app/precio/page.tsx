import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import TarjetasPrecio from './TarjetasPrecio';
import TablaComparativa from './TablaComparativa';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Precios | Nutricionistas en Costa Rica',
  description: 'Planes y precios para nutricionistas en Nutricionistas en Costa Rica.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Precio() {
  return (
    <div className={styles.pagina}>
      <SiteHeader />
      <div className={styles.contenedor}>
        <Link href="/" className={styles.volver}>
          ← Volver al inicio
        </Link>

        <h1 className={styles.titulo}>Precios</h1>
        <p className={styles.intro}>
          Elegí el plan que mejor se adapte a vos. Los precios son referenciales mientras terminamos de definir el lanzamiento.
        </p>
      </div>

      <div className={styles.seccionPrecios}>
        <TarjetasPrecio />

        <h2 className={styles.tituloTabla}>Comparación completa</h2>
        <TablaComparativa />
      </div>
      <SiteFooter />
    </div>
  );
}

