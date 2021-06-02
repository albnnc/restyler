import { BasicStyleProps, Style, StyleFactory } from '~lib/models';
import { capitalizeFirst } from '~lib/utils';

export const createDirectionMapStyleFactory = <T extends BasicStyleProps>(
  targetProp: string,
  sourceProp: string,
  isBasic: (v: any) => boolean,
  createBasicStyleFactory: (property: string) => StyleFactory<T>
): StyleFactory<T> => options => {
  const value = options.props[sourceProp];
  if (!value) {
    return {};
  }
  if (isBasic(value)) {
    return createBasicStyleFactory(targetProp)(options);
  }
  if (typeof value !== 'object') {
    throw new Error('Unable to determine type of value');
  }
  const { vertical, horizontal, ...sideMap } = value;
  if (vertical) {
    sideMap.top = vertical;
    sideMap.bottom = vertical;
  }
  if (horizontal) {
    sideMap.left = horizontal;
    sideMap.right = horizontal;
  }
  return Reflect.ownKeys(sideMap)
    .map((side: string) =>
      createBasicStyleFactory(targetProp + capitalizeFirst(side))({
        ...options,
        props: {
          ...options.props,
          [sourceProp]: sideMap[side]
        }
      })
    )
    .reduce((prev, curr) => ({ ...prev, ...curr }), {} as Style);
};
