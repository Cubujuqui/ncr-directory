'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './FaqAccordion.module.css';

const PREGUNTAS = [
  {
    pregunta: '¿Qué hace un nutricionista?',
    respuesta: 'Evalúa tu alimentación, historial de salud y objetivos para diseñar un plan realista — y le da seguimiento en el tiempo.',
    href: '/que-hace-un-nutricionista',
  },
  {
    pregunta: '¿Qué pasa en la primera consulta?',
    respuesta: 'Te pregunta sobre tus hábitos, tu rutina y qué te motivó a buscar ayuda — no es un interrogatorio.',
    href: '/que-hace-un-nutricionista',
  },
  {
    pregunta: '¿Nutricionista o dietista, es lo mismo?',
    respuesta: 'En Costa Rica, sí — ambos títulos requieren estar colegiados ante el CPN.',
    href: '/que-hace-un-nutricionista',
  },
  {
    pregunta: '¿Qué es el Colegio de Nutricionistas de Costa Rica?',
    respuesta: 'El ente oficial que regula quién puede ejercer la nutrición legalmente en el país.',
    href: '/colegio-de-nutricionistas-costa-rica',
  },
  {
    pregunta: '¿Cómo verifico si un nutricionista está colegiado?',
    respuesta: 'Es público y gratuito — te explicamos los pasos exactos.',
    href: '/colegio-de-nutricionistas-costa-rica',
  },
  {
    pregunta: '¿Cuándo debería consultar a un nutricionista?',
    respuesta: 'No hace falta tener una condición médica — mejorar hábitos o rendir mejor en el deporte también cuentan.',
    href: '/que-hace-un-nutricionista',
  },
  {
    pregunta: '¿Es nutricionistasencostarica.com un servicio de nutrición?',
    respuesta: 'No. El sitio es un directorio de publicidad gratuito — no presta servicios de nutrición ni emplea nutricionistas. Cada profesional listado actúa de forma independiente.',
    href: '/aviso-legal',
  },
];

export default function FaqAccordion() {
  const [abierto, setAbierto] = useState<number | null>(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PREGUNTAS.map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: p.respuesta,
      },
    })),
  };

  return (
    <section className={styles.seccion}>
      <div className={styles.contenido}>
        <h2 className={styles.titulo}>Preguntas frecuentes</h2>
        {PREGUNTAS.map((item, i) => {
        const estaAbierto = abierto === i;
        return (
          <div key={i} className={styles.item}>
            <button
              className={styles.pregunta}
              onClick={() => setAbierto(estaAbierto ? null : i)}
              aria-expanded={estaAbierto}
            >
              {item.pregunta}
              <span className={`${styles.icono} ${estaAbierto ? styles.iconoAbierto : ''}`}>+</span>
            </button>
            <div className={`${styles.respuesta} ${estaAbierto ? styles.respuestaAbierta : ''}`}>
              <p className={styles.respuestaTexto}>
                {item.respuesta}{' '}
                <Link href={item.href} className={styles.enlace}>Leer más →</Link>
              </p>
            </div>
            </div>
          );
        })}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </section>
  );
}