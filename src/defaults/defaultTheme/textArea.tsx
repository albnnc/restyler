import { Theme } from '../../models';
import { mergeThemes } from '../../utils';
import { input } from './input';

export const textArea: Theme = mergeThemes({}, input, {
  style: {
    display: 'block',
    resize: 'vertical'
  }
});
