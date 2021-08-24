import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemeProps } from '../models';
export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    ThemeProps {}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const level = levels.find(v => v === props.kind) ?? '6';
    const ThemedHeading = useThemed(
      `h${level}` as keyof JSX.IntrinsicElements,
      'heading'
    );
    return <ThemedHeading ref={ref} {...props} />;
  }
);

Heading.displayName = 'Heading';

const levels = ['1', '2', '3', '4', '5', '6'];
