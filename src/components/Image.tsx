import React, { forwardRef, ImgHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemeProps } from '../models';

export interface ImageProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    ThemeProps {}

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const ThemedImage = useThemed('img', { id: 'image' });
  return <ThemedImage ref={ref} {...props} />;
});

Image.displayName = 'Image';
