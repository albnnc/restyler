import React, { AllHTMLAttributes, forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemeProps } from '../models';

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  contentProps?: AllHTMLAttributes<HTMLDivElement> & ThemeProps;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ contentProps, children, ...rest }, ref) => {
    const ThemedContainer = useThemed('div', 'container');
    const ThemedContainerContent = useThemed('div', 'container.content');
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
