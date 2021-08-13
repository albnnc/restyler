import { Theme } from '../models';
import { clone } from './clone';
import { hash } from './hash';
import { merge } from './merge';

export const mergeThemes = (...args: Theme[]): Theme => {
  return merge(...args, (a: any, b: any, key: string) => {
    if (key === 'style') {
      const extensions = clone([
        ...(Array.isArray(a) ? a : [a]),
        ...(Array.isArray(b) ? b : [b])
      ]);
      const hashes = new Array(extensions.length).fill(undefined);
      return extensions.filter(
        (v, i) => (hashes[i] = hash(v)) !== hashes[i - 1]
      );
    }
    return undefined;
  });
};
