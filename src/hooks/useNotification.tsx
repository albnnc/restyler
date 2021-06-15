import React, {
  useEffect,
  useReducer,
  RefObject,
  ReactNode,
  useCallback,
  useMemo,
  useContext
} from 'react';
import { Notification, NotificationProps, SystemContext } from '../components';
import { useSharedRef } from './useSharedRef';
import {
  StandaloneTransitionerProps,
  useStandaloneTransition
} from './useStandaloneTransition';

export enum NotificationPlacement {
  TopLeft = 'topLeft',
  TopRight = 'topRight',
  BottomLeft = 'bottomLeft',
  BottomRight = 'bottomRight'
}

export interface NotificationOptions
  extends Omit<NotificationProps, 'children'> {
  duration?: number;
  placement?: NotificationPlacement;
  onClose?: () => void;
  render: (props: StandaloneTransitionerProps) => ReactNode;
}

const notifications = [] as {
  id: any;
  ref: RefObject<HTMLDivElement>;
  props: StandaloneTransitionerProps;
  update: () => void;
}[];

export const useNotification = () => {
  const { defaults } = useContext(SystemContext);
  const openNotification = useStandaloneTransition<
    HTMLDivElement,
    NotificationOptions
  >(
    ({ context, ...transitionProps }, ref) => {
      const { placement, duration, render, ...notificationProps } = {
        ...defaults?.notificationOptions,
        ...context
      };
      const id = useMemo(() => Symbol(), []);
      const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
      const getNotificationIndex = useCallback(() => {
        const i = notifications.findIndex(v => v.id === id);
        // If current notification wasn't found, then it's going
        // to be added to the registry during the actual render,
        // thus we can predict its index as the length of array.
        return i === -1 ? notifications.length : i;
      }, []);
      const [_, update] = useReducer(v => v + 1, 0);
      useEffect(() => {
        const notification = {
          id,
          ref: sharedRef,
          props: transitionProps,
          update
        };
        if (getNotificationIndex() === -1) {
          notifications.push(notification);
        } else {
          notifications[getNotificationIndex()] = notification;
        }
      }, []);
      useEffect(() => {
        if (duration) {
          const timeoutId = setTimeout(transitionProps.handleClose, duration);
          return () => clearTimeout(timeoutId);
        }
        return undefined;
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
      const style = {
        position: 'fixed',
        zIndex: 1100,
        [offsetProperty]: offset,
        [stickProperty]: 0
      } as const;
      return (
        <Notification
          ref={sharedRef}
          style={style}
          {...notificationProps}
          {...transitionProps}
        >
          {render?.(transitionProps)}
        </Notification>
      );
    },
    {
      deps: []
    }
  );
  return { openNotification };
};
