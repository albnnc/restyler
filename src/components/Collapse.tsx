import React, { forwardRef, useState, HTMLAttributes } from 'react';
import {
  useIsomorphicLayoutEffect,
  useMeter,
  useSharedRef,
  useThemed,
  useTransition
} from '../hooks';
import { ThemeProps } from '../models';
import { hash } from '../utils';

export interface CollapseProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  contentHeight?: number;
  isOpen?: boolean;
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  ({ contentHeight: forcedContentHeight, isOpen, children, ...rest }, ref) => {
    const ThemedColapse = useThemed<
      'div',
      Pick<CollapseProps, 'contentHeight' | 'isOpen'>
    >('div', { key: 'collapse' });
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
      ({ isVisible }, innerRef) => {
        const sharedRef = useSharedRef<HTMLDivElement>(null, [ref, innerRef]);
        return (
          <ThemedColapse
            ref={sharedRef}
            contentHeight={contentHeight}
            isOpen={isVisible}
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
