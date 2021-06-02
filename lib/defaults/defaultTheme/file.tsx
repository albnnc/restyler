import { ComponentTheme } from '../../models';
import { mergeStyleProps } from '../../utils';
import { button } from './button';

export const file: ComponentTheme = {
  extend: () => ({
    width: '100%',
    position: 'relative'
  }),
  input: {
    extend: { display: 'none' }
  },
  label: mergeStyleProps({}, button.kinds?.primary ?? {}, {
    padding: { vertical: 'small', horizontal: 'medium' },
    extend: {
      lineHeight: 'calc(1.5 * 1rem)',
      justifyContent: 'center'
    }
  })
};
