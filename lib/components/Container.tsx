import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { StyleProps } from '../models';

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  contentProps?: HTMLAttributes<HTMLDivElement> & StyleProps;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ contentProps, children, ...rest }, ref) => {
    const ThemedContainerContent = useThemed('div', {
      path: 'container.content'
    });
    const ThemedContainer = useThemed('div', { path: 'container' });
    return (
      <ThemedContainer ref={ref} {...rest}>
        <ThemedContainerContent {...contentProps}>
          {children}
        </ThemedContainerContent>
      </ThemedContainer>
    );
  }
);
