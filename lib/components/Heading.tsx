import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { StyleProps } from '../models';
export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    StyleProps {}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const ThemedHeading = useThemed(
      `h${+(props.kind ?? 1)}` as keyof JSX.IntrinsicElements,
      { path: 'heading' }
    );
    return <ThemedHeading ref={ref} {...props} />;
  }
);
