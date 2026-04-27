'use client'

import { useState } from 'react';
import { createTravelRequest } from '../actions';
import Link from 'next/link';
import EmployeeSelect from '@/components/EmployeeSelect';

export default function NuevaSolicitud() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAnticipo, setShowAnticipo] = useState(false);
  
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
    const result = await createTravelRequest(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <Link href="/viajes" style={{ color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>
          ← Volver a solicitudes
        </Link>
        <h1 className="title-gradient" style={{ fontSize: '2.5rem' }}>Nueva Solicitud de Viaje</h1>
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
          <label>Tipo de Viaje</label>
          <select name="tipo_viaje" required className="form-input">
            <option value="Nacional">Nacional</option>
            <option value="Exterior">Exterior</option>
          </select>
        </div>

        <div className="form-group">
          <label>Origen</label>
          <input name="origen" type="text" required className="form-input" />
        </div>

        <div className="form-group">
          <label>Destino</label>
          <input name="destino" type="text" required className="form-input" />
        </div>

        <div className="form-group">
          <label>Fecha Ida</label>
          <input name="fecha_ida" type="date" required className="form-input" />
        </div>

        <div className="form-group">
          <label>Fecha Regreso</label>
          <input name="fecha_regreso" type="date" required className="form-input" />
        </div>

        <div className="form-group">
          <label>¿Necesita Tiquete?</label>
          <select name="necesita_tiquete" required className="form-input">
            <option value="No">No</option>
            <option value="Si">Si (Se remitirá a encargado de compra)</option>
          </select>
        </div>

        <div className="form-group">
          <label>¿Necesita Hospedaje?</label>
          <select name="necesita_hospedaje" required className="form-input">
            <option value="No">No</option>
            <option value="Si">Si (Se remitirá a encargado de compra)</option>
          </select>
        </div>

        <div className="form-group">
          <label>¿Solicita Anticipo?</label>
          <select 
            name="solicito_anticipo" 
            required 
            className="form-input"
            onChange={(e) => setShowAnticipo(e.target.value === 'Si')}
          >
            <option value="No">No</option>
            <option value="Si">Si</option>
          </select>
        </div>

        {showAnticipo && (
          <div className="form-group">
            <label>¿Cuánto?</label>
            <input name="monto_anticipo" type="number" step="0.01" className="form-input" placeholder="Monto del anticipo" />
          </div>
        )}

        <div className="form-group" style={{ gridColumn: showAnticipo ? 'auto' : 'span 1' }}>
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
            {loading ? 'Enviando...' : 'Enviar Solicitud'}
          </button>
        </div>
      </form>
    </div>
  );
}
