import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Colegio de Nutricionistas de Costa Rica: qué es y cómo verificar',
  description:
    'Descubrí qué es el Colegio de Nutricionistas de Costa Rica (CPN), qué significa "estar colegiado" y cómo verificar si tu nutricionista está autorizado.',
};

export default function ColegioNutricionistas() {
  return (
    <div className={styles.pagina}>
      <div className={styles.contenedor}>
        <Link href="/" className={styles.volver}>
          ← Volver al inicio
        </Link>

        <h1 className={styles.titulo}>
          Colegio de Profesionales en Nutrición de Costa Rica: qué es y cómo verificar si un nutricionista está colegiado
        </h1>

        <p className={styles.intro}>
          Si estás buscando un nutricionista en Costa Rica, probablemente ya viste el término &quot;colegiado&quot; dando vueltas. Puede sonar como un trámite burocrático más, pero en realidad es una de las formas más simples de protegerte como paciente. Aquí te explicamos, en palabras sencillas, qué es el Colegio de Nutricionistas de Costa Rica, por qué importa y cómo podés verificarlo vos mismo en dos minutos.
        </p>

        <h2 className={styles.h2}>¿Qué es el Colegio de Nutricionistas de Costa Rica?</h2>
        <p className={styles.parrafo}>
          El Colegio de Nutricionistas de Costa Rica es el nombre con el que muchas personas todavía conocen a esta entidad, aunque su nombre oficial actual es <strong>Colegio de Profesionales en Nutrición (CPN)</strong>. Vas a encontrar ambos nombres usados indistintamente en internet — son la misma institución.
        </p>
        <p className={styles.parrafo}>
          Es el ente oficial que agremia y regula a todos los profesionales en nutrición que pueden ejercer legalmente en el país. En otras palabras: es la entidad encargada de confirmar que alguien realmente estudió nutrición, cumplió con los requisitos académicos correspondientes, y está legalmente habilitado para ejercer la profesión en Costa Rica.
        </p>
        <p className={styles.parrafo}>
          {'El Colegio fue creado por ley: la '}
          {React.createElement(
            'a',
            {
              href: 'http://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param2=NRTC&nValor1=1&nValor2=64716&strTipM=TC',
              target: '_blank',
              rel: 'noopener noreferrer',
              className: styles.enlaceExterno,
            },
            'Ley N° 8676 — Ley Orgánica del Colegio de Profesionales en Nutrición'
          )}
          {', publicada en La Gaceta N° 11 del 16 de enero de 2009. Es decir, no se trata de una asociación privada, sino de un ente con respaldo legal formal para regular la profesión en el país.'}
        </p>
        <p className={styles.parrafo}>
          El Colegio también supervisa la ética profesional, gestiona procesos disciplinarios cuando hay denuncias, y lleva el registro actualizado de quién está activo, quién tiene una especialidad reconocida, y quién no puede ejercer en este momento.
        </p>

        <h2 className={styles.h2}>¿Qué significa que un nutricionista esté &quot;colegiado&quot;?</h2>
        <p className={styles.parrafo}>
          Que un nutricionista esté colegiado significa que está inscrito y activo ante el Colegio de Profesionales en Nutrición, con un carné vigente que lo identifica oficialmente.
        </p>
        <p className={styles.parrafo}>
          Para vos como paciente, esto se traduce en algo muy concreto: estás ante alguien que completó una formación universitaria reconocida en nutrición, cumplió los trámites de incorporación, y está bajo la supervisión de un ente profesional que puede intervenir si algo sale mal.
        </p>
        <p className={styles.parrafo}>
          Si una persona no aparece como colegiada activa, conviene verificar el motivo antes de contratar sus servicios. El registro puede mostrar estados como Activo, Suspendido, Desincorporado o Colegiatura Especial — y un estado distinto a &quot;Activo&quot; no siempre significa lo mismo: puede tratarse de alguien recién graduado que aún no completó su incorporación, alguien suspendido por morosidad (falta de pago de cuotas), alguien que renunció voluntariamente al Colegio, u otra situación administrativa. En cualquier caso, es información que vale la pena conocer antes de poner tu salud en manos de alguien.
        </p>

        <h2 className={styles.h2}>Cómo verificar si un nutricionista está colegiado</h2>
        <p className={styles.parrafo}>
          La buena noticia es que esta verificación es pública y gratuita. Así podés hacerla:
        </p>

        <h3 className={styles.h3}>Paso 1: Conseguí el nombre completo o el número de carné</h3>
        <p className={styles.parrafo}>
          Cualquiera de los dos te sirve para buscar. El número de carné es el más preciso, porque hay nombres y apellidos repetidos.
        </p>

        <h3 className={styles.h3}>Paso 2: Buscá el buscador oficial de colegiados del CPN</h3>
        <p className={styles.parrafo}>
          El Colegio mantiene un buscador público donde podés filtrar por estado: Activo, Colegiatura Especial, Desincorporado o Suspendido. Ahí podés buscar por nombre, apellido o número de carné. La forma más fácil de encontrarlo es buscar en Google &quot;búsqueda de colegiados CPN&quot; o &quot;estado de colegiatura CPN Costa Rica&quot; — el Colegio ha migrado de dominio más de una vez, así que una búsqueda directa es más confiable que un enlace fijo.
        </p>

        <h3 className={styles.h3}>Paso 3: Revisá el estado</h3>
        <p className={styles.parrafo}>
          Lo que te interesa ver es que el estado diga <strong>&quot;Activo&quot;</strong>. Si aparece como suspendido, desincorporado, o simplemente no aparece en la búsqueda, es una señal para hacer más preguntas antes de agendar una consulta.
        </p>

        <h3 className={styles.h3}>Paso 4: Si tenés dudas, contactá directamente al Colegio</h3>
        <p className={styles.parrafo}>
          Para casos específicos o dudas sobre el proceso, el Colegio también atiende consultas directas a través de sus canales oficiales de contacto.
        </p>

        <div className={styles.cajaCta}>
          <h2 className={styles.cajaCtaTitulo}>Buscá nutricionistas colegiados en Nutricionistas en Costa Rica</h2>
          <p className={styles.cajaCtaTexto}>
            En nuestro directorio reunimos información pública de nutricionistas activos registrados ante el Colegio de Profesionales en Nutrición, para que puedas buscar por especialidad, ubicación y modalidad de atención — sin tener que hacer vos mismo la verificación desde cero cada vez.
          </p>
          <Link href="/directorio" className={styles.botonCta}>
            Ver el directorio
          </Link>
        </div>
      </div>
    </div>
  );
}