import React, { forwardRef, useEffect, useState } from 'react';
import { useClickOutside, useSharedRef, useTransition } from '../../hooks';
import { ComponentFactory } from '../../models';
import { TransitionRendererProps } from '../../utils';
import { SelectOptionsProps } from './SelectOptions';

export interface SelectOptionsTransitionProps
  extends TransitionRendererProps,
    SelectOptionsProps {}

export const createSelectOptionsTransition: ComponentFactory<
  HTMLDivElement,
  SelectOptionsTransitionProps
> = ({ registry }) =>
  forwardRef(({ handleClose, handleCloseEnd, isOpen, ...rest }, ref) => {
    const { SelectOptions } = registry;
    const [
      isMounted,
      { ref: transitionRef, ...transitionProps }
    ] = useTransition<HTMLDivElement>(isOpen);
    const sharedRef = useSharedRef<HTMLDivElement>(null, [ref, transitionRef]);

    useClickOutside(sharedRef, () => {
      handleClose();
    });

    const [wasMounted, setWasMounted] = useState(false);
    useEffect(() => {
      if (wasMounted && !isMounted) {
        handleCloseEnd?.();
        setWasMounted(false);
      } else {
        setWasMounted(true);
      }
    }, [isMounted]);
    return isMounted ? (
      <SelectOptions ref={sharedRef} {...transitionProps} {...rest} />
    ) : null;
  });
