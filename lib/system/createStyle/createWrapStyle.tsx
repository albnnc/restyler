import { BasicStyleProps, Style, StyleFactoryOptions } from '../../models';
import { createStringStyleFactory } from './common';

const createBasicWrapStyle = createStringStyleFactory(
  'flexWrap',
  'wrap',
  'wrap'
);

export const createWrapStyle = <T extends BasicStyleProps>(
  options: StyleFactoryOptions<T>
): Style => {
  const { props } = options;
  const value = props.wrap;
  if (value === true) {
    return { flexWrap: 'wrap' };
  } else if (value === false) {
    return { flexWrap: 'nowrap' };
  }
  return createBasicWrapStyle(options);
};
