import React from 'react';

export const ICONOS_PERFIL = {
  experiencia: (color: string) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5"></circle>
      <path d="M9 12.5L7 21l5-3 5 3-2-8.5"></path>
    </svg>
  ),
  especialidad: (color: string) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8"></circle>
      <circle cx="12" cy="12" r="2.5" fill={color} stroke="none"></circle>
    </svg>
  ),
  consultorio: (color: string) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="1"></rect>
      <path d="M9 21v-5h6v5"></path>
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1"></path>
    </svg>
  ),
  online: (color: string) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="2"></rect>
      <path d="M8 20h8"></path>
      <path d="M12 16v4"></path>
    </svg>
  ),
  domicilio: (color: string) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11l8-7 8 7"></path>
      <path d="M6 10v10h12V10"></path>
    </svg>
  ),
  ingles: (color: string) => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M3 12h18"></path>
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"></path>
    </svg>
  ),
};
