import React, { forwardRef, AnchorHTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../models';

const isModifiedEvent = e => {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
};

export interface AnchorProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    StyleProps {
  navigate?: () => void;
}

export const createAnchor: ComponentFactory<HTMLAnchorElement, AnchorProps> = ({
  themed
}) => {
  const ThemedAnchor = themed('a', {
    path: 'anchor',
    style: {
      font: 'inherit',
      cursor: 'pointer',
      color: 'inherit',
      outline: 'none',
      textDecoration: 'none'
    }
  });
  return forwardRef(({ navigate, onClick, ...rest }, ref) => (
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
  ));
};
