import React, { forwardRef, useEffect, useState } from 'react';
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
