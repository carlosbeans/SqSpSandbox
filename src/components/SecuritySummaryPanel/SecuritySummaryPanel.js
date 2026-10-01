import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Chip, TextLink } from "@sqs/rosetta-elements";
import { Button } from "@sqs/rosetta-react/button/next";
import { Text } from "@sqs/rosetta-react/text/next";
import { useTheme } from "@sqs/rosetta-styled";
import { InfoCircle } from "@sqs/rosetta-icons";
import {
  getRatingStatus,
  getSecuritySummary,
} from "../../constants/securityProtections";
import {
  EASE_ENTRANCE,
  EASE_EXIT,
  SLIDE_FORWARD,
} from "../../constants/motion";
import SecurityRatingMeter from "../SecurityRatingMeter/SecurityRatingMeter";

const ITEM_STAGGER = 0.08;

function getPanelVariants(reduceMotion) {
  return {
    container: {
      initial: { opacity: 0, y: reduceMotion ? 0 : 8 },
      animate: {
        opacity: 1,
        y: 0,
        transition: reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.35,
              ease: EASE_ENTRANCE,
              staggerChildren: ITEM_STAGGER,
              delayChildren: 0.05,
            },
      },
      exit: { opacity: 0, y: reduceMotion ? 0 : -8 },
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
    value: {
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
    },
  };
}

function StatusMessage({ children }) {
  return (
    <Flex alignItems="center" gap={1}>
      <InfoCircle
        css={{
          width: 16,
          height: 16,
          color: "gray.300",
          flexShrink: 0,
          display: "block",
        }}
      />
      <Text.Body.Small m={0} sx={{ color: "gray.300" }}>
        {children}
      </Text.Body.Small>
    </Flex>
  );
}

function AnimatedValue({ valueKey, variants, children }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={valueKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Text.Display.Medium as="span" m={0}>
          {children}
        </Text.Display.Medium>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Security tab — summary panel. Add-on domains get Rating / Coverage /
 * Monitoring; other domains get Rating / Coverage and an upsell header.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1674-76439
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=2008-113039
 */
export default function SecuritySummaryPanel({ domain }) {
  const { radii, colors } = useTheme();
  const { domainId } = useParams();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const { tier, tierIndex, hasAddOn, activeCount, totalCount, inactive } =
    React.useMemo(() => getSecuritySummary(domain), [domain]);

  const variants = React.useMemo(
    () => getPanelVariants(reduceMotion),
    [reduceMotion],
  );

  const alertCount = Number(domain?.securityAlerts72h) || 0;
  const renewsOn = domain?.securityAddOnRenewsOn;
  const border = `1px solid ${colors.border.default}`;

  const handleViewActivity = React.useCallback(
    (event) => {
      event.preventDefault();
      if (!domainId) return;
      navigate(
        `/domains/${encodeURIComponent(domainId)}/settings?tab=activity`,
        { state: { slideDirection: SLIDE_FORWARD } },
      );
    },
    [domainId, navigate],
  );

  const cardSx = (isLast) => ({
    flex: "1 1 0",
    minWidth: 0,
    borderBottom: isLast ? "none" : { _: border, "from-m": "none" },
    borderRight: isLast ? "none" : { _: "none", "from-m": border },
  });

  const article = /^[aeiou]/i.test(tier.label) ? "an" : "a";

  return (
    <motion.div
      id="security-summary-panel"
      variants={variants.container}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: "100%" }}
    >
      <Box
        sx={{ border, borderRadius: radii[2], overflow: "hidden", width: "100%" }}
      >
        <Flex
          id="security-summary-header"
          alignItems={{ _: "flex-start", "from-m": "center" }}
          flexDirection={{ _: "column", "from-m": "row" }}
          gap={4}
          p={4}
          bg="gray.950"
          sx={{ borderBottom: border }}
        >
          <Flex flexDirection="column" gap={1} flex="1 1 0" minWidth={0}>
            <Text.Heading.Small as="h2" m={0}>
              {hasAddOn
                ? "Your security add-on is active"
                : "Strengthen protection and unlock advanced monitoring"}
            </Text.Heading.Small>
            {hasAddOn ? (
              renewsOn && (
                <Text.Body.Small
                  m={0}
                  sx={{
                    color: "fg.muted",
                    fontFeatureSettings: '"lnum" 1, "tnum" 1',
                  }}
                >
                  Subscription renews {renewsOn}
                </Text.Body.Small>
              )
            ) : (
              <Text.Body.Small m={0} sx={{ color: "fg.muted" }}>
                Your domain currently has {article} {tier.label.toLowerCase()}{" "}
                rating. Turn on your remaining standard settings and add Add-on
                for automated threat coverage.
              </Text.Body.Small>
            )}
          </Flex>
          <Button.Strong
            size="large"
            sx={{ whiteSpace: "nowrap", flexShrink: 0 }}
          >
            {hasAddOn ? "Manage subscription" : "Get add-on"}
          </Button.Strong>
        </Flex>

        <Flex
          flexDirection={{ _: "column", "from-m": "row" }}
          alignItems="stretch"
        >
          <Flex
            id="security-summary-rating"
            flexDirection="column"
            gap={4}
            p={4}
            sx={cardSx(false)}
          >
            <motion.div variants={variants.item}>
              <Text.Eyebrow
                as="span"
                sx={{ color: "gray.300", textTransform: "uppercase" }}
              >
                Rating
              </Text.Eyebrow>
            </motion.div>
            <motion.div variants={variants.item}>
              <Flex flexDirection="column" gap={2}>
                <AnimatedValue valueKey={tier.key} variants={variants.value}>
                  {tier.label}
                </AnimatedValue>
                <StatusMessage>{getRatingStatus(tier.key)}</StatusMessage>
              </Flex>
            </motion.div>
            <SecurityRatingMeter
              id="security-summary-rating-meter"
              tierIndex={tierIndex}
              reduceMotion={reduceMotion}
            />
          </Flex>

          <Flex
            id="security-summary-coverage"
            flexDirection="column"
            gap={4}
            p={4}
            sx={cardSx(!hasAddOn)}
          >
            <motion.div variants={variants.item}>
              <Text.Eyebrow
                as="span"
                sx={{ color: "gray.300", textTransform: "uppercase" }}
              >
                Coverage
              </Text.Eyebrow>
            </motion.div>
            <motion.div variants={variants.item}>
              <Flex flexDirection="column" gap={2}>
                <AnimatedValue
                  valueKey={`${activeCount}-${totalCount}`}
                  variants={variants.value}
                >
                  {activeCount} / {totalCount}
                </AnimatedValue>
                <StatusMessage>
                  {inactive.length === 0
                    ? "All protections are active"
                    : inactive.length === 1
                      ? "1 protection is inactive"
                      : `${inactive.length} protections are inactive`}
                </StatusMessage>
                {inactive.length > 0 && (
                  <Flex gap={1} flexWrap="wrap">
                    {inactive.map(({ key, title }) => (
                      <Chip key={key} label={title} usage="badge" />
                    ))}
                  </Flex>
                )}
              </Flex>
            </motion.div>
          </Flex>

          {hasAddOn && (
            <Flex
              id="security-summary-monitoring"
              flexDirection="column"
              gap={4}
              p={4}
              sx={cardSx(true)}
            >
              <motion.div variants={variants.item}>
                <Text.Eyebrow
                  as="span"
                  sx={{ color: "gray.300", textTransform: "uppercase" }}
                >
                  Monitoring
                </Text.Eyebrow>
              </motion.div>
              <motion.div variants={variants.item}>
                <Flex flexDirection="column" gap={2}>
                  <AnimatedValue
                    valueKey={`alerts-${alertCount}`}
                    variants={variants.value}
                  >
                    {alertCount} {alertCount === 1 ? "alert" : "alerts"}
                  </AnimatedValue>
                  <Flex alignItems="center" gap={1} flexWrap="wrap">
                    <StatusMessage>Past 72 hrs</StatusMessage>
                    <TextLink href="#" onClick={handleViewActivity}>
                      <Text.Body.Small as="span" m={0}>
                        View activity
                      </Text.Body.Small>
                    </TextLink>
                  </Flex>
                </Flex>
              </motion.div>
            </Flex>
          )}
        </Flex>
      </Box>
    </motion.div>
  );
}
