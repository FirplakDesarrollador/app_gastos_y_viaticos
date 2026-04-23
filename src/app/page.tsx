import { supabase } from '@/lib/supabase';
import './globals.css';

export default async function Home() {
  const { data: furniture, error } = await supabase
    .from('furniture')
    .select('*')
    .limit(12);

  if (error) {
    console.error('Error fetching furniture:', error);
  }

  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '4rem', textAlign: 'center', animation: 'fadeIn 0.8s ease-out' }}>
        <h1 className="title-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Sistema de Mobiliario Premium
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Visualización de catálogo técnico conectado a Supabase.
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '2rem',
        animation: 'fadeIn 1s ease-out forwards'
      }}>
        {furniture?.map((item: any) => (
          <div key={item.id} className="glass-card">
            <div style={{ 
              height: '40px', 
              width: '40px', 
              background: '#3b82f633', 
              borderRadius: '10px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '1.5rem',
              color: '#3b82f6',
              fontSize: '1.2rem'
            }}>
              🪑
            </div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{item.name}</h3>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              <p>Dimensiones:</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <span style={{ background: '#ffffff1a', padding: '2px 8px', borderRadius: '4px' }}>L: {item.largo_mm}mm</span>
                <span style={{ background: '#ffffff1a', padding: '2px 8px', borderRadius: '4px' }}>A: {item.ancho_mm}mm</span>
                <span style={{ background: '#ffffff1a', padding: '2px 8px', borderRadius: '4px' }}>P: {item.profundo_mm}mm</span>
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <span style={{ fontWeight: '400', fontSize: '0.8rem', color: '#60a5fa' }}>
                Versión {item.version}
              </span>
              <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                Configurar
              </button>
            </div>
          </div>
        ))}
      </div>

      {!furniture?.length && !error && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
          No se encontraron datos en la tabla 'furniture'.
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#ef4444' }}>
          Error al conectar con la base de datos: {error.message}
        </div>
      )}
    </main>
  );
}
