'use client'

import { useState } from 'react';

interface CopyLinkButtonProps {
  path?: string;
}

export default function CopyLinkButton({ path = '/viajes/nuevo' }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const publicUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(publicUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button 
      onClick={copyToClipboard}
      className="btn-secondary"
      style={{ 
        marginLeft: '1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.25rem',
        background: '#f1f5f9',
        color: '#475569',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      <span>{copied ? '✅ ¡Copiado!' : '🔗 Copiar Link Público'}</span>
    </button>
  );
}
