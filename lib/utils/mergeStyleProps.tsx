import { BasicBorder, StyleProps } from '../models';
import { clone } from './clone';
import { createSideMap } from './createSideMap';
import { isBasicBorder, isObject } from './guards';
import { merge } from './merge';

export const mergeStyleProps = (...args: StyleProps[]): StyleProps => {
  return merge(...args, (a: any, b: any, key: string) => {
    if (key === 'margin' || key === 'padding') {
      if (isObject(b)) {
        return merge(createSideMap(a ?? {}), createSideMap(b));
      }
    }
    if (key === 'border') {
      if (!isBasicBorder(b)) {
        return merge(
          createSideMap<BasicBorder>(a ?? {}, isBasicBorder),
          createSideMap<BasicBorder>(b, isBasicBorder)
        );
      }
    }
    if (key === 'extend') {
      return clone([
        ...(Array.isArray(a) ? a : [a]),
        ...(Array.isArray(b) ? b : [b])
      ]);
    }
    return undefined;
  });
};
