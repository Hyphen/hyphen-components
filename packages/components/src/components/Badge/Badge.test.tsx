import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Badge,
  BadgeHue,
  BadgeRadius,
  BadgeSemanticColor,
  BadgeSize,
  BadgeVariant,
} from './Badge';

export const BADGE_VARIANTS: BadgeVariant[] = [
  'solid',
  'soft',
  'surface',
  'outline',
];

export const BADGE_HUES: BadgeHue[] = [
  'grey',
  'blue',
  'green',
  'yellow',
  'red',
  'purple',
  'orange',
  'brand',
];

export const BADGE_SEMANTIC_COLORS: Record<BadgeSemanticColor, BadgeHue> = {
  danger: 'red',
  success: 'green',
  warning: 'yellow',
  info: 'blue',
};

export const BADGE_RADII: BadgeRadius[] = ['none', 'sm', 'md', 'lg', 'full'];

export const BADGE_SIZES: BadgeSize[] = ['sm', 'md', 'lg'];

describe('Badge', () => {
  test('Badge correctly renders with base props', () => {
    render(<Badge message="hello" />);
    const badge = screen.getByText('hello');
    expect(badge).toBeInTheDocument();
    expect(badge.getAttribute('class')).toContain('soft');
  });

  test('it applies the default variant, color and radius when none are provided', () => {
    render(<Badge>Badge</Badge>);
    const badge = screen.getByText('Badge');

    expect(badge.getAttribute('class')).toContain('soft');
    expect(badge.getAttribute('class')).toContain('color-grey');
    expect(badge.getAttribute('class')).toContain('radius-full');
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

  describe('Colors', () => {
    BADGE_HUES.map((color) =>
      describe(`${color}`, () => {
        test(`it has a color-${color} class applied to it`, () => {
          render(<Badge color={color} message={`${color} Badge`} />);
          const badge = screen.getByText(`${color} Badge`);

          expect(badge.getAttribute('class')).toContain(`color-${color}`);
        });
      })
    );

    describe('semantic aliases', () => {
      (
        Object.entries(BADGE_SEMANTIC_COLORS) as [BadgeSemanticColor, BadgeHue][]
      ).map(([semanticColor, hue]) =>
        test(`${semanticColor} resolves to the ${hue} hue`, () => {
          render(<Badge color={semanticColor} message={`${semanticColor} Badge`} />);
          const badge = screen.getByText(`${semanticColor} Badge`);

          expect(badge.getAttribute('class')).toContain(`color-${hue}`);
          expect(badge.getAttribute('class')).not.toContain(
            `color-${semanticColor}`
          );
        })
      );
    });

    test('it does not forward color to Box as a font color utility class', () => {
      render(<Badge color="danger">badge</Badge>);
      const badge = screen.getByText('badge');

      expect(badge.getAttribute('class')).not.toContain('font-color');
    });
  });

  describe('Radius', () => {
    BADGE_RADII.map((radius) =>
      describe(`${radius}`, () => {
        test(`it has a radius-${radius} class applied to it`, () => {
          render(<Badge radius={radius} message={`${radius} Badge`} />);
          const badge = screen.getByText(`${radius} Badge`);

          expect(badge.getAttribute('class')).toContain(`radius-${radius}`);
        });
      })
    );

    test('it does not forward radius to Box as a border radius utility class', () => {
      render(<Badge radius="sm">badge</Badge>);
      const badge = screen.getByText('badge');

      expect(badge.getAttribute('class')).not.toContain('br-sm');
    });
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
