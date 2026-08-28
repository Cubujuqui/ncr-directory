import { ordenarResultadosDirectorio } from '@/lib/perfiles';
import SocialIcons, { getHref } from '@/components/SocialIcons';
import TarjetaClicable from '@/components/TarjetaClicable';
import FiltrosDirectorio from '@/components/FiltrosDirectorio';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { ICONOS_PERFIL } from '@/components/IconosPerfil';
import styles from './page.module.css';

function calcularEnlacePrincipal(perfil: { tier: string; puntoContactoPrimario: string; carne: string | null; whatsapp: string | null; email: string | null; facebook: string | null; instagram: string | null; tiktok: string | null; youtube: string | null; linkedin: string | null }) {
  const canal = perfil.puntoContactoPrimario as 'whatsapp' | 'email' | 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'linkedin';
  const esActivo = perfil.tier === 'premium' || (perfil.tier === 'contact' && (canal === 'whatsapp' || canal === 'email'));
  if (!esActivo) return null;
  const valor = perfil[canal];
  if (!valor) return null;
  return getHref(canal, valor, perfil.carne ?? undefined);
}

export default async function Directorio({
  searchParams,
}: {
  searchParams: Promise<{ especialidad?: string; online?: string; domicilio?: string; consultorio?: string; premium?: string; grupal?: string; empresas?: string; ingles?: string }>;
}) {
  const { especialidad, online, domicilio, consultorio, premium, grupal, empresas, ingles } = await searchParams;
  const { resultados, total } = await ordenarResultadosDirectorio(especialidad, 50, {
    online: online === '1',
    domicilio: domicilio === '1',
    consultorio: consultorio === '1',
    premiumSolamente: premium === '1',
    grupal: grupal === '1',
    serviciosEmpresas: empresas === '1',
    hablaIngles: ingles === '1',
  });

  return (
    <div className={styles.pagina}>
      <SiteHeader />
      <div className={styles.contenedor}>
        <h1 className={styles.titulo}>
          {especialidad ? especialidad : 'Todos los nutricionistas activos'}
        </h1>

        <FiltrosDirectorio />

        <p className={styles.conteo}>{total} nutricionistas encontrados</p>
        <p className={styles.notaUltima}>Mostrando 50 resultados solamente para garantizar igualdad y performance del sitio.</p>

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
            const enlacePrincipal = calcularEnlacePrincipal(perfil);
            return (
              <TarjetaClicable key={perfil.carne ?? i} href={enlacePrincipal} className={styles.tarjeta}>
                <p className={styles.nombre}>{perfil.nombre} {perfil.primerApellido} {perfil.segundoApellido}</p>
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
      </div>
      <SiteFooter />
    </div>
  );
}
