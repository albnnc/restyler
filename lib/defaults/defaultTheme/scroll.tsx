import { ComponentTheme } from '../../models';

const createPseudoStyle = (opacity, isLeft) => ({
  content: '""',
  display: 'block',
  position: 'absolute',
  pointerEvents: 'none',
  top: 0,
  width: '10px',
  height: '100%',
  zIndex: 1,
  transition: 'opacity 0.2s',

  opacity,
  ...(isLeft
    ? {
        left: 0,
        background:
          'linear-gradient(90deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0) 100%)'
      }
    : {
        right: 0,
        background:
          'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.12) 100%)'
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
