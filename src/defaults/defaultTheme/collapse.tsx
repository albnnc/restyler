import { Theme } from '../../models';

export const collapse: Theme = {
  style: ({ isOpen, contentHeight }) => ({
    transition: 'height 0.2s ease, opacity 0.2s linear',
    ...(isOpen
      ? {
          opacity: 1,
          height: contentHeight === undefined ? 'unset' : contentHeight + 'px'
        }
      : { opacity: 0, height: 0 })
  })
};
