import React, { forwardRef, useEffect, useState } from 'react';
import { useSharedRef, useTransition } from '../../hooks';
import { TransitionRendererProps } from '../../utils';
import { Notification, NotificationProps } from './Notification';

export interface NotificationTransitionProps
  extends TransitionRendererProps,
    NotificationProps {}

export const NotificationTransition = forwardRef<
  HTMLDivElement,
  NotificationTransitionProps
>(({ handleClose, handleCloseEnd, isOpen, ...rest }, ref) => {
  const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
  const [isMounted, transitionProps] = useTransition<HTMLDivElement>(
    sharedRef,
    isOpen
  );
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
    <Notification ref={sharedRef} {...transitionProps} {...rest} />
  ) : null;
});
