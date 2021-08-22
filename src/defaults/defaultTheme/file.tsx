import { BasicTheme } from '../../models';
import { mergeBasicThemes } from '../../utils';
import { button } from './button';

export const file: BasicTheme = {
  style: {
    width: '100%',
    position: 'relative'
  },
  components: {
    input: {
      style: { display: 'none' }
    },
    label: mergeBasicThemes({}, button.kinds?.primary ?? {}, {
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
  }
};
