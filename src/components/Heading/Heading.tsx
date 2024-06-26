import { FC, ReactNode, createElement } from 'react';
import { FontColor, HeadingSize, ResponsiveProp } from '../../types';
import {
  HEADING_DEFAULT_SIZE_MAP,
  HEADING_LEVELS_TYPE,
} from './Heading.constants';

import classNames from 'classnames';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import { getElementType } from '../../lib/getElementType';
import styles from './Heading.module.scss';

export interface HeadingProps {
  /**
   * The DOM tag or react component to use for the element.
   * Select the appropriate semantic element (h1-h6).
   */
  as?: HEADING_LEVELS_TYPE;
  /**
   * Content of the heading. Can be a string or any valid DOM node.
   */
  children?: ReactNode;
  /**
   * Additional class names to add.
   */
  className?: string;
  /**
   * A variant token identifier to use for the text variant. Available variants found:
   * [here](https://github.com/hyphen/hyphen-design-tokens/blob/main/properties/color/font.json).
   */
  color?: FontColor;
  /**
   * By default, size is determined by the chosen tag (e.g. h1 is bigger than h2).
   * However, size can be set independently so that its size is appropriate for the surrounding content.
   * Available sizes found:
   * [here](https://github.com/hyphen/hyphen-design-tokens/blob/main/properties/size/font.json).
   */
  size?: HeadingSize | ResponsiveProp<HeadingSize>;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const Heading: FC<HeadingProps> = ({
  as = 'h4',
  children,
  className,
  color,
  size,
  ...restProps
}) => {
  const element = getElementType(Heading, { as });

  const headingSize = size || HEADING_DEFAULT_SIZE_MAP[as];

  const classes = classNames(
    styles.heading,
    className,
    generateResponsiveClasses('heading', headingSize),
    {
      [`font-color-${color}`]: color,
    }
  );

  return createElement(element, { className: classes, ...restProps }, children);
};
