import { ComponentTheme } from '../../models';

const createModalStyle = ({ width }) => ({
  width,
  maxWidth: 'calc(100% - 2rem)',
  transform: 'translateY(0)',
  transition: 'all 0.2s',

  '&[data-transition="enter"]': {
    transform: 'translateY(1rem)'
  },

  '&[data-transition="leave"]': {
    transform: 'translateY(-1rem)'
  }
});

export const modal: ComponentTheme = {
  radius: 'small',
  elevation: 'xx-large',
  background: 'white',
  padding: 'medium',
  extend: createModalStyle({ width: '550px' }),
  kinds: {
    small: { extend: createModalStyle({ width: '450px' }) },
    large: { extend: createModalStyle({ width: '650px' }) },
    question: { extend: createModalStyle({ width: '400px' }) }
  }
};
