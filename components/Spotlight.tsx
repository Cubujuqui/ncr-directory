'use client';

import { useState } from 'react';
import { PerfilCompleto } from '@/lib/perfiles';
import SocialIcons from './SocialIcons';
import TarjetaClicable from './TarjetaClicable';
import { ICONOS_PERFIL } from './IconosPerfil';
import PerfilLightbox from './PerfilLightbox';
import BadgeTier from './BadgeTier';
import styles from './Spotlight.module.css';

const PALETAS = [
  { background: '#BFB6FF', light: '#F3F0FF', primary: '#7370E0', dark: '#10004C' },
  { background: '#FFA589', light: '#FFE7E1', primary: '#FF6A4D', dark: '#510F00' },
  { background: '#AFE8E8', light: '#E8FCFB', primary: '#4ECECE', dark: '#003333' },
  { background: '#FFBD66', light: '#FFEFD9', primary: '#EF8800', dark: '#5B2F00' },
];

const SECTION_BG = '#FFA589';

function PremiumCard({ perfil, paleta, onAbrir }: { perfil: PerfilCompleto; paleta: typeof PALETAS[number]; onAbrir: (perfil: PerfilCompleto) => void }) {
  const nombreCompleto = `${perfil.nombre} ${perfil.primerApellido} ${perfil.segundoApellido}`.trim();

  return (
    <TarjetaClicable onClick={() => onAbrir(perfil)} href={null} className={styles.tarjeta} style={{ background: paleta.light }}>
      <div className={styles.fotoContenedor} style={{ background: `${paleta.dark}0d` }}>
        {perfil.fotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
                    <img src={perfil.fotoUrl} alt={nombreCompleto} className={styles.fotoImg} style={{ objectPosition: `${perfil.fotoPosicionX}% ${perfil.fotoPosicionY}%`, transform: `scale(${perfil.fotoZoom / 100})`, transformOrigin: `${perfil.fotoPosicionX}% ${perfil.fotoPosicionY}%` }} />
        ) : (
          <div className={styles.fotoPlaceholder} style={{ border: `1.5px dashed ${paleta.dark}66`, backgroundImage: `repeating-linear-gradient(135deg, ${paleta.dark}14 0 6px, ${paleta.dark}05 6px 12px)` }}>
            <span className={styles.fotoPlaceholderTexto} style={{ color: `${paleta.dark}99` }}>foto</span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
          <BadgeTier tier="premium" />
          <p className={styles.nombre} style={{ color: paleta.dark }}>{nombreCompleto}</p>
        </div>
        {perfil.carne && (
          <p className={styles.carne} style={{ color: `${paleta.dark}99` }}>
            Carné {perfil.carne}
          </p>
        )}
        {perfil.aniosExperiencia !== null && (
          <p className={styles.lineaIcono} style={{ color: paleta.dark }}>
            {ICONOS_PERFIL.experiencia(paleta.dark)}
            {perfil.aniosExperiencia} {perfil.aniosExperiencia === 1 ? 'año' : 'años'} de experiencia
          </p>
        )}

        <p className={styles.lineaIcono} style={{ color: paleta.dark, visibility: perfil.especialidad ? 'visible' : 'hidden' }}>
          {ICONOS_PERFIL.especialidad(paleta.dark)}
          Especialista en {perfil.especialidad}
        </p>

        <div className={styles.grillaAtributos}>
          <span className={styles.atributo} style={{ color: perfil.atiendeConsultorio ? paleta.dark : `${paleta.dark}66` }}>
            {ICONOS_PERFIL.consultorio(perfil.atiendeConsultorio ? paleta.dark : `${paleta.dark}4d`)}
            Consultorio
          </span>
          <span className={styles.atributo} style={{ color: perfil.citasOnline ? paleta.dark : `${paleta.dark}66` }}>
            {ICONOS_PERFIL.online(perfil.citasOnline ? paleta.dark : `${paleta.dark}4d`)}
            Online
          </span>
          <span className={styles.atributo} style={{ color: perfil.visitaDomicilio ? paleta.dark : `${paleta.dark}66` }}>
            {ICONOS_PERFIL.domicilio(perfil.visitaDomicilio ? paleta.dark : `${paleta.dark}4d`)}
            Domicilio
          </span>
          <span className={styles.atributo} style={{ color: perfil.hablaIngles ? paleta.dark : `${paleta.dark}66` }}>
            {ICONOS_PERFIL.ingles(perfil.hablaIngles ? paleta.dark : `${paleta.dark}4d`)}
            Habla inglés
          </span>
        </div>

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
  const [perfilAbierto, setPerfilAbierto] = useState<PerfilCompleto | null>(null);

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
            <PremiumCard key={i} perfil={p} paleta={PALETAS[i % PALETAS.length]} onAbrir={setPerfilAbierto} />
          ))}
        </div>
      </div>

      <PerfilLightbox perfil={perfilAbierto} onCerrar={() => setPerfilAbierto(null)} />
    </section>
  );
}
