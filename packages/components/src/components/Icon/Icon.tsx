import { FontColor, FontSize, IconName, ResponsiveProp } from '../../types';
import React, { ComponentPropsWithoutRef, forwardRef } from 'react';

import { Box } from '../Box/Box';
import classNames from 'classnames';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import icons from '@hyphen/hyphen-design-tokens/build/assets/icons/react';

interface IconOwnProps {
  className?: string;
  /**
   * A color token identifier to use for the text color.
   */
  color?: FontColor | ResponsiveProp<FontColor>;
  /**
   * A [font size token](/?path=/docs/design-tokens-design-tokens--page#font-size) identifier
   */
  size?: FontSize | ResponsiveProp<FontSize>;
  /**
   * Name of the icon
   */
  name: IconName;
}

export type IconProps = IconOwnProps &
  Omit<ComponentPropsWithoutRef<'svg'>, keyof IconOwnProps>;

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ className = undefined, name, color, size, ...restProps }, ref) => {
    const IconComponent = icons[name];

    if (!IconComponent) console.error(`Icon '${name}' not found`); // eslint-disable-line no-console

    const iconClasses = classNames(
      className,
      generateResponsiveClasses('font-color', color),
      generateResponsiveClasses('font-size', size)
    );

    return IconComponent ? (
      <IconComponent
        className={iconClasses || null}
        ref={ref}
        data-testid={`icon-testid--${name}`}
        {...restProps}
      />
    ) : (
      <Box
        fontWeight="bold"
        background="error"
        color="white"
        padding="2xs"
        fontSize="sm"
        display="inline"
      >
        ???
      </Box>
    );
  }
);

Icon.displayName = 'Icon';
