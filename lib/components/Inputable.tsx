import React, {
  forwardRef,
  HTMLAttributes,
  useMemo,
  useRef,
  useState
} from 'react';
import { useThemed, useThemedFactory, useUpdateEffect } from '../hooks';
import { FormWidgetDepiction, FormWidgetProps, ThemeProps } from '../models';

export interface InputableProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps<string>,
    ThemeProps {}

export const Inputable = forwardRef<HTMLDivElement, InputableProps>(
  (
    {
      children,
      value,
      onChange,
      disabled,
      readOnly,
      invalid,
      required,
      onFocus,
      ...rest
    },
    ref
  ) => {
    const useThemed = useThemedFactory<FormWidgetDepiction>();
    const ThemedInputable = useThemed('div', 'inputable');
    const ThemedInputableInput = useThemed('input', 'inputable.input');
    const ThemedInputableChip = useThemed('div', 'inputable.chip');
    const inputRef = useRef<HTMLInputElement>(null);
    const [innerValue, setInnerValue] = useState(value ?? '');
    const extraProps = useMemo(
      () => ({ disabled, readOnly, invalid, required }),
      [disabled, readOnly, invalid, required]
    );
    useUpdateEffect(() => {
      innerValue !== value && onChange?.(innerValue);
    }, [innerValue]);
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value ?? '');
    }, [value]);
    return (
      <ThemedInputable
        ref={ref}
        tabIndex={0}
        onFocus={ev => {
          inputRef.current?.focus();
          onFocus?.(ev);
        }}
        {...extraProps}
        {...rest}
      >
        {children}
        <ThemedInputableInput
          ref={inputRef}
          type="text"
          value={innerValue}
          onChange={ev => setInnerValue(ev.target.value)}
          {...extraProps}
        />
      </ThemedInputable>
    );
  }
);

Inputable.displayName = 'Inputable';
