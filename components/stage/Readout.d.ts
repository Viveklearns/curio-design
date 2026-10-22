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
