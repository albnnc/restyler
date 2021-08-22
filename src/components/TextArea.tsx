import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { FormWidgetProps, ThemeProps } from '../models';

export interface TextAreaProps
  extends Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      keyof FormWidgetProps | keyof ThemeProps
    >,
    FormWidgetProps<string>,
    ThemeProps {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ wrap, value, onChange, ...rest }, ref) => {
    const ThemedTextArea = useThemed('textarea', 'textArea');
    return (
      <ThemedTextArea
        ref={ref}
        value={value ?? ''}
        onChange={e => {
          onChange?.(e.target.value);
        }}
        {...rest}
      />
    );
  }
);
