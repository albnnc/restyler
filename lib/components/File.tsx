import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  useMemo,
  useCallback
} from 'react';
import { useThemedFactory } from '../hooks';
import { FormWidgetProps, ThemeProps } from '../models';

export interface FileLabelRenderer {
  (fileNames: string[]): ReactNode;
}

export interface FileProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps<FileList | undefined>,
    ThemeProps {
  children?: ReactNode | FileLabelRenderer;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export const File = forwardRef<HTMLDivElement, FileProps>(
  (
    {
      children,
      inputProps,
      value,
      disabled,
      readOnly,
      invalid,
      required,
      onChange,
      ...rest
    },
    ref
  ) => {
    const useThemed =
      useThemedFactory<Pick<FileProps, 'disabled' | 'readOnly' | 'invalid'>>();
    const ThemedFile = useThemed('div', 'file');
    const ThemedFileInput = useThemed('input', 'file.input');
    const ThemedFileInputLabel = useThemed('label', 'file.label');
    const extraProps = { disabled, readOnly, invalid, required };
    const inputRef = useRef<HTMLInputElement>(null);
    const [innerValue, setInnerValue] = useState(value);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (!files || files.length === 0) {
        setInnerValue(undefined);
        onChange?.(undefined);
      } else {
        setInnerValue(files);
        onChange?.(files);
      }
    };
    const handleLabelClick = useCallback(() => {
      if (disabled || readOnly) {
        return;
      }
      inputRef.current?.click();
    }, [disabled, readOnly]);
    useEffect(() => {
      setInnerValue(value);
    }, [value]);
    return (
      <ThemedFile ref={ref} {...rest} {...extraProps}>
        <ThemedFileInput
          ref={inputRef}
          type="file"
          onChange={handleInputChange}
          {...extraProps}
          {...inputProps}
        />
        <ThemedFileInputLabel onClick={handleLabelClick} {...extraProps}>
          {children && typeof children === 'function'
            ? (children as FileLabelRenderer)(
                Array(innerValue?.length ?? 0)
                  .fill(null)
                  .reduce(
                    (acc, _, i) => [...acc, innerValue?.item(i)?.name],
                    []
                  )
              )
            : children}
          {!children && getLabel(innerValue)}
        </ThemedFileInputLabel>
      </ThemedFile>
    );
  }
);

File.displayName = 'File';

const getLabel = (files: FileList | undefined) => {

  if (!files || files.length === 0) return 'Choose file';
  if (files.length > 1) {
    return `${files?.length} files selected`;
  }
  return `${files.item(0)?.name}`;
};
