import React, { useState } from "react";
import { TextLink, Toggle } from "@sqs/rosetta-elements";
import { Text, Flex, Box } from "@sqs/rosetta-primitives";
import { useTheme } from "@sqs/rosetta-styled";
import { usePageHeader } from "../layouts/PageHeaderContext";

export default function DNSSEC() {
  const { borders, colors } = useTheme();
  const [dnsSecEnabled, setDnsSecEnabled] = useState(true);

  usePageHeader({
    title: "DNSSEC",
    subtitle: (
      <>
        DNS Security Extensions (DNSSEC) protect your domain by making your DNS
        records more secure. <TextLink href="#">Learn more</TextLink>
      </>
    ),
  });

  return (
    <Flex
      as="main"
      id="dnssec-page-content"
      flexDirection="column"
      px={6}
      pt={2}
      pb={6}
    >
      <Box
        py={6}
        sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}
      >
        <Flex alignItems="center" justifyContent="space-between" gap={4}>
          <Text.Body>DNS Security Extensions</Text.Body>
          <Toggle
            checked={dnsSecEnabled}
            onChange={(checked) => setDnsSecEnabled(checked)}
            aria-label="DNS Security Extensions"
          />
        </Flex>
      </Box>
    </Flex>
  );
}
