import React from 'react';

export function LevelSwitch({ value = 1, onChange, tone = 'studio', labels = ['Level 1', 'Level 2', 'Level 3'], itemWidth = 84 }) {
  const dark = tone === 'studio';
  const i = Math.max(0, labels.length ? value - 1 : 0);
  return (
    <div role="tablist" style={{ position: 'relative', display: 'inline-flex', padding: 4, borderRadius: 'var(--radius-pill)', background: dark ? 'var(--studio-2)' : 'var(--paper-3)' }}>
      <div style={{ position: 'absolute', top: 4, left: 4, width: itemWidth, height: 40, borderRadius: 'var(--radius-pill)', background: 'var(--paper-1)',
        boxShadow: dark ? 'none' : 'var(--shadow-lift)', transform: `translateX(${i * itemWidth}px)`, transition: 'transform var(--dur-base) var(--ease-in-out)' }} />
      {labels.map((l, k) => (
        <button key={k} role="tab" aria-selected={k === i} onClick={() => onChange && onChange(k + 1)}
          style={{ position: 'relative', zIndex: 1, width: itemWidth, height: 40, border: 'none', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600,
            color: k === i ? 'var(--ink-1)' : dark ? 'var(--on-studio-dim)' : 'var(--ink-3)', transition: 'color var(--dur-base) var(--ease-in-out)' }}>{l}</button>
      ))}
    </div>
  );
}
