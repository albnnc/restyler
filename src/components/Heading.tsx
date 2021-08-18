import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemedProps } from '../models';
export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    ThemedProps {}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const ThemedHeading = useThemed(
      `h${+(props.kind ?? 1)}` as keyof JSX.IntrinsicElements,
      { key: 'heading' }
    );
    return <ThemedHeading ref={ref} {...props} />;
  }
);

Heading.displayName = 'Heading';
