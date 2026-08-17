'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ especialidades }: { especialidades: string[] }) {
  const router = useRouter();
  const [online, setOnline] = useState(false);
  const [presencial, setPresencial] = useState(false);
  const [individual, setIndividual] = useState(false);
  const [grupal, setGrupal] = useState(false);
  const [premiumSolamente, setPremiumSolamente] = useState(false);
  const [aceptaSeguros, setAceptaSeguros] = useState(false);
  const [especialidad, setEspecialidad] = useState('');
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const [panelAbierto, setPanelAbierto] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setDropdownAbierto(false);
      }
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setPanelAbierto(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function elegirEspecialidad(esp: string) {
    setEspecialidad(esp);
    setDropdownAbierto(false);
  }

  function buscar() {
    const params = new URLSearchParams();
    if (especialidad) params.set('especialidad', especialidad);
    if (online) params.set('online', '1');
    if (presencial) params.set('presencial', '1');
    if (premiumSolamente) params.set('premium', '1');
    router.push(`/directorio?${params.toString()}`);
  }

  const filtrosActivos = [online, presencial, premiumSolamente].filter(Boolean).length;

  return (
    <div style={{ background: '#F3F0FF', borderRadius: '20px', padding: '18px', maxWidth: '760px', boxShadow: '0 18px 40px rgba(0,0,0,0.14)' }}>
      <div ref={panelRef} style={{ position: 'relative', marginBottom: '16px' }}>
        <button
          onClick={() => setPanelAbierto((v) => !v)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', border: 'none', cursor: 'pointer', background: filtrosActivos > 0 ? '#E4E0FB' : '#ffffff', color: '#10004C', borderRadius: '999px', padding: '9px 18px', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700 }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#7370E0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <circle cx="14" cy="6" r="2" fill="#7370E0"></circle>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <circle cx="8" cy="12" r="2" fill="#7370E0"></circle>
            <line x1="4" y1="18" x2="20" y2="18"></line>
            <circle cx="16" cy="18" r="2" fill="#7370E0"></circle>
          </svg>
          Filtros{filtrosActivos > 0 ? ` (${filtrosActivos})` : ''}
        </button>

{panelAbierto && (
          <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: '#ffffff', borderRadius: '14px', boxShadow: '0 10px 30px rgba(16,0,76,0.18)', padding: '18px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '260px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#10004C', cursor: 'pointer' }}>
              <input type="checkbox" checked={online} onChange={() => setOnline((v) => !v)} />
              Online
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#10004C', cursor: 'pointer' }}>
              <input type="checkbox" checked={presencial} onChange={() => setPresencial((v) => !v)} />
              Visita presencial
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#B0AEB8', cursor: 'not-allowed' }} title="Próximamente">
              <input type="checkbox" disabled />
              Individual
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#B0AEB8', cursor: 'not-allowed' }} title="Próximamente">
              <input type="checkbox" disabled />
              Grupal
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#10004C', cursor: 'pointer' }}>
              <input type="checkbox" checked={premiumSolamente} onChange={() => setPremiumSolamente((v) => !v)} />
              Miembros Premium
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#B0AEB8', cursor: 'not-allowed' }} title="Próximamente">
              <input type="checkbox" disabled />
              ¿Acepta seguros?
            </label>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
        <div ref={wrapperRef} style={{ flex: 1.4, position: 'relative' }}>
          <div
            onClick={() => setDropdownAbierto((v) => !v)}
            style={{ background: '#ffffff', borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '0 16px', minHeight: '44px', cursor: 'pointer' }}
          >
            <span style={{ color: especialidad ? '#10004C' : '#8a908d', fontSize: '16px', fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {especialidad || 'Todas las especialidades'}
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#8a908d" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"></path></svg>
          </div>

          {dropdownAbierto && (
            <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(16,0,76,0.18)', maxHeight: '280px', overflowY: 'auto', zIndex: 10 }}>
              <div
                onClick={() => elegirEspecialidad('')}
                style={{ padding: '11px 16px', cursor: 'pointer', fontSize: '15px', color: '#8a908d', fontWeight: 500 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F0FF')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Todas las especialidades
              </div>
              {especialidades.map((esp) => (
                <div
                  key={esp}
                  onClick={() => elegirEspecialidad(esp)}
                  style={{ padding: '11px 16px', cursor: 'pointer', fontSize: '15px', color: '#10004C', fontWeight: 500 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F0FF')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {esp}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={buscar} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', border: 'none', cursor: 'pointer', background: '#7370E0', color: '#ffffff', borderRadius: '12px', padding: '0 30px', minHeight: '44px', fontFamily: 'inherit', fontSize: '17px', fontWeight: 800 }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4-4"></path></svg>
          Buscar
        </button>
      </div>
    </div>
  );
}