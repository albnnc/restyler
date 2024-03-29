import React, {
  forwardRef,
  useMemo,
  useReducer,
  Children,
  HTMLAttributes,
  ReactElement,
  useEffect,
  useContext,
  useState,
  useCallback,
  Fragment
} from 'react';
import {
  DropPlacement,
  useDrop,
  useImperativePortal,
  useSharedRef,
  useThemedFactory,
  useUpdateEffect
} from '../../hooks';
import { FormWidgetDepiction, FormWidgetProps, ThemeProps } from '../../models';
import { getChildrenKey } from '../../utils';
import { SystemContext } from '../SystemContext';
import { SelectContext } from './SelectContext';
import { SelectOption, SelectOptionProps } from './SelectOption';

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    ThemeProps {
  children: ReactElement<SelectOptionProps> | ReactElement<SelectOptionProps>[];
  isMultiple?: boolean;
  placement?: DropPlacement;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      children,
      isMultiple,
      placement,
      value,
      disabled,
      readOnly,
      invalid,
      required,
      placeholder,
      onChange,
      ...rest
    },
    ref
  ) => {
    const useThemed = useThemedFactory<
      FormWidgetDepiction & Pick<SelectProps, 'isMultiple'>
    >();
    const ThemedSelect = useThemed('div', 'select');
    const ThemedSelectPlaceholder = useThemed('span', 'select.placeholder');
    const ThemedSelectSelection = useThemed('span', 'select.selection');
    // Needs to be memoized since it's used
    // as dependency for other memoization.
    const extraProps = useMemo(
      () => ({ isMultiple, placement, disabled, readOnly, invalid, required }),
      [isMultiple, placement, disabled, readOnly, invalid, required]
    );

    const {
      defaults: { dropOptions: { portal: rootPortal = null } = {} } = {},
      locale
    } = useContext(SystemContext);
    const portal = useImperativePortal(rootPortal);

    const [innerValue, setInnerValue] = useReducer(
      (active: any, action: { isForced?: boolean; value: any }) => {
        if (action.isForced || !isMultiple) {
          return action.value;
        } else {
          const actives = Array.isArray(active) ? active : [active];
          const next = actives.includes(action.value)
            ? actives.filter(v => v !== action.value)
            : actives.concat([action.value]);
          return next;
        }
      },
      value ?? (isMultiple ? [] : undefined)
    );

    useUpdateEffect(() => {
      innerValue !== value && onChange?.(innerValue);
    }, [innerValue]);

    useUpdateEffect(() => {
      innerValue !== value && setInnerValue({ value, isForced: true });
    }, [value]);

    const childrenArray = useMemo(
      () => Children.toArray(children) as ReactElement<SelectOptionProps>[],
      [getChildrenKey(children, { pivots: ['value'] })]
    );

    const displayData = useMemo(() => {
      const activeOptions = childrenArray.filter(({ props: { value } }) =>
        isMultiple ? innerValue.includes(value) : innerValue === value
      );
      if (activeOptions.length < 1) {
        return placeholder ? (
          <ThemedSelectPlaceholder {...extraProps}>
            {placeholder}
          </ThemedSelectPlaceholder>
        ) : (
          <Fragment>&nbsp;</Fragment>
        );
      }
      return activeOptions.map(({ props: { children, value } }) => (
        <ThemedSelectSelection key={value} {...extraProps}>
          {children ?? value}
        </ThemedSelectSelection>
      ));
    }, [extraProps, innerValue, childrenArray]);

    const [open, anchorRef] = useDrop<HTMLDivElement>(
      () =>
        childrenArray.length > 0 ? (
          childrenArray
        ) : (
          <SelectOption kind="empty" value={undefined}>
            {locale.empty}
          </SelectOption>
        ),
      {
        deps: [locale, childrenArray],
        portal,
        placement,
        isTailored: true
      }
    );

    const [handleClose, setHandleClose] = useState<(() => void) | undefined>();
    const handleClick = useCallback(() => {
      if (disabled || readOnly) {
        return;
      }
      if (handleClose) {
        handleClose();
      } else {
        const close = open();
        setHandleClose(() => () => {
          close();
          setHandleClose(undefined);
        });
      }
    }, [open, disabled, readOnly, handleClose]);

    useEffect(() => {
      if ((disabled || readOnly) && handleClose) {
        handleClose();
      }
    }, [disabled, readOnly, handleClose]);

    const sharedRef = useSharedRef<HTMLDivElement>(null, [ref, anchorRef]);
    return (
      <ThemedSelect
        ref={sharedRef}
        onClick={handleClick}
        {...extraProps}
        {...rest}
      >
        <SelectContext.Provider
          value={{
            value: innerValue,
            setValue: setInnerValue,
            isMultiple: !!isMultiple,
            isOpen: !!handleClose,
            handleClose
          }}
        >
          {portal}
          {displayData}
        </SelectContext.Provider>
      </ThemedSelect>
    );
  }
);
