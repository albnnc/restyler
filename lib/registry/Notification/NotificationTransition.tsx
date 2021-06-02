import React, { forwardRef, useEffect, useState } from 'react';
import { useSharedRef, useTransition } from '../../hooks';
import { ComponentFactory } from '../../models';
import { TransitionRendererProps } from '../../utils';
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
