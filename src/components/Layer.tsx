import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../hooks';
import { ThemedProps } from '../models';

export interface LayerProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps<HTMLDivElement>>,
    ThemedProps {}

export const Layer = forwardRef<HTMLDivElement, LayerProps>((props, ref) => {
  const ThemedLayer = useThemed('div', { key: 'layer' });
  return <ThemedLayer ref={ref} {...props} />;
});

Layer.displayName = 'Layer';
