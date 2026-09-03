'use client';

import { useState } from 'react';
import { buscarPerfilPorCarne, actualizarCampoPerfil, actualizarEncuadreFoto } from '../actions';

const CAMPOS: { valor: string; etiqueta: string; tipo: 'texto' | 'booleano' | 'tier' | 'foto' | 'textarea' }[] = [
  { valor: 'whatsapp', etiqueta: 'WhatsApp', tipo: 'texto' },
  { valor: 'email', etiqueta: 'Email', tipo: 'texto' },
  { valor: 'facebook', etiqueta: 'Facebook', tipo: 'texto' },
  { valor: 'instagram', etiqueta: 'Instagram', tipo: 'texto' },
  { valor: 'tiktok', etiqueta: 'TikTok', tipo: 'texto' },
  { valor: 'youtube', etiqueta: 'YouTube', tipo: 'texto' },
  { valor: 'linkedin', etiqueta: 'LinkedIn', tipo: 'texto' },
  { valor: 'especialidad_manual', etiqueta: 'Especialidad', tipo: 'texto' },
  { valor: 'nombre_preferido', etiqueta: 'Nombre preferido', tipo: 'texto' },
  { valor: 'acerca_de', etiqueta: 'Acerca de (biografía corta)', tipo: 'textarea' },
  { valor: 'foto_encuadre', etiqueta: 'Foto: encuadre y zoom', tipo: 'foto' },
  { valor: 'punto_contacto_primario', etiqueta: 'Canal de contacto principal', tipo: 'tier' },
  { valor: 'tier', etiqueta: 'Nivel', tipo: 'tier' },
  { valor: 'citas_online', etiqueta: 'Citas online', tipo: 'booleano' },
  { valor: 'visita_domicilio', etiqueta: 'Visita a domicilio', tipo: 'booleano' },
  { valor: 'citas_grupales', etiqueta: 'Citas grupales', tipo: 'booleano' },
  { valor: 'servicios_empresas', etiqueta: 'Servicios a empresas', tipo: 'booleano' },
  { valor: 'habla_ingles', etiqueta: 'Habla inglés', tipo: 'booleano' },
];

const OPCIONES_CANAL = ['whatsapp', 'email', 'facebook', 'instagram', 'tiktok', 'youtube', 'linkedin'];
const OPCIONES_TIER = ['premium', 'contact', 'free'];

export default function EditorPerfil() {
  const [carneBuscado, setCarneBuscado] = useState('');
  const [perfil, setPerfil] = useState<any>(null);
  const [buscando, setBuscando] = useState(false);
  const [noEncontrado, setNoEncontrado] = useState(false);

  const [campoElegido, setCampoElegido] = useState(CAMPOS[0].valor);
  const [valorNuevo, setValorNuevo] = useState('');
  const [posYNuevo, setPosYNuevo] = useState(50);
  const [posXNuevo, setPosXNuevo] = useState(50);
  const [zoomNuevo, setZoomNuevo] = useState(100);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  async function buscar() {
    if (!carneBuscado.trim()) return;
    setBuscando(true);
    setNoEncontrado(false);
    setMensaje(null);
    const resultado = await buscarPerfilPorCarne(carneBuscado);
    setPerfil(resultado);
    setNoEncontrado(!resultado);
    setBuscando(false);
  }

  const campoInfo = CAMPOS.find((c) => c.valor === campoElegido)!;
  const esCampoFoto = campoElegido === 'foto_encuadre';

  function elegirCampo(nuevoCampo: string) {
    setCampoElegido(nuevoCampo);
    setMensaje(null);
    if (nuevoCampo === 'foto_encuadre') {
      setPosYNuevo(perfil?.foto_posicion_y ?? 50);
      setPosXNuevo(perfil?.foto_posicion_x ?? 50);
      setZoomNuevo(perfil?.foto_zoom ?? 100);
      setValorNuevo('');
    } else {
      setValorNuevo('');
    }
  }

  async function guardar() {
    setGuardando(true);
    setMensaje(null);

    if (campoElegido === 'nombre_preferido') {
      const valorLower = valorNuevo.toLowerCase();
      const apellido1 = (perfil.apellido_manual || '').toLowerCase().trim();
      const apellido2 = (perfil.segundo_apellido_manual || '').toLowerCase().trim();
      const incluyeApellido =
        (apellido1 && valorLower.includes(apellido1)) ||
        (apellido2 && valorLower.includes(apellido2));
      if (incluyeApellido) {
        setMensaje({ tipo: 'error', texto: 'El nombre preferido no debe incluir los apellidos — se agregan automáticamente en todo el sitio. Escribí solo el nombre.' });
        setGuardando(false);
        return;
      }
    }

    try {
      if (campoElegido === 'foto_encuadre') {
        await actualizarEncuadreFoto(perfil.carne, posYNuevo, posXNuevo, zoomNuevo);
        setMensaje({ tipo: 'exito', texto: 'Encuadre de foto actualizado correctamente.' });
      } else {
        const valorAEnviar = campoInfo.tipo === 'booleano' ? valorNuevo === 'true' : valorNuevo;
        await actualizarCampoPerfil(perfil.carne, campoElegido, valorAEnviar);
        setMensaje({ tipo: 'exito', texto: `${campoInfo.etiqueta} actualizado correctamente.` });
      }
      const actualizado = await buscarPerfilPorCarne(perfil.carne);
      setPerfil(actualizado);
      setValorNuevo('');
    } catch {
      setMensaje({ tipo: 'error', texto: 'No se pudo guardar el cambio. Intentá de nuevo.' });
    } finally {
      setGuardando(false);
    }
  }

  const puedeGuardar = esCampoFoto ? !!perfil?.foto_url : valorNuevo !== '';

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          value={carneBuscado}
          onChange={(e) => setCarneBuscado(e.target.value)}
          placeholder="Ej. 1987-15"
          style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '15px', fontFamily: 'inherit' }}
        />
        <button
          onClick={buscar}
          disabled={buscando}
          style={{ background: '#E4E0FB', color: '#10004C', border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          {buscando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {noEncontrado && (
        <p style={{ color: '#c0392b', fontWeight: 700, fontSize: '14px' }}>No se encontró ningún perfil con ese Carné.</p>
      )}

      {perfil && (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '22px', boxShadow: '0 4px 14px rgba(16,0,76,0.06)' }}>
          <p style={{ fontWeight: 800, fontSize: '17px', margin: '0 0 4px' }}>
            {perfil.nombre_manual} {perfil.apellido_manual} {perfil.segundo_apellido_manual}
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(16,0,76,0.5)', margin: '0 0 20px' }}>Carné {perfil.carne}</p>

          <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>Campo a actualizar</label>
          <select
            value={campoElegido}
            onChange={(e) => elegirCampo(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '15px', fontFamily: 'inherit', marginBottom: '16px' }}
          >
            {CAMPOS.map((c) => (
              <option key={c.valor} value={c.valor}>{c.etiqueta}</option>
            ))}
          </select>

          {esCampoFoto ? (
            perfil.foto_url ? (
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '13px', color: 'rgba(16,0,76,0.5)', marginBottom: '10px' }}>
                  Vista previa combinada — ajustá los tres controles y guardalos juntos.
                </p>
                <div style={{ width: '160px', aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: '10px', background: '#E4E0FB' }}>
                  <img
                    src={perfil.foto_url}
                    alt="Vista previa"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: `${posXNuevo}% ${posYNuevo}%`,
                      transform: `scale(${zoomNuevo / 100})`,
                      transformOrigin: `${posXNuevo}% ${posYNuevo}%`,
                      display: 'block',
                    }}
                  />
                </div>

                <p style={{ fontSize: '12px', fontWeight: 700, color: '#10004C', margin: '14px 0 4px' }}>Vertical</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '220px' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(16,0,76,0.5)' }}>Arriba</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={posYNuevo}
                    onChange={(e) => setPosYNuevo(Number(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <span style={{ fontSize: '12px', color: 'rgba(16,0,76,0.5)' }}>Abajo</span>
                </div>

                <p style={{ fontSize: '12px', fontWeight: 700, color: '#10004C', margin: '14px 0 4px' }}>Horizontal</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '220px' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(16,0,76,0.5)' }}>Izquierda</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={posXNuevo}
                    onChange={(e) => setPosXNuevo(Number(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <span style={{ fontSize: '12px', color: 'rgba(16,0,76,0.5)' }}>Derecha</span>
                </div>

                <p style={{ fontSize: '12px', fontWeight: 700, color: '#10004C', margin: '14px 0 4px' }}>Zoom</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '220px' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(16,0,76,0.5)' }}>Menos</span>
                  <input
                    type="range"
                    min={100}
                    max={200}
                    step={1}
                    value={zoomNuevo}
                    onChange={(e) => setZoomNuevo(Number(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <span style={{ fontSize: '12px', color: 'rgba(16,0,76,0.5)' }}>Más</span>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '13px', color: 'rgba(16,0,76,0.5)', marginBottom: '16px' }}>Este perfil no tiene foto cargada todavía.</p>
            )
          ) : (
            <>
              <p style={{ fontSize: '13px', color: 'rgba(16,0,76,0.5)', marginBottom: '6px' }}>
                Valor actual: <strong>{String(perfil[campoElegido] ?? 'No indica')}</strong>
              </p>

              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>Nuevo valor</label>
              {campoElegido === 'nombre_preferido' && (
                <p style={{ fontSize: '12px', color: 'rgba(16,0,76,0.5)', marginTop: '-2px', marginBottom: '8px' }}>
                  Solo el nombre — los apellidos ({perfil.apellido_manual} {perfil.segundo_apellido_manual}) se agregan automáticamente en todo el sitio.
                </p>
              )}

              {campoInfo.tipo === 'texto' && (
                <input
                  value={valorNuevo}
                  onChange={(e) => setValorNuevo(e.target.value)}
                  placeholder={campoElegido === 'whatsapp' ? 'Solo 8 dígitos' : ''}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '15px', fontFamily: 'inherit', marginBottom: '16px', boxSizing: 'border-box' }}
                />
              )}

              {campoInfo.tipo === 'textarea' && (
                <div style={{ marginBottom: '16px' }}>
                  <textarea
                    value={valorNuevo}
                    onChange={(e) => setValorNuevo(e.target.value.slice(0, 280))}
                    maxLength={280}
                    rows={4}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '15px', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                  <p style={{ fontSize: '12px', color: 'rgba(16,0,76,0.5)', margin: '4px 0 0', textAlign: 'right' }}>
                    {valorNuevo.length}/280
                  </p>
                </div>
              )}

              {campoInfo.tipo === 'booleano' && (
                <select
                  value={valorNuevo}
                  onChange={(e) => setValorNuevo(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '15px', fontFamily: 'inherit', marginBottom: '16px' }}
                >
                  <option value="">Elegí una opción</option>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              )}

              {campoInfo.tipo === 'tier' && (
                <select
                  value={valorNuevo}
                  onChange={(e) => setValorNuevo(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '15px', fontFamily: 'inherit', marginBottom: '16px' }}
                >
                  <option value="">Elegí una opción</option>
                  {(campoElegido === 'tier' ? OPCIONES_TIER : OPCIONES_CANAL).map((op) => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
              )}
            </>
          )}

          {mensaje && (
            <p style={{ color: mensaje.tipo === 'exito' ? '#1a7a4c' : '#c0392b', fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>
              {mensaje.texto}
            </p>
          )}

          <button
            onClick={guardar}
            disabled={guardando || !puedeGuardar}
            style={{ background: '#7370E0', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '12px 24px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', opacity: (guardando || !puedeGuardar) ? 0.6 : 1 }}
          >
            {guardando ? 'Guardando...' : 'Guardar cambio'}
          </button>
        </div>
      )}
    </div>
  );
}
