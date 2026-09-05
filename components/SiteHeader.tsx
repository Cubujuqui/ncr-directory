'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './SiteHeader.module.css';

export default function SiteHeader() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuAbierto) return;

    function manejarTecla(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuAbierto(false);
    }
    function manejarClickFuera(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuAbierto(false);
      }
    }

    window.addEventListener('keydown', manejarTecla);
    document.addEventListener('mousedown', manejarClickFuera);
    return () => {
      window.removeEventListener('keydown', manejarTecla);
      document.removeEventListener('mousedown', manejarClickFuera);
    };
  }, [menuAbierto]);

  return (
    <header className={styles.header}>
      <div className={styles.contenido}>
        <Link href="/" className={styles.logo}>
          <Image src="/ncr-disc.svg" alt="Nutricionistas en Costa Rica" width={38} height={38} />
        </Link>

        <nav className={styles.nav}>
          <div className={styles.menuContenedor} ref={menuRef}>
            <button onClick={() => setMenuAbierto((v) => !v)} className={styles.botonNutricionista}>
              ¿Eres nutricionista? Clic aquí
            </button>

            {menuAbierto && (
              <div className={styles.menuDropdown}>
                <a href="/go/whatsapp/solicitar" className={styles.menuOpcionSecundaria}>
                  Hablar con un humano
                </a>
                <Link href="/unirme" className={styles.menuOpcionPrimaria}>
                  Unirme
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
