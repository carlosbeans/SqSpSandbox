import React from "react";
import { TextLink } from "@sqs/rosetta-elements";
import { Text, Button, Flex } from "@sqs/rosetta-primitives";
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

export default function NameserverRegistration() {
  usePageHeader({
    title: "Nameserver Registration",
    subtitle: (
      <>
        Create a host record to associate a nameserver with an IP address.{" "}
        <TextLink href="#">Learn more</TextLink>
      </>
    ),
    actions: (
      <Breakpoint.Provider>
        <Breakpoint.Renderer
          render={{
            default: () => (
              <Button.Primary
                css={{
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Add Host Record
              </Button.Primary>
            ),
            "mobile-0": () => (
              <Button.Primary
                css={{
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Add Host Record
              </Button.Primary>
            ),
          }}
        />
      </Breakpoint.Provider>
    ),
  });

  return (
    <Flex
      as="main"
      id="nameserver-registration-content"
      flexDirection="column"
      gap={6}
      px={6}
      pt={2}
      pb={6}
    >
      <Table columns={columns} data={hostRecords}>
        <Table.List>
          <Table.List.Head />
          <Table.List.Body />
        </Table.List>
      </Table>
    </Flex>
  );
}
