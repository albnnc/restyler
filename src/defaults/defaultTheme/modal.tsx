import { ExtendOptions, Theme } from '../../models';

const createModalStyle =
  ({ width }) =>
  ({ props: { isVisible, isEntering } }: ExtendOptions) => ({
    width,
    maxWidth: 'calc(100% - 2rem)',
    transform: `translateY(${isVisible ? '0' : isEntering ? '1rem' : '-1rem'})`,
    transition: 'transform 0.2s'
  });

export const modal: Theme = {
  radius: 'small',
  elevation: 'largest',
  background: 'white',
  padding: 'medium',
  extend: createModalStyle({ width: '550px' }),
  kinds: {
    small: { extend: createModalStyle({ width: '450px' }) },
    large: { extend: createModalStyle({ width: '650px' }) },
    question: { extend: createModalStyle({ width: '400px' }) }
  }
};
