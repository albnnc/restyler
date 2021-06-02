import { BasicBorder, StyleFactory, StyleProps } from '~lib/models';
import { isBasicBorder } from '~lib/utils';
import { createDirectionMapStyleFactory } from './common';

export const createBasicStyleFactory = <T extends StyleProps>(
  property: string
): StyleFactory<T> => options => {
  const { props, variables } = options;
  const value = props.border as BasicBorder;
  if (!value) {
    return {};
  }
  if (typeof value === 'string') {
    if (value === 'none') {
      return { [property]: 'none' };
    }
    return createBasicStyleFactory(property)({
      ...options,
      props: { border: { color: value } }
    });
  }
  const { width, color, style } = value;
  return {
    [property]:
      (width ?? '1px') +
      ' ' +
      (variables?.palette?.[color ?? ''] ?? color ?? 'currentColor') +
      ' ' +
      (style ?? 'solid')
  };
};

export const createBorderStyle = createDirectionMapStyleFactory(
  'border',
  'border',
  isBasicBorder,
  createBasicStyleFactory
);
