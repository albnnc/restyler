import React, {
  cloneElement,
  createRef,
  forwardRef,
  useContext,
  useEffect,
  useState,
  Children,
  HTMLAttributes,
  ReactElement
} from 'react';
import { useSharedRef, useThemed } from '../../hooks';
import { FormWidgetProps, StyleProps } from '../../models';
import { disableScroll, openTransition } from '../../utils';
import { SystemContext } from '../SystemContext';
import { SelectDropTransition } from './SelectDropTransition';
import { SelectOptionProps } from './SelectOption';

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    StyleProps {
  children: ReactElement<SelectOptionProps> | ReactElement<SelectOptionProps>[];
}

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const ThemedSelect = useThemed('div', { path: 'select' });
  const { value, disabled, onChange, children } = props;
  const system = useContext(SystemContext);

  const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
  const [innerValue, setInnerValue] = useState(value);
  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const childrenArray = Children.toArray(children) as ReactElement<
    SelectOptionProps
  >[];
  const currentOption = childrenArray.find(v => v.props.value === innerValue);
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
        <SystemContext.Provider value={system}>
          <SelectDropTransition
            ref={optionsRef}
            style={{ position: 'fixed', top, left, width }}
            {...props}
          >
            {childrenArray.map(v =>
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
        </SystemContext.Provider>
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
