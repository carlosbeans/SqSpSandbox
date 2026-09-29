import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Stack, TextLink, ProgressIndicator } from "@sqs/rosetta-elements";
import { IconButton } from "@sqs/rosetta-react";
import { Text } from "@sqs/rosetta-react/text/next";
import { useTheme } from "@sqs/rosetta-styled";
import {
  CheckmarkCircle,
  Circle,
  ChevronSmallDown,
  ChevronSmallUp,
} from "@sqs/rosetta-icons";
import { EASE_ENTRANCE, EASE_EXIT } from "../../constants/motion";

/**
 * Domain Overview — setup guide module. Rosetta's `SetupGuide` is a vertical
 * task list and doesn't match the Figma's horizontal image-card layout, so
 * this is a purpose-built component instead.
 * @see https://www.figma.com/design/fQCQuaAESVa9K4JXL3O7dB/Domain-Overview-%E2%80%94-Redesign-2026?node-id=4324-78776
 */
const TASKS = [
  {
    key: "twoFactorAuth",
    title: "Set up 2FA",
    description: "Protect your account with an extra layer of security",
    completed: true,
  },
  {
    key: "website",
    title: "Create or connect a website",
    description:
      "Build a new website for your domain or connect it to an existing site.",
    completed: true,
  },
  {
    key: "email",
    title: "Set up professional email",
    description:
      "Get a custom email address for your domain with Google Workspace",
    completed: false,
    ctaLabel: "Get started",
  },
  {
    key: "payLinks",
    title: "Start selling with Pay Links",
    description:
      "Create custom payment links with your domain, and get paid on the go.",
    completed: true,
  },
];

function TaskAsset({ taskKey }) {
  if (taskKey === "twoFactorAuth") {
    return (
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#4c4240",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.95,
            backgroundImage: "url(/assets/setup-guide/setup-2fa-background.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "43%",
            aspectRatio: "119 / 101",
            borderRadius: "4px",
            overflow: "hidden",
            boxShadow:
              "0px 0px 1px 0px rgba(0,0,0,0.08), 0px 4px 16px 0px rgba(0,0,0,0.12)",
          }}
        >
          <img
            src="/assets/setup-guide/setup-2fa-card.png"
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    );
  }

  if (taskKey === "website") {
    return (
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          backgroundImage: "linear-gradient(to right, #292522, #43413c)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "5%",
            top: "2%",
            width: "66%",
            height: "94%",
            overflow: "hidden",
            backgroundColor: "#202020",
          }}
        >
          <img
            src="/assets/setup-guide/setup-website.jpeg"
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    );
  }

  const image =
    taskKey === "email"
      ? "/assets/setup-guide/setup-email.jpeg"
      : "/assets/setup-guide/setup-paylinks.jpeg";

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

function TaskCard({ task }) {
  const { colors } = useTheme();
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      gap={3}
      pt={4}
      px={4}
      height="100%"
      sx={{
        backgroundColor: "bg.base",
        borderTopLeftRadius: "6px",
        borderTopRightRadius: "6px",
        border: task.completed
          ? "none"
          : `1px solid ${colors.border.default}`,
        borderBottom: "none",
      }}
    >
      <Flex flexDirection="column" gap={1} sx={{ minHeight: 87 }}>
        <Flex alignItems="center" gap={1}>
          {task.completed ? (
            <CheckmarkCircle
              css={{ width: 16, height: 16, color: "fg.success", flexShrink: 0 }}
            />
          ) : (
            <Circle css={{ width: 16, height: 16, color: "fg.default", flexShrink: 0 }} />
          )}
          <Text.Body m={0} sx={{ fontWeight: 500, color: task.completed ? "gray.300" : "gray.100" }}>
            {task.title}
          </Text.Body>
        </Flex>
        <Flex flexDirection="column" gap={2} flex="1">
          <Text.Body.Small m={0} sx={{ color: "gray.300" }}>
            {task.description}
          </Text.Body.Small>
          {!task.completed && task.ctaLabel && (
            <TextLink href="#">
              <Text.Bold.Small>{task.ctaLabel} →</Text.Bold.Small>
            </TextLink>
          )}
        </Flex>
      </Flex>
      <Box flex="1" sx={{ minHeight: 0, borderTopLeftRadius: "6px", borderTopRightRadius: "6px", overflow: "hidden" }}>
        <TaskAsset taskKey={task.key} />
      </Box>
    </Flex>
  );
}

export default function DomainSetupGuide({ domainName }) {
  const reduceMotion = useReducedMotion();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const completedCount = TASKS.filter((task) => task.completed).length;

  return (
    <Box
      id="domainSetupGuide"
      pt={4}
      sx={{ backgroundColor: "bg.inset", borderRadius: "6px", overflow: "hidden" }}
    >
      <Stack space={4}>
        <Flex alignItems="center" gap={4} px={4}>
          <Flex flex="1" alignItems="center" justifyContent="space-between" gap={2}>
            <Text.Heading.Small as="h3" m={0}>
              Finish setting up {domainName}
            </Text.Heading.Small>
            <Flex alignItems="center" gap={1}>
              <Text.Eyebrow m={0}>
                {completedCount} / {TASKS.length}
              </Text.Eyebrow>
              <ProgressIndicator.Container
                width={72}
                height={9}
                css={{ borderRadius: "10px" }}
              >
                <ProgressIndicator.Track
                  value={completedCount}
                  max={TASKS.length}
                  backgroundColor="blue.300"
                  css={{ borderRadius: "10px" }}
                />
              </ProgressIndicator.Container>
            </Flex>
          </Flex>
          <IconButton.Subtle
            icon={isCollapsed ? ChevronSmallDown : ChevronSmallUp}
            label={isCollapsed ? "Expand setup guide" : "Collapse setup guide"}
            onClick={() => setIsCollapsed((prev) => !prev)}
          />
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
              <Flex gap={2} px={4} alignItems="stretch">
                {TASKS.map((task) => (
                  <Box key={task.key} sx={{ flex: "1 1 220px", minWidth: 200, height: 251 }}>
                    <TaskCard task={task} />
                  </Box>
                ))}
              </Flex>
            </motion.div>
          )}
        </AnimatePresence>
      </Stack>
    </Box>
  );
}
