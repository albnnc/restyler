import { Theme } from '../../models';

const createTitleStyle = ({ createStyle }) => ({
  userSelect: 'none',
  cursor: 'pointer',
  '&:hover': createStyle({ color: 'primary' })
});

export const menu: Theme = {
  background: 'lighterGrey',
  font: 'medium',
  padding: 'medium',
  color: 'rgba(0, 0, 0, 0.5)',

  extend: {
    textTransform: 'uppercase',
    letterSpacing: '0.04rem'
  },

  group: {
    items: { padding: { top: 'smaller', left: 'large' } },
    extend: ({ createStyle }) => ({
      '&:not(:first-of-type)': createStyle({ margin: { top: 'smaller' } })
    }),
    title: { extend: createTitleStyle }
  },

  item: {
    extend: ({ createStyle }) => ({
      '&:not(:first-of-type)': createStyle({ margin: { top: 'smaller' } })
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
            right: props.isActive ? '0.5em' : 0,
            transform: 'translateY(-50%)',
            transition: 'all 0.15s',
            background: props.isActive ? 'currentColor' : 'transparent'
          }
        };
      }
    }
  }
};
