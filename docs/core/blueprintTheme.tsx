import { defaultTheme, filterStyleProps, ComponentTheme } from 'lib';

const blueprintColor = '#17a1f7';

const createBlueprintComponentTheme = (path: string, theme: ComponentTheme) => {
  const { styleProps, ...rest } = filterStyleProps(theme);
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
      (blueprint[v] = createBlueprintComponentTheme(`${path}.${v}`, rest[v]))
  );
  return blueprint;
};

const { variables, ...components } = defaultTheme;
export const blueprintTheme = { variables };
Reflect.ownKeys(components).forEach(
  (v: string) =>
    (blueprintTheme[v] = createBlueprintComponentTheme(v, components[v] ?? {}))
);
