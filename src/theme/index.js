import { rosetta } from "@sqs/rosetta-themes";
import { viewportBreakpoints, fromBreakpoints } from "../constants/breakpoints";

/**
 * Appends width-based viewport breakpoints to a Rosetta theme's device-based
 * breakpoints. Device keys must stay first: `getBreakpoint()` (and therefore
 * `useIsMobile()`, used by PageHeader/Table/Breadcrumbs/KeyFigures) returns
 * the *first* matching entry, so appending here preserves existing behavior.
 *
 * Theme breakpoint values must start with `@media `; otherwise
 * rosetta-styled-system wraps them as `@media screen and (min-width: <value>)`,
 * producing an invalid query for both style props and `sx`.
 */
const asThemeMediaQueries = (breakpoints) =>
  Object.fromEntries(
    Object.entries(breakpoints).map(([key, query]) => [key, `@media ${query}`])
  );

const withViewportBreakpoints = (theme) => ({
  ...theme,
  breakpoints: {
    ...theme.breakpoints,
    ...asThemeMediaQueries(viewportBreakpoints),
    ...asThemeMediaQueries(fromBreakpoints),
  },
});

export const appTheme = withViewportBreakpoints(rosetta.default);
export const appLightTheme = withViewportBreakpoints(rosetta.light);
