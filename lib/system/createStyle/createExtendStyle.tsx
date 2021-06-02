import { BasicStyleProps, Style, StyleFactoryOptions } from '../../models';
import { merge } from '../../utils';
import { createStyle } from './createStyle';

export const createExtendStyle = <T extends BasicStyleProps>({
  variables,
  props
}: StyleFactoryOptions<T>): Style => {
  const value = props.extend;
  const result = {} as Style;
  for (const item of Array.isArray(value) ? value : [value]) {
    if (typeof item === 'function') {
      merge(
        result,
        item({
          props,
          createStyle: (customProps: BasicStyleProps) =>
            createStyle({ variables, props: customProps })
        })
      );
    } else if (typeof item === 'object') {
      merge(result, item);
    }
  }
  return result;
};
