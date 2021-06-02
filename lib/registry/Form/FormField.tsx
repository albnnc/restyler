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
import {
  ComponentFactory,
  FormFieldValidator,
  FormWidgetProps,
  StyleProps
} from '../../models';
import { clone, get, set } from '../../utils';
import { InputProps } from '../Input';
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
    StyleProps {
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
        prefix,
        suffix,
        ...rest
      },
      ref
    ) => {
      const {
        manager: { values, setValues, errors, validators, setValidators }
      } = useContext(FormContext);

      useEffect(() => {
        setValidators(v => ({
          ...v,
          [name]: value => {
            const newFieldErrors = validate?.(value) ?? [];
            if (required && [undefined, null, ''].includes(value)) {
              newFieldErrors.push('Required');
            }
            return newFieldErrors;
          }
        }));
      }, [required, validate]);

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
