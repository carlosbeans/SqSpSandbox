import React from "react";
import "./DNS_Settings.scss";
import SidePanelNav from "../components/SidePanelNav/SidePanelNav";
import { Grid, Stack, Card, TextLink } from "@sqs/rosetta-elements";
import { Text, Button, Flex, Box } from "@sqs/rosetta-primitives";
import { Table } from "@sqs/rosetta-compositions";
import { InfoCircle, Trash } from "@sqs/rosetta-icons";
import { radii, borders, colors } from '@sqs/rosetta-tokens';

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
  { host: "@", type: "A", priority: "N/A", ttl: "4 hrs", data: "198.185.159.144" },
  { host: "@", type: "CNAME", priority: "N/A", ttl: "4 hrs", data: "ext-sq.squarespace.com" },
];

const customRecords = [
  { host: "www", type: "CNAME", priority: "N/A", ttl: "4 hrs", data: "ext-sq.squarespace.com" },
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

export default function DNS_Settings() {
  return (
    <div className="container full-width">
      <Grid.Container gridConstraint={12}>
        <Grid.Item columns={[12, 3]}>
          <SidePanelNav />
        </Grid.Item>
        <Grid.Item columns={[12, 9]}>
          <Stack space={6}>
            {/* Header */}
            <div className="dns-settings-header">
              <div>
                <Text.Title>DNS Settings</Text.Title>
                <Box mt={2}>
                  <Text.Body>
                    DNS records point to services your domain uses, like forwarding
                    your domain or setting up an email service. <br />
                    <TextLink href="#">Learn more about DNS settings</TextLink>
                  </Text.Body>
                </Box>
              </div>
              <Button.Primary>Add Preset</Button.Primary>
            </div>

            {/* Squarespace Defaults */}
            <Card sx={{ borderRadius: radii[1] }}>
              <Card.Body>
                <Stack space={3}>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text.Subtitle px={2}>
                      Squarespace Defaults
                    </Text.Subtitle>
                    <button className="delete-icon" aria-label="Delete defaults">
                      <Trash css={{ width: 20, height: 20 }} />
                    </button>
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
                <Button.Secondary>Add Record</Button.Secondary>
              </Flex>
              <Stack p={3} sx={{ borderRadius: radii[1], border: borders[1], borderColor: colors.gray[800] }}>
                <DNSTable records={customRecords} />
              </Stack>              
            </Stack>
          </Stack>
        </Grid.Item>
      </Grid.Container>
    </div>
  );
}
