const {
  lookup,
  sanitizeFontFamily,
  toDimension,
  toLineHeight,
  isColor,
  createColorTable,
  validateProse,
  assertReferencesResolve,
} = require('./generateDesignMd.js');

describe('lookup', () => {
  const tokens = { color: { background: { primary: { value: '#fff' } } } };

  test('resolves a dotted path to its token', () => {
    expect(lookup(tokens, 'color.background.primary').value).toBe('#fff');
  });

  test('returns undefined rather than throwing on a missing path', () => {
    expect(lookup(tokens, 'color.background.nope')).toBeUndefined();
    expect(lookup(tokens, 'size.spacing.xl.deeper')).toBeUndefined();
  });
});

describe('sanitizeFontFamily', () => {
  // tokens/assets/fontFamily.json ships `body` and `brand` with a trailing
  // semicolon inside the value.
  test('strips the trailing semicolon from the token source', () => {
    expect(sanitizeFontFamily("'geist', Helvetica, sans-serif;")).toBe(
      "'geist', Helvetica, sans-serif"
    );
  });

  test('leaves a well-formed stack alone', () => {
    expect(sanitizeFontFamily("'geist-mono', monospace")).toBe("'geist-mono', monospace");
  });
});

describe('toDimension', () => {
  test('passes through values that already carry a valid unit', () => {
    expect(toDimension('1rem')).toBe('1rem');
    expect(toDimension('40px')).toBe('40px');
    expect(toDimension('0.125rem')).toBe('0.125rem');
    expect(toDimension('-0.02em')).toBe('-0.02em');
  });

  test('appends rem to a bare number', () => {
    expect(toDimension('1.25')).toBe('1.25rem');
  });

  test('rejects values that are not dimensions', () => {
    // `auto` and `fit-content` are real spacing token values, and the DESIGN.md
    // Dimension type has no room for them.
    expect(toDimension('auto')).toBeUndefined();
    expect(toDimension('transparent')).toBeUndefined();
    expect(toDimension('50%')).toBeUndefined();
  });
});

describe('toLineHeight', () => {
  test('keeps a unitless multiplier as a number', () => {
    expect(toLineHeight('1.5')).toBe(1.5);
    expect(toLineHeight('1.15')).toBe(1.15);
  });

  test('accepts a dimension', () => {
    expect(toLineHeight('24px')).toBe('24px');
  });
});

describe('isColor', () => {
  test.each([
    ['#fff'],
    ['#171717'],
    ['#171717ff'],
    ['transparent'],
    ['rgba(0, 0, 0, 0.1)'],
    ['oklch(62% 0.18 250)'],
  ])('accepts %s', (value) => {
    expect(isColor(value)).toBe(true);
  });

  test('rejects gradients, which are images rather than colors', () => {
    expect(isColor('linear-gradient(60deg, #eab308 0%, #FA0A64 100%)')).toBe(false);
  });

  test('rejects non-strings and empty values', () => {
    expect(isColor(undefined)).toBe(false);
    expect(isColor(600)).toBe(false);
    expect(isColor('  ')).toBe(false);
  });
});

describe('createColorTable', () => {
  test('define publishes the requested name and a -dark sibling', () => {
    const { colors, define } = createColorTable();
    const refs = define('surface', '#FFFFFF', '#262626');

    expect(colors).toEqual({ surface: '#FFFFFF', 'surface-dark': '#262626' });
    expect(refs).toEqual({ ref: '{colors.surface}', darkRef: '{colors.surface-dark}' });
  });

  test('omits the -dark sibling when the theme value does not change', () => {
    const { colors, define } = createColorTable();
    const refs = define('error', '#ef4444', '#ef4444');

    expect(colors).toEqual({ error: '#ef4444' });
    expect(refs.darkRef).toBeUndefined();
  });

  test('define never renames, even when the value already exists', () => {
    const { colors, define } = createColorTable();
    define('primary', '#171717');
    define('badge-default', '#171717');

    expect(colors).toEqual({ primary: '#171717', 'badge-default': '#171717' });
  });

  test('intern reuses an existing name for an identical light/dark pair', () => {
    const { colors, define, intern } = createColorTable();
    define('primary', '#171717', '#FFFFFF');
    const refs = intern('button-primary-background', '#171717', '#FFFFFF');

    expect(refs).toEqual({ ref: '{colors.primary}', darkRef: '{colors.primary-dark}' });
    expect(Object.keys(colors)).toEqual(['primary', 'primary-dark']);
  });

  test('intern publishes a new token when the dark value differs', () => {
    const { colors, define, intern } = createColorTable();
    define('primary', '#171717', '#FFFFFF');
    const refs = intern('toast-background', '#171717', '#f5f5f5');

    expect(refs.ref).toBe('{colors.toast-background}');
    expect(colors['toast-background']).toBe('#171717');
    expect(colors['toast-background-dark']).toBe('#f5f5f5');
  });

  test('refuses values that are not colors', () => {
    const { colors, intern } = createColorTable();
    expect(intern('brand-gradient', 'linear-gradient(60deg, #000 0%, #fff 100%)')).toBeUndefined();
    expect(colors).toEqual({});
  });
});

describe('validateProse', () => {
  test('accepts canonical sections in order', () => {
    const prose = '## Overview\n\ntext\n\n## Colors\n\ntext\n\n## Components\n\ntext\n';
    expect(validateProse(prose)).toEqual(['Overview', 'Colors', 'Components']);
  });

  test('accepts section aliases', () => {
    const prose = '## Brand & Style\n\ntext\n\n## Layout & Spacing\n\ntext\n';
    expect(() => validateProse(prose)).not.toThrow();
  });

  test('rejects duplicate headings, which the spec treats as a hard error', () => {
    const prose = '## Colors\n\ntext\n\n## Colors\n\nmore\n';
    expect(() => validateProse(prose)).toThrow(/duplicate/i);
  });

  test('rejects sections that are out of canonical order', () => {
    const prose = '## Typography\n\ntext\n\n## Colors\n\ntext\n';
    expect(() => validateProse(prose)).toThrow(/out of order/i);
  });

  test('preserves unknown sections without complaint', () => {
    const prose = '## Overview\n\ntext\n\n## Iconography\n\ntext\n\n## Colors\n\ntext\n';
    expect(() => validateProse(prose)).not.toThrow();
  });
});

describe('assertReferencesResolve', () => {
  const frontMatter = () => ({
    colors: { primary: '#171717' },
    rounded: { sm: '0.25rem' },
    typography: { 'label-md': { fontSize: '0.875rem' } },
    spacing: { xl: '1rem' },
    components: {},
  });

  test('passes when every reference points at a published token', () => {
    const matter = frontMatter();
    matter.components = {
      'button-primary': {
        backgroundColor: '{colors.primary}',
        rounded: '{rounded.sm}',
        typography: '{typography.label-md}',
        padding: '{spacing.xl}',
        height: '40px',
      },
    };
    expect(() => assertReferencesResolve(matter)).not.toThrow();
  });

  test('reports the component and property for a dangling reference', () => {
    const matter = frontMatter();
    matter.components = { toast: { backgroundColor: '{colors.toast-background-dark}' } };

    expect(() => assertReferencesResolve(matter)).toThrow(
      /components\.toast\.backgroundColor -> \{colors\.toast-background-dark\}/
    );
  });
});
