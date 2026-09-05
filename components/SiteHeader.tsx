'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './SiteHeader.module.css';

export default function SiteHeader() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    if (!menuAbierto) return;
    function manejarTecla(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuAbierto(false);
    }
    window.addEventListener('keydown', manejarTecla);
    return () => window.removeEventListener('keydown', manejarTecla);
  }, [menuAbierto]);

  function manejarFondoClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setMenuAbierto(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.contenido}>
        <Link href="/" className={styles.logo}>
          <Image src="/ncr-disc.svg" alt="Nutricionistas en Costa Rica" width={38} height={38} />
        </Link>

        <nav className={styles.nav}>
          <button onClick={() => setMenuAbierto(true)} className={styles.botonNutricionista}>
            ¿Eres nutricionista? Clic aquí
          </button>
        </nav>
      </div>

      {menuAbierto && (
        <div className={styles.menuFondo} onClick={manejarFondoClick}>
          <div className={styles.menuPanel}>
            <p className={styles.menuTitulo}>¿Eres nutricionista?</p>
            <a href="/go/whatsapp/solicitar" className={styles.menuOpcionSecundaria}>
              Hablar con un humano
            </a>
            <Link href="/unirme" className={styles.menuOpcionPrimaria}>
              Unirme
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
