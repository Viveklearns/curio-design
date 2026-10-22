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
