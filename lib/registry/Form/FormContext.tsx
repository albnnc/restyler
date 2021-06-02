import { createContext } from 'react';
import { FormManager } from '../../models';

export const FormContext = createContext({
  values: {} as any,
  setValues: () => {},
  errors: {} as any,
  setErrors: () => {}
} as FormManager);
