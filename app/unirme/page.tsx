'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Unirme() {
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'exito' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [carneValor, setCarneValor] = useState('');
  const [nombreCPN, setNombreCPN] = useState<string | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [busquedaHecha, setBusquedaHecha] = useState(false);
  const [usarNombreCPN, setUsarNombreCPN] = useState(true);

  const [fotoCarne, setFotoCarne] = useState<File | null>(null);

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
    if (!consentimiento) {
      setEstado('error');
      setErrorMsg('Debés autorizar la publicación de tus datos para continuar.');
      return;
    }
    if (!fotoCarne) {
      setEstado('error');
      setErrorMsg('Necesitamos una foto de tu carné para verificar tu identidad.');
      return;
    }

    setEstado('enviando');

    const referidoPor = (data.get('referido_por') as string || '').trim() || null;
    const nombrePreferido = usarNombreCPN ? null : ((data.get('nombre_preferido') as string || '').trim() || null);

    const extension = fotoCarne.name.split('.').pop();
    const rutaFoto = `${carne}-${Date.now()}.${extension}`;

    const { error: errorSubida } = await supabase.storage
      .from('carnes-verificacion')
      .upload(rutaFoto, fotoCarne);

    if (errorSubida) {
      setEstado('error');
      setErrorMsg('No pudimos subir la foto de tu carné. Intentá de nuevo.');
      console.error(errorSubida);
      return;
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
      instagram: (data.get('instagram') as string || '').trim() || null,
      tiktok: (data.get('tiktok') as string || '').trim() || null,
      youtube: (data.get('youtube') as string || '').trim() || null,
      linkedin: (data.get('linkedin') as string || '').trim() || null,
      punto_contacto_primario: data.get('punto_contacto_primario') as string,
      citas_online: data.get('citas_online') === 'on',
      visita_domicilio: data.get('visita_domicilio') === 'on',
      referido_por: referidoPor,
      referido_timestamp: referidoPor ? new Date().toISOString() : null,
      consentimiento: true,
      carne_foto_url: rutaFoto,
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
      <div style={{ minHeight: '100vh', background: '#F3F0FF', fontFamily: "'Mulish', system-ui, sans-serif", color: '#10004C', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '480px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 14px' }}>¡Listo! Recibimos tu información</h1>
          <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(16,0,76,0.75)' }}>
            Vamos a revisar tu solicitud y activaremos tu perfil pronto. Si tenés dudas, escribinos por WhatsApp.
          </p>
          <Link href="/" style={{ display: 'inline-block', marginTop: '20px', color: '#7370E0', fontWeight: 700, textDecoration: 'none' }}>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const labelStyle = { display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: '#10004C' };
  const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '15px', fontFamily: 'inherit', boxSizing: 'border-box' as const };
  const sectionStyle = { marginBottom: '22px' };
  const helpStyle = { fontSize: '12px', color: 'rgba(16,0,76,0.5)', margin: '4px 0 0' };

  return (
    <div style={{ minHeight: '100vh', background: '#F3F0FF', fontFamily: "'Mulish', system-ui, sans-serif", color: '#10004C', padding: '50px 20px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#7370E0', textDecoration: 'none', fontWeight: 700, fontSize: '15px' }}>
          ← Volver al inicio
        </Link>

        <h1 style={{ fontSize: '30px', fontWeight: 800, margin: '20px 0 8px' }}>Unite al directorio</h1>
        <p style={{ fontSize: '16px', color: 'rgba(16,0,76,0.7)', marginBottom: '30px' }}>
          Completá tus datos para activar o actualizar tu perfil. Revisamos cada solicitud antes de publicarla.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={sectionStyle}>
            <label style={labelStyle}>Número de carné *</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                name="carne"
                required
                value={carneValor}
                onChange={(e) => { setCarneValor(e.target.value); setBusquedaHecha(false); }}
                onBlur={buscarNombre}
                style={{ ...inputStyle, flex: 1 }}
                placeholder="Ej. 1987-15"
              />
              <button
                type="button"
                onClick={buscarNombre}
                disabled={buscando}
                style={{ background: '#E4E0FB', color: '#10004C', border: 'none', borderRadius: '10px', padding: '0 16px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                {buscando ? 'Buscando...' : 'Buscar'}
              </button>
            </div>

            {busquedaHecha && nombreCPN && (
              <div style={{ marginTop: '10px', background: '#E4E0FB', borderRadius: '10px', padding: '12px' }}>
                <p style={{ fontSize: '14px', margin: '0 0 8px' }}>
                  El nombre que aparece en el CPN es: <strong>{nombreCPN}</strong>. ¿Querés usar ese nombre o preferís que mostremos otro?
                </p>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '6px' }}>
                  <input type="radio" checked={usarNombreCPN} onChange={() => setUsarNombreCPN(true)} />
                  Usar ese nombre
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                  <input type="radio" checked={!usarNombreCPN} onChange={() => setUsarNombreCPN(false)} />
                  Prefiero mostrar otro nombre
                </label>
                {!usarNombreCPN && (
                  <input name="nombre_preferido" style={{ ...inputStyle, marginTop: '10px' }} placeholder="¿Cómo querés que te llamemos?" />
                )}
              </div>
            )}

            {busquedaHecha && !nombreCPN && (
              <div style={{ marginTop: '10px' }}>
                <p style={helpStyle}>No encontramos ese carné en el registro público más reciente. Podés escribir tu nombre manualmente.</p>
                <input name="nombre_preferido" style={{ ...inputStyle, marginTop: '8px' }} placeholder="Tu nombre completo" />
              </div>
            )}
          </div>

          <div style={sectionStyle}>
            <label style={labelStyle}>Foto de tu carné vigente *</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFotoCarne(e.target.files?.[0] || null)}
              style={inputStyle}
            />
            <p style={helpStyle}>La usamos solo para confirmar que sos vos. No se publica en el sitio.</p>
          </div>

          <div style={sectionStyle}>
            <label style={labelStyle}>Nivel que te interesa</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', gap: '10px', background: '#E4E0FB', borderRadius: '10px', padding: '12px', alignItems: 'flex-start' }}>
                <input type="radio" name="tier" value="premium" defaultChecked style={{ marginTop: '3px' }} />
                <span>
                  <strong>Premium</strong> — máxima visibilidad, aparecés destacado en la portada.
                  <br />
                  <span style={helpStyle}>Precio preliminar: $17/mes. Por ahora, sin costo mientras probamos el sistema.</span>
                </span>
              </label>
              <label style={{ display: 'flex', gap: '10px', background: '#F3F0FF', borderRadius: '10px', padding: '12px', alignItems: 'flex-start' }}>
                <input type="radio" name="tier" value="contact" style={{ marginTop: '3px' }} />
                <span>
                  <strong>Contacto</strong> — incluye enlace directo a tu WhatsApp.
                  <br />
                  <span style={helpStyle}>Precio preliminar: $9/mes. Por ahora, sin costo mientras probamos el sistema.</span>
                </span>
              </label>
              <label style={{ display: 'flex', gap: '10px', background: '#F3F0FF', borderRadius: '10px', padding: '12px', alignItems: 'flex-start' }}>
                <input type="radio" name="tier" value="free" style={{ marginTop: '3px' }} />
                <span>
                  <strong>Gratis</strong> — aparecés en el directorio con tu información básica.
                </span>
              </label>
            </div>
          </div>

 <div style={sectionStyle}>
            <label style={labelStyle}>WhatsApp</label>
            <input name="whatsapp" style={inputStyle} placeholder="Ej. 88887777" maxLength={8} />
            <p style={helpStyle}>Solo escribí los 8 dígitos — nosotros agregamos el 506.</p>
          </div>

          <div style={sectionStyle}>
            <label style={labelStyle}>Email</label>
            <input name="email" type="email" style={inputStyle} placeholder="Opcional" />
          </div>

          <div style={sectionStyle}>
            <label style={labelStyle}>Instagram</label>
            <input name="instagram" style={inputStyle} placeholder="usuario, sin @" />
          </div>

          <div style={sectionStyle}>
            <label style={labelStyle}>TikTok</label>
            <input name="tiktok" style={inputStyle} placeholder="usuario, sin @" />
          </div>

          <div style={sectionStyle}>
            <label style={labelStyle}>YouTube</label>
            <input name="youtube" style={inputStyle} placeholder="Enlace al canal" />
          </div>

          <div style={sectionStyle}>
            <label style={labelStyle}>LinkedIn</label>
            <input name="linkedin" style={inputStyle} placeholder="Enlace al perfil" />
          </div>

          <div style={sectionStyle}>
            <label style={labelStyle}>¿Cuál es tu canal de contacto principal?</label>
            <select name="punto_contacto_primario" defaultValue="whatsapp" style={inputStyle}>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>

          <div style={sectionStyle}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600 }}>
              <input type="checkbox" name="citas_online" />
              Ofrezco citas online
            </label>
          </div>

          <div style={sectionStyle}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600 }}>
              <input type="checkbox" name="visita_domicilio" />
              Ofrezco visitas a domicilio
            </label>
          </div>

          <div style={sectionStyle}>
            <label style={labelStyle}>¿Alguien te refirió? (su número de carné)</label>
            <input name="referido_por" style={inputStyle} placeholder="Opcional" />
          </div>

          <div style={{ ...sectionStyle, background: '#E4E0FB', padding: '16px', borderRadius: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', fontWeight: 600, lineHeight: 1.6 }}>
              <input type="checkbox" name="consentimiento" required style={{ marginTop: '3px' }} />
              Autorizo la publicación de estos datos en nutricionistasencostarica.com. Entiendo que el sitio utiliza tecnología para proteger mi privacidad: mis datos de contacto no se muestran públicamente, sino que se usan únicamente para redirigir a quien haga clic hacia el canal de comunicación que yo indiqué. *
            </label>
          </div>

          {estado === 'error' && (
            <p style={{ color: '#c0392b', fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={estado === 'enviando'}
            style={{ width: '100%', background: '#7370E0', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            {estado === 'enviando' ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      </div>
    </div>
  );
}