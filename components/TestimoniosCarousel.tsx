'use client';

import { useState } from 'react';
import styles from './TestimoniosCarousel.module.css';

type Testimonio = {
  id: number;
  nombre: string;
  foto_url: string | null;
  canal: string | null;
  handle: string | null;
  texto: string;
};

export default function TestimoniosCarousel({ testimonios }: { testimonios: Testimonio[] }) {
  const [indice, setIndice] = useState(0);
  const actual = testimonios[indice];

  return (
    <section className={styles.seccion}>
      <h2 className={styles.titulo}>Lo que dicen de nosotros</h2>

      <div className={styles.tarjeta}>
        {actual.foto_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={actual.foto_url} alt={actual.nombre} className={styles.foto} />
        ) : (
          <div className={styles.fotoInicial}>{actual.nombre.slice(0, 2).toUpperCase()}</div>
        )}
        <p className={styles.texto}>&quot;{actual.texto}&quot;</p>
        <p className={styles.nombre}>{actual.nombre}</p>
        {(actual.canal || actual.handle) && (
          <p className={styles.meta}>
            {actual.canal && `vía ${actual.canal}`}{actual.canal && actual.handle && ' · '}{actual.handle}
          </p>
        )}
      </div>

      <div className={styles.puntos}>
        {testimonios.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setIndice(i)}
            aria-label={`Ver testimonio de ${t.nombre}`}
            aria-current={i === indice}
            className={i === indice ? styles.puntoActivo : styles.punto}
          />
        ))}
      </div>
    </section>
  );
}
