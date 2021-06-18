import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { FormWidgetProps, StyleProps } from '../models';

export interface TextAreaProps
  extends Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      keyof FormWidgetProps | keyof StyleProps
    >,
    FormWidgetProps<string>,
    StyleProps {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ wrap, value, onChange, ...rest }, ref) => {
    const ThemedTextArea = useThemed('textarea', {
      path: 'textArea',
      style: {
        border: 'none',
        background: 'transparent',
        outline: 'none',
        padding: 0,
        margin: 0
      }
    });
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
