import React, {
  cloneElement,
  forwardRef,
  useEffect,
  useState,
  Children,
  HTMLAttributes,
  ReactElement
} from 'react';
import { useThemed } from '../../hooks';
import { FormWidgetProps, ThemeProps } from '../../models';
import { RadioOptionProps } from './RadioOption';

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps<string>,
    ThemeProps {
  children: ReactElement<RadioOptionProps> | ReactElement<RadioOptionProps>[];
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, onChange, value, ...rest }, ref) => {
    const ThemedRadioGroup = useThemed('div', 'radio.group');

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
            setInnerValue(child.props.value);
            onChange?.(child.props.value);
          }
        });
      }
    );

    return (
      <ThemedRadioGroup ref={ref} {...rest}>
        {childrenWithProps}
      </ThemedRadioGroup>
    );
  }
);
