import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Card, Stack, TextLink } from "@sqs/rosetta-elements";
import { IconButton } from "@sqs/rosetta-react";
import { Text } from "@sqs/rosetta-react/text/next";
import { useTheme } from "@sqs/rosetta-styled";
import {
  CheckmarkCircle,
  Circle,
  ChevronLargeDown,
  ChevronLargeUp,
} from "@sqs/rosetta-icons";
import { EASE_ENTRANCE, EASE_EXIT } from "../../constants/motion";

/**
 * Domain Overview — setup guide module. Rosetta's `SetupGuide` is a vertical
 * task list and doesn't match the Figma's horizontal image-card layout, so
 * this is a purpose-built component instead.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1670-82994
 */
const TASKS = [
  {
    key: "twoFactorAuth",
    title: "Enable two-factor authentication",
    completed: true,
    image: "/assets/screenshots/Img1_Landscape.jpeg",
  },
  {
    key: "website",
    title: "Create or connect a website",
    completed: false,
    ctaLabel: "Get started",
    image: "/assets/screenshots/Img2_Landscape.jpeg",
  },
  {
    key: "email",
    title: "Set up professional email",
    completed: false,
    ctaLabel: "Get started",
    image: "/assets/screenshots/Img3_Landscape.jpeg",
  },
  {
    key: "payLinks",
    title: "Start selling with Pay Links",
    completed: false,
    ctaLabel: "Get started",
    image: "/assets/screenshots/Img4_Landscape.jpeg",
  },
];

function ProgressBar({ completed, total, colors }) {
  return (
    <Flex gap={1} width={72} height={4} flexShrink={0}>
      {Array.from({ length: total }).map((_, index) => (
        <Box
          key={`segment-${index}`}
          flex="1"
          sx={{
            height: "100%",
            borderRadius: "2px",
            backgroundColor:
              index < completed ? colors.fg.accent : colors.gray[800],
          }}
        />
      ))}
    </Flex>
  );
}

function TaskCard({ task }) {
  const { colors, radii } = useTheme();
  return (
    <Box
      sx={{
        borderRadius: radii[1],
        border: `1px solid ${colors.border.default}`,
        overflow: "hidden",
        height: "100%",
      }}
    >
      <Box
        sx={{
          height: 96,
          backgroundImage: `url(${task.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Stack space={2} p={3}>
        <Flex alignItems="flex-start" gap={2}>
          {task.completed ? (
            <CheckmarkCircle
              css={{ width: 18, height: 18, color: "fg.success", flexShrink: 0, marginTop: 2 }}
            />
          ) : (
            <Circle
              css={{ width: 18, height: 18, color: "gray.400", flexShrink: 0, marginTop: 2 }}
            />
          )}
          <Text.Body m={0} sx={{ fontWeight: 500 }}>
            {task.title}
          </Text.Body>
        </Flex>
        {!task.completed && task.ctaLabel && (
          <TextLink href="#">
            <Text.Body.Small>{task.ctaLabel} →</Text.Body.Small>
          </TextLink>
        )}
      </Stack>
    </Box>
  );
}

export default function DomainSetupGuide({ domainName }) {
  const { colors, radii } = useTheme();
  const reduceMotion = useReducedMotion();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const completedCount = TASKS.filter((task) => task.completed).length;

  return (
    <Card sx={{ borderRadius: radii[1] }} id="domainSetupGuide">
      <Card.Body>
        <Stack space={4}>
          <Flex alignItems="center" justifyContent="space-between" gap={2}>
            <Text.Heading.Small as="h3" m={0}>
              Finish setting up {domainName}
            </Text.Heading.Small>
            <Flex alignItems="center" gap={2}>
              <ProgressBar
                completed={completedCount}
                total={TASKS.length}
                colors={colors}
              />
              <Text.Body.Small m={0} sx={{ color: "gray.400" }}>
                {completedCount} / {TASKS.length}
              </Text.Body.Small>
              <IconButton.Subtle
                icon={isCollapsed ? ChevronLargeDown : ChevronLargeUp}
                label={isCollapsed ? "Expand setup guide" : "Collapse setup guide"}
                onClick={() => setIsCollapsed((prev) => !prev)}
              />
            </Flex>
          </Flex>

          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                key="setup-guide-tasks"
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.3, ease: EASE_ENTRANCE },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: EASE_EXIT },
                }}
                style={{ overflow: "hidden" }}
              >
                <Flex gap={4} flexWrap="wrap">
                  {TASKS.map((task) => (
                    <Box key={task.key} sx={{ flex: "1 1 220px", minWidth: 200 }}>
                      <TaskCard task={task} />
                    </Box>
                  ))}
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
        </Stack>
      </Card.Body>
    </Card>
  );
}
