import { useState } from 'react';
import { FormManager } from '~lib/models';

export const useFormManager = (defaults?: {
  errors?: any;
  values?: any;
}): FormManager => {
  const [values, setValues] = useState(defaults?.values ?? ({} as any));
  const [errors, setErrors] = useState(defaults?.errors ?? ({} as any));
  return {
    values,
    setValues,
    errors,
    setErrors
  };
};
