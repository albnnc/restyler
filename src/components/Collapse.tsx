import React, {
  forwardRef,
  useCallback,
  useContext,
  useState,
  HTMLAttributes
} from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import {
  useIsomorphicLayoutEffect,
  useSharedRef,
  useThemed,
  useTransition
} from '../hooks';
import { StyleProps } from '../models';
import { SystemContext } from './SystemContext';

export interface CollapseProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  contentHeight?: number;
  isOpen?: boolean;
  isPersistent?: boolean;
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  (props, ref) => {
    const ThemedColapse = useThemed<'div', CollapseProps>('div', {
      path: 'collapse',
      style: { overflow: 'hidden' }
    });
    const {
      contentHeight: forcedContentHeight,
      isOpen,
      isPersistent,
      children,
      ...rest
    } = props;

    const system = useContext(SystemContext);
    const [contentHeight, setContentHeight] =
      useState<number | undefined>(undefined);

    useIsomorphicLayoutEffect(() => {
      if (!isOpen || contentHeight !== undefined) {
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

    const updateContentHeight = useCallback(
      (content: HTMLDivElement | null) =>
        setContentHeight(content?.offsetHeight ?? 0),
      []
    );

    const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
    const [isMounted, transitionProps] = useTransition(sharedRef, isOpen);

    if ((!isMounted && !isPersistent) || contentHeight === undefined) {
      return null;
    }

    return (
      <ThemedColapse
        ref={sharedRef}
        contentHeight={forcedContentHeight ?? contentHeight}
        isOpen={isOpen}
        isPersistent={isPersistent}
        {...transitionProps}
        {...rest}
      >
        <div ref={updateContentHeight}>{children}</div>
      </ThemedColapse>
    );
  }
);
