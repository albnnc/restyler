import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemeProps } from '../models';
export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    ThemeProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 6, ...rest }, ref) => {
    const ThemedHeading = useThemed(
      `h${level}` as keyof JSX.IntrinsicElements,
      'heading'
    );
    return <ThemedHeading ref={ref} {...rest} />;
  }
);
``;
