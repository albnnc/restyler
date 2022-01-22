import { useMemo, useState } from 'react';
import { FormFieldValidator, FormManager } from '../models';

export interface FormManagerDefaults {
  errors?: any;
  validators?: any;
  values?: any;
}

export const useFormManager = (
  defaults: FormManagerDefaults = {}
): FormManager => {
  const [values, setValues] = useState(defaults.values ?? ({} as any));
  const [errors, setErrors] = useState(defaults.errors ?? ({} as any));
  const [validators, setValidators] = useState<{
    [name: string]: FormFieldValidator;
  }>(defaults.validators);
  const manager = {
    values,
    setValues,
    errors,
    setErrors,
    validators,
    setValidators
  };
  return useMemo(() => manager, Object.values(manager));
};
