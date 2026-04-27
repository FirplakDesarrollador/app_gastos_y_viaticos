'use client';

import { useState } from 'react';
import { updateRefrigerioStatus } from './actions';

interface Refrigerio {
  id: string;
  nombre_solicitante: string;
  cargo: string;
  area: string;
  jefe: string;
  fecha: string;
  motivo: string;
  lugar: string;
  hora: string;
  tiempo_reunion: string;
  cantidad_personas: number;
  aprobador: string;
  centro_costos: string;
  observaciones: string;
  estado: string;
  created_at: string;
}

export default function RefrigeriosTable({ solicitudes }: { solicitudes: Refrigerio[] }) {
  const [selected, setSelected] = useState<Refrigerio | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async (id: string, status: 'Aprobado' | 'Rechazado') => {
    setIsUpdating(true);
    const result = await updateRefrigerioStatus(id, status);
    setIsUpdating(false);
    if (result?.success) {
      setSelected(null);
      window.location.reload();
    } else {
      alert('Error al actualizar el estado: ' + result?.error);
    }
  };

  return (
    <>
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Solicitante</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Fecha Evento</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Motivo</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Estado</th>
              <th style={{ padding: '1rem', textAlign: 'right', color: '#64748b' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((sol) => {
              const statusUpper = sol.estado?.toUpperCase();
              return (
                <tr 
                  key={sol.id} 
                  style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(248, 250, 252, 0.8)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{sol.nombre_solicitante}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{sol.area}</div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', color: '#475569' }}>
                    {new Date(sol.fecha).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', color: '#475569' }}>
                    {sol.motivo}
                  </td>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <span style={{ 
                      padding: '0.35rem 0.75rem', 
                      borderRadius: '8px', 
                      fontSize: '0.75rem', 
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.025em',
                      background: statusUpper === 'PENDIENTE' ? '#fef3c7' : statusUpper === 'APROBADO' ? '#dcfce7' : '#fee2e2',
                      color: statusUpper === 'PENDIENTE' ? '#92400e' : statusUpper === 'APROBADO' ? '#166534' : '#991b1b'
                    }}>
                      {sol.estado}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => setSelected(sol)}
                      style={{ 
                        background: '#eff6ff', 
                        border: '1px solid #dbeafe', 
                        color: 'var(--primary)', 
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer', 
                        fontWeight: '600',
                        fontSize: '0.85rem'
                      }}
                    >
                      Detalles
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '1.5rem', animation: 'fadeIn 0.3s ease-out'
        }}>
          <div className="glass-card" style={{ 
            maxWidth: '750px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
            padding: '0', position: 'relative', borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {/* Header */}
            <div style={{ 
              padding: '2rem 2.5rem', borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
              background: 'linear-gradient(to right, rgba(248, 250, 252, 0.5), rgba(255, 255, 255, 0.5))',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <h2 className="title-gradient" style={{ margin: 0, fontSize: '1.75rem' }}>Detalle de Solicitud de Refrigerio</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Solicitud #{String(selected.id).slice(0, 8)}</span>
                  <span style={{ 
                    padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700',
                    textTransform: 'uppercase', letterSpacing: '0.025em',
                    background: selected.estado?.toUpperCase() === 'PENDIENTE' ? '#fef3c7' : selected.estado?.toUpperCase() === 'APROBADO' ? '#dcfce7' : '#fee2e2',
                    color: selected.estado?.toUpperCase() === 'PENDIENTE' ? '#92400e' : selected.estado?.toUpperCase() === 'APROBADO' ? '#166534' : '#991b1b'
                  }}>
                    {selected.estado}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f1f5f9', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>&times;</button>
            </div>

            {/* Body */}
            <div style={{ padding: '2.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                {/* Solicitante Section */}
                <div>
                  <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '4px', height: '16px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                    Información del Solicitante
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Field label="Nombre" value={selected.nombre_solicitante} bold />
                    <Field label="Cargo / Área" value={`${selected.cargo} - ${selected.area}`} />
                    <Field label="Jefe Inmediato" value={selected.jefe} />
                    <Field label="Aprobador Final" value={selected.aprobador} />
                  </div>
                </div>

                {/* Evento Section */}
                <div>
                  <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '4px', height: '16px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                    Detalles del Evento
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Field label="Motivo de la Reunión" value={selected.motivo} bold />
                    <Field label="Lugar" value={selected.lugar} />
                    <Field label="Fecha y Hora" value={`${new Date(selected.fecha).toLocaleDateString()} a las ${selected.hora}`} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <Field label="Duración" value={selected.tiempo_reunion} />
                      <Field label="Personas" value={String(selected.cantidad_personas)} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Management Section */}
              <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'rgba(248, 250, 252, 0.5)', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <Field label="Centro de Costos" value={selected.centro_costos} />
                  <Field label="Fecha de Solicitud" value={new Date(selected.created_at).toLocaleString()} />
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Observaciones</label>
                  <div style={{ background: '#fff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#475569', fontSize: '0.95rem' }}>
                    {selected.observaciones || 'Sin observaciones.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '1.5rem 2.5rem 2.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelected(null)} className="btn-secondary" style={{ borderRadius: '12px', padding: '0.75rem 1.5rem' }} disabled={isUpdating}>Cerrar</button>
              {selected.estado?.toUpperCase() === 'PENDIENTE' && (
                <>
                  <button 
                    onClick={() => handleUpdateStatus(selected.id, 'Rechazado')}
                    className="btn-secondary"
                    style={{ borderRadius: '12px', padding: '0.75rem 1.5rem', color: '#ef4444', borderColor: '#fecaca', background: '#fff' }}
                    disabled={isUpdating}
                  >
                    {isUpdating ? '...' : 'Rechazar'}
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(selected.id, 'Aprobado')}
                    className="btn-primary"
                    style={{ borderRadius: '12px', padding: '0.75rem 2rem', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)' }}
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Procesando...' : 'Aprobar'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, value, bold = false }: { label: string, value: string, bold?: boolean }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      <div style={{ fontWeight: bold ? '700' : '500', color: '#1e293b', fontSize: '0.95rem' }}>{value}</div>
    </div>
  );
}
