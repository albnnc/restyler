import React, { forwardRef, AnchorHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { StyleProps } from '../models';

const isModifiedEvent = e => {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
};

export interface AnchorProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    StyleProps {
  navigate?: () => void;
}

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ navigate, onClick, ...rest }, ref) => {
    const ThemedAnchor = useThemed('a', {
      path: 'anchor',
      style: {
        font: 'inherit',
        cursor: 'pointer',
        color: 'inherit',
        outline: 'none',
        textDecoration: 'none'
      }
    });
    return (
      <ThemedAnchor
        ref={ref}
        onClick={event => {
          try {
            if (onClick) {
              onClick(event);
            }
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
