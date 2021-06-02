import React, {
  createRef,
  forwardRef,
  useEffect,
  useState,
  HTMLAttributes,
  InputHTMLAttributes
} from 'react';
import { useSharedRef } from '~lib/hooks';
import { ComponentFactory, FormWidgetProps, StyleProps } from '~lib/models';
import { disableScroll, openTransition } from '~lib/utils';

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    StyleProps {
  options: {
    name?: string;
    value: any;
  }[];
}

export const createSelect: ComponentFactory<HTMLDivElement, SelectProps> = ({
  registry,
  themed
}) => {
  const { SelectOptionsTransition } = registry;
  const ThemedSelect = themed('div', { path: 'select' });
  const ThemedInput = themed<'input', FormWidgetProps>('input', {
    path: 'select.input',
    style: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      padding: 0,
      margin: 0
    }
  });

  return forwardRef((props, ref) => {
    const { options, value, disabled, onChange } = props;
    const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
    const [innerValue, setInnerValue] = useState(value);
    useEffect(() => {
      setInnerValue(value);
    }, [value]);

    const currentOption = options.find(v => v.value === innerValue);
    const displayValue =
      currentOption?.name ?? currentOption?.value?.toString() ?? '';

    const openSelect = () => {
      if (disabled) {
        return;
      }
      const optionsRef = createRef<HTMLDivElement>();
      const enableScroll = disableScroll({ allowedRefs: [optionsRef] });
      const { top, left } = sharedRef.current?.getBoundingClientRect() ?? {};
      const width = sharedRef.current?.offsetWidth;
      openTransition({
        render: props => (
          <SelectOptionsTransition
            ref={optionsRef}
            options={options}
            value={innerValue}
            style={{ position: 'fixed', top, left, width }}
            onOptionSelect={v => {
              setInnerValue(v.value);
              onChange?.(v.value);
              props.handleClose();
            }}
            {...props}
          />
        ),
        onClose: () => enableScroll()
      });
    };

    return (
      <ThemedSelect ref={sharedRef} {...props}>
        <ThemedInput
          readOnly
          type="text"
          value={displayValue}
          onFocus={openSelect}
          disabled={props.disabled}
          invalid={props.invalid}
          required={props.required}
        />
      </ThemedSelect>
    );
  });
};
