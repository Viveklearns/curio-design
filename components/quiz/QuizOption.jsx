import React from 'react';

export function QuizOption({ children, state = 'idle', attempt = 0, onClick }) {
  const ok = state === 'correct', no = state === 'retry';
  return (
    <button onClick={onClick} style={{
      minHeight: 52, padding: '0 18px', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', fontWeight: 500,
      border: ok ? 'var(--border-strong) solid var(--correct)' : 'var(--border-hair) solid var(--line)',
      background: ok ? 'var(--correct-tint)' : no ? 'var(--retry-tint)' : 'var(--paper-1)',
      color: no ? 'var(--retry-ink)' : 'var(--ink-1)',
      animation: no ? `${attempt % 2 ? 'curio-nudge-a' : 'curio-nudge-b'} var(--dur-nudge) var(--ease-in-out)` : 'none',
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    }}>
      <span>{children}</span>
      {ok ? <span style={{ width: 24, height: 24, flex: 'none', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700, background: 'var(--correct)', color: 'var(--paper-1)',
        animation: 'curio-pop var(--dur-slow) var(--ease-spring) 120ms both' }}>✓</span> : null}
      {no ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>Not quite</span> : null}
    </button>
  );
}
