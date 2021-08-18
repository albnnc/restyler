import React, { forwardRef, HTMLAttributes, useContext } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';
import { SelectContext } from './SelectContext';

export interface SelectOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemedProps {
  value: any;
}

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
  ({ value, children, ...rest }, ref) => {
    const ThemedOption = useThemed<
      'div',
      {
        value: any;
        isActive: boolean;
        isMultiple: boolean;
      }
    >('div', { key: 'select.option' });
    const {
      isMultiple,
      value: selectValue,
      setValue: setSelectValue,
      handleClose
    } = useContext(SelectContext);
    return (
      <ThemedOption
        ref={ref}
        isActive={
          isMultiple ? selectValue.includes(value) : value === selectValue
        }
        isMultiple={isMultiple}
        value={value}
        onClick={e => {
          setSelectValue({ value });
          !isMultiple && handleClose?.();
          e.stopPropagation();
        }}
        {...rest}
      >
        {children ?? value?.toString()}
      </ThemedOption>
    );
  }
);

SelectOption.displayName = 'SelectOption';
