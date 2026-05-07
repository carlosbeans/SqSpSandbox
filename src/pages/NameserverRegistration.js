import React from "react";
import { TextLink } from "@sqs/rosetta-elements";
import { Stack } from "@sqs/rosetta-elements";
import { Text, Button, Flex, Box } from "@sqs/rosetta-primitives";
import { Table } from "@sqs/rosetta-compositions";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { usePageHeader } from "../layouts/PageHeaderContext";

const columnHelper = Table.Utils.createColumnHelper();

const columns = [
  columnHelper.accessor("nameserver", {
    header: "NAMESERVER",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("ip", {
    header: "IP ADDRESSES",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("lastUpdated", {
    header: "LAST UPDATED",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
];

const hostRecords = [
  {
    nameserver: "ns1.coolexample.net",
    ip: "192.0.2.1",
    lastUpdated: "March 3, 2026",
  },
  {
    nameserver: "ns2.coolexample.net",
    ip: "192.0.2.2",
    lastUpdated: "April 10, 2026",
  },
  {
    nameserver: "ns3.coolexample.net",
    ip: "192.0.2.3",
    lastUpdated: "May 15, 2026",
  },
  {
    nameserver: "ns4.coolexample.net",
    ip: "192.0.2.4",
    lastUpdated: "June 20, 2026",
  },
];

function NameserverRegistrationHeaderSubtitle() {
  return (
    <>
      Create a host record to associate a nameserver with an IP address.{" "}
      <TextLink href="#">Learn more</TextLink>
    </>
  );
}

const addHostRecordButtonSx = {
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

function AddHostRecordButton() {
  return (
    <Breakpoint.Provider>
      <Breakpoint.Renderer
        render={{
          default: () => (
            <Button.Primary css={addHostRecordButtonSx}>Add Host Record</Button.Primary>
          ),
          "mobile-0": () => (
            <Button.Primary css={addHostRecordButtonSx}>Add Host Record</Button.Primary>
          ),
        }}
      />
    </Breakpoint.Provider>
  );
}

/**
 * @param {{ inlineHeader?: boolean }} props
 * When `inlineHeader` is true (Domain Settings DNS tab), renders title, description, and primary action inline.
 */
export function NameserverRegistrationContent({ inlineHeader = false }) {
  return (
    <Flex
      flexDirection="column"
      gap={6}
      px={inlineHeader ? 0 : 6}
      pt={inlineHeader ? 0 : 2}
      pb={inlineHeader ? 0 : 6}
      id={
        inlineHeader
          ? "domain-settings-nameserver-registration-block"
          : "nameserver-registration-content"
      }
    >
      {inlineHeader ? (
        <Stack space={4} id="domain-settings-nameserver-registration-intro">
          <Text.Subtitle>Nameserver Registration</Text.Subtitle>
          <Text.Body>
            <NameserverRegistrationHeaderSubtitle />
          </Text.Body>
          <Flex>
            <AddHostRecordButton />
          </Flex>
        </Stack>
      ) : null}
      <Box id="nameserver-registration-table">
        <Table columns={columns} data={hostRecords}>
          <Table.List>
            <Table.List.Head />
            <Table.List.Body />
          </Table.List>
        </Table>
      </Box>
    </Flex>
  );
}

export default function NameserverRegistration() {
  usePageHeader({
    title: "Nameserver Registration",
    subtitle: <NameserverRegistrationHeaderSubtitle />,
    actions: <AddHostRecordButton />,
  });

  return <NameserverRegistrationContent inlineHeader={false} />;
}
