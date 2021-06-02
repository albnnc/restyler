import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { StyleProps } from '../models';

export interface LayerProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const Layer = forwardRef<HTMLDivElement, LayerProps>((props, ref) => {
  const ThemedLayer = useThemed('div', {
    path: 'layer',
    style: {
      position: 'fixed',
      zIndex: '1000',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh'
    }
  });
  return <ThemedLayer ref={ref} {...props} />;
});
