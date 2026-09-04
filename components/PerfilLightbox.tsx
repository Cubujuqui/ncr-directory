'use client';

import { useEffect } from 'react';
import { PerfilCompleto } from '@/lib/perfiles';
import SocialIcons, { getHref } from './SocialIcons';
import { ICONOS_PERFIL } from './IconosPerfil';
import styles from './PerfilLightbox.module.css';

const COLOR_PRIMARIO = '#7370E0';
const COLOR_OSCURO = '#10004C';
const TAMANO_ICONO = 18;

export default function PerfilLightbox({ perfil, onCerrar }: { perfil: PerfilCompleto | null; onCerrar: () => void }) {
  useEffect(() => {
    if (!perfil) return;
    function manejarTecla(e: KeyboardEvent) {
      if (e.key === 'Escape') onCerrar();
    }
    window.addEventListener('keydown', manejarTecla);
    return () => window.removeEventListener('keydown', manejarTecla);
  }, [perfil, onCerrar]);

  if (!perfil) return null;

  const nombreCompleto = `${perfil.nombre} ${perfil.primerApellido} ${perfil.segundoApellido}`.trim();
  const canal = perfil.puntoContactoPrimario;
  const valorCanal = perfil[canal];
  const enlacePrincipal = valorCanal ? getHref(canal, valorCanal, perfil.carne ?? undefined) : null;

  function manejarFondoClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onCerrar();
  }

  return (
    <div className={styles.fondo} onClick={manejarFondoClick}>
      <div className={styles.panel}>
        <button onClick={onCerrar} className={styles.botonCerrar} aria-label="Cerrar">×</button>

        <div className={styles.fotoLado}>
          {perfil.fotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={perfil.fotoUrl}
              alt={nombreCompleto}
              className={styles.foto}
              style={{
                objectPosition: `${perfil.fotoPosicionX}% ${perfil.fotoPosicionY}%`,
                transform: `scale(${perfil.fotoZoom / 100})`,
                transformOrigin: `${perfil.fotoPosicionX}% ${perfil.fotoPosicionY}%`,
              }}
            />
          ) : (
            <div className={styles.fotoPlaceholder}>
              <span className={styles.fotoPlaceholderTexto}>foto</span>
            </div>
          )}
        </div>

        <div className={styles.infoLado}>
          <p className={styles.nombre}>{nombreCompleto}</p>
          {perfil.carne && <p className={styles.carne}>Carné {perfil.carne}</p>}

          {perfil.aniosExperiencia !== null && (
            <p className={styles.lineaIcono}>
              {ICONOS_PERFIL.experiencia(COLOR_OSCURO, TAMANO_ICONO)}
              {perfil.aniosExperiencia} {perfil.aniosExperiencia === 1 ? 'año' : 'años'} de experiencia
            </p>
          )}

          {perfil.especialidad && (
            <p className={styles.lineaIcono}>
              {ICONOS_PERFIL.especialidad(COLOR_OSCURO, TAMANO_ICONO)}
              Especialista en {perfil.especialidad}
            </p>
          )}

          <div className={styles.grillaAtributos}>
            <span className={styles.atributo} style={{ color: perfil.atiendeConsultorio ? COLOR_OSCURO : `${COLOR_OSCURO}66` }}>
              {ICONOS_PERFIL.consultorio(perfil.atiendeConsultorio ? COLOR_OSCURO : `${COLOR_OSCURO}4d`, TAMANO_ICONO)}
              Consultorio
            </span>
            <span className={styles.atributo} style={{ color: perfil.citasOnline ? COLOR_OSCURO : `${COLOR_OSCURO}66` }}>
              {ICONOS_PERFIL.online(perfil.citasOnline ? COLOR_OSCURO : `${COLOR_OSCURO}4d`, TAMANO_ICONO)}
              Online
            </span>
            <span className={styles.atributo} style={{ color: perfil.visitaDomicilio ? COLOR_OSCURO : `${COLOR_OSCURO}66` }}>
              {ICONOS_PERFIL.domicilio(perfil.visitaDomicilio ? COLOR_OSCURO : `${COLOR_OSCURO}4d`, TAMANO_ICONO)}
              Domicilio
            </span>
            <span className={styles.atributo} style={{ color: perfil.citasGrupales ? COLOR_OSCURO : `${COLOR_OSCURO}66` }}>
              {ICONOS_PERFIL.grupal(perfil.citasGrupales ? COLOR_OSCURO : `${COLOR_OSCURO}4d`, TAMANO_ICONO)}
              Citas grupales
            </span>
            <span className={styles.atributo} style={{ color: perfil.serviciosEmpresas ? COLOR_OSCURO : `${COLOR_OSCURO}66` }}>
              {ICONOS_PERFIL.empresas(perfil.serviciosEmpresas ? COLOR_OSCURO : `${COLOR_OSCURO}4d`, TAMANO_ICONO)}
              Servicios a empresas
            </span>
            <span className={styles.atributo} style={{ color: perfil.hablaIngles ? COLOR_OSCURO : `${COLOR_OSCURO}66` }}>
              {ICONOS_PERFIL.ingles(perfil.hablaIngles ? COLOR_OSCURO : `${COLOR_OSCURO}4d`, TAMANO_ICONO)}
              Habla inglés
            </span>
          </div>

          {perfil.acercaDe && (
            <div className={styles.acercaDe}>
              <p className={styles.acercaDeTitulo}>Acerca de {perfil.nombre}</p>
              <p className={styles.acercaDeTexto}>{perfil.acercaDe}</p>
            </div>
          )}

          <div className={styles.social}>
            <SocialIcons
              tier={perfil.tier}
              identificador={perfil.carne ?? undefined}
              whatsapp={perfil.whatsapp}
              email={perfil.email}
              facebook={perfil.facebook}
              instagram={perfil.instagram}
              tiktok={perfil.tiktok}
              youtube={perfil.youtube}
              linkedin={perfil.linkedin}
              activeColor={COLOR_PRIMARIO}
              grayColor={COLOR_OSCURO}
              size={26}
            />
          </div>

          {enlacePrincipal && (
            <a href={enlacePrincipal} target="_blank" rel="noopener noreferrer" className={styles.botonContactar}>
              Contactar a {perfil.nombre}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
