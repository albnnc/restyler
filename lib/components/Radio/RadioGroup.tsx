import React, {
  cloneElement,
  forwardRef,
  useEffect,
  useState,
  Children,
  HTMLAttributes,
  ReactElement
} from 'react';
import { useThemedFactory } from '../../hooks';
import { FormWidgetDepiction, FormWidgetProps, ThemeProps } from '../../models';
import { RadioOptionProps } from './RadioOption';

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps<string>,
    ThemeProps {
  children: ReactElement<RadioOptionProps> | ReactElement<RadioOptionProps>[];
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      children,
      value,
      disabled,
      readOnly,
      invalid,
      required,
      onChange,
      ...rest
    },
    ref
  ) => {
    const useThemed = useThemedFactory<FormWidgetDepiction>();
    const ThemedRadioGroup = useThemed('div', 'radio.group');
    const extraProps = { disabled, readOnly, invalid, required };
    const [innerValue, setInnerValue] = useState(value);
    useEffect(() => {
      if (value !== innerValue) {
        setInnerValue(value);
      }
    }, [value]);
    const childrenWithProps = Children.map(
      children,
      (child: ReactElement<RadioOptionProps>) => {
        return cloneElement(child, {
          isActive: innerValue === child.props.value,
          onClick: () => {
            if (disabled || readOnly) {
              return;
            }
            setInnerValue(child.props.value);
            onChange?.(child.props.value);
          },
          ...extraProps
        });
      }
    );
    return (
      <ThemedRadioGroup ref={ref} {...rest} {...extraProps}>
        {childrenWithProps}
      </ThemedRadioGroup>
    );
  }
);
