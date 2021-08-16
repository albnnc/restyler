import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface RadioOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  isActive?: boolean;
  onClick?: () => void;
  value?: any;
}

export const RadioOption = forwardRef<HTMLDivElement, RadioOptionProps>(
  ({ children, isActive, value, onClick, ...rest }, ref) => {
    const ThemedRadioOption = useTyped('div', 'radio.option');
    const ThemedRadioOptionChecker = useTyped('span', 'radio.option.checker');
    const ThemedRadioOptionLabel = useTyped('label', 'radio.option.label');
    const themedProps = { isActive, value };
    return (
      <ThemedRadioOption ref={ref} {...rest} {...themedProps}>
        <ThemedRadioOptionChecker onClick={onClick} {...themedProps} />
        <ThemedRadioOptionLabel onClick={onClick} {...themedProps}>
          {children}
        </ThemedRadioOptionLabel>
      </ThemedRadioOption>
    );
  }
);

RadioOption.displayName = 'RadioOption';

const useTyped = <T extends keyof JSX.IntrinsicElements>(
  tag: T,
  path: string
) => useThemed<T, Pick<RadioOptionProps, 'isActive' | 'value'>>(tag, path);
