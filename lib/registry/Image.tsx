import { ImgHTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '~lib/models';

export interface ImageProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    StyleProps {}

export const createImage: ComponentFactory<HTMLImageElement, ImageProps> = ({
  themed
}) =>
  themed('img', {
    path: 'image',
    style: {
      verticalAlign: 'middle',
      maxWidth: '100%'
    }
  });
