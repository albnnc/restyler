import { DirectionMap, SideMap } from '~lib/models';
import { clone } from './clone';
import { isString } from './guards';

export const createSideMap = <T extends any>(
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
    return prop;
  }
  const copy: SideMap<T> = clone(prop);
  delete copy['vertical'];
  delete copy['horizontal'];
  if (prop.vertical) {
    copy.top = clone(prop.vertical);
    copy.bottom = clone(prop.vertical);
  }
  if (prop.horizontal) {
    copy.left = clone(prop.horizontal);
    copy.right = clone(prop.horizontal);
  }
  return copy;
};
