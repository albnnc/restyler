import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { FormWidgetProps, StyleProps } from '../models';

export interface CheckboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    StyleProps {}

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (props, ref) => {
    const ThemedCheckbox = useThemed('div', { path: 'checkbox' });
    const ThemedCheckboxChecker = useThemed<'span', CheckboxProps>('span', {
      path: 'checkbox.checker'
    });
    const ThemedCheckboxLabel = useThemed<'label', CheckboxProps>('label', {
      path: 'checkbox.label'
    });
    const { children, value, onChange, ...rest } = props;
    const onClick = () => {
      onChange?.(!value);
    };
    return (
      <ThemedCheckbox ref={ref} {...rest}>
        <ThemedCheckboxChecker value={value} onClick={onClick} />
        <ThemedCheckboxLabel value={value} onClick={onClick}>
          {children}
        </ThemedCheckboxLabel>
      </ThemedCheckbox>
    );
  }
);
