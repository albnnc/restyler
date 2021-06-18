import React, {
  cloneElement,
  forwardRef,
  useMemo,
  useReducer,
  Children,
  HTMLAttributes,
  ReactElement,
  useEffect
} from 'react';
import { disableScroll } from '../../utils';
import {
  interactiveStackId,
  useClickOutside,
  useSharedRef,
  useStack,
  useStandaloneTransition,
  useThemed,
  useUpdateEffect
} from '../../hooks';
import { FormWidgetProps, StyleProps } from '../../models';
import { SelectDrop } from './SelectDrop';
import { SelectOptionProps } from './SelectOption';

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

  const { value, disabled, onChange, isMultiple, children } = props;
  const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
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
    setInnerValue({ value: innerValue, isForced: true });
  }, [value]);

  const childrenArray = useMemo(
    () => Children.toArray(children) as ReactElement<SelectOptionProps>[],
    [children]
  );

  const displayData = useMemo(() => {
    const activeOptions = childrenArray.filter(({ props: { value } }) =>
      isMultiple ? innerValue.includes(value) : innerValue === value
    );
    if (activeOptions.length < 1) {
      return <>&nbsp;</>;
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
      if (disabled) {
        return null;
      }
      return (
        <SelectDrop
          ref={dropRef}
          style={{
            position: 'fixed',
            top: isMultiple ? top + height : top,
            left,
            width
          }}
          {...props}
        >
          {childrenArray.map(v =>
            cloneElement(v, {
              isMultiple: !!isMultiple,
              onClick: () => {
                setInnerValue({ value: v.props.value });
                !isMultiple && props.handleClose();
              }
            })
          )}
        </SelectDrop>
      );
    },
    { deps: [] }
  );

  return (
    <ThemedSelect ref={sharedRef} onClick={() => openSelect()} {...props}>
      {displayData}
    </ThemedSelect>
  );
});

Select.displayName = 'Select';
