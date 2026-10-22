import React from 'react';

const SIZES = { md: { height: 'var(--touch-comfort)', padding: '0 22px', fontSize: 'var(--text-md)' }, lg: { height: 'var(--touch-primary)', padding: '0 26px', fontSize: 'var(--text-md)' } };

export function Button({ variant = 'primary', size = 'md', disabled = false, onClick, children, style }) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const v = {
    primary: { background: hover ? 'var(--action-primary-hover)' : 'var(--action-primary)', color: 'var(--action-on-primary)', border: 'none', fontWeight: 700 },
    secondary: { background: 'var(--paper-1)', color: 'var(--ink-1)', border: 'var(--border-hair) solid var(--line)', fontWeight: 600 },
    onStudio: { background: hover ? 'var(--studio-3)' : 'var(--studio-2)', color: 'var(--on-studio)', border: 'none', fontWeight: 600 },
  }[variant];
  const transform = disabled ? 'none' : down ? 'scale(var(--press-scale))' : hover ? 'translateY(var(--hover-lift))' : 'none';
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setDown(false); }}
      onPointerDown={() => setDown(true)}
      onPointerUp={() => setDown(false)}
      style={{
        ...SIZES[size], ...v, borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', flex: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, transform,
        transition: down ? 'transform var(--dur-instant) var(--ease-out)' : 'transform var(--dur-quick) var(--ease-out), background var(--dur-quick) var(--ease-out)',
        ...style,
      }}
    >{children}</button>
  );
}
