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
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';

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

/**
 * Badge wraps bare text in a label span, so the element rendering the text is not the
 * badge root. Climb to the root the same way Button's tests do.
 */
const getBadge = (text: string): HTMLElement =>
  screen.getByText(text).closest('.badge') as HTMLElement;

describe('Badge', () => {
  test('Badge correctly renders with base props', () => {
    render(<Badge message="hello" />);
    const badge = getBadge('hello');
    expect(badge).toBeInTheDocument();
    expect(badge.getAttribute('class')).toContain('soft');
  });

  test('it applies the default variant, color and radius when none are provided', () => {
    render(<Badge>Badge</Badge>);
    const badge = getBadge('Badge');

    expect(badge.getAttribute('class')).toContain('soft');
    expect(badge.getAttribute('class')).toContain('color-grey');
    expect(badge.getAttribute('class')).toContain('radius-full');
  });

  describe('Variants', () => {
    BADGE_VARIANTS.map((variant) =>
      describe(`${variant}`, () => {
        test(`it has a ${variant} class applied to it`, () => {
          render(<Badge variant={variant} message={`${variant} Badge`} />);
          const badge = getBadge(`${variant} Badge`);

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
          const badge = getBadge(`${color} Badge`);

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
          const badge = getBadge(`${semanticColor} Badge`);

          expect(badge.getAttribute('class')).toContain(`color-${hue}`);
          expect(badge.getAttribute('class')).not.toContain(
            `color-${semanticColor}`
          );
        })
      );
    });

    test('it does not forward color to Box as a font color utility class', () => {
      render(<Badge color="danger">badge</Badge>);
      const badge = getBadge('badge');

      expect(badge.getAttribute('class')).not.toContain('font-color');
    });
  });

  describe('Radius', () => {
    BADGE_RADII.map((radius) =>
      describe(`${radius}`, () => {
        test(`it has a radius-${radius} class applied to it`, () => {
          render(<Badge radius={radius} message={`${radius} Badge`} />);
          const badge = getBadge(`${radius} Badge`);

          expect(badge.getAttribute('class')).toContain(`radius-${radius}`);
        });
      })
    );

    test('it does not forward radius to Box as a border radius utility class', () => {
      render(<Badge radius="sm">badge</Badge>);
      const badge = getBadge('badge');

      expect(badge.getAttribute('class')).not.toContain('br-sm');
    });
  });

  describe('Nested graphics', () => {
    test('it wraps bare text in a label element', () => {
      render(<Badge>Verified</Badge>);
      const label = screen.getByText('Verified');

      expect(label.tagName).toBe('SPAN');
      expect(label.getAttribute('class')).toContain('label');
      expect(label.closest('.badge')).toBeInTheDocument();
    });

    test('it does not wrap element children', () => {
      render(
        <Badge>
          <Icon name="star" />
        </Badge>
      );
      const icon = screen.getByTestId('icon-testid--star');

      expect(icon.closest('.badge')).toBeInTheDocument();
      expect(icon.parentElement?.getAttribute('class')).not.toContain('label');
    });

    test('it renders a leading icon before the label', () => {
      render(
        <Badge>
          <Icon name="c-check" />
          Verified
        </Badge>
      );
      const badge = getBadge('Verified');

      expect(screen.getByTestId('icon-testid--c-check')).toBeInTheDocument();
      expect(badge.firstElementChild).toBe(
        screen.getByTestId('icon-testid--c-check')
      );
      expect(badge.lastElementChild).toBe(screen.getByText('Verified'));
    });

    test('it renders a trailing icon after the label', () => {
      render(
        <Badge>
          Favorite
          <Icon name="star" />
        </Badge>
      );
      const badge = getBadge('Favorite');

      expect(badge.firstElementChild).toBe(screen.getByText('Favorite'));
      expect(badge.lastElementChild).toBe(
        screen.getByTestId('icon-testid--star')
      );
    });

    test('it renders a nested Spinner', () => {
      render(
        <Badge color="danger">
          <Spinner />
          Delete
        </Badge>
      );
      const badge = getBadge('Delete');

      expect(screen.getByTestId('spinner-testid')).toBeInTheDocument();
      expect(badge.firstElementChild).toContainElement(
        screen.getByTestId('spinner-testid')
      );
    });
  });

  describe('Sizes', () => {
    BADGE_SIZES.map((size) =>
      describe(`${size}`, () => {
        test(`it has a ${size} class applied to it`, () => {
          render(<Badge size={size} message={`${size} Badge`} />);
          const badge = getBadge(`${size} Badge`);

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

      const badge = getBadge('badge');

      expect(badge.getAttribute('class')).toContain('size-sm');
      expect(badge.getAttribute('class')).toContain('size-md-tablet');
      expect(badge.getAttribute('class')).toContain('size-lg-desktop');
      expect(badge.getAttribute('class')).toContain('size-sm-hd');
    });
  });
});
