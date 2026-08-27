import Link from 'next/link';
import Image from 'next/image';
import styles from './SiteHeader.module.css';

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.contenido}>
        <Link href="/" className={styles.logo}>
          <Image src="/ncr-disc.svg" alt="Nutricionistas en Costa Rica" width={38} height={38} />
        </Link>

        <nav className={styles.nav}>
          <a href="/go/whatsapp/solicitar" className={styles.botonNutricionista}>
            ¿Nutricionista? Clic aquí
          </a>
        </nav>
      </div>
    </header>
  );
}