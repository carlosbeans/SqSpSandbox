import { Stack, TextLink } from "@sqs/rosetta-elements";
import { Table } from "@sqs/rosetta-compositions";
import { Flex } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { Button } from "@sqs/rosetta-react/button/next";
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

export function ActivityContent({ inlineHeader } = {}) {
  return (
    <Stack space={6} mx={inlineHeader ? 0 : 6} id="activity-page-content">
      {inlineHeader && (
        <Flex alignItems="flex-start" justifyContent="space-between" gap={4}>
          <Stack space={1}>
            <Text.Heading.Large as="h2" mb={0}>
              Activity
            </Text.Heading.Large>
            <Text.Body sx={{ color: "gray.500" }}>
              View your domain's activity and notifications.{" "}
              <TextLink href="#">Learn more about activity</TextLink>
            </Text.Body>
          </Stack>
          <Button.Strong size="medium">Manage Notifications</Button.Strong>
        </Flex>
      )}
      <Table columns={columns} data={data}>
        <Table.List />
      </Table>
    </Stack>
  );
}

export default function Activity() {
  usePageHeader({
    title: "Activity",
    actions: <Button.Strong size="large">Manage Notifications</Button.Strong>,
    subtitle: "View your domain's activity and notifications. Learn more about activity",
  });
  return <ActivityContent />;
}
