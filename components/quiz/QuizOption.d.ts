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
