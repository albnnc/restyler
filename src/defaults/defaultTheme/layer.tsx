import { BasicTheme } from '../../models';

export const layer: BasicTheme = {
  kinds: {
    backdrop: {
      style: ({ isVisible }) => ({
        position: 'fixed',
        zIndex: '1000',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
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
