import { knownStyleProps, BasicBorder, StyleProps } from '../models';

export const isString = (v): v is string => typeof v === 'string';
export const isObject = (v): v is object => typeof v === 'object' && v;
export const isFunction = (v): v is Function => typeof v === 'function';

export const isBasicBorder = (value?: any): value is BasicBorder => {
  if (typeof value === 'string') {
    return true;
  }
  if (typeof value !== 'object') {
    return false;
  }
  const knownKeys = ['width', 'color', 'style'];
  const keys = Reflect.ownKeys(value);
  return keys.every((v: string) => knownKeys.includes(v));
};

export const isStyleProp = (v): v is keyof StyleProps =>
  knownStyleProps.includes(v);
