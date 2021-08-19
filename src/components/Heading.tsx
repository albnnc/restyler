import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemeProps } from '../models';
export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    ThemeProps {}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const ThemedHeading = useThemed(
      `h${+(props.kind ?? 1)}` as keyof JSX.IntrinsicElements,
      'heading'
    );
    return <ThemedHeading ref={ref} {...props} />;
  }
);

Heading.displayName = 'Heading';
