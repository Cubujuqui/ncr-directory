'use client';

import { useState } from 'react';
import { PerfilCompleto } from '@/lib/perfiles';
import SocialIcons, { getHref } from './SocialIcons';
import TarjetaClicable from './TarjetaClicable';
import { ICONOS_PERFIL } from './IconosPerfil';
import PerfilLightbox from './PerfilLightbox';
import BadgeTier from './BadgeTier';
import styles from '@/app/directorio/page.module.css';

function calcularEnlacePrincipal(perfil: PerfilCompleto) {
  const canal = perfil.puntoContactoPrimario;
  const esActivo = perfil.tier === 'premium' || (perfil.tier === 'contact' && (canal === 'whatsapp' || canal === 'email'));
  if (!esActivo) return null;
  const valor = perfil[canal];
  if (!valor) return null;
  return getHref(canal, valor, perfil.carne ?? undefined);
}

export default function DirectorioGrilla({ resultados }: { resultados: PerfilCompleto[] }) {
  const [perfilAbierto, setPerfilAbierto] = useState<PerfilCompleto | null>(null);

  return (
    <>
      <div className={styles.grilla}>
        {resultados.map((perfil, i) => {
          const tieneEspecialidad = !!perfil.especialidad;
          const especialidadTexto = !tieneEspecialidad
            ? null
            : perfil.tier === 'free'
              ? 'Tiene especialidad'
              : `Especialista en ${perfil.especialidad}`;
          const mostrarAtributosReales = perfil.tier !== 'free';
          const atributos = {
            consultorio: mostrarAtributosReales && !!perfil.atiendeConsultorio,
            online: mostrarAtributosReales && !!perfil.citasOnline,
            domicilio: mostrarAtributosReales && !!perfil.visitaDomicilio,
            ingles: mostrarAtributosReales && !!perfil.hablaIngles,
          };
          const esClicableParaModal = perfil.tier !== 'free';
          const enlacePrincipal = esClicableParaModal ? null : calcularEnlacePrincipal(perfil);
          return (
            <TarjetaClicable
              key={perfil.carne ?? i}
              href={enlacePrincipal}
              onClick={esClicableParaModal ? () => setPerfilAbierto(perfil) : undefined}
              className={styles.tarjeta}
            >
              <p className={styles.nombre}>{perfil.nombre} {perfil.primerApellido} {perfil.segundoApellido}<BadgeTier tier={perfil.tier} /></p>
              <p className={styles.carne}>Carné {perfil.carne}</p>
              {perfil.aniosExperiencia !== null && (
                <p className={styles.lineaIcono}>
                  {ICONOS_PERFIL.experiencia('#10004C')}
                  {perfil.aniosExperiencia} {perfil.aniosExperiencia === 1 ? 'año' : 'años'} de experiencia
                </p>
              )}
              <p className={styles.lineaIcono} style={{ visibility: especialidadTexto ? 'visible' : 'hidden' }}>
                {ICONOS_PERFIL.especialidad('#10004C')}
                {especialidadTexto || 'placeholder'}
              </p>
              <div className={styles.grillaAtributos}>
                <span className={styles.atributo} style={{ color: atributos.consultorio ? '#10004C' : '#10004C66' }}>
                  {ICONOS_PERFIL.consultorio(atributos.consultorio ? '#10004C' : '#10004C4d')}
                  Consultorio
                </span>
                <span className={styles.atributo} style={{ color: atributos.online ? '#10004C' : '#10004C66' }}>
                  {ICONOS_PERFIL.online(atributos.online ? '#10004C' : '#10004C4d')}
                  Online
                </span>
                <span className={styles.atributo} style={{ color: atributos.domicilio ? '#10004C' : '#10004C66' }}>
                  {ICONOS_PERFIL.domicilio(atributos.domicilio ? '#10004C' : '#10004C4d')}
                  Domicilio
                </span>
                <span className={styles.atributo} style={{ color: atributos.ingles ? '#10004C' : '#10004C66' }}>
                  {ICONOS_PERFIL.ingles(atributos.ingles ? '#10004C' : '#10004C4d')}
                  Habla inglés
                </span>
              </div>
              <SocialIcons
                tier={perfil.tier}
                identificador={perfil.carne ?? ''}
                whatsapp={perfil.whatsapp}
                email={perfil.email}
                facebook={perfil.facebook}
                instagram={perfil.instagram}
                tiktok={perfil.tiktok}
                youtube={perfil.youtube}
                linkedin={perfil.linkedin}
                activeColor="#7370E0"
                grayColor="#10004C"
                size={26}
              />
            </TarjetaClicable>
          );
        })}
      </div>

      <PerfilLightbox perfil={perfilAbierto} onCerrar={() => setPerfilAbierto(null)} />
    </>
  );
}
