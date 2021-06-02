import React, { forwardRef, useEffect, useRef } from 'react';
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
    <Notification ref={sharedRef} {...transitionProps} {...rest} />
  ) : null;
});
