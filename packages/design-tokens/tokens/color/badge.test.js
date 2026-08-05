const backgroundTokens = require('./background.json');
const borderTokens = require('./border.json');
const baseTokens = require('./base.json');

const BADGE_COLORS = [
  'grey',
  'blue',
  'green',
  'yellow',
  'red',
  'purple',
  'orange',
  'brand',
];

/*
 * The `surface` variant is the only badge style that pairs a tinted fill with a border, so
 * it is the only one that can accidentally hide its own edge. `badge-surface-grey` did
 * exactly that in dark mode: border and background both resolved to grey.600.
 *
 * The floor below is deliberately low. These edges are decorative -- the fill already
 * separates the badge from the page, so WCAG does not govern them -- and the colored
 * variants legitimately sit as low as 1.28. The assertion exists to catch a border
 * collapsing into its fill, not to enforce a contrast standard.
 */
const MIN_BORDER_CONTRAST = 1.2;

const resolve = (reference) => {
  if (typeof reference !== 'string') {
    throw new Error(
      `Expected a token reference or hex color, got: ${reference}`
    );
  }

  /*
   * Both files mix `{color.base.*}` references with literal hex (the `brand-*` entries),
   * so a value that is already a color resolves to itself rather than being walked as
   * though it were a path.
   */
  if (reference.startsWith('#')) {
    return reference;
  }

  const path = reference.replace(/[{}]/g, '').split('.');
  const resolved = path.reduce((node, key) => node?.[key], {
    color: baseTokens.color,
  });

  if (typeof resolved?.value !== 'string' || !resolved.value.startsWith('#')) {
    throw new Error(`${reference} did not resolve to a hex color`);
  }

  return resolved.value;
};

const relativeLuminance = (hex) => {
  const channels = [1, 3, 5].map((offset) => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return (
    0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
  );
};

const contrast = (a, b) => {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x
  );

  return (lighter + 0.05) / (darker + 0.05);
};

describe('badge surface tokens', () => {
  const background = backgroundTokens.color.background;
  const border = borderTokens.color.border;

  describe.each(BADGE_COLORS)('%s', (color) => {
    const fill = background[`badge-surface-${color}`];
    const edge = border[`badge-surface-${color}`];

    test.each([
      ['light', 'value'],
      ['dark', 'darkValue'],
    ])('%s border stays distinguishable from its fill', (_mode, key) => {
      /*
       * Optional chaining rather than an explicit presence check: a missing token reaches
       * `resolve` as undefined and fails there with a clear message, and Jest already names
       * the color and mode in the failing test, so a hand-written guard would only repeat it.
       */
      const ratio = contrast(resolve(edge?.[key]), resolve(fill?.[key]));

      expect(ratio).toBeGreaterThanOrEqual(MIN_BORDER_CONTRAST);
    });
  });
});
