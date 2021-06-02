import { BasicStyleProps, Style, StyleFactoryOptions } from '~lib/models';

export const createDirectionStyle = <T extends BasicStyleProps>({
  props
}: StyleFactoryOptions<T>): Style => {
  const value = props.direction;
  if (value === 'row') {
    return {
      display: 'flex',
      flexDirection: 'row'
    };
  } else if (value === 'column') {
    return {
      display: 'flex',
      flexDirection: 'column'
    };
  }
  return {};
};
