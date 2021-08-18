import React, { forwardRef, HTMLAttributes } from 'react';
import { ThemedOptions, useThemed } from '../../hooks';
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
    const ThemedRadioOption = useTyped('div', {
      key: 'radio.option'
    });
    const ThemedRadioOptionChecker = useTyped('span', {
      key: 'radio.option.checker'
    });
    const ThemedRadioOptionLabel = useTyped('label', {
      key: 'radio.option.label'
    });
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

const useTyped = <Tag extends keyof JSX.IntrinsicElements>(
  tag: Tag,
  options: ThemedOptions
) => useThemed<Tag, Pick<RadioOptionProps, 'isActive' | 'value'>>(tag, options);
