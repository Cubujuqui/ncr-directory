'use client';

import { useState } from 'react';
import styles from './page.module.css';

const PREMIUM_MENSUAL = 5000;
const PREMIUM_ANUAL = 50000;
const CONTACTO_MENSUAL = 3500;
const CONTACTO_ANUAL = 35000;

function formatearColones(valor: number): string {
  return `₡${valor.toLocaleString('es-CR')}`;
}

export default function TarjetasPrecio() {
  const [premiumAnual, setPremiumAnual] = useState(true);
  const [contactoAnual, setContactoAnual] = useState(true);

  const ahorroPremium = PREMIUM_MENSUAL * 12 - PREMIUM_ANUAL;
  const ahorroContacto = CONTACTO_MENSUAL * 12 - CONTACTO_ANUAL;

  return (
    <div className={styles.grilla}>
      <div className={styles.tarjeta}>
        <div className={styles.tarjetaEncabezado}>
          <p className={styles.tarjetaNombre}>Gratis</p>
          <p className={styles.tarjetaDescripcion}>Aparecés en el directorio con tu información básica.</p>

          <div className={styles.toggleEstatico}>
            <span className={styles.toggleEstaticoTexto}>Gratis para siempre</span>
          </div>

          <p className={styles.tarjetaPrecio}>₡0</p>
        </div>
        <div className={styles.cajaFeatures}>
          <ul className={styles.listaFeatures}>
            <li>Perfil en el directorio</li>
            <li>Especialidad visible</li>
          </ul>
        </div>
      </div>

      <div className={`${styles.tarjeta} ${styles.tarjetaDestacada}`}>
        <span className={styles.insignia}>Recomendado</span>
        <div className={styles.tarjetaEncabezado}>
          <p className={styles.tarjetaNombre}>Premium</p>
          <p className={styles.tarjetaDescripcion}>Máxima visibilidad, aparecés destacado en la portada.</p>

          <div className={styles.toggle}>
            <button
              className={!premiumAnual ? styles.toggleOpcionActiva : styles.toggleOpcion}
              onClick={() => setPremiumAnual(false)}
            >
              Mensual
            </button>
            <button
              className={premiumAnual ? styles.toggleOpcionActiva : styles.toggleOpcion}
              onClick={() => setPremiumAnual(true)}
            >
              Anual
            </button>
          </div>

          <p className={styles.tarjetaPrecio}>
            {premiumAnual ? formatearColones(PREMIUM_ANUAL) : formatearColones(PREMIUM_MENSUAL)}
            <span className={styles.tarjetaPrecioUnidad}>{premiumAnual ? ' / año' : ' / mes'}</span>
          </p>
          {premiumAnual && (
            <p className={styles.ahorro}>Ahorrás {formatearColones(ahorroPremium)} al año</p>
          )}
        </div>

        <div className={styles.cajaFeatures}>
          <ul className={styles.listaFeatures}>
            <li>Todo lo de Contacto</li>
            <li>Spotlight en portada</li>
            <li>Foto de perfil e Instagram, TikTok, YouTube</li>
          </ul>
        </div>
      </div>

      <div className={styles.tarjeta}>
        <div className={styles.tarjetaEncabezado}>
          <p className={styles.tarjetaNombre}>Contacto</p>
          <p className={styles.tarjetaDescripcion}>Incluye enlace directo a tu WhatsApp.</p>

          <div className={styles.toggle}>
            <button
              className={!contactoAnual ? styles.toggleOpcionActiva : styles.toggleOpcion}
              onClick={() => setContactoAnual(false)}
            >
              Mensual
            </button>
            <button
              className={contactoAnual ? styles.toggleOpcionActiva : styles.toggleOpcion}
              onClick={() => setContactoAnual(true)}
            >
              Anual
            </button>
          </div>

          <p className={styles.tarjetaPrecio}>
            {contactoAnual ? formatearColones(CONTACTO_ANUAL) : formatearColones(CONTACTO_MENSUAL)}
            <span className={styles.tarjetaPrecioUnidad}>{contactoAnual ? ' / año' : ' / mes'}</span>
          </p>
          {contactoAnual && (
            <p className={styles.ahorro}>Ahorrás {formatearColones(ahorroContacto)} al año</p>
          )}
        </div>

        <div className={styles.cajaFeatures}>
          <ul className={styles.listaFeatures}>
            <li>Todo lo de Gratis</li>
            <li>Botón de WhatsApp</li>
            <li>Modalidades de atención</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
