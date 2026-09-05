import Link from 'next/link';
import SocialIcons from './SocialIcons';
import { whatsappAdmin } from '@/lib/contacto-admin';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.etiquetaSocial}>Conectemos en</p>
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
    </footer>
  );
}
