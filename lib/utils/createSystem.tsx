import { defaultSystem } from '../defaults';
import { PartiallyRequired, System } from '../models';
import { merge } from './merge';

export const createSystem = (
  options: PartiallyRequired<System, 'styled'>
): System => {
  const registry = {};
  return merge({}, defaultSystem, { registry }, options);
};
