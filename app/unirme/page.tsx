'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

// Temporalmente deshabilitado — feedback de usuarios indica que la foto del carné
// genera fricción. Verificación de identidad se hace manualmente por WhatsApp.
// Para reactivar: cambiar a true.
const MOSTRAR_FOTO_CARNE = false;

export default function Unirme() {
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'exito' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [carneValor, setCarneValor] = useState('');
  const [nombreCPN, setNombreCPN] = useState<string | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [busquedaHecha, setBusquedaHecha] = useState(false);
  const [usarNombreCPN, setUsarNombreCPN] = useState(true);

  const [fotoCarne, setFotoCarne] = useState<File | null>(null);
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [tier, setTier] = useState('');

  async function buscarNombre() {
    if (!carneValor.trim()) return;
    setBuscando(true);
    setBusquedaHecha(false);
    try {
      const res = await fetch(`/api/buscar-nombre?carne=${encodeURIComponent(carneValor.trim())}`);
      const data = await res.json();
      setNombreCPN(data.encontrado ? data.nombre : null);
      setUsarNombreCPN(true);
    } catch {
      setNombreCPN(null);
    } finally {
      setBuscando(false);
      setBusquedaHecha(true);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const carne = carneValor.trim();
    const consentimiento = data.get('consentimiento') === 'on';

    if (!carne) {
      setEstado('error');
      setErrorMsg('El número de carné es obligatorio.');
      return;
    }
    if (!busquedaHecha || !nombreCPN) {
      setEstado('error');
      setErrorMsg('Necesitamos verificar tu carné antes de continuar. Hacé clic en "Buscar" y confirmá que aparece tu nombre.');
      return;
    }
    if (!consentimiento) {
      setEstado('error');
      setErrorMsg('Debés autorizar la publicación de tus datos para continuar.');
      return;
    }
    if (MOSTRAR_FOTO_CARNE && !fotoCarne) {
      setEstado('error');
      setErrorMsg('Necesitamos una foto de tu carné para verificar tu identidad.');
      return;
    }
    if (!tier) {
      setEstado('error');
      setErrorMsg('Elegí un nivel (Premium, Contacto o Gratis) para continuar.');
      return;
    }

    const canalPrincipal = data.get('punto_contacto_primario') as string;
    const valorCanalPrincipal = (data.get(canalPrincipal) as string || '').trim();
    if (!valorCanalPrincipal) {
      const nombresCanal: Record<string, string> = {
        whatsapp: 'WhatsApp',
        email: 'Email',
        facebook: 'Facebook',
        instagram: 'Instagram',
        tiktok: 'TikTok',
        youtube: 'YouTube',
        linkedin: 'LinkedIn',
      };
      setEstado('error');
      setErrorMsg(`Elegiste ${nombresCanal[canalPrincipal]} como tu canal principal — necesitamos ese dato para poder redirigir a quien te contacte.`);
      return;
    }
    setEstado('enviando');

    const referidoPor = (data.get('referido_por') as string || '').trim() || null;
    const nombrePreferido = usarNombreCPN ? null : ((data.get('nombre_preferido') as string || '').trim() || null);

    let rutaFoto: string | null = null;
    if (fotoCarne) {
      const extension = fotoCarne.name.split('.').pop();
      rutaFoto = `${carne}-${Date.now()}.${extension}`;

      const { error: errorSubida } = await supabase.storage
        .from('carnes-verificacion')
        .upload(rutaFoto, fotoCarne);

      if (errorSubida) {
        setEstado('error');
        setErrorMsg('No pudimos subir la foto de tu carné. Intentá de nuevo.');
        console.error(errorSubida);
        return;
      }
    }

    let fotoPerfilUrl: string | null = null;
    if (tier === 'premium' && fotoPerfil) {
      const extensionPerfil = fotoPerfil.name.split('.').pop();
      const rutaFotoPerfil = `${carne}-${Date.now()}.${extensionPerfil}`;

      const { error: errorSubidaPerfil } = await supabase.storage
        .from('fotos-perfil')
        .upload(rutaFotoPerfil, fotoPerfil);

      if (errorSubidaPerfil) {
        setEstado('error');
        setErrorMsg('No pudimos subir tu foto de perfil. Intentá de nuevo.');
        console.error(errorSubidaPerfil);
        return;
      }

      const { data: urlData } = supabase.storage.from('fotos-perfil').getPublicUrl(rutaFotoPerfil);
      fotoPerfilUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from('solicitudes').insert({
      carne,
      nombre_preferido: nombrePreferido,
      tier: data.get('tier') as string,
      whatsapp: (() => {
        const digitos = (data.get('whatsapp') as string || '').replace(/\D/g, '');
        return digitos ? `506${digitos}` : null;
      })(),
      email: (data.get('email') as string || '').trim() || null,
      facebook: (data.get('facebook') as string || '').trim() || null,
      instagram: (data.get('instagram') as string || '').trim() || null,
      tiktok: (data.get('tiktok') as string || '').trim() || null,
      youtube: (data.get('youtube') as string || '').trim() || null,
      linkedin: (data.get('linkedin') as string || '').trim() || null,
      punto_contacto_primario: data.get('punto_contacto_primario') as string,
      citas_online: data.get('citas_online') === 'on',
      visita_domicilio: data.get('visita_domicilio') === 'on',
      citas_grupales: data.get('citas_grupales') === 'on',
      servicios_empresas: data.get('servicios_empresas') === 'on',
      habla_ingles: data.get('habla_ingles') === 'on',
      referido_por: referidoPor,
      referido_timestamp: referidoPor ? new Date().toISOString() : null,
      consentimiento: true,
      carne_foto_url: rutaFoto,
      foto_url: fotoPerfilUrl,
    });
    if (error) {
      setEstado('error');
      setErrorMsg('Hubo un problema al enviar el formulario. Intentá de nuevo en un momento.');
      console.error(error);
      return;
    }

    setEstado('exito');
  }

  if (estado === 'exito') {
    return (
      <div className={styles.paginaExito}>
        <div className={styles.contenedorExito}>
          <h1 className={styles.tituloExito}>¡Listo! Recibimos tu información</h1>
          <p className={styles.textoExito}>
            Vamos a revisar tu solicitud y activaremos tu perfil pronto. Si tenés dudas, escribinos por WhatsApp.
          </p>
          <Link href="/" className={styles.volverExito}>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.contenedor}>
        <Link href="/" className={styles.volver}>
          ← Volver al inicio
        </Link>

        <h1 className={styles.titulo}>Unite al directorio</h1>
        <p className={styles.intro}>
          Completá tus datos para activar o actualizar tu perfil. Revisamos cada solicitud antes de publicarla.
        </p>

        <form onSubmit={handleSubmit}>
          {MOSTRAR_FOTO_CARNE && (
            <div className={styles.seccion}>
              <label className={styles.etiqueta}>Foto de tu carné vigente *</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setFotoCarne(e.target.files?.[0] || null)}
                className={styles.input}
              />
              <p className={styles.ayuda}>La usamos solo para confirmar que sos vos. No se publica en el sitio.</p>
            </div>
          )}

          <div className={styles.seccion}>
            <label className={styles.etiqueta}>Número de carné *</label>
            <div className={styles.filaCarne}>
              <input
                name="carne"
                required
                value={carneValor}
                onChange={(e) => { setCarneValor(e.target.value); setBusquedaHecha(false); }}
                onBlur={buscarNombre}
                className={`${styles.input} ${styles.inputCarne}`}
                placeholder="Ej. 0000-00"
              />
              <button
                type="button"
                onClick={buscarNombre}
                disabled={buscando}
                className={styles.botonBuscar}
              >
                {buscando ? 'Buscando...' : 'Buscar'}
              </button>
            </div>

            {busquedaHecha && nombreCPN && (
              <div className={styles.avisoNombre}>
                <p className={styles.avisoNombreTexto}>
                  El nombre que aparece en el CPN es: <strong>{nombreCPN}</strong>. ¿Querés usar ese nombre o preferís que mostremos otro?
                </p>
                <label className={styles.opcionRadio}>
                  <input type="radio" checked={usarNombreCPN} onChange={() => setUsarNombreCPN(true)} />
                  Usar ese nombre
                </label>
                <label className={styles.opcionRadio}>
                  <input type="radio" checked={!usarNombreCPN} onChange={() => setUsarNombreCPN(false)} />
                  Prefiero mostrar otro nombre
                </label>
                {!usarNombreCPN && (
                  <input name="nombre_preferido" className={styles.input} style={{ marginTop: '10px' }} placeholder="¿Cómo querés que te llamemos?" />
                )}
              </div>
            )}

            {busquedaHecha && !nombreCPN && (
              <div className={styles.avisoError}>
                <p className={styles.avisoErrorTexto}>
                  No encontramos ese carné en el registro público del CPN. Verificá que esté correctamente escrito — no podés continuar sin un carné válido.
                </p>
              </div>
            )}
          </div>

          <div className={styles.seccion}>
            <label className={styles.etiqueta}>¿Alguien te refirió? (su número de carné)</label>
            <input name="referido_por" className={styles.input} placeholder="Opcional" />
          </div>

          <div className={styles.seccion}>
            <label className={styles.checkboxFila}>
              <input type="checkbox" name="citas_online" />
              Ofrezco citas online
            </label>
          </div>

          <div className={styles.seccion}>
            <label className={styles.checkboxFila}>
              <input type="checkbox" name="visita_domicilio" />
              Ofrezco visitas a domicilio
            </label>
          </div>

          <div className={styles.seccion}>
            <label className={styles.checkboxFila}>
              <input type="checkbox" name="citas_grupales" />
              Ofrezco citas grupales
            </label>
          </div>

          <div className={styles.seccion}>
            <label className={styles.checkboxFila}>
              <input type="checkbox" name="servicios_empresas" />
              Ofrezco servicios a empresas
            </label>
          </div>

          <div className={styles.seccion}>
            <label className={styles.checkboxFila}>
              <input type="checkbox" name="habla_ingles" />
              Hablo inglés
            </label>
          </div>

          <div className={styles.seccion}>
            <label className={styles.etiqueta}>¿Cuál es tu canal de contacto principal?</label>
            <select name="punto_contacto_primario" defaultValue="whatsapp" className={styles.input}>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>

          <div className={styles.seccion}>
            <label className={styles.etiqueta}>WhatsApp</label>
            <input name="whatsapp" className={styles.input} placeholder="Ej. 88887777" maxLength={8} />
            <p className={styles.ayuda}>Solo escribí los 8 dígitos — nosotros agregamos el 506.</p>
          </div>

          <div className={styles.seccion}>
            <label className={styles.etiqueta}>Email</label>
            <input name="email" type="email" className={styles.input} placeholder="Opcional" />
          </div>

          <div className={styles.seccion}>
            <label className={styles.etiqueta}>Facebook</label>
            <input name="facebook" className={styles.input} placeholder="usuario o nombre de página" />
          </div>

          <div className={styles.seccion}>
            <label className={styles.etiqueta}>Instagram</label>
            <input name="instagram" className={styles.input} placeholder="usuario, sin @" />
          </div>

          <div className={styles.seccion}>
            <label className={styles.etiqueta}>TikTok</label>
            <input name="tiktok" className={styles.input} placeholder="usuario, sin @" />
          </div>

          <div className={styles.seccion}>
            <label className={styles.etiqueta}>YouTube</label>
            <input name="youtube" className={styles.input} placeholder="Enlace al canal" />
          </div>

          <div className={styles.seccion}>
            <label className={styles.etiqueta}>LinkedIn</label>
            <input name="linkedin" className={styles.input} placeholder="Enlace al perfil" />
          </div>

          <div className={styles.seccion}>
            <label className={styles.etiqueta}>Nivel que te interesa</label>
            <div className={styles.tarjetasTier}>
              <label className={`${styles.tarjetaTier} ${styles.tarjetaTierPremium}`}>
                <input type="radio" name="tier" value="premium" checked={tier === 'premium'} onChange={() => setTier('premium')} className={styles.radioTier} />
                <span>
                  <strong>Premium</strong> — máxima visibilidad, aparecés destacado en la portada.
                  <br />
                  <span className={styles.ayuda}>Sin costo mientras probamos el sistema.</span>
                </span>
              </label>
              <label className={`${styles.tarjetaTier} ${styles.tarjetaTierOtro}`}>
                <input type="radio" name="tier" value="contact" checked={tier === 'contact'} onChange={() => setTier('contact')} className={styles.radioTier} />
                <span>
                  <strong>Contacto</strong> — incluye enlace directo a tu WhatsApp.
                  <br />
                  <span className={styles.ayuda}>Sin costo mientras probamos el sistema.</span>
                </span>
              </label>
              <label className={`${styles.tarjetaTier} ${styles.tarjetaTierOtro}`}>
                <input type="radio" name="tier" value="free" checked={tier === 'free'} onChange={() => setTier('free')} className={styles.radioTier} />
                <span>
                  <strong>Gratis</strong> — aparecés en el directorio con tu información básica.
                </span>
              </label>
            </div>
          </div>

          {tier === 'premium' && (
            <div className={styles.seccion}>
              <label className={styles.etiqueta}>Foto de perfil</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFotoPerfil(e.target.files?.[0] || null)}
                className={styles.input}
              />
              <p className={styles.ayuda}>Esta es la foto que se mostrará en tu tarjeta destacada. Opcional, pero recomendada.</p>
            </div>
          )}

          <div className={`${styles.seccion} ${styles.cajaConsentimiento}`}>
            <label className={styles.consentimientoLabel}>
              <input type="checkbox" name="consentimiento" required className={styles.checkboxConsentimiento} />
              <span>
                Entiendo que: 1) Los datos provistos (WhatsApp, redes sociales, email, foto de perfil) serán utilizados para redirigir clientes potenciales hacia los canales que agregué. 2) El sitio utiliza tecnología para proteger la privacidad de mis datos de acuerdo a la legislación local y mejores prácticas disponibles. 3) Estoy de acuerdo en que los datos provistos se usen según lo descrito en este espacio y en <Link href="/aviso-legal" className={styles.enlaceConsentimiento}>Información Importante</Link>. ¿Dudas? <a href="/go/whatsapp/solicitar" className={styles.enlaceConsentimiento}>Escribir aquí</a>. *              </span>
            </label>
          </div>

          {estado === 'error' && (
            <p className={styles.errorEnvio}>{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={estado === 'enviando'}
            className={styles.botonEnviar}
          >
            {estado === 'enviando' ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      </div>
    </div>
  );
}