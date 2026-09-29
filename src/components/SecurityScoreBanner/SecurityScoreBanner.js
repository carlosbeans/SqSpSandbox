import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Flex } from "@sqs/rosetta-primitives";
import { Button } from "@sqs/rosetta-react/button/next";
import { Text } from "@sqs/rosetta-react/text/next";
import { useTheme } from "@sqs/rosetta-styled";
import { getSecuritySummary } from "../../constants/securityProtections";
import { EASE_ENTRANCE } from "../../constants/motion";
import SecurityGauge from "../SecurityGauge/SecurityGauge";

/**
 * Security tab — score banner.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=2008-113039
 */
const bannerVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function SecurityScoreBanner({ domain }) {
  const { radii } = useTheme();
  const reduceMotion = useReducedMotion();
  const { score, hasAddOn } = React.useMemo(
    () => getSecuritySummary(domain),
    [domain],
  );

  return (
    <motion.div
      id="security-score-banner"
      variants={bannerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.35, ease: EASE_ENTRANCE }
      }
      style={{ width: "100%" }}
    >
      <Flex
        alignItems="center"
        flexWrap="wrap"
        gap={{ _: 4, "from-m": 8 }}
        p={4}
        bg="gray.950"
        sx={{ borderRadius: radii[2], width: "100%" }}
      >
        <SecurityGauge
          score={score}
          reduceMotion={reduceMotion}
          labelPosition="above"
        />
        <Flex
          flexDirection="column"
          gap={2}
          flex="1 1 280px"
          minWidth={0}
        >
          <Text.Heading.Small as="h2" m={0} sx={{ fontSize: "18px", lineHeight: "27px" }}>
            Strengthen protection and unlock advanced monitoring
          </Text.Heading.Small>
          <Text.Body m={0} sx={{ maxWidth: 650 }}>
            Your domain currently has a medium rating. Turn on your remaining
            standard settings and add Add-on for automated threat coverage.
          </Text.Body>
        </Flex>
        {!hasAddOn && (
          <Button.Strong size="large" sx={{ whiteSpace: "nowrap", flexShrink: 0 }}>
            Get add-on
          </Button.Strong>
        )}
      </Flex>
    </motion.div>
  );
}
