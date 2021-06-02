import React, { forwardRef, HTMLAttributes } from 'react';
import { ComponentFactory, FormWidgetProps, StyleProps } from '../models';

export interface CheckboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    StyleProps {}

export const createCheckbox: ComponentFactory<
  HTMLDivElement,
  CheckboxProps
> = ({ themed }) => {
  const ThemedCheckbox = themed('div', { path: 'checkbox' });
  const ThemedCheckboxChecker = themed<'span', CheckboxProps>('span', {
    path: 'checkbox.checker'
  });
  const ThemedCheckboxLabel = themed<'label', CheckboxProps>('label', {
    path: 'checkbox.label'
  });
  return forwardRef((props, ref) => {
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
  });
};
