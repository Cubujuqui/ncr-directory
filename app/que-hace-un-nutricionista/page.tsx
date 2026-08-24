import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '¿Qué hace un nutricionista? Guía completa',
  description:
    'Descubrí qué hace un nutricionista, qué esperar en la primera consulta, la diferencia con un dietista, y las especialidades dentro de la nutrición en Costa Rica.',
};

export default function QueHaceUnNutricionista() {
  return (
    <div className={styles.pagina}>
      <div className={styles.contenedor}>
        <Link href="/" className={styles.volver}>
          ← Volver al inicio
        </Link>

        <h1 className={styles.titulo}>¿Qué hace un nutricionista? Guía completa</h1>

        <p className={styles.intro}>
          Si nunca has ido a una consulta de nutrición, es normal tener dudas sobre qué esperar. Aquí te explicamos, en palabras sencillas, qué hace un nutricionista día a día, qué pasa en una primera consulta, y cuándo tiene sentido buscar uno.
        </p>

        <h2 className={styles.h2}>¿Qué hace un nutricionista, exactamente?</h2>
        <p className={styles.parrafo}>
          Un nutricionista es un profesional de la salud especializado en alimentación. Su trabajo va mucho más allá de &quot;decirte qué comer&quot;: evalúa tu estado nutricional, tus hábitos alimenticios, tu historial de salud y tus objetivos personales, y con esa información diseña un plan de alimentación realista y adaptado a vos.
        </p>
        <p className={styles.parrafo}>
          También da seguimiento a lo largo del tiempo, ajustando el plan según cómo respondés, y suele trabajar en conjunto con médicos u otros profesionales cuando hay una condición de salud de por medio (diabetes, hipertensión, problemas digestivos, entre otras).
        </p>

        <h2 className={styles.h2}>¿Qué pasa en la primera consulta con un nutricionista?</h2>
        <p className={styles.parrafo}>
          En la primera consulta, el nutricionista normalmente te va a preguntar sobre tu historial de salud, tus hábitos actuales de alimentación, tu rutina diaria, y qué te motivó a buscar la consulta. En muchos casos también toma medidas básicas (peso, talla, y a veces composición corporal) para tener un punto de partida claro.
        </p>
        <p className={styles.parrafo}>
          El profesional necesita esta información para armarte un plan que realmente puedas seguir en tu día a día.
        </p>

        <h2 className={styles.h2}>¿Nutricionista o dietista? La diferencia</h2>
        <p className={styles.parrafo}>
          En Costa Rica, los términos &quot;nutricionista&quot; y &quot;dietista&quot; se usan frecuentemente como sinónimos, y en la práctica muchas veces lo son. Ambos títulos hacen referencia a profesionales formados en ciencias de la nutrición, incorporados al Colegio de Profesionales en Nutrición (CPN). Si tenés dudas sobre si alguien está debidamente colegiado, podés verificarlo directamente — te explicamos cómo en nuestra guía sobre el <Link href="/colegio-de-nutricionistas-costa-rica" className={styles.enlaceInterno}>Colegio de Nutricionistas de Costa Rica</Link>.
        </p>

        <h2 className={styles.h2}>Especialidades dentro de la nutrición</h2>
        <p className={styles.parrafo}>
          No todos los nutricionistas hacen exactamente lo mismo — muchos se especializan en un área específica. Estas son algunas de las más comunes:
        </p>

        <h3 className={styles.h3}>Nutrición deportiva</h3>
        <p className={styles.parrafo}>
          Un nutricionista deportivo trabaja con atletas y personas activas para optimizar rendimiento, recuperación y composición corporal, ajustando la alimentación según el tipo de entrenamiento y los objetivos deportivos.
        </p>

        <h3 className={styles.h3}>Nutrición clínica</h3>
        <p className={styles.parrafo}>
          Un nutricionista clínico se enfoca en el manejo nutricional de condiciones médicas específicas — diabetes, enfermedades renales, trastornos digestivos, entre otras — generalmente en coordinación con el equipo médico tratante.
        </p>

        <h3 className={styles.h3}>Nutrición pediátrica</h3>
        <p className={styles.parrafo}>
          Un nutricionista pediátrico trabaja específicamente con bebés, niños y adolescentes, considerando las necesidades particulares de cada etapa de crecimiento y desarrollo.
        </p>

        <h2 className={styles.h2}>¿Cuándo deberías consultar a un nutricionista?</h2>
        <p className={styles.parrafo}>
          No hace falta tener una condición médica para beneficiarte de una consulta de nutrición. Personas buscan un nutricionista por razones muy distintas: mejorar hábitos alimenticios, bajar o subir de peso de forma sostenible, rendir mejor en el deporte, manejar una condición de salud, o simplemente entender mejor cómo se están alimentando.
        </p>

        <div className={styles.cajaCta}>
          <h2 className={styles.cajaCtaTitulo}>Buscá un nutricionista en Costa Rica</h2>
          <p className={styles.cajaCtaTexto}>
            En nuestro directorio podés buscar nutricionistas activos registrados ante el Colegio de Profesionales en Nutrición, filtrando por especialidad y modalidad de atención.
          </p>
          <Link href="/directorio" className={styles.botonCta}>
            Ver el directorio
          </Link>
        </div>
      </div>
    </div>
  );
}