import { ComponentTheme } from '../../models';
import { mergeStyleProps } from '../../utils';
import { input } from './input';

export const file: ComponentTheme = {
  extend: ({ createStyle }) => ({
    width: '100%',
    position: 'relative'
  }),
  hiddenInput: {},
  label: mergeStyleProps({}, input, {
    border: 'none',
    background: 'transparent',
    margin: '0',
    extend: {
      cursor: 'pointer'
    }
  })
};
