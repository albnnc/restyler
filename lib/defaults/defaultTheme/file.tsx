import { ComponentTheme } from '../../models';
import { mergeStyleProps } from '../../utils';
import { button } from './button';
import { input } from './input';

export const file: ComponentTheme = {
  extend: () => ({
    width: '100%',
    position: 'relative'
  }),
  input: {
    extend: { display: 'none' }
  },
  label: mergeStyleProps({}, button.kinds?.primary ?? {}, {
    padding: 'small'
  })
};
