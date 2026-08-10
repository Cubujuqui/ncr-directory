'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      setError('Contraseña incorrecta.');
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F3F0FF', fontFamily: "'Mulish', system-ui, sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '32px', maxWidth: '360px', width: '100%', boxShadow: '0 10px 30px rgba(16,0,76,0.1)' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#10004C', margin: '0 0 16px' }}>Acceso administrador</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(16,0,76,0.15)', fontSize: '15px', marginBottom: '12px', boxSizing: 'border-box' }}
        />
        {error && <p style={{ color: '#c0392b', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ width: '100%', background: '#7370E0', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}