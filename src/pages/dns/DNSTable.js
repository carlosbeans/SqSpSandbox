import React from "react";
import { Text } from "@sqs/rosetta-react/text/next";
import { Box } from "@sqs/rosetta-primitives";
import { Table } from "@sqs/rosetta-compositions";

const columnHelper = Table.Utils.createColumnHelper();

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

export default function DNSTable({ records }) {
  return (
    <Box css={{ "& tr:last-child": { borderBottom: "none" } }}>
      <Table columns={columns} data={records}>
        <Table.List>
          <Table.List.Head />
          <Table.List.Body />
        </Table.List>
      </Table>
    </Box>
  );
}
