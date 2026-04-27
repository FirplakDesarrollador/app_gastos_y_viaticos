'use client'

import { useState } from 'react';
import { signIn, signUp } from '@/app/auth/actions';
import Link from 'next/link';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    
    if (isLogin) {
      const result = await signIn(formData);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } else {
      const result = await signUp(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setMessage(result.success);
      }
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card glass-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="title-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            {isLogin 
              ? 'Ingresa tus credenciales para acceder' 
              : 'Regístrate para comenzar a gestionar tus gastos'}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="form-input"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '1rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? (
              <span className="loader" style={{ 
                width: '20px', 
                height: '20px', 
                border: '2px solid rgba(255, 255, 255, 0.3)', 
                borderBottomColor: '#fff', 
                borderRadius: '50%', 
                display: 'inline-block',
                animation: 'rotation 1s linear infinite'
              }}></span>
            ) : (
              isLogin ? 'Iniciar Sesión' : 'Registrarse'
            )}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
          {isLogin ? (
            <p>
              ¿No tienes una cuenta?{' '}
              <button 
                onClick={() => setIsLogin(false)}
                style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: '600' }}
              >
                Regístrate
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes una cuenta?{' '}
              <button 
                onClick={() => setIsLogin(true)}
                style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: '600' }}
              >
                Inicia Sesión
              </button>
            </p>
          )}

          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
            <Link href="/viajes/nuevo" style={{ color: '#64748b', textDecoration: 'underline' }}>
              ¿Necesitas realizar una solicitud de viaje sin cuenta? Hazlo aquí
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
