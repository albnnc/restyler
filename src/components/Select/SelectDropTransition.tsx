import React, { forwardRef, useEffect, useRef } from 'react';
import { useClickOutside, useSharedRef, useTransition } from '../../hooks';
import { TransitionRendererProps } from '../../utils';
import { SelectDrop, SelectDropProps } from './SelectDrop';

export interface SelectDropTransitionProps
  extends TransitionRendererProps,
    SelectDropProps {}

export const SelectDropTransition = forwardRef<
  HTMLDivElement,
  SelectDropTransitionProps
>(({ handleClose, handleCloseEnd, isOpen, ...rest }, ref) => {
  const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
  const [isMounted, transitionProps] = useTransition<HTMLDivElement>(
    sharedRef,
    isOpen
  );

  useClickOutside(sharedRef, () => {
    handleClose();
  });

  const wasMountedRef = useRef(false);
  useEffect(() => {
    if (wasMountedRef.current && !isMounted) {
      handleCloseEnd?.();
    }
    if (isMounted) {
      wasMountedRef.current = true;
    }
  }, [isMounted]);

  return isMounted ? (
    <SelectDrop ref={sharedRef} {...transitionProps} {...rest} />
  ) : null;
});
