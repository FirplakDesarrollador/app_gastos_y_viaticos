import { createClient } from '@/lib/supabase/server';
import RefrigeriosTable from './RefrigeriosTable';
import Link from 'next/link';
import CopyLinkButton from '@/components/CopyLinkButton';

export default async function RefrigeriosPage() {
  const supabase = await createClient();
  
  const { data: solicitudes, error } = await supabase
    .from('refrigerios')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Gestión de Refrigerios
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            Consulta y aprueba las solicitudes de refrigerios para reuniones.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/refrigerios/nuevo" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
            <span>➕</span> Nueva Solicitud
          </Link>
          <CopyLinkButton path="/refrigerios/nuevo" />
        </div>
      </header>

      {error ? (
        <div className="error-message">
          Error al cargar los refrigerios: {error.message}
          <br />
          <small>Verifica que la tabla 'refrigerios' exista en Supabase.</small>
        </div>
      ) : solicitudes?.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No hay solicitudes de refrigerios registradas.</p>
        </div>
      ) : (
        <RefrigeriosTable solicitudes={solicitudes} />
      )}
    </div>
  );
}
