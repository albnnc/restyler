import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface NotificationProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (props, ref) => {
    const ThemedNotification = useThemed('div', { path: 'notification' });
    return <ThemedNotification ref={ref} {...props} />;
  }
);
