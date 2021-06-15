import { Theme } from '../../models';

export const layer: Theme = {
  kinds: {
    backdrop: {
      direction: 'row',
      justify: 'center',
      align: 'center',
      background: 'rgba(0, 0, 0, 0.7)',
      extend: ({ props: { isVisible } }) => ({
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s'
      })
    }
  }
};
