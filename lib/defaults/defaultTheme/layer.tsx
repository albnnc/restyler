import { ComponentTheme } from '~lib/models';

export const layer: ComponentTheme = {
  kinds: {
    backdrop: {
      direction: 'row',
      justify: 'center',
      align: 'center',
      background: 'rgba(0, 0, 0, 0.7)',
      extend: {
        opacity: 1,
        transition: 'all 0.2s',
        '&[data-transition="enter"]': { opacity: 0 },
        '&[data-transition="leave"]': { opacity: 0 }
      }
    }
  }
};
