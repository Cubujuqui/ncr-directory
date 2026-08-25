'use client';

import { useState } from 'react';
import { buscarPerfilPorCarne, buscarPagosPorCarne, registrarPago, actualizarNumeroFactura } from '../actions';

export default function RegistrarPago() {
  const [carneBuscado, setCarneBuscado] = useState('');
  const [perfil, setPerfil] = useState<any>(null);
  const [pagos, setPagos] = useState<any[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [noEncontrado, setNoEncontrado] = useState(false);

  const [monto, setMonto] = useState('');
  const [metodoPago, setMetodoPago] = useState('sinpe');
  const [nivelPagado, setNivelPagado] = useState('premium');
  const [fechaPago, setFechaPago] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [resultado, setResultado] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const [facturaEditando, setFacturaEditando] = useState<number | null>(null);
  const [facturaValor, setFacturaValor] = useState('');

  async function buscar() {
    if (!carneBuscado.trim()) return;
    setBuscando(true);
    setNoEncontrado(false);
    setResultado(null);
    const [perfilEncontrado, pagosEncontrados] = await Promise.all([
      buscarPerfilPorCarne(carneBuscado),
      buscarPagosPorCarne(carneBuscado),
    ]);
    setPerfil(perfilEncontrado);
    setPagos(pagosEncontrados);
    setNoEncontrado(!perfilEncontrado);
    setBuscando(false);
  }

  async function guardar() {
    if (!fechaPago) {
      setResultado({ tipo: 'error', texto: 'Elegí la fecha de pago.' });
      return;
    }
    setGuardando(true);
    setResultado(null);
    try {
      const montoNumerico = monto.trim() ? parseFloat(monto) : null;
      const { cubreHasta } = await registrarPago(perfil.carne, montoNumerico, metodoPago, nivelPagado, fechaPago);
      setResultado({ tipo: 'exito', texto: `Pago registrado. Cubre hasta el ${cubreHasta}.` });
      const pagosActualizados = await buscarPagosPorCarne(perfil.carne);
      setPagos(pagosActualizados);
      setMonto('');
      setFechaPago('');
    } catch {
      setResultado({ tipo: 'error', texto: 'No se pudo registrar el pago. Intentá de nuevo.' });
    } finally {
      setGuardando(false);
    }
  }

  async function guardarFactura(pagoId: number) {
    await actualizarNumeroFactura(pagoId, facturaValor);
    const pagosActualizados = await buscarPagosPorCarne(perfil.carne);
    setPagos(pagosActualizados);
    setFacturaEditando(null);
    setFacturaValor('');
  }

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
        <>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '22px', boxShadow: '0 4px 14px rgba(16,0,76,0.06)', marginBottom: '20px' }}>
            <p style={{ fontWeight: 800, fontSize: '17px', margin: '0 0 4px' }}>
              {perfil.nombre_manual} {perfil.apellido_manual} {perfil.segundo_apellido_manual}
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(16,0,76,0.5)', margin: '0 0 20px' }}>
              Carné {perfil.carne} · Nivel actual: <strong>{perfil.tier}</strong>
            </p>

            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>Monto (opcional)</label>
            <input
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Ej. 6000"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '15px', fontFamily: 'inherit', marginBottom: '16px', boxSizing: 'border-box' }}
            />

            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>Método de pago</label>
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '15px', fontFamily: 'inherit', marginBottom: '16px' }}
            >
              <option value="sinpe">SINPE</option>
              <option value="transferencia">Transferencia bancaria</option>
            </select>

            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>Nivel pagado</label>
            <select
              value={nivelPagado}
              onChange={(e) => setNivelPagado(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '15px', fontFamily: 'inherit', marginBottom: '16px' }}
            >
              <option value="premium">Premium</option>
              <option value="contact">Contacto</option>
            </select>

            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>Fecha de pago</label>
            <input
              type="date"
              value={fechaPago}
              onChange={(e) => setFechaPago(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '15px', fontFamily: 'inherit', marginBottom: '16px', boxSizing: 'border-box' }}
            />

            {resultado && (
              <p style={{ color: resultado.tipo === 'exito' ? '#1a7a4c' : '#c0392b', fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>
                {resultado.texto}
              </p>
            )}

            <button
              onClick={guardar}
              disabled={guardando}
              style={{ background: '#7370E0', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '12px 24px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', opacity: guardando ? 0.6 : 1 }}
            >
              {guardando ? 'Guardando...' : 'Registrar pago'}
            </button>
          </div>

          <div style={{ background: '#fff', borderRadius: '16px', padding: '22px', boxShadow: '0 4px 14px rgba(16,0,76,0.06)' }}>
            <p style={{ fontWeight: 800, fontSize: '15px', margin: '0 0 14px' }}>Historial de pagos</p>
            {pagos.length === 0 && (
              <p style={{ color: 'rgba(16,0,76,0.5)', fontSize: '14px' }}>Todavía no hay pagos registrados.</p>
            )}
            {pagos.map((pago) => (
              <div key={pago.id} style={{ borderTop: '1px solid #F3F0FF', padding: '12px 0', fontSize: '13px' }}>
                <p style={{ margin: '0 0 4px' }}>
                  <strong>{pago.fecha_pago}</strong> · {pago.nivel_pagado} · {pago.metodo_pago}
                  {pago.monto ? ` · ₡${pago.monto}` : ''}
                </p>
                <p style={{ margin: '0 0 6px', color: 'rgba(16,0,76,0.6)' }}>Cubre hasta: {pago.cubre_hasta}</p>

                {facturaEditando === pago.id ? (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      value={facturaValor}
                      onChange={(e) => setFacturaValor(e.target.value)}
                      placeholder="Número de factura"
                      style={{ flex: 1, padding: '6px 10px', borderRadius: '8px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '13px', fontFamily: 'inherit' }}
                    />
                    <button
                      onClick={() => guardarFactura(pago.id)}
                      style={{ background: '#E4E0FB', color: '#10004C', border: 'none', borderRadius: '8px', padding: '6px 12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px' }}
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <p
                    onClick={() => { setFacturaEditando(pago.id); setFacturaValor(pago.numero_factura || ''); }}
                    style={{ margin: 0, color: '#7370E0', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Factura: {pago.numero_factura || 'No indica'} (clic para editar)
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}