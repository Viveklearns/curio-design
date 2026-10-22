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
