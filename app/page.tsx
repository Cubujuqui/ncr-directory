export const dynamic = 'force-dynamic';

import SearchBar from '@/components/SearchBar';
import Spotlight from '@/components/Spotlight';
import { getPerfilesDestacados } from '@/lib/perfiles';
import { getEspecialidades } from '@/lib/nutricionistas';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import styles from './page.module.css';

export default async function Home() {
  const especialidades = getEspecialidades();
  const perfilesDestacados = await getPerfilesDestacados();

  return (
    <div className={styles.pagina}>
      <SiteHeader />
      
      <main className={styles.hero}>
        <h1 className={styles.titulo}>¿Buscás nutricionistas en Costa Rica?</h1>
        <p className={styles.subtitulo}>Te conectamos en un clic. Simple.</p>
        <SearchBar especialidades={especialidades} />
      </main>

      <Spotlight perfiles={perfilesDestacados} />

      <SiteFooter />
    </div>
  );
}