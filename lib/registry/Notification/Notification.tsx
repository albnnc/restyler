import React, { forwardRef, HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '~lib/models';

export interface NotificationProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const createNotification: ComponentFactory<
  HTMLDivElement,
  NotificationProps
> = ({ themed }) => themed('div', { path: 'notification' });
