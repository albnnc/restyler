import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../hooks';
import { ThemeProps } from '../models';

export interface LayerProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps<HTMLDivElement>>,
    ThemeProps {}

export const Layer = forwardRef<HTMLDivElement, LayerProps>((props, ref) => {
  const ThemedLayer = useThemed('div', 'layer');
  return <ThemedLayer ref={ref} {...props} />;
});

Layer.displayName = 'Layer';
