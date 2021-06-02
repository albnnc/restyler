import React, { forwardRef, HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '~lib/models';

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    StyleProps {}

export const createHeading: ComponentFactory<
  HTMLHeadingElement,
  HeadingProps
> = ({ themed }) => {
  const levels = [1, 2, 3, 4, 5, 6];
  const themedHeadings = levels.map(v =>
    themed(`h${v}` as keyof JSX.IntrinsicElements, { path: 'heading' })
  );
  return forwardRef((props, ref) => {
    const level = +(props.kind ?? 1);
    const Component = themedHeadings[level - 1];
    return <Component ref={ref} {...props} />;
  });
};
