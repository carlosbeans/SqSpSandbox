import * as React from "react";
import { Box, Flex, Text } from "@sqs/rosetta-primitives";
import { useTheme } from "@sqs/rosetta-styled";
import { CreditCard, Plus } from "@sqs/rosetta-icons";

/**
 * Domain Overview — "Connected products" module beneath the header meta
 * line. Shows each product connected to this domain plus an affordance to
 * add another connection.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1670-82994
 */
const ICON_CONTAINER_PX = 28;

function ConnectionTile({ icon: Icon, label, onClick, isAction }) {
  const { colors } = useTheme();
  return (
    <Flex
      as={onClick ? "button" : "div"}
      onClick={onClick}
      alignItems="center"
      gap={2}
      p={2}
      sx={{
        border: `1px solid ${colors.border.default}`,
        borderRadius: 1,
        backgroundColor: "transparent",
        cursor: onClick ? "pointer" : "default",
        appearance: "none",
        font: "inherit",
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        sx={{
          width: ICON_CONTAINER_PX,
          height: ICON_CONTAINER_PX,
          borderRadius: 1,
          border: isAction ? `1px dashed ${colors.border.default}` : "none",
          backgroundColor: isAction ? "transparent" : "gray.900",
        }}
      >
        <Icon css={{ width: 16, height: 16, color: "gray.400" }} />
      </Flex>
      <Text.Body m={0} sx={{ fontSize: "14px", color: isAction ? "gray.400" : "gray.100" }}>
        {label}
      </Text.Body>
    </Flex>
  );
}

export default function ConnectedProducts({ connectedPayments = [], onAddConnection }) {
  return (
    <Flex flexDirection="column" gap={2} width="100%">
      <Text.Label
        m={0}
        color="gray.300"
        css={{ fontSize: "11px", letterSpacing: "0.55px", textTransform: "uppercase" }}
      >
        Connected products
      </Text.Label>
      <Flex gap={2} flexWrap="wrap" alignItems="center">
        {connectedPayments.map((name) => (
          <ConnectionTile key={name} icon={CreditCard} label={name} />
        ))}
        <ConnectionTile icon={Plus} label="Add connection" onClick={onAddConnection} isAction />
      </Flex>
    </Flex>
  );
}