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
  interactiveStackId,
  useClickOutside,
  useImperativePortal,
  useSharedRef,
  useStack,
  useStandaloneTransition,
  useThemedFactory,
  useUpdateEffect
} from '../../hooks';
import { FormWidgetDepiction, FormWidgetProps, ThemeProps } from '../../models';
import { disableScroll, getChildrenKey } from '../../utils';
import { SystemContext } from '../SystemContext';
import { SelectContext } from './SelectContext';
import { SelectDrop } from './SelectDrop';
import { SelectOption, SelectOptionProps } from './SelectOption';

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    ThemeProps {
  children: ReactElement<SelectOptionProps> | ReactElement<SelectOptionProps>[];
  isMultiple?: boolean;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      children,
      isMultiple,
      value,
      disabled,
      readOnly,
      invalid,
      required,
      placeholder,
      onChange
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
      () => ({ isMultiple, disabled, readOnly, invalid, required }),
      [isMultiple, disabled, readOnly, invalid, required]
    );

    const {
      defaults: {
        standaloneTransitionOptions: { portal: rootPortal = null } = {}
      } = {},
      locale
    } = useContext(SystemContext);
    const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
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

    const openSelect = useStandaloneTransition<HTMLDivElement>(
      (props, ref) => {
        const dropRef = useSharedRef<HTMLDivElement>(null, [ref]);
        useClickOutside(dropRef, props.handleClose);
        useStack(interactiveStackId);
        useEffect(() => {
          return disableScroll();
        }, []);
        const {
          top = 0,
          left = 0,
          height = 0,
          width = 0
        } = sharedRef.current?.getBoundingClientRect() ?? {};
        return (
          <SelectDrop
            ref={dropRef}
            style={{ position: 'fixed', top: top + height, left, width }}
            {...props}
          >
            {childrenArray.length > 0 ? (
              childrenArray
            ) : (
              <SelectOption kind="empty" value={undefined}>
                {locale.empty}
              </SelectOption>
            )}
          </SelectDrop>
        );
      },
      { deps: [childrenArray], portal }
    );

    const [handleClose, setHandleClose] = useState<(() => void) | undefined>();
    const handleClick = useCallback(() => {
      if (disabled || readOnly) {
        return;
      }
      if (handleClose) {
        handleClose();
      } else {
        const close = openSelect();
        setHandleClose(() => () => {
          close();
          setHandleClose(undefined);
        });
      }
    }, [disabled, readOnly, handleClose]);

    useEffect(() => {
      if ((disabled || readOnly) && handleClose) {
        handleClose();
      }
    }, [disabled, readOnly, handleClose]);

    return (
      <ThemedSelect ref={sharedRef} onClick={handleClick} {...extraProps}>
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
