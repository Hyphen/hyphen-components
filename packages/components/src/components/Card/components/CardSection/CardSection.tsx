import { Box, BoxProps } from '../../../Box/Box';
import React, { FC, ReactNode } from 'react';

import classNames from 'classnames';
import styles from '../../Card.module.scss';

export interface CardSectionProps extends BoxProps {
  /**
   * Any valid background color token, or a `url()` for an image
   */
  background?: BoxProps['background'];
  /**
   * If defined as a prop, this value will take higher precedence than the corresponding component design token value
   * Any valid border color token
   * Or a responsive prop with borderColor for each breakpoint.
   */
  borderColor?: BoxProps['borderColor'];
  /**
   * If defined as a prop, this value will take higher precedence than the corresponding component design token value
   * Width of the section's border
   * Can be a single [border width token](/?path=/docs/foundation-design-tokens--docs#border-width).
   * Can also be a string of [border width tokens](/?path=/docs/foundation-design-tokens--docs#border-width)
   * that models itself after the css shorthand property,
   * where you can set the border width on all four sides of an element.
   * e.g: "0 sm xs 0" --> top: 0, right: sm, bottom: xs, left: 0;
   */
  borderWidth?: BoxProps['borderWidth'];
  /**
   * Contents of the Section.
   */
  children?: ReactNode;
  /**
   * Custom class to be applied to section container.
   */
  className?: string;
  /**
   * Visually subdued the appearance of the section.
   */
  subdued?: boolean;
  /**
   * Title for the section.
   */
  title?: ReactNode;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const CardSection: FC<CardSectionProps> = ({
  background = undefined,
  borderColor = undefined,
  borderWidth = undefined,
  children = null,
  childGap = undefined,
  gap = undefined,
  className = undefined,
  display = 'block',
  padding = '2xl',
  subdued = undefined,
  title = undefined,
  ...restProps
}) => {
  const renderTitle =
    typeof title === 'string' ? (
      <Box className="m-bottom-md">
        <Box as="h4" fontWeight="semibold" fontSize="sm" color="base">
          {title}
        </Box>
      </Box>
    ) : (
      title
    );

  const sectionClasses = classNames(
    {
      [styles['card-section-border']]:
        borderColor === undefined && borderWidth === undefined,
      [styles['card-subdued']]: subdued,
    },
    className
  );

  return (
    <Box
      background={background}
      borderColor={borderColor}
      borderWidth={borderWidth}
      className={sectionClasses}
      display={display}
      padding={padding}
      {...restProps}
    >
      {renderTitle}
      <Box gap={gap} childGap={childGap}>
        {children}
      </Box>
    </Box>
  );
};

export default CardSection;
