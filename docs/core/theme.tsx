import { defaultTheme, mergeThemes } from 'lib';

export const theme = mergeThemes({}, defaultTheme, {
  menu: {
    extend: {
      position: 'sticky',
      top: '2rem'
    },
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
