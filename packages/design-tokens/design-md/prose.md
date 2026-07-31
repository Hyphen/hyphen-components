# Hyphen

## Overview

Hyphen is a product design system for operational software — feature flagging,
environment management, access control, and the dashboards that sit on top of
them. The people using it are engineers and operators doing focused work, often
for hours at a time, often on dense screens full of state.

That shapes the whole system. The UI is **quiet, neutral, and information-dense**.
Near-monochrome greys carry the interface so that the only saturated color on a
screen is something that matters: a destructive action, a failed deploy, a live
toggle. Chrome recedes; data leads.

The feel is precise rather than playful. Corners are gently rounded, never
pill-shaped. Depth is subtle — a card lifts off the page just enough to read as a
distinct surface. Motion is short and functional. Nothing decorative competes
with the content.

Hyphen's brand palette is vivid — yellows, magentas, cyans, purples — but that
energy lives in marketing surfaces, empty states, and illustration, not in the
working UI. When in doubt, reach for a neutral and let the accent go unused.

Every surface must work in both light and dark themes. Dark is a first-class
mode, not an inversion filter.

## Colors

Color is organized by **role**, not by hue. Prose and code should name the role
(`surface`, `on-surface`, `outline`, `primary`) and let the token carry the
value. Reaching past the semantic layer into the raw palette is how a design
system drifts.

- **Primary** — the near-black ink used for the single most important action on
  a screen, and its inverse in dark mode. Hyphen has no saturated "brand blue"
  button; the primary action is high-contrast neutral.
- **Surface / on-surface** — the page and card backgrounds and the text that sits
  on them, in three steps (`surface`, `surface-secondary`, `surface-tertiary`)
  for building visual layers without shadows.
- **Outline** — borders and dividers, with `outline-subtle` for quiet separators
  and `outline-hover` / `outline-active` for interactive states.
- **Status** — `success`, `danger`, `warning`, `info` each come as a surface, a
  text color, and an outline, so alerts and inline validation stay consistent.
- **Brand** — the nine brand hues, available as backgrounds, text, and borders.
  Use them for marketing, illustration, and identity moments.
- **Chart** — an ordered series palette for data visualization.

### Light and dark

Every token below is a light-theme value. Where the dark theme differs, the same
token exists with a **`-dark` suffix**, and components that change across themes
have a matching `-dark` variant. So `button-primary` and `button-primary-dark`
are the same component in two themes, not two different components.

A token with no `-dark` sibling is theme-invariant — it is deliberately the same
value in both modes. In CSS these map to the `:root.dark` layer shipped by
`@hyphen/hyphen-design-tokens`.

### Naming

Token names here map directly onto Hyphen's CSS custom properties. A component
token like `button-primary-background` corresponds to
`var(--color-background-button-primary)`; `-font` maps to `--color-font-*` and
`-border` to `--color-border-*`.

## Typography

Hyphen sets everything in **Geist**, with **Geist Mono** for code, keys, IDs, and
any value the user might copy. There is no second display face — hierarchy comes
from size and weight, not from mixing families.

- **Display** (`display-sm`–`display-lg`) — marketing and empty states only.
  These sizes have no place in the product UI.
- **Headings** (`h1`–`h6`) — semibold, tight `1.25` line height. The `h1`–`h6`
  levels here are the real output of the `Heading` component's default size map,
  so an `h3` in this file is what `<Heading as="h3">` renders.
- **Body** (`body-xs`–`body-lg`) — regular weight, roomy `1.5` line height for
  readability. `body-md` is the default UI text size.
- **Labels** (`label-sm`, `label-md`) — medium weight, tight line height, for
  buttons, form labels, table headers, and badges.
- **Input** — a slightly tighter `1.15` line height so text sits optically
  centered inside form controls.
- **Code** — Geist Mono at body-small size.

Size and weight do the work of hierarchy. Avoid using color to signal importance
in text; reserve it for status.

## Layout

Spacing follows a **rem-based t-shirt scale** (`2xs` through `10xl`) rather than
a strict multiple-of-N grid. The steps are deliberately close together at the
small end (`2xs` 0.125rem through `xl` 1rem) because dense operational UI needs
fine control over gaps, and they open up quickly at the large end for page-level
rhythm.

`xl` (1rem) is the workhorse: default gap between related controls, default
padding inside compact containers. `3xl` (1.5rem) is the standard card and modal
padding. Anything `5xl` and above is page-level section spacing.

Layout is composed with the `Box` component and its responsive props rather than
ad-hoc CSS. Every spacing, sizing, and color prop accepts either a single value
or a per-breakpoint object (`{ base, tablet, desktop, hd }`), which is how
responsive behavior is expressed throughout the system.

{{table:breakpoints}}

Breakpoints are min-width and mobile-first: `base` styles apply everywhere, and
each larger breakpoint overrides from that width up.

## Elevation & Depth

Hierarchy comes primarily from **tonal layering** — stacking `surface`,
`surface-secondary`, and `surface-tertiary`, and separating regions with
`outline-subtle`. Reach for a border or a background step before reaching for a
shadow.

Shadows are reserved for surfaces that genuinely float above the page:
dropdowns, popovers, modals, and toasts. They are soft and low-contrast; the
scale climbs with how far the element is meant to read as lifted, not with how
much attention it deserves.

{{table:elevation}}

Stacking order is fixed by token so that overlapping surfaces compose
predictably. Never invent a `z-index` — use the scale.

{{table:zIndex}}

## Shapes

Corners are **softly squared**. The default for interactive controls — buttons,
inputs, badges — is `sm` (0.25rem): enough to feel finished, not enough to read
as friendly. Containers that hold content, such as cards, modals, and popovers,
use `md` (0.5rem). The larger steps exist for marketing surfaces and for avatars
and other genuinely circular elements at `3xl`.

Hyphen has no fully-pill shape in its product UI. Mixing radii within a single
composed control — a button group, an input with an attached addon — is the most
common way this goes wrong; the outer shape wins and inner elements square off.

{{table:borderWidth}}

Borders are hairline by default (`sm`, 0.0625rem). Heavier widths are for focus
and selection states, not for decoration.

## Components

The component tokens in the front matter describe the atoms that carry Hyphen's
visual identity. They are grouped the way the system actually works:

- **Buttons** — five intents (`primary`, `secondary`, `tertiary`, `danger`,
  `success`), each with `-hover` and `-active` variants, plus three fixed sizes
  (`button-size-sm` 32px, `button-size-md` 40px, `button-size-lg` 55px) and a
  shared disabled treatment. `primary` is high-contrast neutral; `tertiary` is
  transparent until hovered.
- **Badges** — `default`, `secondary`, `danger`, and `outline`.
- **Form controls** — `input` and its `-hover`, `-error`, `-disabled`, and
  `-placeholder` states, plus `input-label` and `input-help-text`, and the
  `checkbox` / `checkbox-checked` pair.
- **Overlays** — `modal`, `popover`, `tooltip`, `toast`, and `toast-error`.
  Tooltips and toasts invert against the page; modals and popovers sit on
  `surface`.
- **Feedback** — `alert-success`, `alert-danger`, `alert-warning`, `alert-info`.
- **Containers** — `page`, `card`, `card-subtle`, and `divider`.
- **Brand and data** — the nine `brand-*` surfaces and the `chart-series-*`
  palette.

These are style contracts, not the full component API. The implementations,
their props, and their accessibility behavior live in
`@hyphen/hyphen-components`, documented at <https://ux.hyphen.ai>. Prefer using a
component from that library over rebuilding one from these tokens.

## Do's and Don'ts

- **Do** use semantic role tokens (`surface`, `on-surface`, `outline`,
  `primary`). **Don't** reach into the raw grey/blue/red palette scales directly
  — that is how themes break.
- **Do** let one primary action own a screen. **Don't** put two `primary`
  buttons in the same view; the second one should be `secondary` or `tertiary`.
- **Do** pair every color token with its `-dark` sibling when a surface can
  appear in both themes. **Don't** ship a component that only works in light
  mode.
- **Do** reach for tonal layering and `outline-subtle` to separate regions.
  **Don't** add a shadow to something that isn't actually floating.
- **Do** use the spacing scale for every gap and pad. **Don't** hardcode pixel
  values — if a gap needs a value the scale doesn't have, the layout is usually
  the thing that's wrong.
- **Do** keep body text at `body-md` or larger and maintain WCAG AA contrast
  (4.5:1 for normal text, 3:1 for large text and UI boundaries). **Don't** use
  `body-xs` for anything a user has to read carefully.
- **Do** reserve saturated color for status and destructive actions. **Don't**
  decorate the working UI with the brand palette.
- **Do** use `Box` and its responsive props for layout. **Don't** write ad-hoc
  CSS that bypasses the token layer.
- **Do** use the `z-index` scale for stacking. **Don't** invent a magic number.
