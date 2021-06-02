import React, { forwardRef, HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../models';

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  contentProps?: HTMLAttributes<HTMLDivElement> & StyleProps;
}

export const createContainer: ComponentFactory<
  HTMLDivElement,
  ContainerProps
> = ({ themed }) => {
  const ThemedContainerContent = themed('div', { path: 'container.content' });
  const ThemedContainer = themed('div', { path: 'container' });
  return forwardRef(({ contentProps, children, ...rest }, ref) => (
    <ThemedContainer ref={ref} {...rest}>
      <ThemedContainerContent {...contentProps}>
        {children}
      </ThemedContainerContent>
    </ThemedContainer>
  ));
};
