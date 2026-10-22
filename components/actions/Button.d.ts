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
