import React, { forwardRef, useEffect, useState } from 'react';
import { useSharedRef, useTransition } from '../../hooks';
import { ComponentFactory } from '../../models';
import { CarouselItemProps } from './CarouselItem';

export interface CarouselItemTransitionProps extends CarouselItemProps {
  handleClose?: () => void;
  handleOpen?: () => void;
  isOpen: boolean;
}

export const createCarouselItemTransition: ComponentFactory<
  HTMLDivElement,
  CarouselItemTransitionProps
> = ({ registry }) =>
  forwardRef(({ handleClose, handleOpen, isOpen, ...rest }, ref) => {
    const { CarouselItem } = registry;
    const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
    const [isMounted, transitionProps] = useTransition<HTMLDivElement>(
      sharedRef,
      isOpen
    );
    const [wasMounted, setWasMounted] = useState(false);
    useEffect(() => {
      if (wasMounted && !isMounted) {
        handleClose?.();
        setWasMounted(false);
      } else {
        handleOpen?.();
        setWasMounted(true);
      }
    }, [isMounted]);
    return isMounted ? (
      <CarouselItem ref={sharedRef} {...transitionProps} {...rest} />
    ) : null;
  });
