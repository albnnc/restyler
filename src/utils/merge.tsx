import { clone } from './clone';
import { isFunction, isObject } from './guards';

type MergeFn = (a: any, b: any, key?: string) => any;

const mergeSingle = (target: any, source: any, fn?: MergeFn) => {
  Object.keys(source).forEach((key: string) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    const fnValue = fn?.(targetValue, sourceValue, key);
    if (targetValue !== undefined && fnValue !== undefined) {
      target[key] = fnValue;
    } else if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = [...clone(targetValue), ...clone(sourceValue)];
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeSingle({ ...targetValue }, { ...sourceValue }, fn);
    } else {
      target[key] = clone(sourceValue);
    }
  });
  return target;
};

export const merge = (...args: any[]) => {
  const hasMergeFn = isFunction(args[args.length - 1]);
  const fn = hasMergeFn ? (args.pop() as MergeFn) : undefined;
  const objects = args.filter(v => !!v);
  if (objects.length < 2) {
    throw new Error('At least 2 objects have to be provided');
  }
  if (objects.some(object => !isObject(object))) {
    throw new Error('All values should be of type "object"');
  }
  const target = objects.shift();
  let source: any;
  while (target && (source = objects.shift())) {
    mergeSingle(target, source, fn);
  }
  return target;
};
