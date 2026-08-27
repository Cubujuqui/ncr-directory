'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

export default function SearchBar({ especialidades }: { especialidades: string[] }) {
  const router = useRouter();
  const [online, setOnline] = useState(false);
  const [domicilio, setDomicilio] = useState(false);
  const [consultorio, setConsultorio] = useState(false);
  const [premiumSolamente, setPremiumSolamente] = useState(false);
  const [grupal, setGrupal] = useState(false);
  const [serviciosEmpresas, setServiciosEmpresas] = useState(false);
  const [hablaIngles, setHablaIngles] = useState(false);
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
    if (domicilio) params.set('domicilio', '1');
    if (consultorio) params.set('consultorio', '1');
    if (premiumSolamente) params.set('premium', '1');
    if (grupal) params.set('grupal', '1');
    if (serviciosEmpresas) params.set('empresas', '1');
    if (hablaIngles) params.set('ingles', '1');
    router.push(`/directorio?${params.toString()}`);
  }

  const filtrosActivos = [online, domicilio, consultorio, premiumSolamente, grupal, serviciosEmpresas, hablaIngles].filter(Boolean).length;

  return (
    <div className={styles.contenedor}>
      <div ref={panelRef} className={styles.filtrosWrapper}>
        <button
          onClick={() => setPanelAbierto((v) => !v)}
          className={`${styles.botonFiltros} ${filtrosActivos > 0 ? styles.botonFiltrosActivo : ''}`}
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
          <div className={styles.panel}>
            <label className={styles.opcion}>
              <input type="checkbox" checked={premiumSolamente} onChange={() => setPremiumSolamente((v) => !v)} />
              Miembros Premium
            </label>
            <label className={styles.opcion}>
              <input type="checkbox" checked={online} onChange={() => setOnline((v) => !v)} />
              Atiende Online
            </label>
            <label className={styles.opcion}>
              <input type="checkbox" checked={domicilio} onChange={() => setDomicilio((v) => !v)} />
              Atiende a domicilio
            </label>
            <label className={styles.opcion}>
              <input type="checkbox" checked={consultorio} onChange={() => setConsultorio((v) => !v)} />
              Atiende en consultorio
            </label>
            <label className={styles.opcion}>
              <input type="checkbox" checked={grupal} onChange={() => setGrupal((v) => !v)} />
              Ofrece citas grupales
            </label>
            <label className={styles.opcion}>
              <input type="checkbox" checked={serviciosEmpresas} onChange={() => setServiciosEmpresas((v) => !v)} />
              Ofrece servicios a empresas
            </label>
            <label className={styles.opcion}>
              <input type="checkbox" checked={hablaIngles} onChange={() => setHablaIngles((v) => !v)} />
              Habla inglés
            </label>
            <label className={`${styles.opcion} ${styles.opcionDeshabilitada}`} title="Próximamente">
              <input type="checkbox" disabled />
              Acepta seguros
            </label>
          </div>
        )}
      </div>

      <div className={styles.filaBusqueda}>
        <div ref={wrapperRef} className={styles.especialidadWrapper}>
          <div onClick={() => setDropdownAbierto((v) => !v)} className={styles.especialidadBoton}>
            <span className={`${styles.especialidadTexto} ${especialidad ? styles.especialidadTextoActivo : ''}`}>
              {especialidad || 'Todas las especialidades'}
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#8a908d" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"></path></svg>
          </div>

          {dropdownAbierto && (
            <div className={styles.dropdownLista}>
              <div
                onClick={() => elegirEspecialidad('')}
                className={`${styles.opcionEspecialidad} ${styles.opcionEspecialidadVacia}`}
              >
                Todas las especialidades
              </div>
              {especialidades.map((esp) => (
                <div
                  key={esp}
                  onClick={() => elegirEspecialidad(esp)}
                  className={styles.opcionEspecialidad}
                >
                  {esp}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={buscar} className={styles.botonBuscar}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4-4"></path></svg>
          Buscar
        </button>
      </div>
    </div>
  );
}