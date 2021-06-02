import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
  InputHTMLAttributes
} from 'react';
import { ComponentFactory, FormWidgetProps, StyleProps } from '../models';

export interface FileProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps<string>,
    StyleProps {
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export const createFile: ComponentFactory<HTMLDivElement, FileProps> = ({
  themed
}) => {
  const ThemedFile = themed('div', { path: 'file' });
  const ThemedFileHiddenInput = themed('input', {
    path: 'file.hiddenInput',
    style: { display: 'none' }
  });
  const ThemedFileInput = themed('input', {
    path: 'file.input',
    style: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      padding: 0,
      margin: 0
    }
  });
  return forwardRef(({ onChange, value, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [innerValue, setInnerValue] = useState(value);
    useEffect(() => {
      setInnerValue(value);
    }, [value]);
    const basename = innerValue?.replace(/^.+[\/\\]/, '') ?? '';
    return (
      <ThemedFile ref={ref} {...rest}>
        <ThemedFileHiddenInput
          ref={inputRef}
          type="file"
          onChange={e => {
            onChange?.(e.target.value);
          }}
        />
        <ThemedFileInput
          value={basename}
          onClick={() => inputRef.current?.click()}
        />
      </ThemedFile>
    );
  });
};
