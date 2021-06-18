import React, { forwardRef, ImgHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { StyleProps } from '../models';

export interface ImageProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    StyleProps {}

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const ThemedImage = useThemed('img', {
    path: 'image',
    style: {
      verticalAlign: 'middle',
      maxWidth: '100%'
    }
  });
  return <ThemedImage ref={ref} {...props} />;
});

Image.displayName = 'Image';
