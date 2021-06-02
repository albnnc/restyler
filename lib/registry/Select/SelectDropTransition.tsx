import React, { forwardRef, useEffect, useState } from 'react';
import { useClickOutside, useSharedRef, useTransition } from '../../hooks';
import { ComponentFactory } from '../../models';
import { TransitionRendererProps } from '../../utils';
import { SelectDropProps } from './SelectDrop';

export interface SelectDropTransitionProps
  extends TransitionRendererProps,
    SelectDropProps {}

export const createSelectDropTransition: ComponentFactory<
  HTMLDivElement,
  SelectDropTransitionProps
> = ({ registry }) =>
  forwardRef(({ handleClose, handleCloseEnd, isOpen, ...rest }, ref) => {
    const { SelectDrop } = registry;
    const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
    const [isMounted, transitionProps] = useTransition<HTMLDivElement>(
      sharedRef,
      isOpen
    );

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
      <SelectDrop ref={sharedRef} {...transitionProps} {...rest} />
    ) : null;
  });
