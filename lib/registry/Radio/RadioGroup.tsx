import React, {
  cloneElement,
  forwardRef,
  useEffect,
  useState,
  Children,
  HTMLAttributes,
  ReactElement
} from 'react';
import { ComponentFactory, FormWidgetProps, StyleProps } from '../../models';
import { RadioItemProps } from './RadioItemProps';

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps<string>,
    StyleProps {
  children: ReactElement<RadioItemProps> | ReactElement<RadioItemProps>[];
}

export const createRadioGroup: ComponentFactory<
  HTMLDivElement,
  RadioGroupProps
> = ({ themed }) => {
  const ThemedRadioGroup = themed('div', { path: 'radio.group' });

  return forwardRef(({ children, onChange, value, ...rest }, ref) => {
    const [innerValue, setInnerValue] = useState(value);
    useEffect(() => {
      if (value !== innerValue) {
        setInnerValue(value);
      }
    }, [value]);

    const childrenWithProps = Children.map(
      children,
      (child: ReactElement<RadioItemProps>) => {
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
  });
};
