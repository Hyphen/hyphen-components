/**
 * Curation config for the generated DESIGN.md.
 *
 * DESIGN.md (https://github.com/google-labs-code/design.md) describes a design
 * system to coding agents as YAML front matter (tokens) plus markdown prose
 * (rationale). Hyphen has 400+ color tokens; dumping all of them would make the
 * file unreadable, so this file is the explicit, reviewable allowlist of what
 * gets published.
 *
 * Paths are dotted paths into the design.md platform output
 * (`build/json/design-md.json`), which resolves aliases and applies the same
 * per-category unit transforms as the CSS platform.
 *
 * This file is hand-maintained. The values it points at are not.
 */

const meta = {
  version: 'alpha',
  name: 'Hyphen',
  description:
    'The Hyphen design system. Tokens are generated from @hyphen/hyphen-design-tokens; components are implemented by @hyphen/hyphen-components.',
};

/**
 * Foundation color roles, using DESIGN.md's conventional vocabulary
 * (primary / surface / on-surface / outline) mapped onto Hyphen's semantic
 * tokens. Order here is the order they appear in the front matter.
 *
 * These names are always published verbatim — they are the vocabulary the prose
 * and the hand-written components below refer to.
 */
const foundationColors = {
  primary: 'color.background.button-primary',
  'on-primary': 'color.font.button-primary',
  secondary: 'color.background.button-secondary',
  'on-secondary': 'color.font.button-secondary',

  surface: 'color.background.primary',
  'on-surface': 'color.font.base',
  'surface-secondary': 'color.background.secondary',
  'on-surface-secondary': 'color.font.secondary',
  'surface-tertiary': 'color.background.tertiary',
  'on-surface-tertiary': 'color.font.tertiary',
  'surface-inverse': 'color.background.inverse',
  'on-surface-inverse': 'color.font.inverse',
  'surface-disabled': 'color.background.disabled',
  'on-surface-disabled': 'color.font.disabled',
  placeholder: 'color.font.placeholder',

  outline: 'color.border.default',
  'outline-subtle': 'color.border.subtle',
  'outline-hover': 'color.border.hover',
  'outline-active': 'color.border.active',

  error: 'color.background.error',
  'surface-danger': 'color.background.danger',
  'on-danger': 'color.font.danger',
  'outline-danger': 'color.border.danger',
  'surface-success': 'color.background.success',
  'on-success': 'color.font.success',
  'outline-success': 'color.border.success',
  'surface-warning': 'color.background.warning',
  'on-warning': 'color.font.warning',
  'outline-warning': 'color.border.warning',
  'surface-info': 'color.background.info',
  'on-info': 'color.font.info',
  'outline-info': 'color.border.info',

  'chart-1': 'color.background.chart-1',
  'chart-2': 'color.background.chart-2',
  'chart-3': 'color.background.chart-3',
};

/**
 * Typography levels, composed from Hyphen's separate size / weight /
 * line-height / family scales.
 *
 * Heading values mirror what `Heading.module.scss` and
 * `HEADING_DEFAULT_SIZE_MAP` actually render, so `h1`..`h6` here describe real
 * component output rather than an invented scale.
 */
const HEADING = {
  fontFamily: 'assets.font-family.brand',
  fontWeight: 'size.font-weight.semibold',
  lineHeight: 'size.line-height.heading',
};
const BODY = {
  fontFamily: 'assets.font-family.body',
  fontWeight: 'size.font-weight.normal',
  lineHeight: 'size.line-height.text',
};
const LABEL = {
  fontFamily: 'assets.font-family.body',
  fontWeight: 'size.font-weight.medium',
  lineHeight: 'size.line-height.base',
};

const typography = {
  'display-lg': { ...HEADING, fontSize: 'size.heading.6xl' },
  'display-md': { ...HEADING, fontSize: 'size.heading.5xl' },
  'display-sm': { ...HEADING, fontSize: 'size.heading.4xl' },
  h1: { ...HEADING, fontSize: 'size.heading.3xl' },
  h2: { ...HEADING, fontSize: 'size.heading.2xl' },
  h3: { ...HEADING, fontSize: 'size.heading.xl' },
  h4: { ...HEADING, fontSize: 'size.heading.lg' },
  h5: { ...HEADING, fontSize: 'size.heading.md' },
  h6: { ...HEADING, fontSize: 'size.heading.sm' },
  'body-lg': { ...BODY, fontSize: 'size.font-size.lg' },
  'body-md': { ...BODY, fontSize: 'size.font-size.md' },
  'body-sm': { ...BODY, fontSize: 'size.font-size.sm' },
  'body-xs': { ...BODY, fontSize: 'size.font-size.xs' },
  'label-md': { ...LABEL, fontSize: 'size.font-size.sm' },
  'label-sm': { ...LABEL, fontSize: 'size.font-size.xs' },
  input: {
    fontFamily: 'assets.font-family.body',
    fontWeight: 'size.font-weight.normal',
    lineHeight: 'size.line-height.input',
    fontSize: 'size.font-size.sm',
  },
  code: {
    fontFamily: 'assets.font-family.monospace',
    fontWeight: 'size.font-weight.normal',
    lineHeight: 'size.line-height.text',
    fontSize: 'size.font-size.sm',
  },
};

/** Spacing scale. `auto` is dropped — it is not a DESIGN.md Dimension. */
const spacing = { group: 'size.spacing', omit: ['auto'] };

/** Corner radius scale. */
const rounded = { group: 'size.border-radius' };

/**
 * Components derived automatically from Hyphen's semantic token naming.
 *
 * Hyphen already names these tokens in DESIGN.md's `<component>-<variant>`
 * shape (`button-primary`, `button-primary-hover`, `badge-danger`), so for each
 * key below the generator intersects `color.background.<key>`,
 * `color.font.<key>` and `color.border.<key>` and emits whichever exist as
 * `backgroundColor` / `textColor` / `borderColor`.
 */
const derivedComponents = [
  'button-primary',
  'button-primary-hover',
  'button-primary-active',
  'button-secondary',
  'button-secondary-hover',
  'button-secondary-active',
  'button-tertiary',
  'button-tertiary-hover',
  'button-tertiary-active',
  'button-danger',
  'button-danger-hover',
  'button-danger-active',
  'button-success',
  'button-success-hover',
  'button-success-active',
  'badge-default',
  'badge-secondary',
  'badge-danger',
  'badge-outline',
  'toast',
  'toast-error',
  'tooltip',
  'popover',
  'brand-yellow',
  'brand-orange',
  'brand-magenta',
  'brand-dark-grey',
  'brand-cyan',
  'brand-pink',
  'brand-light-purple',
  'brand-medium-purple',
  'brand-dark-purple',
];

/**
 * Restricts which color groups a derived component draws from. Longest prefix
 * wins; anything not listed uses all three.
 *
 * The brand palette needs this. Hyphen defines `color.font.brand-yellow` as
 * "text in brand yellow on an ordinary surface", not "text on a brand-yellow
 * background" — they are the same hex. Deriving all three groups would emit a
 * component whose text and background are identical.
 */
const derivedComponentGroups = {
  brand: ['background'],
};

/**
 * Static properties merged onto every derived component whose name starts with
 * the given prefix. Values come from the component SCSS, so they describe what
 * Hyphen actually renders. Longest prefix wins.
 */
const derivedComponentShapes = {
  // Button.module.scss resolves its radius to --INTERNAL_form-control-size-*-border-radius,
  // which is --size-border-radius-sm at every size.
  button: { rounded: '{rounded.sm}', typography: '{typography.label-md}' },
  badge: { rounded: '{rounded.sm}', typography: '{typography.label-sm}' },
  toast: {
    rounded: '{rounded.md}',
    typography: '{typography.body-sm}',
    padding: '{spacing.xl}',
  },
  tooltip: {
    rounded: '{rounded.sm}',
    typography: '{typography.body-xs}',
    padding: '{spacing.sm}',
  },
  popover: {
    rounded: '{rounded.md}',
    typography: '{typography.body-sm}',
    padding: '{spacing.xl}',
  },
};

/**
 * Components whose values live in SCSS rather than in tokens, plus the
 * foundation-level surfaces. Emitted verbatim after the derived set.
 *
 * Sources: `styles/variables/forms.scss` (--INTERNAL_form-control-*) and
 * `Button.module.scss` (explicit sm/md/lg heights).
 */
const extraComponents = {
  page: {
    backgroundColor: '{colors.surface}',
    textColor: '{colors.on-surface}',
    typography: '{typography.body-md}',
  },
  card: {
    backgroundColor: '{colors.surface}',
    textColor: '{colors.on-surface}',
    borderColor: '{colors.outline-subtle}',
    rounded: '{rounded.md}',
    padding: '{spacing.3xl}',
  },
  'card-subtle': {
    backgroundColor: '{colors.surface-secondary}',
    textColor: '{colors.on-surface-secondary}',
    rounded: '{rounded.md}',
    padding: '{spacing.3xl}',
  },
  'surface-sunken': {
    backgroundColor: '{colors.surface-tertiary}',
    textColor: '{colors.on-surface}',
    rounded: '{rounded.md}',
  },
  'banner-inverse': {
    backgroundColor: '{colors.surface-inverse}',
    textColor: '{colors.on-surface-inverse}',
    padding: '{spacing.xl}',
  },
  divider: { backgroundColor: '{colors.outline-subtle}' },

  'button-size-sm': {
    height: '32px',
    rounded: '{rounded.sm}',
    typography: '{typography.label-sm}',
  },
  'button-size-md': {
    height: '40px',
    rounded: '{rounded.sm}',
    typography: '{typography.label-md}',
  },
  'button-size-lg': {
    height: '55px',
    rounded: '{rounded.sm}',
    typography: '{typography.body-md}',
  },
  'button-disabled': {
    backgroundColor: '{colors.surface-disabled}',
    textColor: '{colors.on-surface-disabled}',
    rounded: '{rounded.sm}',
  },

  input: {
    backgroundColor: '{colors.surface}',
    textColor: '{colors.on-surface}',
    borderColor: '{colors.outline}',
    rounded: '{rounded.sm}',
    padding: '{spacing.lg}',
    typography: '{typography.input}',
  },
  'input-hover': { borderColor: '{colors.outline-hover}' },
  'input-focus': { borderColor: '{colors.outline-active}' },
  'input-error': {
    backgroundColor: '{colors.surface-danger}',
    textColor: '{colors.on-danger}',
    borderColor: '{colors.outline-danger}',
  },
  'input-disabled': {
    backgroundColor: '{colors.surface-disabled}',
    textColor: '{colors.on-surface-disabled}',
  },
  'input-placeholder': { textColor: '{colors.placeholder}' },
  'input-label': {
    textColor: '{colors.on-surface}',
    typography: '{typography.label-md}',
  },
  'input-help-text': {
    textColor: '{colors.on-surface-secondary}',
    typography: '{typography.body-xs}',
  },

  modal: {
    backgroundColor: '{colors.surface}',
    textColor: '{colors.on-surface}',
    rounded: '{rounded.md}',
    padding: '{spacing.3xl}',
  },

  'alert-success': {
    backgroundColor: '{colors.surface-success}',
    textColor: '{colors.on-success}',
    borderColor: '{colors.outline-success}',
    rounded: '{rounded.sm}',
    padding: '{spacing.xl}',
  },
  'alert-danger': {
    backgroundColor: '{colors.surface-danger}',
    textColor: '{colors.on-danger}',
    borderColor: '{colors.outline-danger}',
    rounded: '{rounded.sm}',
    padding: '{spacing.xl}',
  },
  'alert-warning': {
    backgroundColor: '{colors.surface-warning}',
    textColor: '{colors.on-warning}',
    borderColor: '{colors.outline-warning}',
    rounded: '{rounded.sm}',
    padding: '{spacing.xl}',
  },
  'alert-info': {
    backgroundColor: '{colors.surface-info}',
    textColor: '{colors.on-info}',
    borderColor: '{colors.outline-info}',
    rounded: '{rounded.sm}',
    padding: '{spacing.xl}',
  },
  'chart-series-1': { backgroundColor: '{colors.chart-1}' },
  'chart-series-2': { backgroundColor: '{colors.chart-2}' },
  'chart-series-3': { backgroundColor: '{colors.chart-3}' },
};

/**
 * Prose tables rendered into the markdown body via `{{table:name}}` markers.
 *
 * These scales are real parts of the system, but DESIGN.md has no front-matter
 * group for them, and inventing top-level YAML keys whose values look like
 * tokens trips the spec's `token-like-ignored` rule. So they are published as
 * prose instead.
 */
const proseTables = {
  breakpoints: { group: 'size.breakpoint', title: 'Breakpoints' },
  elevation: { group: 'size.box-shadow', title: 'Shadow scale' },
  zIndex: { group: 'size.z-index', title: 'Stacking order' },
  borderWidth: { group: 'size.border-width', title: 'Border widths' },
};

module.exports = {
  meta,
  foundationColors,
  typography,
  spacing,
  rounded,
  derivedComponents,
  derivedComponentGroups,
  derivedComponentShapes,
  extraComponents,
  proseTables,
};
