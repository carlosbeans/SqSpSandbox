import * as React from "react";
import { ActionList } from "@sqs/rosetta-compositions";
import { Tabs, TextLink } from "@sqs/rosetta-elements";
import { Text, Button, Flex, Box, Touchable } from "@sqs/rosetta-primitives";
import { useTheme } from "@sqs/rosetta-styled";
import { NotificationBell, Ellipses } from "@sqs/rosetta-icons";

function SectionHeading({ children }) {
  return (
    <Box px={4} py={2}>
      <Text.Body
        sx={{
          color: "gray.300",
          fontSize: "10px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 500,
          lineHeight: "16px",
          margin: 0,
        }}
      >
        {children}
      </Text.Body>
    </Box>
  );
}

function NotificationOverflowMenu() {
  return (
    <ActionList.PopOver
      renderTrigger={({ toggleActionListOpen }) => (
        <Touchable.Element.Icon
          aria-label="Notification options"
          onClick={(e) => {
            e.stopPropagation();
            toggleActionListOpen();
          }}
        >
          <Ellipses
            css={{
              width: 20,
              height: 20,
            }}
          />
        </Touchable.Element.Icon>
      )}
      position="bottom-center"
    >
      {({ onRequestClose }) => (
        <Flex as="ul" bg="white" flexDirection="column" py={1} m={0} px={0} sx={{ listStyle: "none" }}>
          <ActionList.Item onClick={onRequestClose}>Mark as read</ActionList.Item>
          <ActionList.Item onClick={onRequestClose}>Dismiss</ActionList.Item>
        </Flex>
      )}
    </ActionList.PopOver>
  );
}

function NotificationRow({
  titleLine,
  headline,
  actionLabel,
  timestamp,
  variant = "default",
}) {
  const isAlert = variant === "alert";
  return (
    <Box px={2} pb={2}>
      <Flex
        alignItems="flex-start"
        gap={2}
        p={2}
        sx={{
          borderRadius: 1,
          backgroundColor: isAlert ? "#fef3f2" : "white",
        }}
      >
        <Box
          flexShrink={0}
          mt={1}
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: isAlert ? "#c32d38" : "#0862d1",
          }}
          aria-hidden
        />
        <Flex flexDirection="column" gap={1} minWidth={0} sx={{ flex: "1 1 auto" }}>
          {titleLine && (
            <Text.Body fontWeight="medium" fontSize={2} color="gray.100" m={0}>
              {titleLine}
            </Text.Body>
          )}
          <Text.Body fontWeight="medium" fontSize={3} color="gray.100" m={0}>
            {headline}
          </Text.Body>
          {actionLabel && (
            <TextLink href="#" onClick={(e) => e.preventDefault()}>
              {actionLabel}
            </TextLink>
          )}
          <Text.Body fontSize={2} color="gray.400" m={0} sx={{ lineHeight: "16px" }}>
            {timestamp}
          </Text.Body>
        </Flex>
        <Box flexShrink={0}>
          <NotificationOverflowMenu />
        </Box>
      </Flex>
    </Box>
  );
}

export default function NotificationsPopover() {
  const { borders, colors } = useTheme();
  const [activeTab, setActiveTab] = React.useState("unread");

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexShrink: 0,
        flexGrow: 0,
        alignItems: "center",
      }}
    >
      <ActionList.PopOver
        position="bottom-center"
        anchorPoint={{ x: "center", y: "bottom" }}
        closeOnClickOutside
        closeOnEsc
        renderTrigger={({ toggleActionListOpen, isOpen }) => (
          <Touchable.Element.Icon
            aria-label="Notifications and announcements"
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            onClick={toggleActionListOpen}
          >
            <NotificationBell
              css={{
                width: 22,
                height: 22,
                color: colors.gray[100],
              }}
            />
          </Touchable.Element.Icon>
        )}
      >
      {() => (
        <Flex
          id="appshell-notifications-panel"
          flexDirection="column"
          bg="white"
          m={0}
          sx={{
            width: "min(368px, 92vw)",
            maxHeight: "min(726px, 85vh)",
            boxShadow:
              "0 0 1px 0 rgba(0,0,0,0.08), 0 8px 32px 0 rgba(0,0,0,0.12), 0 16px 64px 0 rgba(0,0,0,0.12)",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Box pt={4} px={4} pb={2}>
            <Text.Subtitle fontWeight="medium" color="gray.100" m={0}>
              Notifications & announcements
            </Text.Subtitle>
          </Box>

          <Box sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}>
            <Tabs
              options={[
                { label: "Unread (6)", value: "unread" },
                { label: "All", value: "all" },
              ]}
              value={activeTab}
              onChange={setActiveTab}
            />
          </Box>

          <Box
            sx={{
              flex: "1 1 auto",
              overflowY: "auto",
              minHeight: 0,
            }}
          >
            <SectionHeading>Alerts</SectionHeading>
            <NotificationRow
              variant="alert"
              titleLine="blendyoga.com"
              headline="Domain expires soon"
              actionLabel="Manage"
              timestamp="Jan 12 · 4:30 PM"
            />

            <SectionHeading>Today</SectionHeading>
            <NotificationRow
              titleLine="Blend Yoga"
              headline="New order #2468"
              actionLabel="Manage"
              timestamp="Jan 15 · 4:30 PM"
            />

            <SectionHeading>Last 7 days</SectionHeading>
            <NotificationRow
              titleLine="Ortiz Photography"
              headline="Invoice #12345 paid"
              actionLabel="View invoice"
              timestamp="Oct 26 · 4:30 PM"
            />
            <NotificationRow
              headline="Squarespace Payments now available"
              actionLabel="Connect Squarespace Payments"
              timestamp="Oct 20 · 1:25 PM"
            />
          </Box>

          <Box px={4} py={3} sx={{ borderTop: borders[1], borderColor: colors.gray[800] }}>
            <Button.Secondary width="100%" size="large">
              Mark all as read
            </Button.Secondary>
          </Box>
        </Flex>
      )}
      </ActionList.PopOver>
    </Box>
  );
}
