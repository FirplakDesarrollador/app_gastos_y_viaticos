import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import CopyLinkButton from '@/components/CopyLinkButton';
import SolicitudesTable from './SolicitudesTable';

export default async function ViajesPage() {
  const supabase = await createClient();
  const { data: solicitudes, error } = await supabase
    .from('solicitudes_viaje')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Solicitudes de Viaje
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            Gestiona y consulta el estado de tus viajes.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CopyLinkButton />
          <Link href="/viajes/nuevo" className="btn-primary" style={{ marginLeft: '1rem' }}>
            + Nueva Solicitud
          </Link>
        </div>
      </header>

      {error ? (
        <div className="error-message">
          Error al cargar las solicitudes: {error.message}
          <br />
          <small>Asegúrate de haber ejecutado el SQL en el Dashboard de Supabase.</small>
        </div>
      ) : solicitudes?.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No tienes solicitudes de viaje registradas.</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Link href="/viajes/nuevo" style={{ color: 'var(--primary)', fontWeight: '600' }}>
              Crea tu primera solicitud aquí
            </Link>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>o comparte el formulario con alguien externo:</div>
            <CopyLinkButton />
          </div>
        </div>
      ) : (
        <SolicitudesTable solicitudes={solicitudes as any[]} />
      )}
    </div>
  );
}
