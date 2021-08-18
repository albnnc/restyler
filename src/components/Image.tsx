import React, { forwardRef, ImgHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemedProps } from '../models';

export interface ImageProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    ThemedProps {}

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const ThemedImage = useThemed('img', { key: 'image' });
  return <ThemedImage ref={ref} {...props} />;
});

Image.displayName = 'Image';
