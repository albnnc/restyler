import { ComponentTheme } from '../../models';

const createTitleStyle = ({ createStyle }) => ({
  userSelect: 'none',
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: '0.04rem',
  '&:hover': createStyle({ color: 'primary' })
});

export const menu: ComponentTheme = {
  background: 'lightGrey',
  font: 'medium',
  padding: 'medium',
  color: 'rgba(0, 0, 0, 0.5)',

  extend: {
    position: 'sticky',
    top: '2rem'
  },

  group: {
    items: { padding: { top: 'smaller', left: 'large' } },
    extend: ({ createStyle }) => ({
      '&:not(:first-child)': createStyle({ margin: { top: 'smaller' } })
    }),
    title: { extend: createTitleStyle }
  },

  item: {
    extend: ({ createStyle }) => ({
      '&:not(:first-child)': createStyle({ margin: { top: 'smaller' } })
    }),
    title: {
      extend: ({ createStyle, props }) => {
        return {
          ...createTitleStyle({ createStyle }),
          position: 'relative',

          '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '0.3em',
            height: '0.3em',
            borderRadius: '100vw',
            top: '50%',
            right: props.isActive ? '1em' : '0.2rem',
            transform: 'translateY(-50%)',
            transition: 'all 0.15s',
            background: props.isActive ? 'currentColor' : 'transparent'
          }
        };
      }
    }
  }
};
