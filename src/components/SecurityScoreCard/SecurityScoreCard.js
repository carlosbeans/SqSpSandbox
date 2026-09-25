import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { animate, useReducedMotion } from "framer-motion";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Button } from "@sqs/rosetta-react/button/next";
import { Card, Chip, Stack, TextLink } from "@sqs/rosetta-elements";
import { Text } from "@sqs/rosetta-react/text/next";
import { useTheme } from "@sqs/rosetta-styled";
import { CheckmarkShield, QuestionMarkCircle, Refresh } from "@sqs/rosetta-icons";
import { getSecuritySummary } from "../../constants/securityProtections";
import { EASE_ENTRANCE, SLIDE_FORWARD } from "../../constants/motion";

/**
 * Domain Overview — Security card. Always shows the gauge (score varies by
 * add-on status); the four-cards layout lives on the Security settings tab.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1674-86334
 */
const GAUGE_SIZE_PX = 140;
const GAUGE_STROKE_WIDTH = 12;
const GAUGE_RADIUS = (GAUGE_SIZE_PX - GAUGE_STROKE_WIDTH) / 2;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;
const SCORE_ANIMATION_DURATION = 1.1;

function SecurityGauge({ score, reduceMotion }) {
  const { colors } = useTheme();
  const [displayScore, setDisplayScore] = React.useState(
    reduceMotion ? score : 0,
  );

  React.useEffect(() => {
    if (reduceMotion) {
      setDisplayScore(score);
      return undefined;
    }
    const controls = animate(0, score, {
      duration: SCORE_ANIMATION_DURATION,
      ease: EASE_ENTRANCE,
      onUpdate: (value) => setDisplayScore(Math.round(value)),
    });
    return () => controls.stop();
  }, [score, reduceMotion]);

  const dashOffset =
    GAUGE_CIRCUMFERENCE * (1 - displayScore / 100);

  return (
    <Box
      sx={{ position: "relative", width: GAUGE_SIZE_PX, height: GAUGE_SIZE_PX, flexShrink: 0 }}
    >
      <svg
        width={GAUGE_SIZE_PX}
        height={GAUGE_SIZE_PX}
        viewBox={`0 0 ${GAUGE_SIZE_PX} ${GAUGE_SIZE_PX}`}
      >
        <circle
          cx={GAUGE_SIZE_PX / 2}
          cy={GAUGE_SIZE_PX / 2}
          r={GAUGE_RADIUS}
          fill="none"
          stroke={colors.border.default}
          strokeWidth={GAUGE_STROKE_WIDTH}
        />
        <circle
          cx={GAUGE_SIZE_PX / 2}
          cy={GAUGE_SIZE_PX / 2}
          r={GAUGE_RADIUS}
          fill="none"
          stroke={colors.fg.success}
          strokeWidth={GAUGE_STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={GAUGE_CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${GAUGE_SIZE_PX / 2} ${GAUGE_SIZE_PX / 2})`}
        />
      </svg>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={1}
        sx={{ position: "absolute", inset: 0 }}
      >
        <Text.Heading.Large as="span" m={0}>
          {displayScore}%
        </Text.Heading.Large>
        <Flex alignItems="center" gap={1}>
          <Text.Body.Small
            as="span"
            m={0}
            sx={{
              color: "gray.500",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Score
          </Text.Body.Small>
          <QuestionMarkCircle
            css={{ width: 14, height: 14, color: "gray.400" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default function SecurityScoreCard({ domain }) {
  const { radii } = useTheme();
  const { domainId } = useParams();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const summary = React.useMemo(
    () => getSecuritySummary(domain),
    [domain],
  );
  const { score, hasAddOn, inactive, addOnProtectionsAvailable } = summary;

  const handleManageClick = React.useCallback(() => {
    if (!domainId) return;
    navigate(`/domains/${encodeURIComponent(domainId)}/settings?tab=security`, {
      state: { slideDirection: SLIDE_FORWARD },
    });
  }, [domainId, navigate]);

  return (
    <Card sx={{ borderRadius: radii[1], height: "100%" }} id="securityScoreCard">
      <Card.Body>
        <Stack space={4}>
          <Flex alignItems="center" justifyContent="space-between" gap={2}>
            <Flex alignItems="center" gap={2}>
              <Text.Heading.Small as="h3" m={0}>
                Security
              </Text.Heading.Small>
              {hasAddOn && (
                <Chip
                  label="Add-on"
                  glyph={<CheckmarkShield />}
                  usage="badge"
                />
              )}
            </Flex>
            <Button.Subtle size="small" onClick={handleManageClick}>
              Manage
            </Button.Subtle>
          </Flex>

          <Flex
            alignItems="center"
            gap={5}
            flexWrap="wrap"
            justifyContent="center"
          >
            <SecurityGauge score={score} reduceMotion={reduceMotion} />
            <Stack space={2} sx={{ flex: 1, minWidth: 200 }}>
              <Text.Body sx={{ fontWeight: 500 }}>
                {inactive.length === 0
                  ? "Your domain is well protected."
                  : "Your domain is mostly protected."}
              </Text.Body>
              <Flex alignItems="flex-start" gap={2}>
                <Refresh css={{ width: 16, height: 16, color: "gray.400", flexShrink: 0, marginTop: 2 }} />
                <Text.Body.Small m={0} sx={{ color: "gray.500" }}>
                  {inactive.length > 0 ? (
                    <>
                      {inactive.length === 1
                        ? "1 protection is inactive. "
                        : `${inactive.length} protections are inactive. `}
                      <TextLink href="#" onClick={(event) => { event.preventDefault(); handleManageClick(); }}>
                        Review
                      </TextLink>
                    </>
                  ) : addOnProtectionsAvailable > 0 ? (
                    <>
                      {addOnProtectionsAvailable} more protections available
                      with the Security Add-on.{" "}
                      <TextLink href="#" onClick={(event) => { event.preventDefault(); handleManageClick(); }}>
                        Learn more
                      </TextLink>
                    </>
                  ) : (
                    "All protections are active."
                  )}
                </Text.Body.Small>
              </Flex>
              {inactive.length > 0 && (
                <Flex gap={1} flexWrap="wrap">
                  {inactive.map(({ key, title }) => (
                    <Chip key={key} label={title} usage="badge" />
                  ))}
                </Flex>
              )}
            </Stack>
          </Flex>
        </Stack>
      </Card.Body>
    </Card>
  );
}
