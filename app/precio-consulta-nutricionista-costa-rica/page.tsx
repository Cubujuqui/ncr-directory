import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Precio de una Consulta con Nutricionista en Costa Rica',
  description:
    'Cuánto cuesta una consulta con nutricionista en Costa Rica según el arancel oficial del CPN, y cómo confirmar el precio exacto antes de agendar.',
};

export default function PrecioConsultaNutricionistaCostaRica() {
  return (
    <div className={styles.pagina}>
      <SiteHeader />
      <div className={styles.contenedor}>
        <Link href="/" className={styles.volver}>
          ← Volver al inicio
        </Link>

        <h1 className={styles.titulo}>Precio de una Consulta con Nutricionista en Costa Rica</h1>

        <p className={styles.intro}>
          El Colegio de Profesionales en Nutrición (CPN) publica un arancel oficial con los montos mínimos de referencia para los servicios profesionales de nutrición en el país — aplicable tanto a nutricionistas colegiados como a las entidades que contratan sus servicios. Estos montos fueron publicados oficialmente en La Gaceta y se actualizan conforme lo apruebe el Colegio.
        </p>

        <h2 className={styles.h2}>¿Cuánto cuesta una consulta, según el arancel oficial?</h2>
        <p className={styles.parrafo}>
          Según el arancel vigente del CPN, los montos mínimos de referencia van desde aproximadamente ₡13,335 por persona (consulta grupal de 6 a 12 personas) hasta ₡27,785 (consulta individual a domicilio), dependiendo del tipo de consulta — individual, en pareja, grupal o a domicilio. <a href="https://cpn.cr" target="_blank" rel="noopener noreferrer" className={styles.enlaceInterno}>Ver el arancel completo →</a>
        </p>
        <p className={styles.parrafo}>
          Estos son montos <strong>mínimos de referencia</strong>, no un precio fijo ni regulado — cada nutricionista puede cobrar más según su experiencia, especialidad y modalidad de atención.
        </p>

        <h2 className={styles.h2}>¿Cómo saber el precio exacto antes de agendar?</h2>
        <p className={styles.parrafo}>
          El arancel te da un piso de referencia, pero el precio real puede variar. En nuestro directorio podés escribirle directamente a cada profesional — por WhatsApp o el canal de contacto que tenga disponible — y confirmar el precio antes de decidir. Simple. Directo. Rápido. En un click.
        </p>

        <div className={styles.cajaCta}>
          <h2 className={styles.cajaCtaTitulo}>Encontrá un nutricionista en Costa Rica</h2>
          <p className={styles.cajaCtaTexto}>
            Buscá en nuestro directorio nutricionistas activos registrados ante el Colegio de Profesionales en Nutrición.
          </p>
          <Link href="/directorio" className={styles.botonCta}>
            Ver el directorio
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
