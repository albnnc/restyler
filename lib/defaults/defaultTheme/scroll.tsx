import { ComponentTheme } from '../../models';

const createPseudoStyle = (opacity, isLeft) => ({
  content: '""',
  display: 'block',
  position: 'absolute',
  pointerEvents: 'none',
  filter: 'blur(5px)',
  top: '0.5rem',
  width: '1.15rem',
  height: 'calc(100% - 1rem)',
  transition: 'opacity 0.2s',

  opacity,
  ...(isLeft
    ? {
        left: '-0.6rem',
        background:
          'linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 100%)'
      }
    : {
        right: '-0.6rem',
        background:
          'linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%)'
      })
});

export const scroll: ComponentTheme = {
  extend: ({ props }) => ({
    cursor: 'grab',
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none',
    '&::before': createPseudoStyle(0, true),
    '&::after': createPseudoStyle(0, false),
    ...(props.hasLeftOffset ? { '&::before': createPseudoStyle(1, true) } : {}),
    ...(props.hasRightOffset ? { '&::after': createPseudoStyle(1, false) } : {})
  })
};
