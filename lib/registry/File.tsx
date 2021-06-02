import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode
} from 'react';
import { ComponentFactory, FormWidgetProps, StyleProps } from '../models';

export interface FileLabelRenderer {
  (fileNames: string[]): ReactNode;
}

export interface FileProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps<FileList | undefined>,
    StyleProps {
  children?: ReactNode | FileLabelRenderer;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export const createFile: ComponentFactory<HTMLDivElement, FileProps> = ({
  themed
}) => {
  const ThemedFile = themed('div', { path: 'file' });
  const ThemedFileInput = themed('input', { path: 'file.input' });
  const ThemedFileInputLabel = themed('label', { path: 'file.label' });
  return forwardRef(
    ({ onChange, value, inputProps, children, ...rest }, ref) => {
      const inputRef = useRef<HTMLInputElement>(null);
      const [innerValue, setInnerValue] = useState(value);
      useEffect(() => {
        setInnerValue(value);
      }, [value]);
      const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const { files } = event.target;
        if (!files || files.length === 0) {
          setInnerValue(undefined);
          onChange?.(undefined);
        } else {
          setInnerValue(files);
          onChange?.(files);
        }
      };
      return (
        <ThemedFile ref={ref} {...rest}>
          <ThemedFileInput
            ref={inputRef}
            type="file"
            onChange={handleInputChange}
            {...inputProps}
          />
          <ThemedFileInputLabel
            onClick={() => inputRef.current?.click()}
            direction="row"
          >
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
};

const getLabel = (files: FileList | undefined) => {
  if (!files || files.length === 0) return 'Choose file';
  if (files.length > 1) {
    return `${files?.length} files selected`;
  }
  return `${files.item(0)?.name}`;
};
