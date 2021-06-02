import { ComponentTheme } from '~lib/models';

export const container: ComponentTheme = {
  margin: { horizontal: 'auto' },
  padding: { horizontal: 'large' },
  direction: 'row',
  justify: 'center',
  content: {
    extend: {
      width: '80%',
      maxWidth: '1024px'
    }
  }
};
