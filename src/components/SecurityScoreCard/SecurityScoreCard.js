import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Flex } from "@sqs/rosetta-primitives";
import { Button } from "@sqs/rosetta-react/button/next";
import { Card, Chip, TextLink } from "@sqs/rosetta-elements";
import { Text } from "@sqs/rosetta-react/text/next";
import { useTheme } from "@sqs/rosetta-styled";
import { CheckmarkShield, InfoCircle } from "@sqs/rosetta-icons";
import {
  ACCOUNT_PROTECTIONS,
  BASE_PROTECTIONS,
  getSecuritySummary,
} from "../../constants/securityProtections";
import {
  EASE_ENTRANCE,
  EASE_EXIT,
  SLIDE_FORWARD,
} from "../../constants/motion";
import SecurityRatingMeter from "../SecurityRatingMeter/SecurityRatingMeter";

const CARD_STAGGER = 0.08;

/** Order of the On/Off rows in the Figma design. */
const LISTED_PROTECTION_KEYS = [
  "whoisPrivacy",
  "domainLock",
  "dnssec",
  "twoFactorAuth",
];

const LISTED_PROTECTIONS = LISTED_PROTECTION_KEYS.map((key) =>
  [...BASE_PROTECTIONS, ...ACCOUNT_PROTECTIONS].find((p) => p.key === key),
);

function getCardVariants(reduceMotion) {
  return {
    container: {
      initial: {},
      animate: {
        transition: reduceMotion
          ? { duration: 0 }
          : { staggerChildren: CARD_STAGGER, delayChildren: 0.05 },
      },
    },
    item: {
      initial: { opacity: 0, y: reduceMotion ? 0 : 8 },
      animate: {
        opacity: 1,
        y: 0,
        transition: reduceMotion
          ? { duration: 0 }
          : { duration: 0.35, ease: EASE_ENTRANCE },
      },
    },
  };
}

function getRatingWordVariants(reduceMotion) {
  return {
    initial: { opacity: 0, y: reduceMotion ? 0 : 8 },
    animate: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.3, ease: EASE_ENTRANCE },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : -8,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.15, ease: EASE_EXIT },
    },
  };
}

function getLede(tierKey) {
  if (tierKey === "advanced" || tierKey === "excellent") {
    return "Your domain is well protected.";
  }
  if (tierKey === "good") return "Your domain is mostly protected.";
  return "Your domain needs more protection.";
}

/**
 * Domain Overview — Security card. Shows the weighted security rating tier
 * (Medium / Good / Excellent / Advanced) as a segmented meter, followed by the
 * state of the core protections.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=2498-96107
 */
export default function SecurityScoreCard({ domain }) {
  const { radii, colors } = useTheme();
  const { domainId } = useParams();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const summary = React.useMemo(
    () => getSecuritySummary(domain),
    [domain],
  );
  const { tier, tierIndex, hasAddOn, inactive, addOnProtectionsAvailable } =
    summary;

  const variants = React.useMemo(
    () => getCardVariants(reduceMotion),
    [reduceMotion],
  );
  const ratingWordVariants = React.useMemo(
    () => getRatingWordVariants(reduceMotion),
    [reduceMotion],
  );

  const handleManageClick = React.useCallback(() => {
    if (!domainId) return;
    navigate(`/domains/${encodeURIComponent(domainId)}/settings?tab=security`, {
      state: { slideDirection: SLIDE_FORWARD },
    });
  }, [domainId, navigate]);

  const handleLinkClick = React.useCallback(
    (event) => {
      event.preventDefault();
      handleManageClick();
    },
    [handleManageClick],
  );

  const isProtectionOn = (key) =>
    key === "twoFactorAuth"
      ? Boolean(domain?.twoFactorAuth)
      : Boolean(domain?.securityProtections?.[key]);

  return (
    <motion.div
      id="domain-overview-security-card"
      variants={variants.container}
      initial="initial"
      animate="animate"
      style={{ height: "100%" }}
    >
      <Card sx={{ borderRadius: radii[2], height: "100%" }} id="securityScoreCard">
        <Card.Body>
          <Flex flexDirection="column" gap={4}>
            <motion.div variants={variants.item}>
              <Flex alignItems="center" justifyContent="space-between" gap={2}>
                <Flex alignItems="center" gap={1} flexWrap="wrap">
                  <Text.Heading.Medium as="h3" m={0}>
                    Security
                  </Text.Heading.Medium>
                  {hasAddOn && (
                    <Chip
                      label="Advanced Domain Security"
                      glyph={<CheckmarkShield />}
                      usage="badge"
                    />
                  )}
                </Flex>
                <Button.Subtle size="small" onClick={handleManageClick}>
                  Manage
                </Button.Subtle>
              </Flex>
            </motion.div>

            <Flex flexDirection="column" gap={6}>
              <motion.div variants={variants.item}>
                <Text.Body m={0}>
                  {getLede(tier.key)}{" "}
                  <TextLink href="#" onClick={handleLinkClick}>
                    Learn more
                  </TextLink>
                </Text.Body>
              </motion.div>

              <Flex flexDirection="column" gap={4}>
                <motion.div variants={variants.item}>
                  <Flex flexDirection="column" gap={4}>
                    <Text.Eyebrow
                      as="span"
                      sx={{ color: "gray.300", textTransform: "uppercase" }}
                    >
                      Rating
                    </Text.Eyebrow>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={tier.key}
                        variants={ratingWordVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Text.Display.Medium
                          as="span"
                          m={0}
                          id="domain-overview-security-rating-word"
                        >
                          {tier.label}
                        </Text.Display.Medium>
                      </motion.div>
                    </AnimatePresence>
                  </Flex>
                </motion.div>

                <SecurityRatingMeter
                  tierIndex={tierIndex}
                  reduceMotion={reduceMotion}
                />
              </Flex>

              <Flex flexDirection="column" gap={3}>
                <motion.div variants={variants.item}>
                  <Flex alignItems="flex-start" gap={1} flexWrap="wrap">
                    <Flex alignItems="flex-start" gap={1}>
                      <InfoCircle
                        css={{
                          width: 16,
                          height: 16,
                          color: "gray.300",
                          flexShrink: 0,
                          marginTop: 3,
                        }}
                      />
                      <Text.Body m={0} sx={{ color: "gray.300" }}>
                        {inactive.length > 0
                          ? `${
                              inactive.length === 1
                                ? "1 protection is inactive"
                                : `${inactive.length} protections are inactive`
                            }: ${inactive.map(({ title }) => title).join(", ")}`
                          : addOnProtectionsAvailable > 0
                            ? `${addOnProtectionsAvailable} more protections available with the Security Add-on.`
                            : "All protections are active."}
                      </Text.Body>
                    </Flex>
                    {(inactive.length > 0 || addOnProtectionsAvailable > 0) && (
                      <TextLink href="#" onClick={handleLinkClick}>
                        {inactive.length > 0 ? "Review" : "Learn more"}
                      </TextLink>
                    )}
                  </Flex>
                </motion.div>

                <motion.div
                  variants={variants.item}
                  id="domain-overview-security-protection-list"
                >
                  <Flex flexDirection="column" gap={1}>
                    {LISTED_PROTECTIONS.map(({ key, title }, index) => {
                      const on = isProtectionOn(key);
                      const isLast = index === LISTED_PROTECTIONS.length - 1;
                      return (
                        <Flex
                          key={key}
                          alignItems="center"
                          justifyContent="space-between"
                          py={1}
                          sx={{
                            borderBottom: isLast
                              ? "none"
                              : `1px solid ${colors.border.default}`,
                          }}
                        >
                          <Text.Body m={0}>{title}</Text.Body>
                          {on ? (
                            <Text.Body.Small
                              as="span"
                              m={0}
                              sx={{ color: "gray.300" }}
                            >
                              On
                            </Text.Body.Small>
                          ) : (
                            <Text.Bold.Small
                              as="span"
                              m={0}
                              sx={{ color: "gray.300" }}
                            >
                              Off
                            </Text.Bold.Small>
                          )}
                        </Flex>
                      );
                    })}
                  </Flex>
                </motion.div>
              </Flex>
            </Flex>
          </Flex>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
