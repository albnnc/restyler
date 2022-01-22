import { FormWidgetDepiction } from './FormWidgetDepiction';

export interface FormWidgetProps<Value = any> extends FormWidgetDepiction {
  value?: Value;
  onChange?: (value: Value) => void;
}
