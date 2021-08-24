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
import { hash } from '../utils';
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
    ({ context, handleClose: handleCurrentClose, ...rest }, ref) => {
      const options = useMemo(
        () => ({
          ...defaults?.notificationOptions,
          ...context
        }),
        [context]
      );
      const { placement, duration, render, onClose } = options;
      const props = useMemo(
        () => ({
          handleClose: () => {
            handleCurrentClose();
            onClose?.();
          },
          ...rest
        }),
        [handleCurrentClose, hash(rest), onClose]
      );
      const { handleClose } = props;
      const id = useMemo(() => Symbol(), []);
      const [_, update] = useReducer(v => v + 1, 0);
      const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
      const getNotificationIndex = useCallback(() => {
        const i = notifications.findIndex(v => v.id === id);
        // If current notification wasn't found, then it's going
        // to be added to the registry during the actual render,
        // thus we can predict its index as the length of array.
        return i === -1 ? notifications.length : i;
      }, []);
      useEffect(() => {
        const notification = {
          id,
          ref: sharedRef,
          props,
          update
        };
        notifications[getNotificationIndex()] = notification;
        return () => {
          const index = getNotificationIndex();
          index >= 0 && notifications.splice(index, 1);
          // One needs to update other notifications on unmount
          // for them to keep the order without gaps.
          notifications.forEach(v => v.update());
        };
      }, []);
      useEffect(() => {
        if (duration) {
          const timeoutId = setTimeout(handleClose, duration);
          return () => clearTimeout(timeoutId);
        }
        return undefined;
      }, []);
      const index = getNotificationIndex();
      // TODO: One has to filter notifications by the placement.
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
        <Notification ref={sharedRef} style={style} {...props} {...options}>
          {render?.(props)}
        </Notification>
      );
    },
    {
      deps: []
    }
  );
  return { openNotification };
};
