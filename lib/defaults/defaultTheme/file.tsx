import { Theme } from '../../models';
import { mergeThemes } from '../../utils';
import { button } from './button';

export const file: Theme = {
  extend: () => ({
    width: '100%',
    position: 'relative'
  }),
  input: {
    extend: { display: 'none' }
  },
  label: mergeThemes({}, button.kinds?.primary ?? {}, {
    padding: { vertical: 'small', horizontal: 'medium' },
    extend: {
      lineHeight: 'calc(1.5 * 1rem)',
      justifyContent: 'center'
    }
  })
};
