import { BasicTheme } from '../../models';

export const modal: BasicTheme = {
  style: ({ isVisible, isEntering }) => ({
    borderRadius: 2,
    boxShadow: 4,
    backgroundColor: 'white',
    width: '550px',
    maxWidth: 'calc(100% - 2rem)',
    transform: `translateY(${isVisible ? '0' : isEntering ? '1rem' : '-1rem'})`,
    transition: 'transform 0.2s'
  }),
  kinds: {
    small: { style: { width: '450px' } },
    large: { style: { width: '650px' } },
    question: { style: { width: '400px' } }
  },
  components: {
    header: { style: { px: 3, pt: 3, '&:last-of-type': { pb: 3 } } },
    body: { style: { px: 3, pt: 3, '&:last-of-type': { pb: 3 } } },
    footer: {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        px: 3,
        pt: 3,
        '&:last-of-type': { pb: 3 }
      }
    }
  }
};
