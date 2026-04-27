import { createClient } from '@/lib/supabase/server';

export default async function FirmasPage() {
  const supabase = await createClient();
  const { data: firmas, error } = await supabase
    .from('firmas_digitales')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Firmas Digitales
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Consulta de firmas registradas en el sistema.
        </p>
      </header>

      {error ? (
        <div className="error-message">
          Error al cargar las firmas: {error.message}
          <br />
          <small>Asegúrate de que la tabla 'firmas_digitales' existe en tu base de datos.</small>
        </div>
      ) : firmas?.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No se encontraron firmas registradas.</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {firmas?.map((firma) => (
            <div key={firma.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: '0', fontSize: '1.1rem', fontWeight: '700' }}>{firma.nombre}</h3>
                <p style={{ margin: '0.25rem 0', color: '#64748b', fontSize: '0.9rem' }}>Cédula: {firma.cedula}</p>
              </div>
              
              <div style={{ 
                background: '#fff', 
                padding: '1rem', 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '120px'
              }}>
                <img 
                  src={firma.firma_base64.startsWith('data:image') ? firma.firma_base64 : `data:image/png;base64,${firma.firma_base64}`} 
                  alt={`Firma de ${firma.nombre}`} 
                  style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }}
                />
              </div>

              <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                <div><strong>Correo:</strong> {firma.correo || 'N/A'}</div>
                <div><strong>Teléfono:</strong> {firma.telefono || 'N/A'}</div>
                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed #f1f5f9' }}>
                  Fecha: {new Date(firma.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
