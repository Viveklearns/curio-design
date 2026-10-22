import React from 'react';

export function Pin({ level = 1, title, detail, x, y, side = 'right', visible = true, index = 0, style }) {
  const left = side === 'left';
  const L3 = level === 3;
  const box = level === 1
    ? { padding: '8px 16px', borderRadius: 'var(--radius-pill)', background: 'var(--spark)' }
    : level === 2
      ? { padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--paper-1)', maxWidth: 220, display: 'flex', flexDirection: 'column', gap: 2 }
      : { padding: left ? '6px 10px 6px 0' : '6px 0 6px 10px', [left ? 'borderRight' : 'borderLeft']: '1px solid oklch(0.97 0.005 85 / 0.6)', display: 'flex', flexDirection: 'column', gap: 2, textAlign: left ? 'right' : 'left' };
  const pos = x != null ? { position: 'absolute', left: x + '%', top: y + '%' } : { position: 'relative' };
  const shift = left ? 'translate(calc(-100% + 7px),-50%)' : 'translate(-7px,-50%)';
  const delay = visible ? `calc(var(--stagger-labels) * ${index})` : '0ms';
  return (
    <div style={{ ...pos, display: 'flex', alignItems: 'center', flexDirection: left ? 'row-reverse' : 'row', transformOrigin: left ? 'calc(100% - 7px) 50%' : '7px 50%',
      opacity: visible ? 1 : 0, transform: `${x != null ? shift : ''} scale(${visible ? 1 : 'var(--pin-enter-scale)'})`,
      transition: `opacity var(--dur-slow) var(--ease-out) ${delay}, transform var(--dur-slow) var(--ease-out) ${delay}`, ...style }}>
      {L3
        ? <div style={{ width: 10, height: 10, flex: 'none', borderRadius: '50%', border: '1.5px solid var(--on-studio)' }} />
        : <div style={{ width: 'var(--pin-dot)', height: 'var(--pin-dot)', flex: 'none', borderRadius: '50%', background: 'var(--on-studio)', boxShadow: '0 0 0 var(--pin-halo) oklch(0.97 0.005 85 / 0.18)' }} />}
      <div style={{ width: 'var(--pin-leader)', height: L3 ? 1 : 'var(--pin-leader-width)', flex: 'none', background: 'oklch(0.97 0.005 85 / 0.6)' }} />
      <div style={box}>
        <div style={L3
          ? { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--on-studio)', whiteSpace: 'nowrap' }
          : { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: level === 1 ? 18 : 16, color: 'var(--ink-1)', whiteSpace: 'nowrap' }}>{L3 ? String(title).toUpperCase() : title}</div>
        {level > 1 && detail ? <div style={L3
          ? { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--on-studio-muted)', whiteSpace: 'nowrap' }
          : { fontSize: 13, lineHeight: 1.35, color: 'var(--ink-2)' }}>{detail}</div> : null}
      </div>
    </div>
  );
}
