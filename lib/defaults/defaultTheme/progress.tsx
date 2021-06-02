import { ComponentTheme } from '../../models';

const createColorKind = color => ({
  extend: ({ createStyle }) => ({
    '&::-webkit-progress-value': createStyle({
      background: color
    })
  })
});

export const progress: ComponentTheme = {
  extend: ({ createStyle }) => ({
    // read more about progress reset style: https://css-tricks.com/html5-progress-element/
    appearance: 'none',
    minWidth: '200px',
    '&::-webkit-progress-bar': {
      ...createStyle({
        radius: 'small',
        background: 'rgba(0, 0, 0, 0.1)'
      }),
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
