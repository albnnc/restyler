import { useState } from 'react';
import { FormManager } from '../models';

export const useFormManager = (defaults?: {
  errors?: any;
  validators?: any;
  values?: any;
}): FormManager => {
  const [values, setValues] = useState(defaults?.values ?? ({} as any));
  const [errors, setErrors] = useState(defaults?.errors ?? ({} as any));
  const [validators, setValidators] = useState(
    defaults?.validators ??
      ({} as {
        [name: string]: (value: any) => void;
      })
  );

  return {
    values,
    setValues,
    errors,
    setErrors,
    validators,
    setValidators
  };
};
