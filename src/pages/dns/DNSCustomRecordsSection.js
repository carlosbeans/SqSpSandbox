import React from "react";
import { Stack, TextLink } from "@sqs/rosetta-elements";
import { Flex, Box } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { Button } from "@sqs/rosetta-react/button/next";
import { useTheme } from "@sqs/rosetta-styled";
import DNSTable from "./DNSTable";

export default function DNSCustomRecordsSection({
  sectionId,
  scrollMarginTop,
  customRecords,
}) {
  const { radii, borders, colors } = useTheme();

  return (
    <Box as="section" id={sectionId} sx={{ scrollMarginTop }}>
      <Stack space={4}>
        <Flex alignItems="flex-start" justifyContent="space-between" gap={4}>
          <Stack space={1}>
            <Text.Heading.Large as="h2" mb={0}>Custom records</Text.Heading.Large>
            <Text.Body>
              DNS records point to services your domain uses, like forwarding
              your domain or setting up an email service.{" "}
              <TextLink href="#">Learn more about DNS settings</TextLink>
            </Text.Body>
          </Stack>
          <Button size="medium" sx={{ whiteSpace: "nowrap", flexShrink: 0 }}>
            Add Record
          </Button>
        </Flex>
        <Stack
          p={3}
          sx={{
            borderRadius: radii[1],
            border: borders[1],
            borderColor: colors.gray[800],
          }}
        >
          <DNSTable records={customRecords} />
        </Stack>
      </Stack>
    </Box>
  );
}
