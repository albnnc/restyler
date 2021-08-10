import { Theme } from '../../models';

export const layer: Theme = {
  kinds: {
    backdrop: {
      style: ({ isVisible }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s'
      })
    }
  }
};
