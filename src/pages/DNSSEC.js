import React, { useState } from "react";
import { TextLink, Toggle } from "@sqs/rosetta-elements";
import { Text, Flex, Box } from "@sqs/rosetta-primitives";
import { Stack } from "@sqs/rosetta-elements";
import { useTheme } from "@sqs/rosetta-styled";
import { usePageHeader } from "../layouts/PageHeaderContext";

function DNSSECHeaderSubtitle() {
  return (
    <>
      DNS Security Extensions (DNSSEC) protect your domain by making your DNS
      records more secure. <TextLink href="#">Learn more</TextLink>
    </>
  );
}

/**
 * @param {{ inlineHeader?: boolean }} props
 * When `inlineHeader` is true (Domain Settings DNS tab), renders title + subtitle that were previously in the shell page header.
 */
export function DNSSECContent({ inlineHeader = false }) {
  const { borders, colors } = useTheme();
  const [dnsSecEnabled, setDnsSecEnabled] = useState(true);

  return (
    <Flex
      flexDirection="column"
      px={inlineHeader ? 0 : 6}
      pt={inlineHeader ? 0 : 2}
      pb={inlineHeader ? 0 : 6}
      id={
        inlineHeader ? "domain-settings-tab-dns-content" : "dnssec-page-content"
      }
    >
      {inlineHeader ? (
        <Stack space={4} pb={6} id="domain-settings-dns-intro">
          <Text.Subtitle>DNSSEC</Text.Subtitle>
          <Text.Body>
            <DNSSECHeaderSubtitle />
          </Text.Body>
        </Stack>
      ) : null}
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

export default function DNSSEC() {
  usePageHeader({
    title: "DNSSEC",
    subtitle: <DNSSECHeaderSubtitle />,
  });

  return <DNSSECContent inlineHeader={false} />;
}
