import { Dispatch, SetStateAction } from 'react';
import { FormFieldValidator } from './FormFieldValidator';

// tslint:disable:member-ordering
export interface FormManager {
  values: any;
  setValues: Dispatch<SetStateAction<any>>;
  errors: any;
  setErrors: Dispatch<SetStateAction<any>>;
  validators: { [name: string]: FormFieldValidator };
  setValidators: Dispatch<
    SetStateAction<{ [name: string]: FormFieldValidator }>
  >;
}
