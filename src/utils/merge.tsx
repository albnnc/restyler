import { clone } from './clone';

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
    } else if (
      targetValue &&
      sourceValue &&
      typeof targetValue === 'object' &&
      typeof sourceValue === 'object'
    ) {
      target[key] = mergeSingle({ ...targetValue }, { ...sourceValue }, fn);
    } else {
      target[key] = clone(sourceValue);
    }
  });
  return target;
};

export const merge = (...args: any[]) => {
  const hasMergeFn = typeof args[args.length - 1] === 'function';
  const fn = hasMergeFn ? (args.pop() as MergeFn) : undefined;
  const objects = args.filter(v => !!v);
  if (objects.length < 2) {
    throw new Error('At least 2 objects have to be provided');
  }
  if (objects.some(object => !object && typeof object === 'object')) {
    throw new Error('All values should be of type "object"');
  }
  const target = objects.shift();
  let source: any;
  while (target && (source = objects.shift())) {
    mergeSingle(target, source, fn);
  }
  return target;
};
