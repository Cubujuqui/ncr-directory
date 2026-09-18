import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Nutrición Infantil en Costa Rica | Encontrá un especialista',
  description:
    'Qué hace un nutricionista pediátrico, cuándo buscar uno y cómo encontrar especialistas en nutrición infantil en Costa Rica.',
};

export default function NutricionInfantilCostaRica() {
  return (
    <div className={styles.pagina}>
      <SiteHeader />
      <div className={styles.contenedor}>
        <Link href="/" className={styles.volver}>
          ← Volver al inicio
        </Link>

        <h1 className={styles.titulo}>Nutrición Infantil en Costa Rica</h1>

        <p className={styles.intro}>
          La nutrición infantil, también llamada nutrición pediátrica, es la especialidad enfocada en bebés, niños y adolescentes — considerando las necesidades particulares de cada etapa de crecimiento. En Costa Rica, es la especialidad más común entre los nutricionistas registrados: actualmente 37 profesionales activos la tienen registrada, más que cualquier otra especialidad.
        </p>

        <h2 className={styles.h2}>¿Qué hace un nutricionista pediátrico?</h2>
        <p className={styles.parrafo}>
          Un nutricionista pediátrico acompaña el crecimiento y desarrollo del niño desde la alimentación — ajustando las recomendaciones según la edad, el ritmo de crecimiento y las necesidades de cada etapa, desde la introducción de sólidos hasta la adolescencia. El trabajo suele incluir a la familia completa, ya que los hábitos alimenticios en casa influyen directamente en el niño.
        </p>

        <h2 className={styles.h2}>¿Cuándo buscar uno?</h2>
        <p className={styles.parrafo}>
          Algunas razones comunes por las que las familias buscan un nutricionista pediátrico: la introducción de alimentos sólidos, dificultades con la alimentación (niños muy selectivos, poco apetito), preocupaciones sobre el crecimiento, o el manejo de alergias e intolerancias alimentarias — siempre en coordinación con el pediatra tratante cuando hay una condición de salud de por medio.
        </p>

        <div className={styles.cajaCta}>
          <h2 className={styles.cajaCtaTitulo}>Encontrá un nutricionista pediátrico en Costa Rica</h2>
          <p className={styles.cajaCtaTexto}>
            Buscá en nuestro directorio nutricionistas activos con especialidad en nutrición pediátrica, filtrando por modalidad de atención.
          </p>
          <Link href="/directorio?especialidad=Nutrici%C3%B3n%20pedi%C3%A1trica" className={styles.botonCta}>
            Ver especialistas
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
