import { BasicStyleProps, Style, StyleFactoryOptions } from '~lib/models';
import { merge } from '~lib/utils';
import { createAlignStyle } from './createAlignStyle';
import { createBackgroundStyle } from './createBackgroundStyle';
import { createBasisStyle } from './createBasisStyle';
import { createBorderStyle } from './createBorderStyle';
import { createColorStyle } from './createColorStyle';
import { createDirectionStyle } from './createDirectionStyle';
import { createElevationStyle } from './createElevationStyle';
import { createExtendStyle } from './createExtendStyle';
import { createFontStyle } from './createFontStyle';
import { createJustifyStyle } from './createJustifyStyle';
import { createMarginStyle } from './createMarginStyle';
import { createPaddingStyle } from './createPaddingStyle';
import { createRadiusStyle } from './createRadiusStyle';
import { createWeightStyle } from './createWeightStyle';

export const createStyle = <T extends BasicStyleProps>(
  options: StyleFactoryOptions<T>
): Style => {
  return merge(
    {},

    createDirectionStyle(options),
    createJustifyStyle(options),
    createAlignStyle(options),
    createBasisStyle(options),

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
