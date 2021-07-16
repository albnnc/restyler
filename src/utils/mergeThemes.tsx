import { BasicBorder, Theme } from '../models';
import { clone } from './clone';
import { createSideMap } from './createSideMap';
import { isBasicBorder, isObject } from './guards';
import { hash } from './hash';
import { merge } from './merge';

export const mergeThemes = (...args: Theme[]): Theme => {
  return merge(...args, (a: any, b: any, key: string) => {
    // These are style props so should be merged as basic
    // objects while also being converted to side maps is needed.
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

    // Extend props should be added to array as styles
    // might be merged only after execution of given functions.
    // That said, one has to also remove exact same
    // consecutive functions.
    if (key === 'extend') {
      const extensions = clone([
        ...(Array.isArray(a) ? a : [a]),
        ...(Array.isArray(b) ? b : [b])
      ]);
      const hashes = new Array(extensions.length).fill(undefined);
      return extensions.filter(
        (v, i) => (hashes[i] = hash(v)) !== hashes[i - 1]
      );
    }

    // The rest `variables` and `kinds` properties
    // should also be merged as plain objects.
    return undefined;
  });
};
