import { System } from 'lib/models';
import React, { createRef, useEffect, useReducer, RefObject } from 'react';
import {
  openTransition,
  TransitionOptions,
  TransitionRendererProps
} from '../../utils';
import { SystemContext } from '../SystemContext';
import { NotificationProps } from './Notification';
import { NotificationTransition } from './NotificationTransition';

export enum NotificationPlacement {
  TopLeft = 'topLeft',
  TopRight = 'topRight',
  BottomLeft = 'bottomLeft',
  BottomRight = 'bottomRight'
}

export interface NotificationOptions
  extends TransitionOptions,
    Omit<NotificationProps, 'children'> {
  duration?: number;
  placement?: NotificationPlacement;
}

const notifications = [] as {
  options: NotificationOptions;
  props: TransitionRendererProps;
  ref: RefObject<HTMLDivElement>;
  update: () => void;
}[];

export const openNotification = (
  options: { system: System } & NotificationOptions
) => {
  const {
    system,
    duration,
    mountNode,
    onClose,
    onCloseEnd,
    placement,
    render,
    ...rest
  } = { ...options.system.defaults?.notificationOptions, ...options };

  const ref = createRef<HTMLDivElement>();
  const getNotificationIndex = () =>
    notifications.findIndex(v => v.options === options);

  const handleClose = () => {
    const notification = notifications[getNotificationIndex()];
    if (notification) {
      notification.props?.handleClose();
      onClose?.();
    }
  };

  if (duration) {
    setTimeout(handleClose, duration);
  }

  const Wrap = (props: TransitionRendererProps) => {
    const [tick, update] = useReducer(v => v + 1, 0);
    useEffect(() => {
      const notification = { options, ref, props, update };
      if (getNotificationIndex() === -1) {
        notifications.push(notification);
      } else {
        notifications[getNotificationIndex()] = notification;
      }
    }, []);

    const index = getNotificationIndex();
    const offset = notifications.slice(0, index).reduce((prev, curr) => {
      const element = curr.ref.current;
      if (!element) {
        return prev;
      }
      const computedStyle = getComputedStyle(element);
      const height =
        element.offsetHeight +
        Math.max(
          parseInt(computedStyle.getPropertyValue('margin-top')),
          parseInt(computedStyle.getPropertyValue('margin-bottom'))
        );
      return prev + height;
    }, 0);

    const offsetProperty =
      placement === NotificationPlacement.TopLeft ||
      placement === NotificationPlacement.TopRight
        ? 'top'
        : 'bottom';
    const stickProperty =
      placement === NotificationPlacement.TopLeft ||
      placement === NotificationPlacement.BottomLeft
        ? 'left'
        : 'right';

    return (
      <SystemContext.Provider value={system}>
        <NotificationTransition
          ref={ref}
          style={{
            position: 'fixed',
            zIndex: 1000,
            [offsetProperty]: offset,
            [stickProperty]: 0
          }}
          {...props}
          {...rest}
        >
          {render?.(props)}
        </NotificationTransition>
      </SystemContext.Provider>
    );
  };

  openTransition({
    mountNode,
    render: props => <Wrap {...props} />,
    onClose,
    onCloseEnd: () => {
      const index = getNotificationIndex();
      notifications.splice(index, 1);
      notifications.slice(index).forEach(v => v.update());
      onCloseEnd?.();
    }
  });
};
