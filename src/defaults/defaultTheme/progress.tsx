import { Theme } from '../../models';

const createColorKind = color => ({
  style: { '&::-webkit-progress-value': { backgroundColor: color } }
});

export const progress: Theme = {
  style: {
    // More about resetting progress style:
    // https://css-tricks.com/html5p-rogress-element/
    appearance: 'none',
    height: '4px',
    '&::-webkit-progress-bar': {
      background: 'rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }
  },
  kinds: {
    primary: createColorKind('primary'),
    success: createColorKind('success'),
    warning: createColorKind('warning'),
    danger: createColorKind('danger')
  }
};
