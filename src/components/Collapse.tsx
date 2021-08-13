import React, { forwardRef, useState, HTMLAttributes } from 'react';
import {
  TransitionerProps,
  useIsomorphicLayoutEffect,
  useMeter,
  useSharedRef,
  useThemed,
  useTransition
} from '../hooks';
import { StyleProps } from '../models';
import { hash } from '../utils';

export interface CollapseProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  contentHeight?: number;
  isOpen?: boolean;
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  ({ contentHeight: forcedContentHeight, isOpen, children, ...rest }, ref) => {
    const ThemedColapse = useThemed<'div', CollapseProps & TransitionerProps>(
      'div',
      {
        path: 'collapse',
        style: { overflow: 'hidden' }
      }
    );

    const [contentHeight, setContentHeight] = useState<number | undefined>(
      forcedContentHeight
    );
    const measureHeight = useMeter(container => container.offsetHeight, {
      deps: []
    });
    useIsomorphicLayoutEffect(() => {
      if (contentHeight !== undefined) {
        return;
      }
      if (forcedContentHeight !== undefined) {
        setContentHeight(forcedContentHeight);
        return;
      }
      measureHeight?.(children).then(setContentHeight);
    }, [children, measureHeight]);

    return useTransition<HTMLDivElement>(
      (props, innerRef) => {
        const sharedRef = useSharedRef<HTMLDivElement>(null, [ref, innerRef]);
        return (
          <ThemedColapse
            ref={sharedRef}
            contentHeight={contentHeight}
            isOpen={props.isVisible}
            {...props}
            {...rest}
          >
            {children}
          </ThemedColapse>
        );
      },
      {
        deps: [contentHeight, children, hash(rest)],
        isMounted: !!isOpen
      }
    );
  }
);

Collapse.displayName = 'Collapse';
