import * as React from "react";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { Plus, Website, Link } from "@sqs/rosetta-icons";

/**
 * Domain Overview — "Connected products" module beneath the header meta
 * line. Shows each product connection's status plus an affordance to add
 * another connection.
 * @see https://www.figma.com/design/fQCQuaAESVa9K4JXL3O7dB/Domain-Overview-%E2%80%94-Redesign-2026?node-id=4324-78768
 */
const ICON_CONTAINER_PX = 28;

const STATUS_META = {
  connected: { label: "Connected", color: "fg.success" },
  needsReview: { label: "Needs Review", color: "fg.warning" },
};

function ConnectionTile({ icon: Icon, label, status, onClick, isAction }) {
  const statusMeta = status && STATUS_META[status];
  return (
    <Flex
      as={onClick ? "button" : "div"}
      onClick={onClick}
      flexDirection="column"
      justifyContent="center"
      gap={2}
      p={2}
      flex="1"
      sx={{
        maxWidth: 180,
        border: "1px solid",
        borderColor: "border.default",
        borderRadius: "6px",
        backgroundColor: isAction ? "bg.inset" : "bg.base",
        cursor: onClick ? "pointer" : "default",
        appearance: "none",
        font: "inherit",
        textAlign: "left",
      }}
    >
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <Flex
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          sx={{
            width: ICON_CONTAINER_PX,
            height: ICON_CONTAINER_PX,
            borderRadius: "2px",
            border: "1px solid",
            borderColor: "border.default",
            backgroundColor: isAction ? "bg.default" : "bg.inset",
          }}
        >
          <Icon css={{ width: 22, height: 22, color: "gray.400" }} />
        </Flex>
        {statusMeta && (
          <Flex alignItems="center" gap={1}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "3px",
                backgroundColor: statusMeta.color,
              }}
            />
            <Text.Body.Small m={0} sx={{ color: statusMeta.color }}>
              {statusMeta.label}
            </Text.Body.Small>
          </Flex>
        )}
      </Flex>
      <Text.Bold m={0}>{label}</Text.Bold>
    </Flex>
  );
}

export default function ConnectedProducts({ connections = {}, onAddConnection }) {
  return (
    <Flex flexDirection="column" gap={2} width="100%">
      <Text.Heading.Small as="h3" m={0}>
        Connected products
      </Text.Heading.Small>
      <Flex gap={3} flexWrap="wrap" alignItems="stretch">
        <ConnectionTile
          icon={Plus}
          label="Add connection"
          onClick={onAddConnection}
          isAction
        />
        {connections.website && (
          <ConnectionTile
            icon={Website}
            label="Website"
            status={connections.website}
          />
        )}
        {connections.payLinks && (
          <ConnectionTile
            icon={Link}
            label="Pay Links"
            status={connections.payLinks}
          />
        )}
      </Flex>
    </Flex>
  );
}
