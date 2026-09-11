import { rosetta } from "@sqs/rosetta-themes";
import { viewportBreakpoints, fromBreakpoints } from "../constants/breakpoints";

/**
 * Appends width-based viewport breakpoints to a Rosetta theme's device-based
 * breakpoints. Device keys must stay first: `getBreakpoint()` (and therefore
 * `useIsMobile()`, used by PageHeader/Table/Breadcrumbs/KeyFigures) returns
 * the *first* matching entry, so appending here preserves existing behavior.
 */
const withViewportBreakpoints = (theme) => ({
  ...theme,
  breakpoints: {
    ...theme.breakpoints,
    ...viewportBreakpoints,
    ...fromBreakpoints,
  },
});

export const appTheme = withViewportBreakpoints(rosetta.default);
export const appLightTheme = withViewportBreakpoints(rosetta.light);
