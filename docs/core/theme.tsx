import { defaultTheme, mergeTheme } from 'lib';

export const theme = mergeTheme({}, defaultTheme, {
  menu: {
    group: {
      title: {
        extend: {
          '& svg': {
            verticalAlign: 'middle',
            marginBottom: '3px'
          }
        }
      }
    }
  }
});
