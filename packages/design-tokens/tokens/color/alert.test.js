const backgroundTokens = require('./background.json');
const borderTokens = require('./border.json');
const fontTokens = require('./font.json');

/*
 * Alert variants are the semantic naming of a subset of the badge colors, and are meant to
 * render as the same tint as a `surface` badge of the matching color. These assertions keep
 * the two in step: recoloring a badge surface without recoloring its alert counterpart fails
 * here rather than showing up as a mismatched pair in the UI.
 */
const VARIANT_TO_BADGE_COLOR = {
  default: 'grey',
  info: 'blue',
  success: 'green',
  warning: 'yellow',
  danger: 'red',
};

describe('alert color tokens', () => {
  const background = backgroundTokens.color.background;
  const border = borderTokens.color.border;
  const font = fontTokens.color.font;

  Object.entries(VARIANT_TO_BADGE_COLOR).forEach(([variant, color]) => {
    describe(`${variant} (${color})`, () => {
      test('background matches the badge surface background', () => {
        expect(background[`alert-${variant}`]).toEqual(
          background[`badge-surface-${color}`]
        );
      });

      test('border matches the badge surface border', () => {
        expect(border[`alert-${variant}`]).toEqual(
          border[`badge-surface-${color}`]
        );
      });

      test('font matches the badge soft font used by the surface variant', () => {
        expect(font[`alert-${variant}`]).toEqual(font[`badge-soft-${color}`]);
      });
    });
  });
});
