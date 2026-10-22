import React from 'react';

export function Stage({ tone = 'studio', minHeight = 420, children, style }) {
  const studio = tone === 'studio';
  return (
    <div style={{ position: 'relative', minHeight, borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: studio ? 'var(--studio-1)' : 'var(--stage-day)', ...style }}>
      <div style={{ position: 'absolute', left: '-10%', right: '-10%', bottom: -180, height: 300, borderRadius: '50%', background: studio ? 'var(--studio-2)' : 'var(--stage-day-floor)' }} />
      {children}
    </div>
  );
}
