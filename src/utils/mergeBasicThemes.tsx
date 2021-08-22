import { BasicTheme } from '../models';
import { merge } from './merge';

export const mergeBasicThemes = (...args: BasicTheme[]): BasicTheme => {
  return merge(...args, (a: any, b: any, key: string) => {
    if (key === 'style') {
      const aFn = typeof a === 'function' ? a : () => a;
      const bFn = typeof b === 'function' ? b : () => b;
      return props => ({ ...aFn(props), ...bFn(props) });
    }
    return undefined;
  });
};
