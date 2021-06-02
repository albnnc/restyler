import { ComponentTheme } from '../../models';
import { mergeStyleProps } from '../../utils';
import { input } from './input';

export const file: ComponentTheme = {
  extend: ({ createStyle }) => ({
    width: '100%',
    position: 'relative',
    '&:after': {
      ...createStyle({
        background: 'text'
      }),
      display: 'block',
      content: '""',
      position: 'absolute',
      right: '0.9rem',
      top: '50%',
      transform: 'translateY(-50%)',
      borderRadius: '100vw',
      width: '5px',
      height: '5px'
    }
  }),

  input: mergeStyleProps({}, input, {
    extend: {
      cursor: 'pointer',
      paddingRight: 'calc(1.4rem + 5px)'
    }
  })
};
