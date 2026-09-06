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
  const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState<string[]>([]);
  const [especialidadExpandida, setEspecialidadExpandida] = useState(false);
  const [panelAbierto, setPanelAbierto] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setPanelAbierto(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function alternarEspecialidad(esp: string) {
    setEspecialidadesSeleccionadas((actual) =>
      actual.includes(esp) ? actual.filter((e) => e !== esp) : [...actual, esp]
    );
  }

  function alternarTodasEspecialidades() {
    setEspecialidadesSeleccionadas((actual) => (actual.length > 0 ? [] : [...especialidades]));
  }

  function buscar() {
    const params = new URLSearchParams();
    especialidadesSeleccionadas.forEach((esp) => params.append('especialidad', esp));
    if (online) params.set('online', '1');
    if (domicilio) params.set('domicilio', '1');
    if (consultorio) params.set('consultorio', '1');
    if (premiumSolamente) params.set('premium', '1');
    if (grupal) params.set('grupal', '1');
    if (serviciosEmpresas) params.set('empresas', '1');
    if (hablaIngles) params.set('ingles', '1');
    router.push(`/directorio?${params.toString()}`);
  }

  const filtrosActivos =
    [online, domicilio, consultorio, premiumSolamente, grupal, serviciosEmpresas, hablaIngles].filter(Boolean).length +
    especialidadesSeleccionadas.length;

  return (
    <div className={styles.contenedor}>
      <div className={styles.filaBusqueda}>
        <div ref={panelRef} className={styles.filtrosWrapper}>
          <button
            onClick={() => setPanelAbierto((v) => !v)}
            className={`${styles.botonFiltros} ${filtrosActivos > 0 ? styles.botonFiltrosActivo : ''}`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#7370E0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <circle cx="14" cy="6" r="2" fill="#7370E0"></circle>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <circle cx="8" cy="12" r="2" fill="#7370E0"></circle>
              <line x1="4" y1="18" x2="20" y2="18"></line>
              <circle cx="16" cy="18" r="2" fill="#7370E0"></circle>
            </svg>
            <span className={styles.botonFiltrosTexto}>
              {filtrosActivos > 0 ? `Filtros (${filtrosActivos})` : 'Todos los nutricionistas'}
            </span>
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="#8a908d"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, transform: panelAbierto ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
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

              <div>
                <div onClick={() => setEspecialidadExpandida((v) => !v)} className={styles.opcionExpandible}>
                  <span className={styles.opcionExpandibleEtiqueta}>
                    <input
                      type="checkbox"
                      checked={especialidadesSeleccionadas.length > 0}
                      onChange={alternarTodasEspecialidades}
                      onClick={(e) => e.stopPropagation()}
                    />
                    Especialidad
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="#8a908d"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: especialidadExpandida ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </div>

                {especialidadExpandida && (
                  <div className={styles.especialidadNestedLista}>
                    {especialidades.map((esp) => (
                      <label key={esp} className={styles.opcionNested}>
                        <input
                          type="checkbox"
                          checked={especialidadesSeleccionadas.includes(esp)}
                          onChange={() => alternarEspecialidad(esp)}
                        />
                        {esp}
                      </label>
                    ))}
                  </div>
                )}
              </div>

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
