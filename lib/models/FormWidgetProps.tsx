// tslint:disable:member-ordering
export interface FormWidgetProps<TValue = any> {
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;

  value?: TValue;
  onChange?: (value: TValue) => void;
}
