import { Theme } from '../../models';
import { mergeThemes } from '../../utils';
import { button } from './button';

export const file: Theme = {
  style: {
    width: '100%',
    position: 'relative'
  },
  input: {
    style: { display: 'none' }
  },
  label: mergeThemes({}, button.kinds?.primary ?? {}, {
    style: {
      paddingY: 2,
      paddingX: 3,
      display: 'block',
      textAlign: 'center',
      lineHeight: 'calc(1.5 * 1rem)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  })
};
