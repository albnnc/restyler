import React, {
  cloneElement,
  forwardRef,
  useContext,
  useEffect,
  FormEventHandler,
  HTMLAttributes,
  ReactElement,
  ReactNode
} from 'react';
import { useThemed } from '../../hooks';
import { FormFieldValidator, FormWidgetProps, ThemeProps } from '../../models';
import { get, hash } from '../../utils';
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
  validate?: FormFieldValidator;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      children,
      help,
      label,
      name,
      validate,
      disabled,
      required,
      invalid,
      prefix,
      suffix,
      ...rest
    },
    ref
  ) => {
    const ThemedFormField = useThemed('div', {
      id: 'form.field'
    });
    const ThemedFormFieldControl = useThemed('div', {
      id: 'form.field.control'
    });
    const ThemedFormFieldErrors = useThemed('div', {
      id: 'form.field.errors'
    });
    const ThemedFormFieldErrorsItem = useThemed('div', {
      id: 'form.field.errors.item'
    });
    const ThemedFormFieldLabel = useThemed('label', {
      id: 'form.field.label'
    });
    const ThemedFormFieldHelp = useThemed('div', {
      id: 'form.field.help'
    });

    const { locale } = useContext(SystemContext);
    const {
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
          Object.keys(v).reduce(
            (prev, curr) => ({
              ...prev,
              ...(curr === name ? {} : { [curr]: v[curr] })
            }),
            {}
          )
        );
      };
    }, [required, hash(validate)]);

    const fieldValue = get(values, name);
    const fieldErrors = get(errors, name) as string[] | undefined;

    const validityProps = {
      disabled,
      invalid: invalid ?? (fieldErrors?.length ?? 0) > 0,
      required
    };

    const childProps = {
      name,
      value: fieldValue,
      onChange: newFieldValue => {
        setValues(v => ({ ...v, [name]: newFieldValue }));
      },
      ...validityProps
    };

    const child = children ? (
      cloneElement(children, childProps)
    ) : (
      <Input {...(childProps as InputProps)} />
    );

    return (
      <ThemedFormField ref={ref} {...rest}>
        {label && (
          <ThemedFormFieldLabel {...validityProps}>
            {label}
          </ThemedFormFieldLabel>
        )}
        <ThemedFormFieldControl>
          {prefix}
          {child}
          {suffix}
        </ThemedFormFieldControl>
        {help && <ThemedFormFieldHelp>{help}</ThemedFormFieldHelp>}
        {(fieldErrors?.length ?? 0) > 0 && (
          <ThemedFormFieldErrors>
            {fieldErrors?.map(v => (
              <ThemedFormFieldErrorsItem key={v}>{v}</ThemedFormFieldErrorsItem>
            ))}
          </ThemedFormFieldErrors>
        )}
      </ThemedFormField>
    );
  }
);

FormField.displayName = 'FormField';
