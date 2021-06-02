import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { ComponentFactory, FormWidgetProps, StyleProps } from '../models';

export interface TextAreaProps
  extends Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      keyof FormWidgetProps | keyof StyleProps
    >,
    FormWidgetProps<string>,
    StyleProps {}

export const createTextArea: ComponentFactory<
  HTMLTextAreaElement,
  TextAreaProps
> = ({ themed }) => {
  const ThemedTextArea = themed('textarea', {
    path: 'textArea',
    style: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      padding: 0,
      margin: 0
    }
  });
  return forwardRef(
    (
      {
        // we can safely ignore wrap style prop
        // as it does nothing to <textarea>
        wrap,

        onChange,
        ...rest
      },
      ref
    ) => {
      return (
        <ThemedTextArea
          ref={ref}
          onChange={e => {
            onChange?.(e.target.value);
          }}
          {...rest}
        />
      );
    }
  );
};
