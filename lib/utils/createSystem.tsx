import { defaultSystem } from '../defaults';
import { PartiallyRequired, System } from '../models';
import { merge } from './merge';

export const createSystem = (
  options: PartiallyRequired<System, 'styled'>
): System => {
  return {
    defaults: merge({}, defaultSystem.defaults, options.defaults),
    locale: merge({}, defaultSystem.locale, options.locale),
    registry: options.registry ?? {},
    styled: options.styled,
    theme: options.theme ?? defaultSystem.theme
  };
};
