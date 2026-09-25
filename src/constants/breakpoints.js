/**
 * Width-based viewport breakpoints, distinct from Rosetta's device-based
 * theme breakpoints (mobile-0, tablet-0, desktop-50, etc.) which key off
 * pointer type + device size and never react to browser window resizing.
 *
 * This scale matches Rosetta's own Grid.Container default `breakpoints`
 * prop ([559, 679, 879, 1199, 1679, Infinity]), so it stays consistent
 * with layouts already built on Grid.Item columns={[12, 6, 3]}.
 */
export const BREAKPOINT_MIN = {
  xs: 0,
  s: 560,
  m: 680,
  l: 880,
  xl: 1200,
  xxl: 1680,
};

/** Matches Grid.Container's default `breakpoints` prop. */
export const GRID_BREAKPOINTS = [559, 679, 879, 1199, 1679, Infinity];

/**
 * Exclusive bands — exactly one is ever active. Use with Breakpoint.Provider
 * / Breakpoint.Renderer for swapping whole components (e.g. compact vs.
 * full header actions), or with the `viewport-*` wildcard in style props.
 *
 * Values omit the `@media ` prefix so they can go straight to
 * `window.matchMedia`; `src/theme/index.js` adds the prefix when merging
 * them into the theme, which styled-system requires.
 */
export const viewportBreakpoints = {
  "viewport-xs": `only screen and (max-width: ${BREAKPOINT_MIN.s - 1}px)`,
  "viewport-s": `only screen and (min-width: ${BREAKPOINT_MIN.s}px) and (max-width: ${BREAKPOINT_MIN.m - 1}px)`,
  "viewport-m": `only screen and (min-width: ${BREAKPOINT_MIN.m}px) and (max-width: ${BREAKPOINT_MIN.l - 1}px)`,
  "viewport-l": `only screen and (min-width: ${BREAKPOINT_MIN.l}px) and (max-width: ${BREAKPOINT_MIN.xl - 1}px)`,
  "viewport-xl": `only screen and (min-width: ${BREAKPOINT_MIN.xl}px) and (max-width: ${BREAKPOINT_MIN.xxl - 1}px)`,
  "viewport-xxl": `only screen and (min-width: ${BREAKPOINT_MIN.xxl}px)`,
};

/**
 * Cumulative min-width bands — fill forward, mobile-first, mirroring
 * Grid.Item's `columns={[12, 6, 3]}` fill-forward semantics. Use these
 * for everyday responsive style props (e.g. `flexDirection={{ _: 'column',
 * 'from-m': 'row' }}`). Not compatible with Breakpoint.Provider, which
 * expects mutually exclusive keys.
 */
export const fromBreakpoints = {
  "from-s": `only screen and (min-width: ${BREAKPOINT_MIN.s}px)`,
  "from-m": `only screen and (min-width: ${BREAKPOINT_MIN.m}px)`,
  "from-l": `only screen and (min-width: ${BREAKPOINT_MIN.l}px)`,
  "from-xl": `only screen and (min-width: ${BREAKPOINT_MIN.xl}px)`,
  "from-xxl": `only screen and (min-width: ${BREAKPOINT_MIN.xxl}px)`,
};
