import { Stack } from "@sqs/rosetta-elements";
import { PageHeader, Table } from "@sqs/rosetta-compositions";

const columnHelper = Table.Utils.createColumnHelper();

const columns = [
  columnHelper.accessor("action", { header: "Action" }),
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("location", { header: "Location" }),
  columnHelper.accessor("time", { header: "Time" }),
];

const data = [
  { action: "Registered domain", name: "Carlos Andujar", location: "Atlanta, GA", time: "3 days ago" },
  { action: "Transferred domain", name: "Laura Lejano", location: "Richmond, VA", time: "5 hrs ago" },
  { action: "Renewed domain", name: "Carlos Andujar", location: "Atlanta, GA", time: "2 weeks ago" },
  { action: "Updated DNS records", name: "Laura Lejano", location: "Richmond, VA", time: "1 mon ago" },
  { action: "Connected website", name: "Carlos Andujar", location: "Atlanta, GA", time: "6 mon ago" },
  { action: "Enabled DNSSEC", name: "Laura Lejano", location: "Richmond, VA", time: "1 year ago" },
];

export default function Activity() {
  return (
    <Stack space={6}>
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title title="Activity" />
        </PageHeader.Body>
      </PageHeader>
      <Table columns={columns} data={data}>
        <Table.List />
      </Table>
    </Stack>
  );
}
