import React, { AllHTMLAttributes, forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemedProps } from '../models';

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemedProps {
  contentProps?: AllHTMLAttributes<HTMLDivElement> & ThemedProps;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ contentProps, children, ...rest }, ref) => {
    const ThemedContainer = useThemed('div', { key: 'container' });
    const ThemedContainerContent = useThemed('div', {
      key: 'container.content'
    });
    return (
      <ThemedContainer ref={ref} {...rest}>
        <ThemedContainerContent {...contentProps}>
          {children}
        </ThemedContainerContent>
      </ThemedContainer>
    );
  }
);

Container.displayName = 'Container';
