import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Flex, Text } from "@sqs/rosetta-primitives";
import { ExclamationMarkCircleFilled } from "@sqs/rosetta-glyphs";
import { EASE_ENTRANCE, EASE_EXIT } from "../../constants/motion";

function getVariants(reduceMotion) {
  return {
    initial: { opacity: 0, height: 0, y: reduceMotion ? 0 : 4 },
    animate: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.25, ease: EASE_ENTRANCE },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: reduceMotion ? 0 : -4,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.15, ease: EASE_EXIT },
    },
  };
}

/**
 * Warning status label shown on a protection card while the protection is off.
 * Pass a falsy `message` to animate it out.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=737-40450
 */
export default function ProtectionStatusMessage({ message, id }) {
  const reduceMotion = useReducedMotion();
  const variants = React.useMemo(
    () => getVariants(reduceMotion),
    [reduceMotion],
  );

  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.div
          key="status"
          id={id}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ overflow: "hidden" }}
        >
          <Flex alignItems="center" gap={1}>
            <ExclamationMarkCircleFilled
              color="fg.warning"
              css={{
                width: 16,
                height: 16,
                flexShrink: 0,
                display: "block",
              }}
            />
            <Text.Caption as="span" m={0} sx={{ color: "fg.warning" }}>
              {message}
            </Text.Caption>
          </Flex>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
