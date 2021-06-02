import React, { forwardRef, useEffect, useState } from 'react';
import { useSharedRef, useTransition } from '~lib/hooks';
import { ComponentFactory } from '~lib/models';
import { TransitionRendererProps } from '~lib/utils';
import { NotificationProps } from './Notification';

export interface NotificationTransitionProps
  extends TransitionRendererProps,
    NotificationProps {}

export const createNotificationTransition: ComponentFactory<
  HTMLDivElement,
  NotificationTransitionProps
> = ({ registry }) =>
  forwardRef(({ handleClose, handleCloseEnd, isOpen, ...rest }, ref) => {
    const { Notification } = registry;
    const [
      isMounted,
      { ref: transitionRef, ...transitionProps }
    ] = useTransition<HTMLDivElement>(isOpen);
    const sharedRef = useSharedRef<HTMLDivElement>(null, [ref, transitionRef]);
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
