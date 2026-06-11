import React from "react";
import { Text, Flex, Box } from "@sqs/rosetta-primitives";
import { Plus, Checkmark } from "@sqs/rosetta-icons";
import { useTheme } from "@sqs/rosetta-styled";

const stateStyles = (theme) => ({
  default: {
    background: theme.colors.white,
    borderColor: theme.colors.gray[800],
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.colors.gray[600],
    },
  },
  selected: {
    background: theme.colors.white,
    borderColor: theme.colors.gray[100],
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.colors.gray[100],
    },
  },
  disabled: {
    background: theme.colors.gray[900],
    borderColor: theme.colors.gray[800],
    cursor: "not-allowed",
    opacity: 0.5,
  },
});

function StateIcon({ state }) {
  if (state === "selected") {
    return <Checkmark css={{ width: 20, height: 20, flexShrink: 0 }} />;
  }
  if (state === "disabled") {
    return null;
  }
  return (
    <Plus css={{ width: 20, height: 20, color: "gray.300", flexShrink: 0 }} />
  );
}

export default function DNSPresetCard({
  title,
  description,
  state = "default",
  onClick,
}) {
  const theme = useTheme();
  const styles = stateStyles(theme);
  const currentStyle = styles[state] || styles.default;

  return (
    <Box
      as="button"
      id={`dns-preset-card-${title?.toLowerCase().replace(/\s+/g, "-")}`}
      onClick={state !== "disabled" ? onClick : undefined}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minHeight: 135,
        width: "100%",
        paddingTop: theme.space[3],
        paddingBottom: theme.space[4],
        paddingLeft: theme.space[4],
        paddingRight: theme.space[4],
        borderRadius: theme.radii[2],
        border: "1px solid",
        textAlign: "left",
        transition: "border-color 0.15s ease, background 0.15s ease",
        ...currentStyle,
      }}
    >
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        css={{ width: "100%" }}
      >
        <Box css={{ flex: "1 1 auto", minWidth: 0 }}>
          <Text.Body fontWeight="medium">{title}</Text.Body>
          {description && (
            <Text.Body color="gray.300">{description}</Text.Body>
          )}
        </Box>
        <StateIcon state={state} />
      </Flex>
    </Box>
  );
}
