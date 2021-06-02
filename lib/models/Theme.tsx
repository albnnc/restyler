import { BasicStyleProps } from './StyleProps';
import { Variables } from './Variables';

export interface ComponentTheme extends BasicStyleProps {
  kinds?: { [kind: string]: ComponentTheme };
  [other: string]: any;
}

export interface Theme {
  defaults?: ComponentTheme;
  variables?: Variables;

  [componentName: string]: ComponentTheme | undefined;
}
