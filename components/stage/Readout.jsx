import React from 'react';

export function Readout({ label, value, unit, tone = 'studio' }) {
  const dark = tone === 'studio';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: dark ? 'var(--on-studio-muted)' : 'var(--ink-3)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--text-readout)', fontVariantNumeric: 'tabular-nums', color: dark ? 'var(--on-studio)' : 'var(--ink-1)', whiteSpace: 'nowrap' }}>
        {value}{unit ? <span style={{ fontWeight: 500, color: dark ? 'var(--on-studio-muted)' : 'var(--ink-3)', marginLeft: 6, fontSize: '0.6em' }}>{unit}</span> : null}
      </div>
    </div>
  );
}
