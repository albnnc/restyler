import { createContext } from 'react';
import { FormManager } from '~lib/models';

export const FormContext = createContext({
  values: {} as any,
  setValues: () => {},
  errors: {} as any,
  setErrors: () => {}
} as FormManager);
