'use client'

import { useState } from 'react';
import { createRefrigerioRequest } from '../actions';
import Link from 'next/link';
import EmployeeSelect from '@/components/EmployeeSelect';

export default function NuevoRefrigerio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // States for auto-fill
  const [cargo, setCargo] = useState('');
  const [area, setArea] = useState('');
  const [jefe, setJefe] = useState('');

  const handleEmployeeSelect = (emp: any) => {
    if (emp) {
      setCargo(emp.cargo || '');
      setArea(emp.area || '');
      setJefe(emp.jefe || '');
    } else {
      setCargo('');
      setArea('');
      setJefe('');
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await createRefrigerioRequest(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8fafc', 
      padding: '2rem 1rem' 
    }}>
      <div style={{ animation: 'fadeIn 0.8s ease-out', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <Link href="/refrigerios" style={{ color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>
          ← Volver a la lista
        </Link>
        <h1 className="title-gradient" style={{ fontSize: '2.5rem' }}>Nueva Solicitud de Refrigerio</h1>
        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Completa los datos para solicitar refrigerios para tu reunión.</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label>Nombre de quien realiza la solicitud</label>
          <EmployeeSelect onSelect={handleEmployeeSelect} required />
        </div>

        <div className="form-group">
          <label>Cargo</label>
          <input name="cargo" type="text" required className="form-input" value={cargo} onChange={(e) => setCargo(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Área</label>
          <input name="area" type="text" required className="form-input" value={area} onChange={(e) => setArea(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Jefe Inmediato</label>
          <input name="jefe" type="text" required className="form-input" value={jefe} onChange={(e) => setJefe(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Fecha del Evento</label>
          <input name="fecha" type="date" required className="form-input" />
        </div>

        <div className="form-group">
          <label>Hora</label>
          <input name="hora" type="time" required className="form-input" />
        </div>

        <div className="form-group">
          <label>Duración (Tiempo de la reunión)</label>
          <input name="tiempo_reunion" type="text" required className="form-input" placeholder="Ej: 2 horas" />
        </div>

        <div className="form-group">
          <label>Cantidad de Personas</label>
          <input name="cantidad_personas" type="number" required className="form-input" />
        </div>

        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label>Lugar</label>
          <input name="lugar" type="text" required className="form-input" placeholder="Sala de juntas, oficina, etc." />
        </div>

        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label>Motivo de la reunión</label>
          <input name="motivo" type="text" required className="form-input" />
        </div>

        <div className="form-group">
          <label>Aprobador</label>
          <select name="aprobador" required className="form-input">
            <option value="">Selecciona un aprobador...</option>
            <option value="Gerencia General">Gerencia General</option>
            <option value="Gerencia Administrativa">Gerencia Administrativa</option>
            <option value="Director de Area">Director de Área</option>
          </select>
        </div>

        <div className="form-group">
          <label>Centro de Costos</label>
          <input name="centro_costos" type="text" required className="form-input" />
        </div>

        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label>Observaciones</label>
          <textarea name="observaciones" className="form-input" style={{ height: '100px', resize: 'vertical' }}></textarea>
        </div>

        <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
          <button type="submit" className="btn-primary" style={{ width: '100%', height: '3.5rem' }} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Solicitud de Refrigerio'}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
