import React, {
  cloneElement,
  createRef,
  forwardRef,
  useEffect,
  useState,
  HTMLAttributes,
  ReactElement
} from 'react';
import { useSharedRef } from '../../hooks';
import { ComponentFactory, FormWidgetProps, StyleProps } from '../../models';
import { disableScroll, openTransition } from '../../utils';
import { SelectOptionProps } from './SelectOption';

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    StyleProps {
  children: ReactElement<SelectOptionProps>[];
}

export const createSelect: ComponentFactory<HTMLDivElement, SelectProps> = ({
  registry,
  themed
}) => {
  const { SelectDropTransition } = registry;
  const ThemedSelect = themed('div', { path: 'select' });

  return forwardRef((props, ref) => {
    const { value, disabled, onChange, children } = props;
    const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
    const [innerValue, setInnerValue] = useState(value);
    useEffect(() => {
      setInnerValue(value);
    }, [value]);

    const currentOption = children.find(v => v.props.value === innerValue);
    const displayData = currentOption?.props?.children ??
      currentOption?.props?.value ??
      props.placeholder ?? <>&nbsp;</>;

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
          <SelectDropTransition
            ref={optionsRef}
            style={{ position: 'fixed', top, left, width }}
            {...props}
          >
            {children.map(v =>
              cloneElement(v, {
                onClick: () => {
                  const elementValue = v.props.value;
                  setInnerValue(elementValue);
                  onChange?.(elementValue);
                  props.handleClose();
                }
              })
            )}
          </SelectDropTransition>
        ),
        onClose: () => enableScroll()
      });
    };

    return (
      <ThemedSelect ref={sharedRef} onClick={openSelect} {...props}>
        {displayData}
      </ThemedSelect>
    );
  });
};
