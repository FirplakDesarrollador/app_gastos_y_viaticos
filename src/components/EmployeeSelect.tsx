'use client'

import { useState, useEffect, useRef } from 'react';
import { createTalentoClient } from '@/lib/supabase/client';

interface Employee {
  id: number;
  nombreCompleto: string;
  cargo: string;
  area: string;
  jefe: string;
}

interface EmployeeSelectProps {
  onSelect: (employee: Employee | null) => void;
  required?: boolean;
}

export default function EmployeeSelect({ onSelect, required = false }: EmployeeSelectProps) {
  const [query, setQuery] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filtered, setFiltered] = useState<Employee[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const supabase = createTalentoClient();

  useEffect(() => {
    async function fetchEmployees() {
      setLoading(true);
      setFetchError(null);
      
      const { data, error } = await supabase
        .from('empleados')
        .select('id, "nombreCompleto", cargo, area, jefe')
        .eq('activo', true)
        .order('"nombreCompleto"', { ascending: true });

      if (error) {
        setFetchError(error.message);
      } else {
        setEmployees(data as Employee[]);
      }
      setLoading(false);
    }
    fetchEmployees();
  }, [retryCount]);

  useEffect(() => {
    const results = employees.filter(emp => 
      emp.nombreCompleto.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results.slice(0, 10)); // Limit to 10 for performance
  }, [query, employees]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (emp: Employee) => {
    setQuery(emp.nombreCompleto);
    onSelect(emp);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          if (e.target.value === '') onSelect(null);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Buscar empleado..."
        className="form-input"
        autoComplete="off"
        required={required}
        name="nombre"
      />
      
      {isOpen && (query.length > 0 || loading) && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          marginTop: '4px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          {loading ? (
            <div style={{ padding: '10px', color: '#64748b', fontSize: '0.9rem' }}>Cargando...</div>
          ) : fetchError ? (
            <div style={{ padding: '15px', color: '#991b1b', fontSize: '0.8rem', background: '#fee2e2' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Error de Conexión:</div>
              <div>{fetchError}</div>
              <button 
                onClick={(e) => { e.stopPropagation(); setRetryCount(c => c + 1); }}
                style={{ 
                  marginTop: '10px', 
                  padding: '5px 10px', 
                  background: 'white', 
                  border: '1px solid #991b1b', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                🔄 Reintentar
              </button>
            </div>
          ) : filtered.length > 0 ? (
            filtered.map(emp => (
              <div
                key={emp.id}
                onClick={() => handleSelect(emp)}
                style={{
                  padding: '10px 15px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f1f5f9',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{emp.nombreCompleto}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{emp.cargo} • {emp.area}</div>
              </div>
            ))
          ) : (
            <div style={{ padding: '10px', color: '#64748b', fontSize: '0.9rem' }}>No se encontraron resultados</div>
          )}
        </div>
      )}
    </div>
  );
}
