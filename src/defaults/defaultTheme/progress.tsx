import { Theme } from '../../models';

const createColorKind = color => ({
  extend: ({ createStyle }) => ({
    '&::-webkit-progress-value': createStyle({
      background: color
    })
  })
});

export const progress: Theme = {
  extend: ({ createStyle }) => ({
    // more about resetting progress style:
    // https://css-tricks.com/html5-progress-element/
    appearance: 'none',
    height: '4px',
    '&::-webkit-progress-bar': {
      background: 'rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }
  }),
  kinds: {
    primary: createColorKind('primary'),
    success: createColorKind('success'),
    warning: createColorKind('warning'),
    danger: createColorKind('danger')
  }
};
