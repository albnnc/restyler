import { useSharedRef, useTransition } from 'lib/hooks';
import React, {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useState,
  HTMLAttributes
} from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ComponentFactory, StyleProps } from '../models';

export interface CollapseProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  contentHeight?: number;
  isOpen?: boolean;
  isPersistent?: boolean;
}

export const createCollapse: ComponentFactory<
  HTMLDivElement,
  CollapseProps
> = ({ themed }) => {
  const ThemedColapse = themed<'div', CollapseProps>('div', {
    path: 'collapse',
    style: { overflow: 'hidden' }
  });
  return forwardRef((props, ref) => {
    const {
      contentHeight: forcedContentHeight,
      isOpen,
      isPersistent,
      children,
      ...rest
    } = props;

    const [contentHeight, setContentHeight] = useState<number | undefined>(
      undefined
    );

    useLayoutEffect(() => {
      if (!isOpen || contentHeight !== undefined) {
        return;
      }
      const container = document.createElement('div');
      document.body.appendChild(container);
      render(<div>{children}</div>, container, () => {
        setContentHeight(container.offsetHeight);
        unmountComponentAtNode(container);
        document.body.removeChild(container);
      });
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
  });
};
