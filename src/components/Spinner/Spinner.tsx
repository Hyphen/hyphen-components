import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './Spinner.module.scss';

export interface SpinnerProps {
  /**
   * Custom className to be applied to spinner container div element.
   */
  className?: string;
  /**
   * Size of the spinner.
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Spinner: FC<SpinnerProps> = ({ className, size = 'md' }) => {
  const classes = classNames(className, styles.spinner);

  const sizeInPixels = () => {
    let pixels;
    if (size === 'sm') pixels = '12';
    if (size === 'md') pixels = '16';
    if (size === 'lg') pixels = '24';
    if (size === 'xl') pixels = '30';

    return pixels;
  };

  return (
    <span className={classes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={sizeInPixels()}
        height={sizeInPixels()}
        viewBox="0 0 16 16"
        data-testid="spinner-testid"
      >
        <g fill="currentColor">
          <rect
            fill="currentColor"
            height="2"
            rx=".5"
            width="4"
            x="12"
            y="7"
          ></rect>
          <rect
            fill="currentColor"
            height="4.001"
            rx=".5"
            width="1.999"
            opacity=".4"
            x="11.243"
            y="10.242"
            transform="rotate(-44.975 12.243 12.243)"
          ></rect>
          <rect
            fill="currentColor"
            height="4"
            rx=".5"
            width="2"
            opacity=".4"
            x="7"
            y="12"
          ></rect>
          <rect
            fill="currentColor"
            height="1.999"
            rx=".5"
            width="4.001"
            opacity=".4"
            x="1.757"
            y="11.243"
            transform="rotate(-45.03 3.757 12.242)"
          ></rect>
          <rect
            fill="currentColor"
            height="2"
            rx=".5"
            width="4"
            opacity=".4"
            y="7"
          ></rect>
          <rect
            fill="currentColor"
            height="4.001"
            rx=".5"
            width="1.999"
            opacity=".4"
            x="2.758"
            y="1.757"
            transform="rotate(-44.975 3.757 3.757)"
          ></rect>
          <rect
            fill="currentColor"
            height="4"
            rx=".5"
            width="2"
            opacity=".6"
            x="7"
          ></rect>
          <rect
            fill="currentColor"
            height="1.999"
            rx=".5"
            width="4.001"
            opacity=".8"
            x="10.242"
            y="2.758"
            transform="rotate(-45.03 12.242 3.757)"
          ></rect>
        </g>
      </svg>
    </span>
  );
};
