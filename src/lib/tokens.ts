import designTokens from '@hyphen/hyphen-design-tokens/build/json/variables';
import { ICON_NAMES as iconNames } from '@hyphen/hyphen-design-tokens/build/icons';

import {
  BaseColor,
  BackgroundColor,
  BorderColor,
  BorderRadiusSize,
  BorderSize,
  Breakpoint,
  BreakpointSizeWithBase,
  BoxShadowSize,
  ColorName,
  FontColor,
  FontSize,
  FontFamily,
  FontWeight,
  HeadingSize,
  HeightSize,
  IconName,
  LineHeightSize,
  SpacingSize,
  WidthSize,
  ZIndexSize,
} from '../types';

export const ICON_NAMES = iconNames as IconName[];

export const BORDER_RADIUS_OPTIONS = Object.keys(
  designTokens.size['border-radius']
) as BorderRadiusSize[];
// export const BORDER_RADIUS_VALUES = Object.values(designTokens.size['border-radius']);

export const BORDER_SIZE_OPTIONS = Object.keys(
  designTokens.size['border-width']
) as BorderSize[];
// export const BORDER_SIZE_VALUES = Object.values(designTokens.size['border-width']);

export const BREAKPOINT_OPTIONS = Object.keys(
  designTokens.size.breakpoint
) as BreakpointSizeWithBase[];
// export const BREAKPOINT_VALUES = Object.values(designTokens.size.breakpoint);

export const BREAKPOINTS = [
  ...Object.entries(designTokens.size.breakpoint),
  ['base', 0],
].map(([name, value]) => ({
  name,
  minWidth: parseInt(value as string, 10),
})) as Breakpoint[];

export const BASE_COLOR_OPTIONS = (
  Object.keys(designTokens.color.base) as ColorName[]
)
  .map((colorName) => {
    if (
      colorName === 'white' ||
      colorName === 'black' ||
      colorName === 'magenta'
    )
      return `${colorName}`;
    return Object.keys(designTokens.color.base[colorName]).map((colorGrade) =>
      colorGrade === 'base' ? colorName : `${colorName}-${colorGrade}`
    );
  })
  .flat() as BaseColor[];

export const BASE_COLOR_NAMES = Object.keys(
  designTokens.color.base
) as ColorName[];
// export const BASE_COLOR_VALUES = Object.values(designTokens.color.base);

export const FONT_COLOR_OPTIONS = Object.keys(
  designTokens.color.font
) as FontColor[];
// export const FONT_COLOR_VALUES = designTokens.color.font;

export const BACKGROUND_COLOR_OPTIONS = Object.keys(
  designTokens.color.background
) as BackgroundColor[];
// export const BACKGROUND_COLOR_VALUES = designTokens.color.background;

export const BORDER_COLOR_OPTIONS = Object.keys(
  designTokens.color.border
) as BorderColor[];
// export const BORDER_COLOR_VALUES = designTokens.color.border;

export const FONT_SIZE_OPTIONS = Object.keys(
  (designTokens.size as any)['font-size']
) as FontSize[];
// export const FONT_SIZE_VALUES = Object.values(designTokens.size['font-size']);

export const FONT_FAMILY_OPTIONS = Object.keys(
  designTokens.assets['font-family']
) as FontFamily[];
// export const FONT_FAMILY_VALUES = designTokens.assets['font-family'];

export const FONT_WEIGHT_OPTIONS = Object.keys(
  (designTokens.size as any)['font-weight']
) as FontWeight[];
// export const FONT_WEIGHT_VALUES = designTokens.size['font-weight'];

export const HEADING_SIZE_OPTIONS = Object.keys(
  designTokens.size.heading
) as HeadingSize[];

export const HEIGHT_OPTIONS = Object.keys(
  (designTokens.size as any).dimension
) as HeightSize[];
// export const HEIGHT_VALUES = designTokens.size.dimension;

export const LINE_HEIGHT_OPTIONS = Object.keys(
  designTokens.size['line-height']
) as LineHeightSize[];
// export const LINE_HEIGHT_VALUES = designTokens.size['line-height'];

export const SPACING_OPTIONS = Object.keys(
  designTokens.size.spacing
) as SpacingSize[];
// export const SPACING_VALUES = designTokens.size.spacing;

export const WIDTH_OPTIONS = Object.keys(
  (designTokens.size as any).dimension
) as WidthSize[];
// export const WIDTH_VALUES = designTokens.size.dimension;

export const Z_INDEX_OPTIONS = Object.keys(
  designTokens.size['z-index']
) as ZIndexSize[];
export const Z_INDEX_VALUES = designTokens.size['z-index'];

export const BOX_SHADOW_OPTIONS = Object.keys(
  designTokens.size['box-shadow']
) as BoxShadowSize[];
// export const BOX_SHADOW_VALUES = designTokens.size['box-shadow'];
