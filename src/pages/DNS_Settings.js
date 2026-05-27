import React from "react";
import { Stack, Card, TextLink } from "@sqs/rosetta-elements";
import { Text, Button, Flex, Box } from "@sqs/rosetta-primitives";
import { Table } from "@sqs/rosetta-compositions";
import { InfoCircle, Trash } from "@sqs/rosetta-icons";
import { useTheme } from "@sqs/rosetta-styled";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { usePageHeader } from "../layouts/PageHeaderContext";

const columnHelper = Table.Utils.createColumnHelper();

function headerWithInfo(label) {
  return () => (
    <Flex alignItems="center" gap={1}>
      {label}
      <InfoCircle css={{ color: "gray.400", width: 14, height: 14 }} />
    </Flex>
  );
}

const columns = [
  columnHelper.accessor("host", {
    header: "HOST",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("type", {
    header: "TYPE",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("priority", {
    header: "PRIORITY",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("ttl", {
    header: "TTL",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("data", {
    header: "DATA",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
];

const defaultRecords = [
  {
    host: "@",
    type: "A",
    priority: "N/A",
    ttl: "4 hrs",
    data: "198.185.159.144",
  },
  {
    host: "@",
    type: "CNAME",
    priority: "N/A",
    ttl: "4 hrs",
    data: "ext-sq.squarespace.com",
  },
];

const customRecords = [
  {
    host: "www",
    type: "CNAME",
    priority: "N/A",
    ttl: "4 hrs",
    data: "ext-sq.squarespace.com",
  },
];

function DNSTable({ records }) {
  return (
    <Table columns={columns} data={records}>
      <Table.List>
        <Table.List.Head />
        <Table.List.Body />
      </Table.List>
    </Table>
  );
}

export function DNSSettingsContent() {
  const { radii, borders, colors } = useTheme();

  return (
    <Flex id="dnsSettingsPage" flexDirection="column" gap={6} px={6}>
      <Flex alignItems="center" justifyContent="space-between">
        <Stack>
          <Text.Subtitle>DNS Presets</Text.Subtitle>
          <Text.Body>
            DNS records point to services your domain uses, like forwarding your
            domain or setting up an email service. <br />
            <TextLink href="#">Learn more about DNS settings</TextLink>          
          </Text.Body>
        </Stack>
        <Button.Primary size="medium">Add Preset</Button.Primary>
      </Flex>
      <Card sx={{ borderRadius: radii[1] }}>
        <Card.Body>
          <Stack space={3}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text.Subtitle px={2}>Squarespace Defaults</Text.Subtitle>

              <Box
                as="button"
                aria-label="Delete defaults"
                css={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  color: "#900",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "#c00" },
                }}
              >
                <Trash css={{ width: 20, height: 20 }} />
              </Box>
            </Flex>
            <DNSTable records={defaultRecords} />
          </Stack>
        </Card.Body>
      </Card>

      {/* Custom Records */}
      <Stack space={4}>
        <Flex alignItems="center" justifyContent="space-between">
          <Stack>
            <Text.Subtitle>Custom records</Text.Subtitle>
            <Text.Body>
              DNS records point to services your domain uses, like forwarding
              your domain or setting up an email service. <br />
              <TextLink href="#">Learn more about DNS settings</TextLink>
            </Text.Body>
          </Stack>
          <Button.Primary size="medium">Add Record</Button.Primary>
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
    </Flex>
  );
}

export default function DNS_Settings() {
  usePageHeader({
    title: "DNS Settings",
    subtitle:
      "DNS records point to services your domain uses, like forwarding your domain or setting up an email service. Learn more about DNS settings",   
  });

  return <DNSSettingsContent />;
}
