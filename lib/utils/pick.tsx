import { get } from './get';
import { set } from './set';

export const pick = <T extends object>(
  data: T,
  ...paths: string[]
): Partial<T> => {
  const result = {};
  paths.forEach(v => set(result, v, get(data, v)));
  return result;
};
