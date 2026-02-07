import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge, BadgeSize, BadgeVariant } from './Badge';

export const BADGE_VARIANTS: BadgeVariant[] = [
  'light-grey',
  'dark-grey',
  'inverse',
  'green',
  'yellow',
  'blue',
  'red',
  'purple',
  'hyphen',
];

export const BADGE_SIZES: BadgeSize[] = ['sm', 'md', 'lg'];

describe('Badge', () => {
  test('Label correctly renders with base props', () => {
    render(<Badge message="hello" />);
    const badge = screen.getByText('hello');
    expect(badge).toBeInTheDocument();
  });

  describe('Variants', () => {
    BADGE_VARIANTS.map((variant) =>
      describe(`${variant}`, () => {
        test(`it has a ${variant} class applied to it`, () => {
          render(<Badge variant={variant} message={`${variant} Badge`} />);
          const badge = screen.getByText(`${variant} Badge`);

          expect(badge.getAttribute('class')).toContain(variant);
        });
      })
    );
  });

  describe('Sizes', () => {
    BADGE_SIZES.map((size) =>
      describe(`${size}`, () => {
        test(`it has a ${size} class applied to it`, () => {
          render(<Badge size={size} message={`${size} Badge`} />);
          const badge = screen.getByText(`${size} Badge`);

          expect(badge.getAttribute('class')).toContain(`size-${size}`);
        });
      })
    );

    test('It applies responsive size classes', () => {
      render(
        <Badge
          size={{
            base: 'sm',
            tablet: 'md',
            desktop: 'lg',
            hd: 'sm',
          }}
        >
          badge
        </Badge>
      );

      const badge = screen.getByText('badge');

      expect(badge.getAttribute('class')).toContain('size-sm');
      expect(badge.getAttribute('class')).toContain('size-md-tablet');
      expect(badge.getAttribute('class')).toContain('size-lg-desktop');
      expect(badge.getAttribute('class')).toContain('size-sm-hd');
    });
  });
});
