'use client';

import { useState } from 'react';
import { updateRequestStatus } from './actions';

interface Solicitud {
  id: string;
  nombre_solicitante: string;
  cargo: string;
  area: string;
  jefe: string;
  tipo_viaje: string;
  origen: string;
  destino: string;
  fecha_ida: string;
  fecha_regreso: string;
  necesita_tiquete: boolean;
  necesita_hospedaje: boolean;
  solicito_anticipo: boolean;
  monto_anticipo: number;
  aprobador: string;
  centro_costos: string;
  observaciones: string;
  estado: string;
  created_at: string;
}

export default function SolicitudesTable({ solicitudes }: { solicitudes: Solicitud[] }) {
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async (id: string, status: 'Aprobado' | 'Rechazado') => {
    setIsUpdating(true);
    const result = await updateRequestStatus(id, status);
    setIsUpdating(false);
    if (result?.success) {
      setSelectedSolicitud(null);
      // Force a router refresh to see the changes immediately
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
              <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Destino</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Fecha Ida</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Estado</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Anticipo</th>
              <th style={{ padding: '1rem', textAlign: 'right', color: '#64748b' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => {
              const statusUpper = solicitud.estado?.toUpperCase();
              return (
                <tr 
                  key={solicitud.id} 
                  style={{ 
                    borderBottom: '1px solid #f1f5f9',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(248, 250, 252, 0.8)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{solicitud.destino}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{solicitud.origen}</div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', color: '#475569' }}>{new Date(solicitud.fecha_ida).toLocaleDateString()}</td>
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
                      {solicitud.estado}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', fontWeight: '500', color: '#1e293b' }}>
                    {solicitud.solicito_anticipo ? `$${Number(solicitud.monto_anticipo).toLocaleString()}` : '-'}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => setSelectedSolicitud(solicitud)}
                      style={{ 
                        background: '#eff6ff', 
                        border: '1px solid #dbeafe', 
                        color: 'var(--primary)', 
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer', 
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'var(--primary)';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#eff6ff';
                        e.currentTarget.style.color = 'var(--primary)';
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

      {selectedSolicitud && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div className="glass-card" style={{ 
            maxWidth: '700px', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto',
            padding: '0',
            position: 'relative',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {/* Modal Header */}
            <div style={{ 
              padding: '2rem 2.5rem', 
              borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
              background: 'linear-gradient(to right, rgba(248, 250, 252, 0.5), rgba(255, 255, 255, 0.5))',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h2 className="title-gradient" style={{ margin: 0, fontSize: '1.75rem' }}>Detalle de Solicitud</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>ID: {String(selectedSolicitud.id).slice(0, 8)}</span>
                  <span style={{ 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem', 
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em',
                    background: selectedSolicitud.estado?.toUpperCase() === 'PENDIENTE' ? '#fef3c7' : selectedSolicitud.estado?.toUpperCase() === 'APROBADO' ? '#dcfce7' : '#fee2e2',
                    color: selectedSolicitud.estado?.toUpperCase() === 'PENDIENTE' ? '#92400e' : selectedSolicitud.estado?.toUpperCase() === 'APROBADO' ? '#166534' : '#991b1b'
                  }}>
                    {selectedSolicitud.estado}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSolicitud(null)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: '#f1f5f9',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
                onMouseOut={(e) => e.currentTarget.style.background = '#f1f5f9'}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2.5rem' }}>
              
              {/* Section: Applicant Info */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '4px', height: '16px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                  Información del Solicitante
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <InfoField label="Nombre Completo" value={selectedSolicitud.nombre_solicitante} bold />
                  <InfoField label="Cargo / Área" value={`${selectedSolicitud.cargo} - ${selectedSolicitud.area}`} />
                  <InfoField label="Jefe Inmediato" value={selectedSolicitud.jefe} />
                  <InfoField label="Aprobador Final" value={selectedSolicitud.aprobador} />
                </div>
              </div>

              {/* Section: Trip Details */}
              <div style={{ marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(248, 250, 252, 0.5)', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '4px', height: '16px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                  Detalles del Viaje
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <InfoField label="Tipo de Viaje" value={selectedSolicitud.tipo_viaje} />
                  <InfoField label="Ruta" value={`${selectedSolicitud.origen} → ${selectedSolicitud.destino}`} bold />
                  <InfoField label="Fecha de Ida" value={new Date(selectedSolicitud.fecha_ida).toLocaleDateString()} />
                  <InfoField label="Fecha de Regreso" value={new Date(selectedSolicitud.fecha_regreso).toLocaleDateString()} />
                  <InfoField label="Centro de Costos" value={selectedSolicitud.centro_costos} />
                </div>
              </div>

              {/* Section: Requirements */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '4px', height: '16px', background: 'var(--primary)', borderRadius: '2px' }}></span>
                  Requerimientos y Gastos
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Servicios</label>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <Badge active={selectedSolicitud.necesita_tiquete} label="Tiquete" />
                      <Badge active={selectedSolicitud.necesita_hospedaje} label="Hospedaje" />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Anticipo</label>
                    <div style={{ fontWeight: '600', fontSize: '1.1rem', color: selectedSolicitud.solicito_anticipo ? 'var(--primary)' : '#94a3b8' }}>
                      {selectedSolicitud.solicito_anticipo ? `$${Number(selectedSolicitud.monto_anticipo).toLocaleString()}` : 'No solicitado'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Observations */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Observaciones</label>
                <div style={{ 
                  background: '#ffffff', 
                  padding: '1rem 1.25rem', 
                  borderRadius: '12px', 
                  minHeight: '80px', 
                  border: '1px solid #e2e8f0',
                  color: '#475569',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {selectedSolicitud.observaciones || 'Sin observaciones adicionales.'}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ 
              padding: '1.5rem 2.5rem 2.5rem', 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'flex-end', 
              background: 'linear-gradient(to top, rgba(248, 250, 252, 0.5), rgba(255, 255, 255, 0))'
            }}>
              <button 
                onClick={() => setSelectedSolicitud(null)}
                className="btn-secondary"
                style={{ borderRadius: '12px', padding: '0.75rem 1.5rem' }}
                disabled={isUpdating}
              >
                Cerrar
              </button>
              {selectedSolicitud.estado?.toUpperCase() === 'PENDIENTE' && (
                <>
                  <button 
                    onClick={() => handleUpdateStatus(selectedSolicitud.id, 'Rechazado')}
                    className="btn-secondary"
                    style={{ 
                      borderRadius: '12px', 
                      padding: '0.75rem 1.5rem',
                      color: '#ef4444', 
                      borderColor: '#fecaca',
                      background: '#fff'
                    }}
                    disabled={isUpdating}
                  >
                    {isUpdating ? '...' : 'Rechazar Solicitud'}
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(selectedSolicitud.id, 'Aprobado')}
                    className="btn-primary"
                    style={{ borderRadius: '12px', padding: '0.75rem 2rem', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)' }}
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Procesando...' : 'Aprobar Solicitud'}
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

// Helper Components for Cleaner Code
function InfoField({ label, value, bold = false }: { label: string, value: string, bold?: boolean }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      <div style={{ fontWeight: bold ? '700' : '500', color: '#1e293b', fontSize: '1rem' }}>{value}</div>
    </div>
  );
}

function Badge({ active, label }: { active: boolean, label: string }) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.4rem', 
      padding: '0.35rem 0.75rem', 
      borderRadius: '8px', 
      fontSize: '0.85rem', 
      fontWeight: '600',
      background: active ? '#dcfce7' : '#f1f5f9',
      color: active ? '#166534' : '#94a3b8',
      border: active ? '1px solid #bbf7d0' : '1px solid #e2e8f0'
    }}>
      <span style={{ fontSize: '1rem' }}>{active ? '✓' : '○'}</span>
      {label}
    </div>
  );
}
