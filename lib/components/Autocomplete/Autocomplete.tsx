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
import { AutocompleteContent } from './AutocompleteContent';
import { AutocompleteContext } from './AutocompleteContext';

export interface AutocompleteOption {
  key: Key;
  query: string;
  value?: unknown;
  render?: () => ReactNode;
}

export interface AutocompleteProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    ThemeProps {
  getOptions: (
    query: string
  ) => AutocompleteOption[] | Promise<AutocompleteOption[]>;
}

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    { getOptions, value, onChange, onFocus, onBlur, onKeyDown, ...rest },
    ref
  ) => {
    const {
      defaults: { dropOptions: { portal: rootPortal = null } = {} } = {},
      locale
    } = useContext(SystemContext);
    const portal = useImperativePortal(rootPortal);

    const [query, setQuery] = useState('');
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
    const handleDrop = useCallback(() => {
      if (closeDrop.current) {
        return;
      }
      const closeDropWithoutCleaning = openDrop();
      closeDrop.current = () => {
        closeDropWithoutCleaning();
        closeDrop.current = undefined;
      };
    }, [openDrop]);
    const handleCompletion = useCallback(async (query: string) => {
      const options = await getOptions(query);
      setOptions(options);
      options.length > 0 && handleDrop();
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
      handleCompletion(query);
    }, [query]);
    useUpdateEffect(() => {
      options.length < 1 && closeDrop.current?.();
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
      <AutocompleteContext.Provider value={contextValue}>
        <Input
          ref={sharedRef}
          value={query}
          onBlur={ev => {
            closeDrop.current?.();
            onBlur?.(ev);
          }}
          onChange={(v: string) => setQuery(v)}
          onFocus={ev => {
            handleCompletion(query);
            onFocus?.(ev);
          }}
          onKeyDown={ev => {
            if (ev.key === 'Enter') {
              const selectedOption = options[selectedIndex];
              if (selectedOption) {
                setQuery(selectedOption.query);
                setInnerValue(
                  'value' in selectedOption
                    ? selectedOption.value
                    : selectedOption.query
                );
              }
              closeDrop.current?.();
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
      </AutocompleteContext.Provider>
    );
  }
);
