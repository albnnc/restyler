import React, { forwardRef, AnchorHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemeProps } from '../models';

export interface AnchorProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    ThemeProps {
  navigate?: () => void;
}

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ navigate, onClick, ...rest }, ref) => {
    const ThemedAnchor = useThemed('a', { id: 'anchor' });
    return (
      <ThemedAnchor
        ref={ref}
        onClick={event => {
          try {
            onClick?.(event);
          } catch (e) {
            event.preventDefault();
            throw e;
          }
          if (
            navigate &&
            !event.defaultPrevented &&
            event.button === 0 &&
            (!rest.target || rest.target === '_self') &&
            !isModifiedEvent(event)
          ) {
            event.preventDefault();
            navigate();
          }
        }}
        {...rest}
      />
    );
  }
);

Anchor.displayName = 'Anchor';

const isModifiedEvent = e => {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
};
