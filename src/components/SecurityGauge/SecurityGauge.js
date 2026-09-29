import * as React from "react";
import { animate } from "framer-motion";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { useTheme } from "@sqs/rosetta-styled";
import { QuestionMarkCircle } from "@sqs/rosetta-icons";
import { EASE_ENTRANCE } from "../../constants/motion";

const GAUGE_SIZE_PX = 140;
const GAUGE_STROKE_WIDTH = 12;
const GAUGE_RADIUS = (GAUGE_SIZE_PX - GAUGE_STROKE_WIDTH) / 2;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;
const SCORE_ANIMATION_DURATION = 1.1;

function getArcColor(score, colors) {
  if (score >= 80) return colors.fg.success;
  if (score >= 50) return colors.fg.warning;
  return colors.fg.danger;
}

/**
 * Circular security score gauge.
 * `labelPosition="above"` renders `SCORE ⓘ` above the value (Security tab
 * banner); `"below"` renders it under the value (Domain Overview card).
 */
export default function SecurityGauge({
  score,
  reduceMotion,
  labelPosition = "below",
}) {
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

  const dashOffset = GAUGE_CIRCUMFERENCE * (1 - displayScore / 100);

  const label = (
    <Flex alignItems="center" gap={1}>
      <Text.Body.Small
        as="span"
        m={0}
        sx={{
          color: "gray.300",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        Score
      </Text.Body.Small>
      <QuestionMarkCircle css={{ width: 14, height: 14, color: "gray.400" }} />
    </Flex>
  );

  return (
    <Box
      sx={{
        position: "relative",
        width: GAUGE_SIZE_PX,
        height: GAUGE_SIZE_PX,
        flexShrink: 0,
      }}
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
          stroke={getArcColor(score, colors)}
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
        {labelPosition === "above" && label}
        <Text.Heading.Large as="span" m={0}>
          {displayScore}%
        </Text.Heading.Large>
        {labelPosition === "below" && label}
      </Flex>
    </Box>
  );
}
