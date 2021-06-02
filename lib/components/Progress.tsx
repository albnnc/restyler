import { forwardRef, ProgressHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { StyleProps } from '../models';

export interface ProgressProps
  extends ProgressHTMLAttributes<HTMLProgressElement>,
    StyleProps {}

export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
  (props, ref) => {
    const ThemedProgress = useThemed('progress', { path: 'progress' });
    return <ThemedProgress ref={ref} {...props} />;
  }
);
