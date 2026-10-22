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
