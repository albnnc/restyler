import { defaultTheme, filterStyleProps, Theme } from 'lib';

const blueprintColor = '#17a1f7';

const createBlueprintTheme = (path: string, theme: Theme) => {
  if (typeof theme !== 'object') {
    return undefined;
  }
  const { styleProps, ...rest } = filterStyleProps(theme);
  if (Reflect.ownKeys(rest).length === Reflect.ownKeys(theme).length) {
    return undefined;
  }
  const blueprint = {
    border: blueprintColor,
    color: blueprintColor,
    padding: {
      top: '35px',
      bottom: '10px',
      horizontal: '10px'
    },
    margin: path.includes('.') ? '5px' : 'none',
    background: 'white',
    extend: {
      display: 'block',
      position: 'relative',
      minWidth: '200px',
      minHeight: '50px',
      '&::after': {
        content: `"${path}"`,
        position: 'absolute',
        top: '10px',
        left: '10px',
        font: '14px "Roboto Mono", monospace'
      }
    }
  };
  Reflect.ownKeys(rest).forEach(
    (v: string) =>
      (blueprint[v] = createBlueprintTheme(`${path}.${v}`, rest[v]))
  );
  return blueprint;
};

const { variables, ...components } = defaultTheme;
export const blueprintTheme = { variables };
Reflect.ownKeys(components).forEach(
  (v: string) =>
    (blueprintTheme[v] = createBlueprintTheme(v, components[v] ?? {}))
);
