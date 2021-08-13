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
  useCallback
} from 'react';
import {
  interactiveStackId,
  useClickOutside,
  useImperativePortal,
  useSharedRef,
  useStack,
  useStandaloneTransition,
  useThemed,
  useUpdateEffect
} from '../../hooks';
import { FormWidgetProps, StyleProps } from '../../models';
import { disableScroll, getChildrenKey } from '../../utils';
import { SystemContext } from '../SystemContext';
import { SelectContext } from './SelectContext';
import { SelectDrop } from './SelectDrop';
import { SelectOption, SelectOptionProps } from './SelectOption';

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    StyleProps {
  children: ReactElement<SelectOptionProps> | ReactElement<SelectOptionProps>[];
  isMultiple?: boolean;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const ThemedSelect = useThemed('div', { path: 'select' });
  const ThemedSelectSelection = useThemed<'span', { isMultiple?: boolean }>(
    'span',
    { path: 'select.selection' }
  );
  const ThemedSelectPlaceholder = useThemed<'span'>('span', {
    path: 'select.placeholder'
  });

  const { children, isMultiple, placeholder, value, disabled, onChange } =
    props;
  const { defaults: { standaloneTransitionOptions = {} } = {}, locale } =
    useContext(SystemContext);
  const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
  const portal = useImperativePortal(
    standaloneTransitionOptions.portal ?? null
  );
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
    onChange?.(innerValue);
  }, [innerValue]);

  useUpdateEffect(() => {
    setInnerValue({ value, isForced: true });
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
        <ThemedSelectPlaceholder>{placeholder}</ThemedSelectPlaceholder>
      ) : (
        <>&nbsp;</>
      );
    }
    return activeOptions.map(({ props: { children, value } }) => (
      <ThemedSelectSelection key={value} isMultiple={isMultiple}>
        {children ?? value}
      </ThemedSelectSelection>
    ));
  }, [isMultiple, innerValue, childrenArray]);

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
            <SelectOption value={undefined} kind="empty">
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
    if (disabled) {
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
  }, [disabled, handleClose]);

  return (
    <ThemedSelect ref={sharedRef} onClick={handleClick} {...props}>
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
});

Select.displayName = 'Select';
