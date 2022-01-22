import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../hooks';
import { ThemeProps } from '../models';

export interface NotificationProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    ThemeProps {}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (props, ref) => {
    const ThemedNotification = useThemed('div', 'notification');
    return <ThemedNotification ref={ref} {...props} />;
  }
);

Notification.displayName = 'Notification';
