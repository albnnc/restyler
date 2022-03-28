import React, {
  forwardRef,
  HTMLAttributes,
  Key,
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
import { AutocompleteContent } from './AutocompleteContent';
import { AutocompleteContext } from './AutocompleteContext';

export interface AutocompleteOption {
  key: Key;
  title: string;
  value: unknown;
}

export interface AutocompleteProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    ThemeProps {
  getOptions: (
    title: string
  ) => AutocompleteOption[] | Promise<AutocompleteOption[]>;
}

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ getOptions, value, onChange, onBlur, onKeyDown, ...rest }, ref) => {
    const {
      defaults: { dropOptions: { portal: rootPortal = null } = {} } = {},
      locale
    } = useContext(SystemContext);
    const portal = useImperativePortal(rootPortal);

    const [title, setTitle] = useState('');
    const [options, setOptions] = useState<AutocompleteOption[]>([]);
    const [innerValue, setInnerValue] = useState<unknown>(value);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const closeDrop = useRef<undefined | (() => void)>();
    const [openDrop, anchorRef] = useDrop<HTMLInputElement>(
      () => <AutocompleteContent />,
      {
        deps: [locale, options],
        portal,
        isTailored: true,
        isBlurResistant: true
      }
    );
    const handleTitleChange = useCallback(async (title: string) => {
      const options = await getOptions(title);
      setOptions(options);
    }, []);
    const sharedRef = useSharedRef<HTMLInputElement>(null, [ref, anchorRef]);
    const contextValue = useMemo(
      () => ({
        options,
        innerValue,
        setInnerValue,
        selectedIndex,
        setSelectedIndex
      }),
      [options, innerValue, selectedIndex]
    );

    useUpdateEffect(() => {
      innerValue !== value && onChange?.(innerValue);
    }, [innerValue]);
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value);
    }, [value]);
    useUpdateEffect(() => {
      handleTitleChange(title);
    }, [title]);
    useUpdateEffect(() => {
      if (closeDrop.current) {
        return;
      }
      const closeDropRaw = openDrop();
      closeDrop.current = () => {
        closeDropRaw();
        closeDrop.current = undefined;
      };
    }, [title]);
    useEffect(() => {
      setSelectedIndex(
        Math.max(Math.min(selectedIndex, options.length - 1), 0)
      );
    }, [options.length, selectedIndex]);

    return (
      <AutocompleteContext.Provider value={contextValue}>
        <Input
          ref={sharedRef}
          value={title}
          onBlur={ev => {
            closeDrop.current?.();
            onBlur?.(ev);
          }}
          onChange={(v: string) => setTitle(v)}
          onKeyDown={ev => {
            if (ev.key === 'Enter') {
              const selectedOption = options[selectedIndex];
              if (selectedOption) {
                setTitle(selectedOption.title);
                setInnerValue(selectedOption.value);
              }
              closeDrop.current?.();
              ev.preventDefault();
            } else if (ev.key === 'ArrowUp') {
              setSelectedIndex(v => v - 1);
              ev.preventDefault();
            } else if (ev.key === 'ArrowDown') {
              setSelectedIndex(v => v + 1);
              ev.preventDefault();
            }
            onKeyDown?.(ev);
          }}
          {...rest}
        />
        {portal}
      </AutocompleteContext.Provider>
    );
  }
);
