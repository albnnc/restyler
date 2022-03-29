import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemeProps } from '../models';

export interface InputableChipProps
  extends HTMLAttributes<HTMLButtonElement>,
    ThemeProps {}

export const InputableChip = forwardRef<HTMLButtonElement, InputableChipProps>(
  ({ children, ...rest }, ref) => {
    const ThemedInputableChip = useThemed('button', 'inputable.chip');
    return (
      <ThemedInputableChip ref={ref} tabIndex={0} {...rest}>
        {children}
      </ThemedInputableChip>
    );
  }
);

InputableChip.displayName = 'InputableChip';
