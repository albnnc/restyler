import { defaultTheme, mergeThemes } from 'lib';

export const theme = mergeThemes({}, defaultTheme, {
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
