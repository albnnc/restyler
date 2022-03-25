import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../hooks';
import { ThemeProps } from '../models';

export interface DropProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps<HTMLDivElement>>,
    ThemeProps {}

export const Drop = forwardRef<HTMLDivElement, DropProps>((props, ref) => {
  const ThemedDrop = useThemed('div', 'drop');
  return <ThemedDrop ref={ref} {...props} />;
});

Drop.displayName = 'Drop';
