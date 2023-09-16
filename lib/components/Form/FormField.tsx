import React, {
  cloneElement,
  forwardRef,
  useContext,
  useEffect,
  FormEventHandler,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useMemo
} from 'react';
import { useThemed } from '../../hooks';
import { FormFieldValidator, FormWidgetProps, ThemeProps } from '../../models';
import { clone, get, getChildrenKey, hash, set } from '../../utils';
import { Input, InputProps } from '../Input';
import { SystemContext } from '../SystemContext';
import { FormContext } from './FormContext';

interface FormFieldAddonProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export interface FormFieldProps
  extends Omit<
      HTMLAttributes<HTMLDivElement>,
      keyof FormWidgetProps | keyof FormFieldAddonProps
    >,
    FormWidgetProps,
    FormFieldAddonProps,
    ThemeProps {
  children?: ReactElement<{
    name?: string;
    onChange?: FormEventHandler<HTMLElement>;
    value?: any;
  }>;
  help?: string;
  label?: string;
  name: string;
  placeholder?: string;
  validate?: FormFieldValidator;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      children,
      disabled,
      help,
      invalid,
      label,
      name,
      placeholder,
      prefix,
      readOnly,
      required,
      suffix,
      validate,
      ...rest
    },
    ref
  ) => {
    const ThemedFormField = useThemed('div', 'form.field');
    const ThemedFormFieldControl = useThemed('div', 'form.field.control');
    const ThemedFormFieldErrors = useThemed('div', 'form.field.errors');
    const ThemedFormFieldErrorsItem = useThemed(
      'div',
      'form.field.errors.item'
    );
    const ThemedFormFieldLabel = useThemed('label', 'form.field.label');
    const ThemedFormFieldHelp = useThemed('div', 'form.field.help');
    const { locale } = useContext(SystemContext);
    const {
      disabled: formDisabled,
      readOnly: formReadOnly,
      manager: { values, setValues, errors, setValidators }
    } = useContext(FormContext);
    useEffect(() => {
      setValidators(v => ({
        ...v,
        [name]: value => {
          const newFieldErrors = validate?.(value) ?? [];
          if (required && [undefined, null, ''].includes(value)) {
            newFieldErrors.push(locale.required);
          }
          return newFieldErrors;
        }
      }));
      return () => {
        setValidators(v =>
          Reflect.ownKeys(v).reduce(
            (p: object, k: string) => (k === name ? p : { ...p, [k]: v[k] }),
            {}
          )
        );
      };
    }, [required, hash(validate)]);
    const fieldValue = useMemo(() => get(values, name), [values, name]);
    const fieldErrors = useMemo<string[]>(
      () => get(errors, name, []),
      [errors, name]
    );
    const scalarProps = useMemo(
      () => ({
        disabled: !!(disabled || formDisabled),
        invalid: invalid ?? fieldErrors.length > 0,
        name,
        placeholder,
        readOnly: !!(readOnly || formReadOnly),
        required,
        value: fieldValue
      }),
      [
        disabled,
        fieldErrors,
        fieldValue,
        formReadOnly,
        formDisabled,
        invalid,
        name,
        readOnly,
        required
      ]
    );
    const childProps = useMemo(
      () => ({
        ...scalarProps,
        onChange: newFieldValue => {
          setValues(v => {
            const cloned = clone(v);
            set(cloned, name, newFieldValue);
            return cloned;
          });
        }
      }),
      [scalarProps]
    );
    const child = useMemo(
      () =>
        children ? (
          cloneElement(children, childProps)
        ) : (
          <Input {...(childProps as InputProps)} />
        ),
      [childProps, getChildrenKey(children)]
    );
    return useMemo(
      () => (
        <ThemedFormField ref={ref} {...scalarProps} {...rest}>
          {label && (
            <ThemedFormFieldLabel {...scalarProps}>
              {label}
            </ThemedFormFieldLabel>
          )}
          <ThemedFormFieldControl {...scalarProps}>
            {prefix}
            {child}
            {suffix}
          </ThemedFormFieldControl>
          {help && <ThemedFormFieldHelp>{help}</ThemedFormFieldHelp>}
          {fieldErrors.length > 0 && (
            <ThemedFormFieldErrors>
              {fieldErrors.map(v => (
                <ThemedFormFieldErrorsItem key={v}>
                  {v}
                </ThemedFormFieldErrorsItem>
              ))}
            </ThemedFormFieldErrors>
          )}
        </ThemedFormField>
      ),
      [child, fieldErrors, help, label, prefix, suffix, scalarProps, hash(rest)]
    );
  }
);
