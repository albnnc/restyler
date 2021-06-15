import { ExtendOptions, Theme } from '../../models';

export const collapse: Theme = {
  extend: ({ props: { isOpen, contentHeight } }: ExtendOptions) => {
    return {
      transition: 'height 0.2s ease, opacity 0.2s',
      ...(isOpen
        ? { opacity: 1, height: contentHeight + 'px' }
        : { opacity: 0, height: 0 })
    };
  }
};

// export const collapse: Theme = {
//   extend: ({ props: { isOpen, contentHeight } }: ExtendOptions) => ({
//     transition: 'height 0.2s ease, opacity 0.2s',
//     ...(isOpen
//       ? { opacity: 1, height: contentHeight + 'px' }
//       : { opacity: 0, height: 0 })
//   })
// };
