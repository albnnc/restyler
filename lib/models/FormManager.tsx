export interface FormManager {
  errors: any;
  setErrors: (errors: any) => void;
  setValues: (values: any) => void;
  values: any;
}
