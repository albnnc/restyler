import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../hooks';
import { ThemedProps } from '../models';

export interface NotificationProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    ThemedProps {}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (props, ref) => {
    const ThemedNotification = useThemed('div', { key: 'notification' });
    return <ThemedNotification ref={ref} {...props} />;
  }
);

Notification.displayName = 'Notification';
