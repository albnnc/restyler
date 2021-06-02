import { BasicStyleProps, Style, StyleFactoryOptions } from '../../models';
import { merge } from '../merge';
import { createAlignStyle } from './createAlignStyle';
import { createBackgroundStyle } from './createBackgroundStyle';
import { createBorderStyle } from './createBorderStyle';
import { createColorStyle } from './createColorStyle';
import { createDirectionStyle } from './createDirectionStyle';
import { createElevationStyle } from './createElevationStyle';
import { createExtendStyle } from './createExtendStyle';
import { createFlexStyle } from './createFlexStyle';
import { createFontStyle } from './createFontStyle';
import { createGapStyle } from './createGapStyle';
import { createJustifyStyle } from './createJustifyStyle';
import { createMarginStyle } from './createMarginStyle';
import { createPaddingStyle } from './createPaddingStyle';
import { createRadiusStyle } from './createRadiusStyle';
import { createWeightStyle } from './createWeightStyle';
import { createWrapStyle } from './createWrapStyle';

export const createStyle = <T extends BasicStyleProps>(
  options: StyleFactoryOptions<T>
): Style => {
  return merge(
    {},

    createDirectionStyle(options),
    createJustifyStyle(options),
    createAlignStyle(options),
    createWrapStyle(options),
    createFlexStyle(options),
    createGapStyle(options),

    createMarginStyle(options),
    createPaddingStyle(options),

    createFontStyle(options),
    createWeightStyle(options),

    createColorStyle(options),
    createBackgroundStyle(options),

    createBorderStyle(options),
    createElevationStyle(options),
    createRadiusStyle(options),

    createExtendStyle(options)
  );
};
