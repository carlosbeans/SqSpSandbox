import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, TextLink } from "@sqs/rosetta-elements";
import { Flex, Box } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { useTheme } from "@sqs/rosetta-styled";
import { CheckmarkCircle } from "@sqs/rosetta-icons";

/**
 * DNS tab — Premium DNS summary shown to domains with the Security Add-on.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=2057-14121
 */
function StatusCell({ label, isActive, showStartBorder }) {
  return (
    <Box
      p={4}
      sx={{
        flex: "1 1 0",
        minWidth: 0,
        borderColor: "border.default",
        borderStyle: "solid",
        borderWidth: 0,
        borderTopWidth: { _: showStartBorder ? "1px" : 0, "from-m": 0 },
        borderLeftWidth: { _: 0, "from-m": showStartBorder ? "1px" : 0 },
      }}
    >
      <Stack space={2}>
        <Text.Eyebrow sx={{ color: "gray.300" }}>{label}</Text.Eyebrow>
        <Flex alignItems="center" gap={1}>
          {isActive && (
            <CheckmarkCircle
              color="fg.success"
              css={{ width: 16, height: 16, flexShrink: 0 }}
            />
          )}
          <Text.Body sx={{ color: isActive ? "fg.success" : "gray.300" }}>
            {isActive ? "Active" : "Inactive"}
          </Text.Body>
        </Flex>
      </Stack>
    </Box>
  );
}

export default function PremiumDnsSection({ sectionId, domain, protections }) {
  const { radii } = useTheme();
  const { domainId } = useParams();
  const navigate = useNavigate();

  const handleViewProtections = React.useCallback(
    (event) => {
      event.preventDefault();
      navigate(
        `/domains/${encodeURIComponent(domainId)}/settings?tab=security`,
      );
    },
    [domainId, navigate],
  );

  return (
    <Box
      as="section"
      id={sectionId}
      sx={{
        border: "1px solid",
        borderColor: "border.default",
        borderRadius: radii[2],
        overflow: "hidden",
      }}
    >
      <Stack
        space={1}
        p={4}
        bg="gray.950"
        sx={{ borderBottom: "1px solid", borderColor: "border.default" }}
      >
        <Text.Heading.Small as="h2" m={0}>
          Premium DNS
        </Text.Heading.Small>
        <Text.Body sx={{ color: "gray.300" }}>
          Advanced DNS infrastructure is active for {domain?.domainName}.{" "}
          <TextLink href="#" onClick={handleViewProtections}>
            View security protections
          </TextLink>
        </Text.Body>
      </Stack>
      <Flex sx={{ flexDirection: { _: "column", "from-m": "row" } }}>
        <StatusCell
          label="DDOS prevention"
          isActive={Boolean(protections?.improvedDdosPrevention)}
        />
        <StatusCell
          showStartBorder
          label="Secondary DNS"
          isActive={Boolean(protections?.secondaryDns)}
        />
        <StatusCell showStartBorder label="Anycast network" isActive />
      </Flex>
    </Box>
  );
}
