import React, { forwardRef, HTMLAttributes, useContext } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';
import { SelectContext } from './SelectContext';

export interface SelectOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
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
    >('div', {
      path: 'select.option'
    });
    const {
      isMultiple,
      value: selectValue,
      setValue: setSelectValue,
      handleClose
    } = useContext(SelectContext);
    return (
      <ThemedOption
        ref={ref}
        value={value}
        isActive={
          isMultiple ? selectValue.includes(value) : value === selectValue
        }
        isMultiple={isMultiple}
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
