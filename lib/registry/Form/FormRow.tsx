import React, { forwardRef, HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';

export interface FormRowProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const createFormRow: ComponentFactory<HTMLDivElement, FormRowProps> = ({
  themed
}) => {
  const ThemedFormRow = themed('div', { path: 'form.row' });
  const ThemedFormRowContent = themed('div', { path: 'form.row.content' });
  return forwardRef<HTMLDivElement, FormRowProps>(
    ({ children, ...rest }, ref) => (
      <ThemedFormRow ref={ref} {...rest}>
        <ThemedFormRowContent>{children}</ThemedFormRowContent>
      </ThemedFormRow>
    )
  );
};
