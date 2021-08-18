import React, { forwardRef, ProgressHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemedProps } from '../models';

export interface ProgressProps
  extends ProgressHTMLAttributes<HTMLProgressElement>,
    ThemedProps {}

export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
  (props, ref) => {
    const ThemedProgress = useThemed('progress', { key: 'progress' });
    return <ThemedProgress ref={ref} {...props} />;
  }
);

Progress.displayName = 'Progress';
