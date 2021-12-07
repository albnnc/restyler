import { createContext } from 'react';
import { FormManager } from '../../models';

export const FormContext = createContext({
  manager: {
    values: {},
    setValues: () => {},
    errors: {},
    setErrors: () => {},
    validators: {},
    setValidators: () => {}
  } as FormManager,
  disabled: false,
  readOnly: false,
  shouldLiveValidate: false
});
