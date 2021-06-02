import { ComponentTheme } from '../../models';

const createBasicKind = color => ({
  padding: { vertical: 'x-small', horizontal: 'medium' },
  radius: 'small',
  background: 'transparent',
  color: 'text-strong',
  border: { width: '1px', color: 'border' },
  extend: ({ createStyle }) => ({
    transition: 'all 0.1s',
    '&:hover': createStyle({ color, border: color })
  })
});

const createContainedKind = color => ({
  padding: { vertical: 'x-small', horizontal: 'medium' },
  radius: 'small',
  background: color,
  color: 'white',
  border: { width: '1px', color: 'transparent' },
  extend: {
    transition: 'all 0.1s',
    '&:hover': { opacity: 0.85 }
  }
});

const createArrowKind = direction => ({
  extend: {
    background: 'transparent',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    font: 'inherit',
    outline: 'none',
    padding: 0,
    display: 'inline-block',
    verticalAlign: 'middle',
    '&::after': {
      display: 'block',
      content: '""',
      width: 0,
      height: 0,
      ...{
        up: {
          borderBottom: '5px solid currentColor',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent'
        },
        down: {
          borderTop: '5px solid currentColor',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent'
        },
        left: {
          borderRight: '5px solid currentColor',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent'
        },
        right: {
          borderLeft: '5px solid currentColor',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent'
        }
      }[direction]
    }
  }
});

export const button: ComponentTheme = {
  kinds: {
    primary: createBasicKind('primary'),
    success: createBasicKind('success'),
    warning: createBasicKind('warning'),
    danger: createBasicKind('danger'),
    'contained-primary': createContainedKind('primary'),
    'contained-success': createContainedKind('success'),
    'contained-warning': createContainedKind('warning'),
    'contained-danger': createContainedKind('danger'),
    'arrow-up': createArrowKind('up'),
    'arrow-down': createArrowKind('down'),
    'arrow-left': createArrowKind('left'),
    'arrow-right': createArrowKind('right'),
    close: {
      extend: {
        width: '1.1em',
        height: '1.1em',
        position: 'relative',
        verticalAlign: 'middle',
        '&::before, &::after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '2px',
          height: '1em',
          transition: 'all 0.2s ease',
          background: 'currentColor'
        },
        '&::before': { transform: 'translate(-50%, -50%) rotate(45deg)' },
        '&::after': { transform: 'translate(-50%, -50%) rotate(-45deg)' },
        '&:hover': {
          '&::before': { transform: 'translate(-50%, -50%) rotate(225deg)' },
          '&::after': { transform: 'translate(-50%, -50%) rotate(135deg)' }
        }
      }
    }
  }
};
