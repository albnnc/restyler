import { DirectionMap, SideMap } from '../models';
import { clone } from './clone';
import { isString } from './guards';

export const createSideMap = <T extends any = string>(
  prop: T | DirectionMap<T>,
  isBasic?: (v) => v is T
): SideMap<T> => {
  const isBasicSafe = isBasic || ((v): v is T => isString(v));
  if (isBasicSafe(prop)) {
    return {
      top: clone(prop),
      bottom: clone(prop),
      left: clone(prop),
      right: clone(prop)
    };
  }
  if (typeof prop !== 'object') {
    return {};
  }
  const { vertical, horizontal } = prop as DirectionMap<T>;
  const copy = clone(prop) as SideMap<T>;
  delete copy['vertical'];
  delete copy['horizontal'];
  if (vertical) {
    copy.top = clone(vertical);
    copy.bottom = clone(vertical);
  }
  if (horizontal) {
    copy.left = clone(horizontal);
    copy.right = clone(horizontal);
  }
  return copy;
};
