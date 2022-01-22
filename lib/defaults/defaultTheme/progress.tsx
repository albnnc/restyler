import { BasicTheme } from '../../models';

const createKind = backgroundColor => ({
  style: { '&::-webkit-progress-value': { backgroundColor } }
});

export const progress: BasicTheme = {
  style: {
    // More about resetting progress style:
    // https://css-tricks.com/html5p-rogress-element/
    appearance: 'none',
    height: '4px',
    '&::-webkit-progress-bar': {
      background: 'border',
      overflow: 'hidden'
    }
  },
  kinds: {
    primary: createKind('primary'),
    success: createKind('success'),
    warning: createKind('warning'),
    danger: createKind('danger')
  }
};
