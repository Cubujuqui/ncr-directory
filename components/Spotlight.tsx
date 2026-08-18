import { PerfilCompleto } from '@/lib/perfiles';
import SocialIcons, { getHref } from './SocialIcons';
import TarjetaClicable from './TarjetaClicable';
import styles from './Spotlight.module.css';

const PALETAS = [
  { background: '#BFB6FF', light: '#F3F0FF', primary: '#7370E0', dark: '#10004C' },
  { background: '#FFA589', light: '#FFE7E1', primary: '#FF6A4D', dark: '#510F00' },
  { background: '#AFE8E8', light: '#E8FCFB', primary: '#4ECECE', dark: '#003333' },
  { background: '#FFBD66', light: '#FFEFD9', primary: '#EF8800', dark: '#5B2F00' },
];

const SECTION_BG = '#FFA589';

function PremiumCard({ perfil, paleta }: { perfil: PerfilCompleto; paleta: typeof PALETAS[number] }) {
  const nombreCompleto = `${perfil.nombre} ${perfil.primerApellido} ${perfil.segundoApellido}`.trim();

  const canal = perfil.puntoContactoPrimario;
  const valorCanal = perfil[canal];
  const enlacePrincipal = valorCanal ? getHref(canal, valorCanal, perfil.carne ?? undefined) : null;

  return (
    <TarjetaClicable href={enlacePrincipal} className={styles.tarjeta} style={{ background: paleta.light }}>
      <div className={styles.fotoContenedor} style={{ background: `${paleta.dark}0d` }}>
        {perfil.fotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={perfil.fotoUrl} alt={nombreCompleto} className={styles.fotoImg} />
        ) : (
          <div className={styles.fotoPlaceholder} style={{ border: `1.5px dashed ${paleta.dark}66`, backgroundImage: `repeating-linear-gradient(135deg, ${paleta.dark}14 0 6px, ${paleta.dark}05 6px 12px)` }}>
            <span className={styles.fotoPlaceholderTexto} style={{ color: `${paleta.dark}99` }}>foto</span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <span className={styles.badge} style={{ background: paleta.primary }}>
          PERFIL PREMIUM
        </span>
        <p className={styles.nombre} style={{ color: paleta.dark }}>{nombreCompleto}</p>
        {perfil.carne && (
          <p className={styles.carne} style={{ color: `${paleta.dark}99` }}>
            Carné {perfil.carne}
          </p>
        )}
        <p className={styles.detalle} style={{ color: perfil.especialidad ? paleta.dark : `${paleta.dark}66`, fontWeight: perfil.especialidad ? 700 : 400 }}>
          Especialidad: {perfil.especialidad || 'No indica'}
        </p>
        <p className={styles.detalle} style={{ color: perfil.citasOnline ? paleta.dark : `${paleta.dark}66`, fontWeight: perfil.citasOnline ? 700 : 400 }}>
          Citas online: {perfil.citasOnline ? 'Sí' : 'No indica'}
        </p>
        <p className={styles.detalleUltimo} style={{ color: perfil.visitaDomicilio ? paleta.dark : `${paleta.dark}66`, fontWeight: perfil.visitaDomicilio ? 700 : 400 }}>
          Visita a domicilio: {perfil.visitaDomicilio ? 'Sí' : 'No indica'}
        </p>

        <SocialIcons
          tier="premium"
          identificador={perfil.carne ?? undefined}
          whatsapp={perfil.whatsapp}
          email={perfil.email}
          facebook={perfil.facebook}
          instagram={perfil.instagram}
          tiktok={perfil.tiktok}
          youtube={perfil.youtube}
          linkedin={perfil.linkedin}
          activeColor={paleta.primary}
          grayColor={paleta.dark}
        />
      </div>
    </TarjetaClicable>
  );
}

export default function Spotlight({ perfiles }: { perfiles: PerfilCompleto[] }) {
  if (perfiles.length === 0) return null;

  return (
    <section className={styles.seccion} style={{ background: SECTION_BG }}>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>
          Nutricionistas destacados
        </h2>
        <p className={styles.subtitulo}>
          Perfiles premium — próximamente más nutricionistas destacados
        </p>

        <div className={styles.grilla} style={{ '--num-columnas': perfiles.length } as React.CSSProperties}>
          {perfiles.map((p, i) => (
            <PremiumCard key={i} perfil={p} paleta={PALETAS[i % PALETAS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}