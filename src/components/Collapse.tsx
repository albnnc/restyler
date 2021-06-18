import React, { forwardRef, useContext, useState, HTMLAttributes } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import {
  TransitionerProps,
  useIsomorphicLayoutEffect,
  useSharedRef,
  useThemed,
  useTransition
} from '../hooks';
import { hash } from '../utils';
import { StyleProps } from '../models';
import { SystemContext } from './SystemContext';

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

    const system = useContext(SystemContext);
    const [contentHeight, setContentHeight] = useState<number | undefined>(
      forcedContentHeight
    );

    useIsomorphicLayoutEffect(() => {
      if (contentHeight !== undefined) {
        return;
      }
      if (forcedContentHeight !== undefined) {
        setContentHeight(forcedContentHeight);
        return;
      }
      const container = document.createElement('div');
      document.body.appendChild(container);
      render(
        <SystemContext.Provider value={system}>
          {children}
        </SystemContext.Provider>,
        container,
        () => {
          setContentHeight(container.offsetHeight);
          unmountComponentAtNode(container);
          document.body.removeChild(container);
        }
      );
    }, [children]);

    return useTransition<HTMLDivElement>(
      (props, innerRef) => {
        const sharedRef = useSharedRef<HTMLDivElement>(null, [ref, innerRef]);
        if (contentHeight === undefined) {
          return null;
        }
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
