import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface FormRowProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const FormRow = forwardRef<HTMLDivElement, FormRowProps>(
  (props, ref) => {
    const ThemedFormRow = useThemed('div', { path: 'form.row' });
    return <ThemedFormRow ref={ref} {...props} />;
  }
);

FormRow.displayName = 'FormRow';
