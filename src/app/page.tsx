import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import './globals.css';

export default async function Home() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // The middleware handles the redirect to /login if there's no session

  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Panel de Control
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Bienvenido al sistema de gestión de gastos y viáticos.
        </p>
      </header>

      <div className="dashboard-grid">
        <Link href="/" className="feature-card glass-card">
          <div className="feature-icon">📊</div>
          <h3>Dashboard</h3>
          <p>Visualiza el resumen general de tus actividades y estados.</p>
        </Link>

        <Link href="/viajes" className="feature-card glass-card">
          <div className="feature-icon">✈️</div>
          <h3>Viajes</h3>
          <p>Gestiona tus solicitudes de viaje y legalización de viáticos.</p>
        </Link>

        <Link href="/refrigerios" className="feature-card glass-card">
          <div className="feature-icon">🥪</div>
          <h3>Refrigerios</h3>
          <p>Solicita y consulta el estado de tus servicios de alimentación.</p>
        </Link>
      </div>
    </div>
  );
}

