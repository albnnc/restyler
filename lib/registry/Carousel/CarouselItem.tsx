import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';

export interface CarouselItemProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  enterDirection: 'left' | 'right';
}

export const createCarouselItem: ComponentFactory<
  HTMLDivElement,
  CarouselItemProps
> = ({ themed }) => themed('div', { path: 'carousel.item' });
