import React from 'react';

export const ICONOS_PERFIL = {
  experiencia: (color: string, size: number = 15) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5"></circle>
      <path d="M9 12.5L7 21l5-3 5 3-2-8.5"></path>
    </svg>
  ),
  especialidad: (color: string, size: number = 15) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8"></circle>
      <circle cx="12" cy="12" r="2.5" fill={color} stroke="none"></circle>
    </svg>
  ),
  consultorio: (color: string, size: number = 15) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="1"></rect>
      <path d="M9 21v-5h6v5"></path>
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1"></path>
    </svg>
  ),
  online: (color: string, size: number = 15) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="2"></rect>
      <path d="M8 20h8"></path>
      <path d="M12 16v4"></path>
    </svg>
  ),
  domicilio: (color: string, size: number = 15) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11l8-7 8 7"></path>
      <path d="M6 10v10h12V10"></path>
    </svg>
  ),
  ingles: (color: string, size: number = 15) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M3 12h18"></path>
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"></path>
    </svg>
  ),
  grupal: (color: string, size: number = 15) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3"></circle>
      <circle cx="16" cy="8" r="3"></circle>
      <path d="M2 20c0-3 2.5-5 6-5s6 2 6 5"></path>
      <path d="M14 15c3 0 5.5 2 5.5 5"></path>
    </svg>
  ),
  empresas: (color: string, size: number = 15) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="1.5"></rect>
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <path d="M3 13h18"></path>
    </svg>
  ),
};
