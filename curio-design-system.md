# Curio design system — single-file edition

Use this file as the complete Curio design system when building interactive learning animations. Follow the guide, copy the token CSS verbatim, and use the components as reference implementations.

# Curio Design System

Curio is an encyclopedia you play. Each topic (a V6 engine, an F1 car, the solar system, Earth's biomes, bird nests) is an interactive animation the learner explores and gets quizzed on. This system keeps every topic consistent.

- **Audience:** kids first, useful to everyone. Difficulty is **Level 1 / 2 / 3**, never age groups.
- **Platforms:** desktop browser, tablet (touch), phone.
- **Rendering:** a 3D subject (three.js) on a dark studio stage, with quiet flat UI around it.
- **Sources:** Engine Lab (Claude Design project `85a59af1…`) was a loose reference only. The v2 direction is documented on `Curio v2.dc.html`.

## Index
- `styles.css`: the single entry point (imports only)
- `tokens/`: `fonts`, `colors`, `typography`, `spacing`, `motion`, `keyframes`, `base`
- `components/actions/`: `Button`, `LevelSwitch`
- `components/stage/`: `Stage`, `Pin`, `Readout`
- `components/quiz/`: `QuizOption`
- `guidelines/`: foundation cards
- `Curio Overview.dc.html`: every card on one page
- `Curio v2.dc.html`: the direction, an in-context V6 screen, and live micro-interaction demos
- `SKILL.md`: the Claude Code / Agent Skill entry point

## Using with Claude Code
Download this project and put the folder in `.claude/skills/curio-design/` (in your repo or in `~/.claude/skills/`). Claude Code reads `SKILL.md` and follows this readme. Use `tokens/*.css` directly, and the `components/**.jsx` files as reference implementations.

## Content fundamentals
- **Tone:** curious and playful. Ask, then show: "What spins when the pistons push?"
- **Person:** speak to "you". The mascot says "I" / "we" ("Let's take it apart").
- **Casing:** sentence case everywhere. Buttons start with a verb ("Take it apart", "Reset view").
- **Per level:** at Level 1, the part name only, no numbers. At Level 2, one plain sentence and rounded numbers ("about 3,000 turns a minute"). At Level 3, real terms and units in mono ("3,200 RPM").
- **Feedback:** never "Wrong" and never red. "Not quite! Watch the blue part." A correct answer names the idea back.
- **Emoji:** none. Stars and checks are drawn UI.

## Visual foundations
- **Principle:** the subject is the hero, and the UI gets out of the way.
- **Color:** studio neutrals (`--studio-*`) frame the stage, and paper (`--paper-*`) with ink (`--ink-*`) is for light UI. There is **one accent, Spark** (coral), used for the primary action and Level 1 pins. Diagram colors (air, life, energy, matter) are for parts of the subject only, never buttons. Feedback uses green for correct, neutral grey for not quite, and yellow for rewards. Text on Spark is `--studio-0`.
- **Stage:** dark studio by default, with a pale day stage (`--stage-day`) for outdoor Earth topics. It has a soft elliptical floor, no border, a 20px radius, and sits inside a 28px studio frame.
- **Type:** Bricolage Grotesque (800 for headlines, 700 for questions, tight tracking). Figtree for body text (≤ 60ch). JetBrains Mono for readouts, Level 3 pins and eyebrows (12px uppercase, 0.08em).
- **Shape:** radii of 10 / 14 / 20 / 28 / pill. Actions are pills, and panels are 20.
- **Borders and shadows:** 1px hairlines on paper. No ink outlines and no sticker shadows. Shadows only for the studio frame, the switch indicator and a part being dragged.
- **Hover:** lifts 1px and lightens. **Press:** scales to 0.96 within 100ms. **Selected:** paper indicator on a dark track.
- **Transparency:** only for dimming non-focus parts (35%) and pin halos.
- **Backgrounds:** flat. No gradients and no textures.
- **Layout:** the studio frame contains a top bar (wordmark, breadcrumb, level switch), the stage, and a bottom row (question card and readout/scrub panel). Panels stack on phone.

## The signature: annotation pin
A dot plus a leader line plus a label. It changes with the level:
- **L1, name it:** a Spark pill with the part name.
- **L2, explain it:** a paper card with the name and one sentence.
- **L3, measure it:** a mono readout with real units and a hairline rule.

Pins on the right half extend left (`side="left"`).

## Motion
**Subject:** real motion first. One thing moves at a time. The learner can pause and scrub. Cause comes before effect. Calm by default.

**Micro-interactions:** respond within 100ms. One micro-animation at a time. Spring easing only for rewards and parts snapping in. Under 500ms and 8px of travel. Direct control (scrub, drag) follows the finger 1:1.

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 100ms | press down |
| `--dur-quick` | 180ms | hover, release |
| `--dur-base` | 280ms | switch, fill, focus |
| `--dur-nudge` | 360ms | not-quite shake |
| `--dur-slow` | 480ms | pins, springs |
| `--dur-story` | 800ms | camera, progress fill |
| `--dur-explode` | 1200ms | take apart |

Easing: `--ease-out` for arrivals, `--ease-in-out` for the subject, camera and switch, and `--ease-spring` for success. Stagger: pins 80ms, parts 60ms. Reduced motion collapses all of these.

## Iconography
No icon set yet. When one is needed, use **Lucide** (CDN) at a 1.5px stroke. The ✓ in quiz feedback is a text glyph. There is no logo, so "Curio" is set in Bricolage Grotesque 800.

## Mascot
Planned, not designed. It asks one question at a time from a paper speech bubble.


---

# Source files

## styles.css

```css
@import "tokens/fonts.css";
@import "tokens/colors.css";
@import "tokens/typography.css";
@import "tokens/spacing.css";
@import "tokens/motion.css";
@import "tokens/keyframes.css";
@import "tokens/base.css";
```

## tokens/fonts.css

```css
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap");
```

## tokens/colors.css

```css
:root{
  /* Paper (UI surfaces) */
  --paper-1:oklch(0.985 0.004 85);
  --paper-2:oklch(0.955 0.006 85);
  --paper-3:oklch(0.920 0.006 85);
  --line:oklch(0.880 0.008 85);
  --line-soft:oklch(0.900 0.006 85);
  /* Ink (text on paper) */
  --ink-1:oklch(0.220 0.030 265);
  --ink-2:oklch(0.400 0.025 265);
  --ink-3:oklch(0.550 0.020 265);
  /* Studio (where the 3D subject lives) */
  --studio-0:oklch(0.200 0.030 265);
  --studio-1:oklch(0.240 0.030 265);
  --studio-2:oklch(0.270 0.030 265);
  --studio-3:oklch(0.350 0.030 265);
  --on-studio:oklch(0.970 0.005 85);
  --on-studio-muted:oklch(0.720 0.020 265);
  --on-studio-dim:oklch(0.800 0.015 265);
  /* Day stage, for Earth/outdoor topics */
  --stage-day:oklch(0.950 0.015 230);
  --stage-day-floor:oklch(0.910 0.020 230);
  /* The one accent: actions + Level 1 pins */
  --spark:oklch(0.660 0.190 35);
  --spark-hover:oklch(0.700 0.190 35);
  --spark-deep:oklch(0.550 0.170 35);
  /* Diagram colours: subject parts only, never UI */
  --diagram-air:oklch(0.780 0.120 220);
  --diagram-life:oklch(0.780 0.120 150);
  --diagram-energy:oklch(0.780 0.120 85);
  --diagram-matter:oklch(0.780 0.120 300);
  /* Feedback */
  --correct:oklch(0.620 0.140 150);
  --correct-tint:oklch(0.950 0.040 150);
  --retry-tint:oklch(0.950 0.006 85);
  --retry-ink:oklch(0.500 0.020 265);
  --reward:oklch(0.800 0.150 85);

  /* Semantic aliases */
  --surface-page:var(--paper-1);
  --surface-card:var(--paper-1);
  --surface-sunken:var(--paper-2);
  --surface-stage:var(--studio-1);
  --surface-frame:var(--studio-0);
  --surface-panel-dark:var(--studio-2);
  --text-strong:var(--ink-1);
  --text-body:var(--ink-2);
  --text-muted:var(--ink-3);
  --border:var(--line);
  --action-primary:var(--spark);
  --action-primary-hover:var(--spark-hover);
  --action-on-primary:var(--studio-0);
  --focus-ring:var(--spark);
}
```

## tokens/typography.css

```css
:root{
  --font-display:"Bricolage Grotesque",system-ui,sans-serif;
  --font-body:"Figtree",system-ui,sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,monospace;

  --text-hero:clamp(40px,5vw,64px);
  --text-h1:clamp(32px,4vw,44px);
  --text-h2:clamp(24px,3vw,32px);
  --text-h3:24px;
  --text-lg:18px;
  --text-md:16px;
  --text-sm:14px;
  --text-xs:12px;
  --text-readout:26px;
  --text-eyebrow:12px;

  --weight-display:800;
  --weight-heading:700;
  --weight-strong:600;
  --weight-body:400;

  --leading-display:0.98;
  --leading-tight:1.15;
  --leading-body:1.5;
  --tracking-display:-0.035em;
  --tracking-heading:-0.02em;
  --tracking-eyebrow:0.08em;
}
```

## tokens/spacing.css

```css
:root{
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;
  --space-6:32px;--space-7:48px;--space-8:72px;--space-9:120px;

  --radius-sm:10px;--radius-md:14px;--radius-lg:20px;--radius-xl:28px;--radius-pill:999px;

  --border-hair:1px;
  --border-strong:1.5px;

  --shadow-frame:0 40px 80px -40px oklch(0.22 0.03 265 / 0.5);
  --shadow-lift:0 2px 6px -2px oklch(0.22 0.03 265 / 0.25);
  --shadow-held:0 12px 20px -8px oklch(0 0 0 / 0.5);

  /* Annotation pin */
  --pin-dot:14px;
  --pin-halo:5px;
  --pin-leader:36px;
  --pin-leader-width:1.5px;

  --touch-min:44px;
  --touch-comfort:48px;
  --touch-primary:52px;
  --content-max:1280px;
}
```

## tokens/motion.css

```css
:root{
  --dur-instant:100ms;
  --dur-quick:180ms;
  --dur-base:280ms;
  --dur-nudge:360ms;
  --dur-slow:480ms;
  --dur-story:800ms;
  --dur-explode:1200ms;
  --dur-micro-max:500ms;

  --ease-out:cubic-bezier(0.22,1,0.36,1);
  --ease-in-out:cubic-bezier(0.65,0,0.35,1);
  --ease-spring:cubic-bezier(0.34,1.56,0.64,1);

  --stagger-labels:80ms;
  --stagger-parts:60ms;

  --press-scale:0.96;
  --hover-lift:-1px;
  --focus-lift:-6px;
  --focus-dim:0.35;
  --pin-enter-scale:0.7;
  --micro-travel-max:8px;
}
@media (prefers-reduced-motion:reduce){
  :root{--dur-quick:1ms;--dur-base:1ms;--dur-nudge:1ms;--dur-slow:1ms;--dur-story:160ms;--dur-explode:200ms;--ease-spring:var(--ease-out);--stagger-labels:0ms;--stagger-parts:0ms;}
}
```

## tokens/keyframes.css

```css
@keyframes curio-nudge-a{0%{transform:translateX(0)}20%{transform:translateX(-7px)}45%{transform:translateX(6px)}70%{transform:translateX(-3px)}100%{transform:translateX(0)}}
@keyframes curio-nudge-b{0%{transform:translateX(0)}20%{transform:translateX(-7px)}45%{transform:translateX(6px)}70%{transform:translateX(-3px)}100%{transform:translateX(0)}}
@keyframes curio-pop{0%{transform:scale(0)}100%{transform:scale(1)}}
```

## tokens/base.css

```css
html,body{margin:0;background:var(--surface-page);color:var(--text-body);font-family:var(--font-body);font-size:var(--text-md);line-height:var(--leading-body);-webkit-font-smoothing:antialiased;}
h1,h2,h3{font-family:var(--font-display);color:var(--text-strong);line-height:var(--leading-tight);letter-spacing:var(--tracking-heading);margin:0;}
button{font-family:inherit;}
a{color:var(--spark-deep);text-decoration-thickness:1.5px;text-underline-offset:3px;}
a:hover{color:var(--ink-1);}
:focus-visible{outline:2px solid var(--focus-ring);outline-offset:3px;}
@media (prefers-reduced-motion:reduce){*{transition-duration:1ms!important;animation-duration:1ms!important;}}
```

## components/actions/Button.jsx

```jsx
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
```

## components/actions/Button.d.ts

```ts
import * as React from 'react';
/**
 * Pill button. Primary (Spark) is for the one main action per view.
 * @startingPoint section="Actions" subtitle="Primary, secondary and on-studio pill buttons" viewport="700x200"
 */
export interface ButtonProps {
  /** primary = Spark fill; secondary = paper with hairline; onStudio = for dark stage frames */
  variant?: 'primary' | 'secondary' | 'onStudio';
  /** md = 48px, lg = 52px (primary actions) */
  size?: 'md' | 'lg';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
```

## components/actions/LevelSwitch.jsx

```jsx
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
```

## components/actions/LevelSwitch.d.ts

```ts
/**
 * Segmented Level 1/2/3 control with a sliding indicator (280ms ease-in-out).
 * @startingPoint section="Actions" subtitle="Level 1 / 2 / 3 switch" viewport="700x200"
 */
export interface LevelSwitchProps {
  /** 1-based current level */
  value?: number;
  onChange?: (level: number) => void;
  /** studio = on the dark frame; paper = on light UI */
  tone?: 'studio' | 'paper';
  labels?: string[];
  /** width of each segment in px (indicator travels this far) */
  itemWidth?: number;
}
export declare function LevelSwitch(props: LevelSwitchProps): JSX.Element;
```

## components/stage/Stage.jsx

```jsx
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
```

## components/stage/Stage.d.ts

```ts
import * as React from 'react';
/**
 * Rounded stage that holds the 3D subject, with a soft elliptical floor. Children are absolutely positioned on top.
 * @startingPoint section="Stage" subtitle="Studio stage with pins" viewport="700x320"
 */
export interface StageProps {
  /** studio = dark, default for machines & space; day = pale sky for Earth topics */
  tone?: 'studio' | 'day';
  minHeight?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Stage(props: StageProps): JSX.Element;
```

## components/stage/Pin.jsx

```jsx
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
```

## components/stage/Pin.d.ts

```ts
/**
 * The Curio signature: an annotation pin that changes with the level.
 * L1 = Spark pill with the name. L2 = paper card with a one-line explanation. L3 = mono readout with real units.
 * @startingPoint section="Stage" subtitle="Annotation pin, three levels" viewport="700x320"
 */
export interface PinProps {
  level?: 1 | 2 | 3;
  /** part name, e.g. "Piston". Uppercased automatically at L3 */
  title: string;
  /** L2: plain-language sentence. L3: measured values with units. Ignored at L1 */
  detail?: string;
  /** % position of the dot on the Stage. Omit to render in flow */
  x?: number;
  y?: number;
  /** label extends to this side; use 'left' for pins on the right half */
  side?: 'right' | 'left';
  /** animate in/out (scale 0.7 → 1, 480ms ease-out) */
  visible?: boolean;
  /** reading-order index; delay = index × --stagger-labels */
  index?: number;
  style?: React.CSSProperties;
}
export declare function Pin(props: PinProps): JSX.Element;
```

## components/stage/Readout.jsx

```jsx
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
```

## components/stage/Readout.d.ts

```ts
/**
 * Live value next to the stage. L1 uses words ("Slow"), L2 rounded numbers, L3 real units.
 */
export interface ReadoutProps {
  label: string;
  value: string | number;
  unit?: string;
  tone?: 'studio' | 'paper';
}
export declare function Readout(props: ReadoutProps): JSX.Element;
```

## components/quiz/QuizOption.jsx

```jsx
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
```

## components/quiz/QuizOption.d.ts

```ts
import * as React from 'react';
/**
 * Answer option. correct = fill + spring check; retry = gentle nudge, never red.
 * @startingPoint section="Quiz" subtitle="Quiz answer states" viewport="700x260"
 */
export interface QuizOptionProps {
  children?: React.ReactNode;
  state?: 'idle' | 'correct' | 'retry';
  /** increment on each wrong tap so the nudge replays */
  attempt?: number;
  onClick?: () => void;
}
export declare function QuizOption(props: QuizOptionProps): JSX.Element;
```

