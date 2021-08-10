import { Style, Theme } from '../models';
import { merge } from './merge';

export const createStyle = (theme: Theme, props: any) => {
  const { style } = theme;
  const result = {} as Style;
  for (const item of Array.isArray(style) ? style : [style]) {
    if (typeof item === 'function') {
      merge(result, item(props));
    } else if (typeof item === 'object') {
      merge(result, item);
    }
  }
  return result;
};
