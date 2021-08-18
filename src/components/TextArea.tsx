import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { FormWidgetProps, ThemedProps } from '../models';

export interface TextAreaProps
  extends Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      keyof FormWidgetProps | keyof ThemedProps
    >,
    FormWidgetProps<string>,
    ThemedProps {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ wrap, value, onChange, ...rest }, ref) => {
    const ThemedTextArea = useThemed('textarea', { key: 'textArea' });
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

TextArea.displayName = 'TextArea';
