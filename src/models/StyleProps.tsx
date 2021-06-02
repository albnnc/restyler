import { DirectionMap } from './DirectionMap';
import { Theme } from './Theme';

export type Align = string;
export type Background = string;
export type Color = string;
export type Direction = 'row' | 'column';
export type Elevation = string;
export type Flex = string;
export type Font = string;
export type Gap = string;
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
  border?: Border;
  color?: Color;
  direction?: Direction;
  elevation?: Elevation;
  flex?: Flex;
  font?: Font;
  gap?: Gap;
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
  'border',
  'color',
  'direction',
  'elevation',
  'flex',
  'font',
  'gap',
  'justify',
  'margin',
  'padding',
  'radius',
  'weight',
  'wrap',

  'kind',
  'theme'
];
