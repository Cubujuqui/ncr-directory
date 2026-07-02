'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ especialidades }: { especialidades: string[] }) {
  const router = useRouter();
  const [modo, setModo] = useState<'online' | 'presencial'>('online');
  const [tipo, setTipo] = useState<'individual' | 'grupal'>('individual');
  const [especialidad, setEspecialidad] = useState('');
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setDropdownAbierto(false);
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
    router.push(`/directorio?${params.toString()}`);
  }

  return (
    <div style={{ background: '#F3F0FF', borderRadius: '20px', padding: '18px', maxWidth: '760px', boxShadow: '0 18px 40px rgba(0,0,0,0.14)' }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <div style={{ display: 'inline-flex', gap: '6px', background: '#ffffff', borderRadius: '999px', padding: '4px' }}>
          <button onClick={() => setModo('online')} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', border: 'none', cursor: 'pointer', background: modo === 'online' ? '#E4E0FB' : '#ffffff', color: modo === 'online' ? '#10004C' : '#5A57A8', borderRadius: '999px', padding: '9px 18px', fontFamily: 'inherit', fontSize: '15px', fontWeight: modo === 'online' ? 800 : 700 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={modo === 'online' ? '#7370E0' : '#5A57A8'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="13" height="12" rx="2"></rect><path d="M15 10l6-3v10l-6-3z"></path></svg>
            Online
          </button>
          <button onClick={() => setModo('presencial')} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', border: 'none', cursor: 'pointer', background: modo === 'presencial' ? '#E4E0FB' : '#ffffff', color: modo === 'presencial' ? '#10004C' : '#5A57A8', borderRadius: '999px', padding: '9px 18px', fontFamily: 'inherit', fontSize: '15px', fontWeight: modo === 'presencial' ? 800 : 700 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={modo === 'presencial' ? '#7370E0' : '#5A57A8'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9v.01M9 12v.01M9 15v.01M9 18v.01"></path></svg>
            Visita presencial
          </button>
        </div>
        <div style={{ display: 'inline-flex', gap: '6px', background: '#ffffff', borderRadius: '999px', padding: '4px' }}>
          <button onClick={() => setTipo('individual')} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', border: 'none', cursor: 'pointer', background: tipo === 'individual' ? '#E4E0FB' : '#ffffff', color: tipo === 'individual' ? '#10004C' : '#5A57A8', borderRadius: '999px', padding: '9px 18px', fontFamily: 'inherit', fontSize: '15px', fontWeight: tipo === 'individual' ? 800 : 700 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={tipo === 'individual' ? '#7370E0' : '#5A57A8'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21v-1a8 8 0 0 1 16 0v1"></path></svg>
            Individual
          </button>
          <button onClick={() => setTipo('grupal')} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', border: 'none', cursor: 'pointer', background: tipo === 'grupal' ? '#E4E0FB' : '#ffffff', color: tipo === 'grupal' ? '#10004C' : '#5A57A8', borderRadius: '999px', padding: '9px 18px', fontFamily: 'inherit', fontSize: '15px', fontWeight: tipo === 'grupal' ? 800 : 700 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={tipo === 'grupal' ? '#7370E0' : '#5A57A8'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5"></circle><path d="M2 20v-1a6 6 0 0 1 12 0v1"></path><path d="M16 5a3.5 3.5 0 0 1 0 7M22 20v-1a6 6 0 0 0-4-5.7"></path></svg>
            Grupal
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
        <div ref={wrapperRef} style={{ flex: 1.4, position: 'relative' }}>
          <div
            onClick={() => setDropdownAbierto((v) => !v)}
            style={{ background: '#ffffff', borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '0 16px', minHeight: '44px', cursor: 'pointer' }}
          >
            <span style={{ color: especialidad ? '#10004C' : '#8a908d', fontSize: '16px', fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {especialidad || 'Menú de especialidades'}
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