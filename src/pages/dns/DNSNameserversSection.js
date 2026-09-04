import React from "react";
import { Stack } from "@sqs/rosetta-elements";
import { Flex, Box } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { Button } from "@sqs/rosetta-react/button/next";
import { useTheme } from "@sqs/rosetta-styled";

export default function DNSNameserversSection({ sectionId, scrollMarginTop }) {
  const { radii, borders, colors } = useTheme();

  return (
    <Box as="section" id={sectionId} sx={{ scrollMarginTop }}>
      <Stack space={4}>
        <Flex alignItems="flex-start" justifyContent="space-between" gap={4}>
          <Stack space={1}>
            <Text.Heading.Large as="h2" mb={0}>Nameservers</Text.Heading.Large>
            <Text.Body>
              Use Squarespace Nameservers to manage your domain's
              nameservers. Learn more about nameservers
            </Text.Body>
          </Stack>
          <Button size="medium" sx={{ whiteSpace: "nowrap", flexShrink: 0 }}>
            Use Custom Nameservers
          </Button>
        </Flex>
        <Stack border={borders[1]} borderColor={colors.gray[800]} borderRadius={radii[1]} p={4}>
          <Box
            pb={4}
            sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}
          >
            ns-cloud-b1.googledomains.com
          </Box>
          <Box
            py={4}
            sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}
          >
            ns-cloud-b2.googledomains.com
          </Box>
          <Box
            py={4}
            sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}
          >
            ns-cloud-b3.googledomains.com
          </Box>
          <Box
            pt={4}
          >
            ns-cloud-b4.googledomains.com
          </Box>
        </Stack>
        <Flex flexDirection="column" gap={4}>
          <Flex alignItems="flex-start" justifyContent="space-between" gap={4}>
            <Stack space={1}>
              <Text.Heading.Large as="h3" mb={0}>
                Nameserver Registration
              </Text.Heading.Large>
              <Text.Body>
                Create a host record to associate a nameserver with an IP
                address. Learn more
              </Text.Body>
            </Stack>
            <Button size="medium" sx={{ whiteSpace: "nowrap", flexShrink: 0 }}>
              Add host record
            </Button>
          </Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={10}
            gap={2}
            border={borders[1]}
            borderColor={colors.gray[800]}
            borderRadius={radii[1]}
          >
            <Text.Heading.Small as="h3">No host records</Text.Heading.Small>
            <Text.Body color="gray.300">
              When you add host records, they will show up here.
            </Text.Body>
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
}
