import { ordenarResultadosDirectorio } from '@/lib/perfiles';
import SocialIcons, { getHref } from '@/components/SocialIcons';
import TarjetaClicable from '@/components/TarjetaClicable';
import FiltrosDirectorio from '@/components/FiltrosDirectorio';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
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
  searchParams: Promise<{ especialidad?: string; online?: string; presencial?: string; premium?: string; grupal?: string; empresas?: string; ingles?: string }>;
}) {
  const { especialidad, online, presencial, premium, grupal, empresas, ingles } = await searchParams;
  const { resultados, total } = await ordenarResultadosDirectorio(especialidad, 50, {
    online: online === '1',
    presencial: presencial === '1',
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
        <p className={styles.nota}>Nota: los filtros de Individual/Grupal y seguros estarán disponibles próximamente.</p>
        <p className={styles.notaUltima}>Mostrando 50 resultados solamente para garantizar igualdad y performance del sitio.</p>

        <div className={styles.grilla}>
          {resultados.map((perfil, i) => {
            const tieneEspecialidad = !!perfil.especialidad;
            const citasTexto = perfil.citasOnline === true ? 'Sí' : perfil.citasOnline === false ? 'No' : 'No indica';
            const domicilioTexto = perfil.visitaDomicilio === true ? 'Sí' : perfil.visitaDomicilio === false ? 'No' : 'No indica';
            const enlacePrincipal = calcularEnlacePrincipal(perfil);
            return (
              <TarjetaClicable key={perfil.carne ?? i} href={enlacePrincipal} className={styles.tarjeta}>
                <p className={styles.nombre}>{perfil.nombre} {perfil.primerApellido} {perfil.segundoApellido}</p>
                <p className={styles.carne}>Carné {perfil.carne}</p>
                <p className={styles.detalle}>Especialidades: {tieneEspecialidad ? 'Sí' : 'No'}</p>
                <p className={styles.detalle}>Citas online: {citasTexto}</p>
                <p className={styles.detalleUltimo}>Visita a domicilio: {domicilioTexto}</p>
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