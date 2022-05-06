import React, {
  forwardRef,
  HTMLAttributes,
  Key,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  useDrop,
  useImperativePortal,
  useSharedRef,
  useUpdateEffect
} from '../../hooks';
import { FormWidgetProps, ThemeProps } from '../../models';
import { Input } from '../Input';
import { SystemContext } from '../SystemContext';
import { TextCompletionContent } from './TextCompletionContent';
import { TextCompletionContext } from './TextCompletionContext';

export interface TextCompletionOption {
  value: string;
  render?: () => ReactNode;
}

export interface TextCompletionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    ThemeProps {
  getOptions: (
    value: string
  ) => TextCompletionOption[] | Promise<TextCompletionOption[]>;
}

export const TextCompletion = forwardRef<HTMLInputElement, TextCompletionProps>(
  (
    { getOptions, value, onChange, onFocus, onBlur, onKeyDown, ...rest },
    ref
  ) => {
    const {
      defaults: { dropOptions: { portal: rootPortal = null } = {} } = {},
      locale
    } = useContext(SystemContext);
    const portal = useImperativePortal(rootPortal);

    const [innerValue, setInnerValue] = useState(value);
    const [options, setOptions] = useState<TextCompletionOption[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [openDrop, anchorRef] = useDrop<HTMLInputElement>(
      () => <TextCompletionContent />,
      {
        deps: [locale, options],
        portal,
        isTailored: true,
        isBlurResistant: true
      }
    );
    const closeDrop = useRef<undefined | (() => void)>();
    const handleDropOpen = useCallback(() => {
      !closeDrop.current && (closeDrop.current = openDrop());
    }, [openDrop]);
    const handleDropClose = useCallback(() => {
      closeDrop.current?.();
      closeDrop.current = undefined;
    }, []);
    const handleCompletion = useCallback(async (innerValue: string) => {
      const options = await getOptions(innerValue);
      setOptions(options);
      options.length > 0 && handleDropOpen();
    }, []);
    const sharedRef = useSharedRef<HTMLInputElement>(null, [ref, anchorRef]);
    const contextValue = useMemo(
      () => ({
        inputRef: sharedRef,
        options,
        innerValue,
        setInnerValue,
        selectedIndex,
        setSelectedIndex,
        handleDropClose
      }),
      [options, innerValue, selectedIndex]
    );

    useUpdateEffect(() => {
      innerValue !== value && onChange?.(innerValue);
      sharedRef.current === document.activeElement &&
        handleCompletion(innerValue);
    }, [innerValue]);
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value);
    }, [value]);
    useUpdateEffect(() => {
      options.length < 1 && handleDropClose();
    }, [options]);
    useEffect(() => {
      setSelectedIndex(
        selectedIndex < 0
          ? options.length - 1
          : selectedIndex >= options.length
          ? 0
          : selectedIndex
      );
    }, [options.length, selectedIndex]);

    return (
      <TextCompletionContext.Provider value={contextValue}>
        <Input
          ref={sharedRef}
          value={innerValue}
          onBlur={ev => {
            handleDropClose();
            onBlur?.(ev);
          }}
          onChange={(v: string) => setInnerValue(v)}
          onFocus={ev => {
            handleCompletion(innerValue);
            onFocus?.(ev);
          }}
          onKeyDown={ev => {
            if (ev.key === 'Enter') {
              const selectedOption = options[selectedIndex];
              if (selectedOption) {
                setInnerValue(selectedOption.value);
              }
              handleDropClose();
              ev.preventDefault();
            } else if (ev.key === 'ArrowUp') {
              setSelectedIndex(v => v - 1);
              ev.preventDefault();
            } else if (ev.key === 'ArrowDown') {
              setSelectedIndex(v => v + 1);
              ev.preventDefault();
            } else if (ev.key === 'Escape') {
              sharedRef.current?.blur();
              ev.preventDefault();
            }
            onKeyDown?.(ev);
          }}
          {...rest}
        />
        {portal}
      </TextCompletionContext.Provider>
    );
  }
);
