import React, {
  forwardRef,
  useEffect,
  HTMLAttributes,
  useCallback
} from 'react';
import { useFormManager, useThemed } from '../../hooks';
import { FormManager, ThemeProps } from '../../models';
import { get, set } from '../../utils';
import { FormContext } from './FormContext';

export interface FormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onChange' | 'onSubmit'>,
    ThemeProps {
  manager?: FormManager;
  onChange?: (manager: FormManager) => void;
  onSubmit?: (manager: FormManager) => void;
  shouldLiveValidate?: boolean;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ manager, onChange, onSubmit, shouldLiveValidate, ...rest }, ref) => {
    const ThemedForm = useThemed('form', 'form');

    const innerManager = useFormManager();
    const targetManager = manager ?? innerManager;
    const { values, errors, setErrors, validators } = targetManager;

    const validate = useCallback(() => {
      const newErrors = {} as any;
      Reflect.ownKeys(validators).forEach((name: string) => {
        const newFieldErrors = validators[name](get(values, name));
        if (newFieldErrors?.length > 0) {
          set(newErrors, name, newFieldErrors);
        }
      });
      const hasNewErrors = Reflect.ownKeys(newErrors).length > 0;
      return [newErrors, hasNewErrors] as const;
    }, [values, validators]);

    useEffect(() => {
      if (shouldLiveValidate) {
        const [newErrors, hasNewErrors] = validate();
        if (hasNewErrors) {
          setErrors(newErrors);
        }
      }
      onChange?.(targetManager);
    }, [validate, shouldLiveValidate]);

    useEffect(() => {
      onChange?.(targetManager);
    }, [errors]);

    return (
      <FormContext.Provider
        value={{
          manager: targetManager,
          shouldLiveValidate: !!shouldLiveValidate
        }}
      >
        <ThemedForm
          ref={ref}
          noValidate
          onSubmit={e => {
            e.preventDefault();
            const [newErrors, hasNewErrors] = validate();
            if (!shouldLiveValidate) {
              setErrors(newErrors);
            }
            if (!hasNewErrors) {
              onSubmit?.(targetManager);
            }
          }}
          {...rest}
        />
      </FormContext.Provider>
    );
  }
);

Form.displayName = 'Form';
