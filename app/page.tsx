import Link from 'next/link';
import { getEspecialidades } from '@/lib/nutricionistas';
import SearchBar from '@/components/SearchBar';
import Spotlight from '@/components/Spotlight';
import { getPerfilesDestacados } from '@/lib/perfiles';
import Image from 'next/image';
import SocialIcons from '@/components/SocialIcons';
import { whatsappAdmin } from '@/lib/contacto-admin';
import styles from './page.module.css';

export default async function Home() {
  const especialidades = getEspecialidades();
  const perfilesDestacados = await getPerfilesDestacados();

  return (
    <div className={styles.pagina}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/ncr-disc.svg" alt="Nutricionistas en Costa Rica" width={44} height={44} />
        </div>

        <a href="/go/whatsapp/solicitar" className={styles.botonNutricionista}>
          ¿Nutricionista? Clic aquí
        </a>
      </header>

      <main className={styles.hero}>
        <h1 className={styles.titulo}>¿Buscás nutricionistas en Costa Rica?</h1>
        <SearchBar especialidades={especialidades} />
      </main>

      <Spotlight perfiles={perfilesDestacados} />

      <footer className={styles.footer}>
        <div className={styles.iconosFooter}>
          <SocialIcons
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
        <Link href="/aviso-legal" className={styles.avisoLegal}>Información Importante</Link>
        <p className={styles.credito}>Construido en conjunto con Claude (Anthropic)</p>
      </footer>
    </div>
  );
}