import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface FormRowProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const FormRow = forwardRef<HTMLDivElement, FormRowProps>(
  ({ children, ...rest }, ref) => {
    const ThemedFormRow = useThemed('div', { path: 'form.row' });
    const ThemedFormRowContent = useThemed('div', { path: 'form.row.content' });
    return (
      <ThemedFormRow ref={ref} {...rest}>
        <ThemedFormRowContent>{children}</ThemedFormRowContent>
      </ThemedFormRow>
    );
  }
);
