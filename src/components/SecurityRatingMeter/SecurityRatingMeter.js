import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { SECURITY_TIERS } from "../../constants/securityProtections";
import { EASE_ENTRANCE, EASE_EXIT } from "../../constants/motion";

const TRACK_HEIGHT_PX = 4;
const SEGMENT_STAGGER = 0.08;
const FILL_DURATION = 0.45;

function getMeterVariants(reduceMotion) {
  return {
    initial: { opacity: 0, y: reduceMotion ? 0 : 8 },
    animate: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.35, ease: EASE_ENTRANCE, staggerChildren: SEGMENT_STAGGER },
    },
    exit: { opacity: 0, y: reduceMotion ? 0 : -8 },
  };
}

function getFillVariants(reduceMotion) {
  return {
    initial: { scaleX: reduceMotion ? 1 : 0 },
    animate: {
      scaleX: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: FILL_DURATION, ease: EASE_ENTRANCE },
    },
    exit: {
      scaleX: reduceMotion ? 1 : 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.2, ease: EASE_EXIT },
    },
  };
}

/**
 * Four-segment rating meter (Medium / Good / Excellent / Advanced). Segments
 * up to and including `tierIndex` fill with the success green, left to right.
 * Designed to sit inside a parent `motion.*` element: it joins the parent's
 * variant propagation (`initial` / `animate` / `exit`) so it staggers in with
 * the rest of the card, then staggers its own segments.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=2498-96136
 */
export default function SecurityRatingMeter({
  tierIndex,
  reduceMotion,
  id = "domain-overview-security-rating-meter",
}) {
  const meterVariants = React.useMemo(
    () => getMeterVariants(reduceMotion),
    [reduceMotion],
  );
  const fillVariants = React.useMemo(
    () => getFillVariants(reduceMotion),
    [reduceMotion],
  );

  return (
    <motion.div
      id={id}
      role="img"
      aria-label={`Security rating: ${SECURITY_TIERS[tierIndex].label}, level ${tierIndex + 1} of ${SECURITY_TIERS.length}`}
      variants={meterVariants}
      style={{ width: "100%" }}
    >
      <Flex gap={2} alignItems="flex-start" width="100%">
        {SECURITY_TIERS.map((tier, index) => (
          <Flex
            key={tier.key}
            flexDirection="column"
            gap={1}
            sx={{ flex: "1 0 0", minWidth: 0 }}
          >
            <Box
              bg="gray.800"
              sx={{
                position: "relative",
                height: TRACK_HEIGHT_PX,
                width: "100%",
                borderRadius: TRACK_HEIGHT_PX,
                overflow: "hidden",
              }}
            >
              <AnimatePresence>
                {index <= tierIndex && (
                  <motion.div
                    key={tier.key}
                    variants={fillVariants}
                    exit="exit"
                    style={{
                      position: "absolute",
                      inset: 0,
                      transformOrigin: "left center",
                    }}
                  >
                    <Box bg="green.500" sx={{ width: "100%", height: "100%" }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
            <Text.Body.Small
              as="span"
              m={0}
              sx={{ color: "gray.300", whiteSpace: "nowrap" }}
            >
              {tier.label}
            </Text.Body.Small>
          </Flex>
        ))}
      </Flex>
    </motion.div>
  );
}
