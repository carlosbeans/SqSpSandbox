/**
 * Shared Framer Motion tokens, mirrored from Rosetta's own theme tokens
 * (`useTheme().easing.product.entrance` / `.exit`, `time['400']`) and its
 * push/pop slide convention (`@sqs/transitions` `Slide.toLeft` on push,
 * `toRight` on pop — the mechanism behind Rosetta's `NavigationController`).
 *
 * We keep Framer Motion as the animation engine (per the page-navigation
 * motion rule) but adopt Rosetta's easing curves and durations so directional
 * transitions feel consistent with the rest of the design system.
 */

/** Rosetta `easing.product.entrance` — used for elements animating in. */
export const EASE_ENTRANCE = [0.32, 0.94, 0.6, 1];

/** Rosetta `easing.product.exit` — used for elements animating out. */
export const EASE_EXIT = [0.4, 0, 0.68, 0.06];

/** Rosetta `time['400']`, in seconds for Framer Motion. */
export const SLIDE_DURATION = 0.4;

/** Direction flag passed via router `state.slideDirection`. */
export const SLIDE_FORWARD = "forward";

/** Today's default AppShell fade (unchanged) for navigations with no direction. */
const FADE_EASE = [0.25, 0.1, 0.25, 1];
const FADE_DURATION = 0.35;
const SLIDE_OFFSET_PX = 32;

/**
 * Fade + vertical variants (today's default AppShell transition) combined
 * with a Rosetta-style fade + horizontal slide, selected at animation time
 * via Framer Motion's `custom` prop. Pass
 * `custom={{ direction, reduceMotion }}` to both `AnimatePresence` and the
 * animated `motion.*` element so the exiting page resolves the same
 * direction and motion preference as the entering one.
 */
export const shellVariants = {
  initial: (custom) => {
    const { direction, reduceMotion } = custom || {};
    if (direction === SLIDE_FORWARD) {
      return { opacity: 0, x: reduceMotion ? 0 : SLIDE_OFFSET_PX, y: 0 };
    }
    return { opacity: 0, x: 0, y: reduceMotion ? 0 : 12 };
  },
  animate: (custom) => {
    const { direction, reduceMotion } = custom || {};
    const transition = reduceMotion
      ? { duration: 0 }
      : direction === SLIDE_FORWARD
        ? { duration: SLIDE_DURATION, ease: EASE_ENTRANCE }
        : { duration: FADE_DURATION, ease: FADE_EASE };
    return { opacity: 1, x: 0, y: 0, transition };
  },
  exit: (custom) => {
    const { direction, reduceMotion } = custom || {};
    const transition = reduceMotion
      ? { duration: 0 }
      : direction === SLIDE_FORWARD
        ? { duration: SLIDE_DURATION, ease: EASE_EXIT }
        : { duration: FADE_DURATION, ease: FADE_EASE };
    if (direction === SLIDE_FORWARD) {
      return { opacity: 0, x: reduceMotion ? 0 : -SLIDE_OFFSET_PX, y: 0, transition };
    }
    return { opacity: 0, x: 0, y: reduceMotion ? 0 : -8, transition };
  },
};
