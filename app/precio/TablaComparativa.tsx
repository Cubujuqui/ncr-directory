import { Fragment } from 'react';
import styles from './page.module.css';

type ValorCelda = boolean | string;

type Fila = {
  etiqueta: string;
  gratis: ValorCelda;
  contacto: ValorCelda;
  premium: ValorCelda;
};

type Categoria = {
  nombre: string;
  filas: Fila[];
};

const CATEGORIAS: Categoria[] = [
  {
    nombre: 'Perfil',
    filas: [
      { etiqueta: 'Nombre y carné', gratis: true, contacto: true, premium: true },
      { etiqueta: 'Años de experiencia', gratis: true, contacto: true, premium: true },
      { etiqueta: 'Especialidad', gratis: 'Solo indica si tiene', contacto: 'Nombre completo', premium: 'Nombre completo' },
      { etiqueta: 'Acerca de (biografía)', gratis: false, contacto: true, premium: true },
    ],
  },
  {
    nombre: 'Visibilidad',
    filas: [
      { etiqueta: 'Perfil clicable (más detalles)', gratis: false, contacto: true, premium: true },
      { etiqueta: 'Modalidades de atención mostradas', gratis: false, contacto: true, premium: true },
      { etiqueta: 'Aparece en "Nutricionistas destacados"', gratis: false, contacto: false, premium: true },
    ],
  },
  {
    nombre: 'Contacto',
    filas: [
      { etiqueta: 'Botón de WhatsApp o email', gratis: false, contacto: true, premium: true },
      { etiqueta: 'Redes sociales (Facebook, Instagram, TikTok, YouTube, LinkedIn)', gratis: false, contacto: false, premium: true },
    ],
  },
  {
    nombre: 'Foto',
    filas: [
      { etiqueta: 'Foto de perfil', gratis: false, contacto: false, premium: true },
    ],
  },
];

function CeldaValor({ valor }: { valor: ValorCelda }) {
  if (typeof valor === 'string') {
    return <span className={styles.celdaTexto}>{valor}</span>;
  }
  return valor ? (
    <span className={styles.celdaCheck}>✓</span>
  ) : (
    <span className={styles.celdaCruz}>—</span>
  );
}

export default function TablaComparativa() {
  return (
    <div className={styles.tablaWrapper}>
      <table className={styles.tabla}>
        <thead>
          <tr>
            <th className={styles.tablaEncabezadoCaracteristica}>Característica</th>
            <th className={styles.tablaEncabezadoTier}>Gratis</th>
            <th className={styles.tablaEncabezadoTier}>Contacto</th>
            <th className={styles.tablaEncabezadoTier}>Premium</th>
          </tr>
        </thead>
        <tbody>
          {CATEGORIAS.map((categoria) => (
            <Fragment key={categoria.nombre}>
              <tr className={styles.filaCategoria}>
                <td colSpan={4}>{categoria.nombre}</td>
              </tr>
              {categoria.filas.map((fila) => (
                <tr key={fila.etiqueta}>
                  <td className={styles.celdaEtiqueta}>{fila.etiqueta}</td>
                  <td className={styles.celdaValor}><CeldaValor valor={fila.gratis} /></td>
                  <td className={styles.celdaValor}><CeldaValor valor={fila.contacto} /></td>
                  <td className={styles.celdaValor}><CeldaValor valor={fila.premium} /></td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
