import { BasicTheme, ThemeProps } from '../models';
import { get } from './get';
import { merge } from './merge';

export const getBasicStyle = <Props extends ThemeProps<BasicTheme>>(
  props: Props,
  key: string
) => {
  const { theme = {}, kind = '' } = props;
  const themePath = 'components.' + key.split('.').join('.components.');
  const maybeCall = (v: object | Function) =>
    typeof v === 'object' ? v : v(props);
  const { style = {}, kinds = {} } = get(theme, themePath) ?? {};
  const defaultStyle = maybeCall(theme.components?.defaults?.style ?? {});
  const basicStyle = maybeCall(style);
  const kindStyle = maybeCall(kinds[kind]?.style ?? {});
  return merge({}, defaultStyle, basicStyle, kindStyle);
};
