import { BasicTheme } from '../models';
import { merge } from './merge';

export const mergeBasicThemes = (...args: BasicTheme[]): BasicTheme => {
  return merge(...args, (a: any, b: any, key: string) => {
    if (key === 'style') {
      const aFn = a instanceof Function ? a : () => a;
      const bFn = b instanceof Function ? b : () => b;
      return props => ({ ...aFn(props), ...bFn(props) });
    }
    return undefined;
  });
};
