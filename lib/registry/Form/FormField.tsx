import React, {
  cloneElement,
  forwardRef,
  useContext,
  FormEventHandler,
  HTMLAttributes,
  ReactElement
} from 'react';
import { ComponentFactory, FormWidgetProps, StyleProps } from '~lib/models';
import { clone, get, set } from '~lib/utils';
import { InputProps } from '../Input';
import { FormContext } from './FormContext';

export interface FormFieldProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    StyleProps {
  children?: ReactElement<{
    name?: string;
    onChange?: FormEventHandler<HTMLElement>;
    value?: any;
  }>;
  help?: string;
  label?: string;
  name: string;
  validate?: (value: any) => string[];
}

export const createFormField: ComponentFactory<
  HTMLDivElement,
  FormFieldProps
> = ({ registry, themed }) => {
  const { Input } = registry;
  const ThemedFormField = themed('div', { path: 'form.field' });
  const ThemedFormFieldControl = themed('div', { path: 'form.field.control' });
  const ThemedFormFieldErrors = themed('div', { path: 'form.field.errors' });
  const ThemedFormFieldErrorsItem = themed('div', {
    path: 'form.field.errors.item'
  });
  const ThemedFormFieldLabel = themed('label', { path: 'form.field.label' });
  const ThemedFormFieldHelp = themed('div', { path: 'form.field.help' });

  return forwardRef(
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
        ...rest
      },
      ref
    ) => {
      const { values, setValues, errors, setErrors } = useContext(FormContext);
      const setFieldRelated = (
        target: any,
        setTarget: (v: any) => void,
        value: any
      ) => {
        const copy = clone<any>(target);
        set(copy, name, value);
        setTarget(copy);
      };
      const fieldValue = get(values, name) as string | number;
      const fieldErrors = get(errors, name) as string[] | undefined;

      const validityProps = {
        disabled,
        invalid: invalid ?? (fieldErrors?.length ?? 0) > 0,
        required
      };

      const childProps = {
        name,
        value: fieldValue ?? '',
        onChange: newFieldValue => {
          const newFieldErrors = validate?.(newFieldValue) ?? [];
          if (required && [undefined, null, ''].includes(newFieldValue)) {
            newFieldErrors.push('Required');
          }
          setFieldRelated(values, setValues, newFieldValue);
          setFieldRelated(errors, setErrors, newFieldErrors);
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
          <ThemedFormFieldControl>{child}</ThemedFormFieldControl>
          {(fieldErrors?.length ?? 0) > 0 && (
            <ThemedFormFieldErrors>
              {fieldErrors?.map(v => (
                <ThemedFormFieldErrorsItem key={v}>
                  {v}
                </ThemedFormFieldErrorsItem>
              ))}
            </ThemedFormFieldErrors>
          )}
          {help && <ThemedFormFieldHelp>{help}</ThemedFormFieldHelp>}
        </ThemedFormField>
      );
    }
  );
};
