'use client';

import { useState } from 'react';
import type { CSSProperties, ChangeEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { crearTestimonio, actualizarTestimonio, eliminarTestimonio } from '../actions';

type Testimonio = {
  id: number;
  nombre: string;
  foto_url: string | null;
  canal: string | null;
  handle: string | null;
  texto: string;
  creado_timestamp: string;
};

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  border: '1.5px solid rgba(16,0,76,0.15)',
  borderRadius: '8px',
  fontFamily: 'inherit',
  fontSize: '14px',
  color: '#10004C',
  boxSizing: 'border-box',
};

export default function TestimoniosAdmin({ testimoniosIniciales }: { testimoniosIniciales: Testimonio[] }) {
  const [testimonios, setTestimonios] = useState(testimoniosIniciales);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [canal, setCanal] = useState('');
  const [handle, setHandle] = useState('');
  const [texto, setTexto] = useState('');
  const [archivoFoto, setArchivoFoto] = useState<File | null>(null);
  const [previaFoto, setPreviaFoto] = useState<string | null>(null);
  const [fotoUrlExistente, setFotoUrlExistente] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  function limpiarFormulario() {
    setEditandoId(null);
    setNombre('');
    setCanal('');
    setHandle('');
    setTexto('');
    setArchivoFoto(null);
    setPreviaFoto(null);
    setFotoUrlExistente(null);
  }

  function empezarEdicion(t: Testimonio) {
    setEditandoId(t.id);
    setNombre(t.nombre);
    setCanal(t.canal || '');
    setHandle(t.handle || '');
    setTexto(t.texto);
    setFotoUrlExistente(t.foto_url);
    setArchivoFoto(null);
    setPreviaFoto(null);
    setMensaje(null);
  }

  function manejarArchivo(e: ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    setArchivoFoto(archivo);
    setPreviaFoto(URL.createObjectURL(archivo));
  }

  async function guardar() {
    if (!nombre.trim() || !texto.trim()) {
      setMensaje({ tipo: 'error', texto: 'Nombre y testimonio son obligatorios.' });
      return;
    }

    setGuardando(true);
    setMensaje(null);

    try {
      let fotoUrlFinal = fotoUrlExistente || '';

      if (archivoFoto) {
        const extension = archivoFoto.name.split('.').pop();
        const ruta = `${Date.now()}.${extension}`;
        const { error: errorSubida } = await supabase.storage
          .from('fotos-testimonios')
          .upload(ruta, archivoFoto);
        if (errorSubida) throw errorSubida;
        const { data: urlData } = supabase.storage.from('fotos-testimonios').getPublicUrl(ruta);
        fotoUrlFinal = urlData.publicUrl;
      }

      if (editandoId) {
        await actualizarTestimonio(editandoId, nombre, fotoUrlFinal, canal, handle, texto);
        setTestimonios((prev) =>
          prev.map((t) =>
            t.id === editandoId
              ? { ...t, nombre: nombre.trim(), foto_url: fotoUrlFinal || null, canal: canal.trim() || null, handle: handle.trim() || null, texto: texto.trim() }
              : t
          )
        );
        setMensaje({ tipo: 'exito', texto: 'Testimonio actualizado.' });
      } else {
        await crearTestimonio(nombre, fotoUrlFinal, canal, handle, texto);
        setMensaje({ tipo: 'exito', texto: 'Testimonio agregado. Recargá la página para verlo en la lista.' });
      }

      limpiarFormulario();
    } catch {
      setMensaje({ tipo: 'error', texto: 'Hubo un problema al guardar. Intentá de nuevo.' });
    } finally {
      setGuardando(false);
    }
  }

  async function eliminar(id: number) {
    if (!confirm('¿Eliminar este testimonio?')) return;
    try {
      await eliminarTestimonio(id);
      setTestimonios((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setMensaje({ tipo: 'error', texto: 'No se pudo eliminar.' });
    }
  }

  return (
    <div>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '22px', boxShadow: '0 4px 14px rgba(16,0,76,0.06)', marginBottom: '30px' }}>
        <p style={{ fontWeight: 800, fontSize: '17px', margin: '0 0 16px' }}>{editandoId ? 'Editar testimonio' : 'Agregar testimonio'}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>Nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>Foto</label>
            {(previaFoto || fotoUrlExistente) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previaFoto || fotoUrlExistente || ''}
                alt="Vista previa"
                style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '50%', marginBottom: '8px', display: 'block' }}
              />
            )}
            <input type="file" accept="image/*" onChange={manejarArchivo} />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>Canal (ej. Instagram, WhatsApp)</label>
              <input value={canal} onChange={(e) => setCanal(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>Usuario / handle (opcional)</label>
              <input value={handle} onChange={(e) => setHandle(e.target.value)} style={inputStyle} placeholder="@usuario" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>Testimonio</label>
            <textarea value={texto} onChange={(e) => setTexto(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          {mensaje && (
            <p style={{ fontSize: '13px', color: mensaje.tipo === 'exito' ? '#0F6E56' : '#A32D2D', margin: 0 }}>{mensaje.texto}</p>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={guardar}
              disabled={guardando}
              style={{ background: '#7370E0', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: 800, cursor: guardando ? 'default' : 'pointer', fontFamily: 'inherit', opacity: guardando ? 0.7 : 1 }}
            >
              {guardando ? 'Guardando…' : editandoId ? 'Guardar cambios' : 'Agregar testimonio'}
            </button>
            {editandoId && (
              <button
                onClick={limpiarFormulario}
                style={{ background: '#F3F0FF', color: '#10004C', border: '1.5px solid rgba(16,0,76,0.2)', borderRadius: '10px', padding: '10px 20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {testimonios.map((t) => (
          <div key={t.id} style={{ background: '#fff', borderRadius: '16px', padding: '18px 20px', boxShadow: '0 4px 14px rgba(16,0,76,0.06)', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            {t.foto_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.foto_url} alt={t.nombre} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0 }} />
            ) : (
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F3F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#7370E0', flexShrink: 0 }}>
                {t.nombre.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 800, margin: '0 0 2px' }}>{t.nombre}</p>
              {(t.canal || t.handle) && (
                <p style={{ fontSize: '12px', color: 'rgba(16,0,76,0.5)', margin: '0 0 6px' }}>
                  {t.canal && `vía ${t.canal}`}{t.canal && t.handle && ' · '}{t.handle}
                </p>
              )}
              <p style={{ fontSize: '14px', margin: 0, fontStyle: 'italic' }}>&quot;{t.texto}&quot;</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => empezarEdicion(t)}
                style={{ background: '#F3F0FF', color: '#10004C', border: 'none', borderRadius: '8px', padding: '6px 12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Editar
              </button>
              <button
                onClick={() => eliminar(t.id)}
                style={{ background: '#F3F0FF', color: '#A32D2D', border: 'none', borderRadius: '8px', padding: '6px 12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {testimonios.length === 0 && <p style={{ color: 'rgba(16,0,76,0.5)' }}>Todavía no hay testimonios guardados.</p>}
      </div>
    </div>
  );
}
