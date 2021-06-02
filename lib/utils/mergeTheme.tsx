import { Theme } from '../models';
import { merge } from './merge';
import { mergeStyleProps } from './mergeStyleProps';

export const mergeTheme = (...args: Theme[]): Theme => {
  return merge(...args, (a: any, b: any, key: string) => {
    if (key === 'variables') {
      return merge(a ?? {}, b ?? {});
    }
    if (typeof b === 'object') {
      return mergeStyleProps(a ?? {}, b);
    }
    return undefined;
  });
};
