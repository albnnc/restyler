export interface FormWidgetProps<Value = any> {
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  value?: Value;
  onChange?: (value: Value) => void;
}
