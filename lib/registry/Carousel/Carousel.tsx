import React, { forwardRef, useState, HTMLAttributes, ReactNode } from 'react';
import { ComponentFactory, StyleProps } from '../../models';
import { getChildren } from './getChildren';
import { useAutoPlay } from './useAutoPlay';

interface CarouselChangeOptions {
  newElement?: ReactNode;
  newIndex?: number;
  prevElement?: ReactNode;
  prevIndex?: number;
  slideCount?: number;
}

export interface CarouselProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  initialSlide?: number;
  isInfinite?: boolean;
  onSlideChange?: (props: CarouselChangeOptions) => void;

  /**
   * set `true` if you need auto slide
   * or set `number` to set custom speed.
   * May be cause a lot of re-renders,
   * use carefully
   */
  shouldAutoPlay?: boolean | number;
}

export const createCarousel: ComponentFactory<
  HTMLDivElement,
  CarouselProps
> = ({ themed, registry }) => {
  const { CarouselItemTransition, Button } = registry;
  const ThemedWrap = themed('div', { path: 'carousel' });

  return forwardRef(
    (
      {
        children,
        onSlideChange,
        initialSlide = 0,
        isInfinite = false,
        shouldAutoPlay = false,
        ...rest
      },
      ref
    ) => {
      const childCollection = getChildren(children);
      const [currIndex, setCurrIndex] = useState<number>(initialSlide);
      const [direction, setDirection] = useState<'left' | 'right'>('right');

      const handleChange = (direction: 'left' | 'right') => {
        const slideCount = childCollection.length;
        const newIndex =
          currIndex === 0 && direction === 'left'
            ? slideCount - 1
            : (currIndex + (direction === 'left' ? -1 : 1)) % slideCount;
        onSlideChange?.({
          newIndex,
          newElement: childCollection[newIndex],
          slideCount,
          prevIndex: currIndex,
          prevElement: childCollection[currIndex]
        });
        setCurrIndex(newIndex);
        setDirection(direction);
      };

      const stopAutoPlay =
        shouldAutoPlay &&
        useAutoPlay(
          () => handleChange('right'),
          typeof shouldAutoPlay === 'number' ? shouldAutoPlay : undefined
        );

      return (
        <ThemedWrap ref={ref} {...rest} direction="row">
          <Button
            kind="arrowLeft"
            onClick={() => handleChange('left')}
            disabled={!isInfinite && currIndex === 0}
            padding={{ horizontal: 'small' }}
          />
          {childCollection.map((child, index) => (
            <CarouselItemTransition
              onClick={() => {
                stopAutoPlay && stopAutoPlay();
              }}
              enterDirection={direction}
              key={`carausel${index}`}
              isOpen={currIndex === index}
            >
              {child}
            </CarouselItemTransition>
          ))}
          <Button
            kind="arrowRight"
            onClick={() => handleChange('right')}
            disabled={!isInfinite && currIndex === childCollection.length - 1}
            padding={{ horizontal: 'small' }}
          />
        </ThemedWrap>
      );
    }
  );
};
