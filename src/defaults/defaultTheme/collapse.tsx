import { Theme } from '../../models';

export const collapse: Theme = {
  extend: ({ props }) => ({
    transition: 'height 0.2s ease, opacity 0.2s',
    ...(props.isOpen && !props['data-transition']
      ? { opacity: 1, height: props.contentHeight }
      : { opacity: 0, height: 0 })
  })
};