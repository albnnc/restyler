import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { StyleProps } from '../models';
export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    StyleProps {}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const levels = [1, 2, 3, 4, 5, 6];
    const themedHeadings = levels.map(v =>
      useThemed(`h${v}` as keyof JSX.IntrinsicElements, { path: 'heading' })
    );
    const level = +(props.kind ?? 1);
    const Component = themedHeadings[level - 1];
    return <Component ref={ref} {...props} />;
  }
);
