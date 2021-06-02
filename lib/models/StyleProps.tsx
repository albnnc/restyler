import { DirectionMap } from './DirectionMap';
import { Style } from './Style';
import { Theme } from './Theme';

export type Align = string;
export type Background = string;
export type Basis = string;
export type Color = string;
export type Direction = 'row' | 'column';
export type Elevation = string;
export type Extend = Function | Style | (Function | Style)[];
export type Font = string;
export type Justify = string;
export type Radius = string;
export type Weight = string;
export type Wrap = string | boolean;

export type BasicMargin = string;
export type Margin = BasicMargin | DirectionMap<BasicMargin>;

export type BasicPadding = string;
export type Padding = BasicPadding | DirectionMap<BasicPadding>;

export type BasicBorder =
  | string
  | {
      color?: string;
      style?: string;
      width?: string;
    };
export type Border = BasicBorder | DirectionMap<BasicBorder>;

export interface BasicStyleProps {
  align?: Align;
  background?: Background;
  basis?: Basis;
  border?: Border;
  color?: Color;
  direction?: Direction;
  elevation?: Elevation;
  extend?: Extend;
  font?: Font;
  justify?: Font;
  margin?: Margin;
  padding?: Padding;
  radius?: Radius;
  weight?: Weight;
  wrap?: Wrap;
}

export interface StyleProps extends BasicStyleProps {
  kind?: string;
  theme?: Theme;
}

export const knownStyleProps = [
  'align',
  'background',
  'basis',
  'border',
  'color',
  'direction',
  'elevation',
  'extend',
  'font',
  'justify',
  'margin',
  'padding',
  'radius',
  'weight',
  'wrap',

  'kind',
  'theme'
];
