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
