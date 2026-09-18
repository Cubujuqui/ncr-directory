import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Nutrición Deportiva en Costa Rica | Encontrá un especialista',
  description:
    'Qué hace un nutricionista deportivo, para quién es y qué esperar en la primera consulta. Encontrá nutricionistas especializados en nutrición deportiva en Costa Rica.',
};

export default function NutricionDeportivaCostaRica() {
  return (
    <div className={styles.pagina}>
      <SiteHeader />
      <div className={styles.contenedor}>
        <Link href="/" className={styles.volver}>
          ← Volver al inicio
        </Link>

        <h1 className={styles.titulo}>Nutrición Deportiva en Costa Rica</h1>

        <p className={styles.intro}>
          La nutrición deportiva no es solo para atletas de alto rendimiento. Corredores de fin de semana, ciclistas, personas que entrenan en el gimnasio con regularidad o quienes se preparan para una carrera o competencia también se benefician de un plan alimenticio ajustado a su nivel de actividad. En Costa Rica, cada vez más nutricionistas se especializan en esta área — acá te explicamos qué hace un nutricionista deportivo y cómo encontrar uno.
        </p>

        <h2 className={styles.h2}>¿Qué hace un nutricionista deportivo?</h2>
        <p className={styles.parrafo}>
          Un nutricionista deportivo diseña planes alimenticios que consideran el tipo de entrenamiento, la frecuencia, los objetivos (rendimiento, recuperación, composición corporal) y el momento de las comidas en relación con el ejercicio. A diferencia de un plan nutricional general, toma en cuenta factores como la carga de entrenamiento semanal, la hidratación durante el ejercicio y, cuando aplica, el uso de suplementos.
        </p>

        <h2 className={styles.h2}>¿Para quién es?</h2>
        <p className={styles.parrafo}>
          No hace falta ser atleta federado. Es útil para quienes entrenan varias veces por semana, se preparan para una carrera (5K, 10K, medio maratón, triatlón), practican un deporte de forma recreativa pero seria, o simplemente quieren que su alimentación acompañe mejor su rutina de ejercicio.
        </p>

        <h2 className={styles.h2}>¿Qué esperar en la primera consulta?</h2>
        <p className={styles.parrafo}>
          Normalmente el nutricionista revisa tu historial de entrenamiento, tus objetivos y tu alimentación actual, y a partir de eso arma un plan — que puede incluir ajustes en el momento de las comidas, hidratación y, si corresponde, suplementación. El seguimiento suele ajustarse según cómo avanza tu entrenamiento.
        </p>

        <div className={styles.cajaCta}>
          <h2 className={styles.cajaCtaTitulo}>Encontrá un nutricionista deportivo en Costa Rica</h2>
          <p className={styles.cajaCtaTexto}>
            Buscá en nuestro directorio nutricionistas activos con especialidad en nutrición deportiva, filtrando por modalidad de atención.
          </p>
          <Link href="/directorio?especialidad=Nutrici%C3%B3n%20deportiva" className={styles.botonCta}>
            Ver especialistas
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
