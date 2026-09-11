import { useContext } from "react";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { BREAKPOINT_MIN } from "../constants/breakpoints";

const BAND_ORDER = Object.keys(BREAKPOINT_MIN);

/**
 * Reads the active `viewport-*` band from Breakpoint.Context (populated by
 * the app-level <Breakpoint.Provider breakpoints={viewportBreakpoints} />
 * in Root.js) and exposes it as a plain band name plus an `isAtLeast`
 * helper for cumulative ("from-*") comparisons in JS.
 *
 * Falls back to 'xs' when rendered outside a viewport Breakpoint.Provider
 * (e.g. Breakpoint.Context's default value resolves to a device breakpoint
 * like "desktop-100", which has no matching band).
 */
export function useViewport() {
  const { name } = useContext(Breakpoint.Context);
  const band = name?.startsWith("viewport-")
    ? name.replace("viewport-", "")
    : "xs";

  const isAtLeast = (target) =>
    BAND_ORDER.indexOf(band) >= BAND_ORDER.indexOf(target);

  return { band, isAtLeast };
}
