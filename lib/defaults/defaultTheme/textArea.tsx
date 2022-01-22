import { BasicTheme } from '../../models';
import { mergeBasicThemes } from '../../utils';
import { input } from './input';

export const textArea: BasicTheme = mergeBasicThemes({}, input, {
  style: {
    display: 'block',
    resize: 'vertical'
  }
});
