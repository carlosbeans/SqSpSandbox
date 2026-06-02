import { Stack } from "@sqs/rosetta-elements";
import { Table } from "@sqs/rosetta-compositions";
import { Button } from "@sqs/rosetta-primitives";
import { usePageHeader } from "../layouts/PageHeaderContext";

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

export function ActivityContent() {
  return (
    <Stack space={6} mx={6}>
      <Table columns={columns} data={data}>
        <Table.List />
      </Table>
    </Stack>
  );
}

export default function Activity() {
  usePageHeader({
    title: "Test",
    actions: <Button.Primary size="large">Manage Notifications</Button.Primary>,
    subtitle: "View your domain's activity and notifications. Learn more about activity",
  });
  return <ActivityContent />;
}
