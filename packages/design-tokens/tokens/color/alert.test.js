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

      /*
       * `default` is the one deliberate break from badge surface. A badge is small enough
       * to read as a single chip, so its grey border can sit at (dark mode) or near (light
       * mode) its own fill. An alert is a large container whose edge has to be findable,
       * and grey-on-grey has no hue difference to help, so it takes more luminance
       * separation than the colored variants to look equally visible.
       */
      const borderDivergesFromBadge = variant === 'default';

      test(`border ${
        borderDivergesFromBadge
          ? 'is a step darker than the badge surface border'
          : 'matches the badge surface border'
      }`, () => {
        const assertion = expect(border[`alert-${variant}`]);

        if (borderDivergesFromBadge) {
          assertion.toEqual({
            value: '{color.base.grey.300}',
            darkValue: '{color.base.grey.400}',
          });
        } else {
          assertion.toEqual(border[`badge-surface-${color}`]);
        }
      });

      test('font matches the badge soft font used by the surface variant', () => {
        expect(font[`alert-${variant}`]).toEqual(font[`badge-soft-${color}`]);
      });
    });
  });
});
