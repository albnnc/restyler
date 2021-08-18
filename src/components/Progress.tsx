import React, { forwardRef, ProgressHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemeProps } from '../models';

export interface ProgressProps
  extends ProgressHTMLAttributes<HTMLProgressElement>,
    ThemeProps {}

export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
  (props, ref) => {
    const ThemedProgress = useThemed('progress', { id: 'progress' });
    return <ThemedProgress ref={ref} {...props} />;
  }
);

Progress.displayName = 'Progress';
