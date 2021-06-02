import { ComponentTheme } from '../../models';
import { input } from './input';
import { mergeStyleProps } from 'lib/utils';

export const textArea: ComponentTheme = mergeStyleProps({}, input, {
  extend: {
    display: 'block',
    resize: 'vertical'
  }
});
