import React, { forwardRef, HTMLAttributes, useContext } from 'react';
import { useThemedFactory } from '../../hooks';
import { ThemeProps } from '../../models';
import { SelectContext } from './SelectContext';

export interface SelectOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  value: any;
}

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
  ({ value, children, ...rest }, ref) => {
    const useThemed = useThemedFactory<{
      value: any;
      isActive: boolean;
      isMultiple: boolean;
    }>();
    const ThemedOption = useThemed('div', 'select.option');
    const {
      isMultiple,
      value: selectValue,
      setValue: setSelectValue,
      handleClose
    } = useContext(SelectContext);
    const extraProps = {
      value,
      isMultiple,
      isActive: isMultiple ? selectValue.includes(value) : value === selectValue
    };
    return (
      <ThemedOption
        ref={ref}
        onClick={e => {
          setSelectValue({ value });
          !isMultiple && handleClose?.();
          e.stopPropagation();
        }}
        {...extraProps}
        {...rest}
      >
        {children ?? value?.toString()}
      </ThemedOption>
    );
  }
);

SelectOption.displayName = 'SelectOption';
