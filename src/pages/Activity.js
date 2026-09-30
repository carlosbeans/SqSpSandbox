import { useNavigate, useParams } from "react-router-dom";
import { Stack, TextLink } from "@sqs/rosetta-elements";
import { Table } from "@sqs/rosetta-compositions";
import { Flex } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { Button } from "@sqs/rosetta-react/button/next";
import { usePageHeader } from "../layouts/PageHeaderContext";
import { DOMAIN_ACTIVITY } from "../constants/domainActivity";
import { SLIDE_FORWARD } from "../constants/motion";

const columnHelper = Table.Utils.createColumnHelper();

const columns = [
  columnHelper.accessor("action", { header: "Action" }),
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("location", { header: "Location" }),
  columnHelper.accessor("time", { header: "Time" }),
];

export function ActivityContent({ inlineHeader } = {}) {
  const navigate = useNavigate();
  const { domainId } = useParams();

  const renderBodyRow = (props) => {
    const openDetail = () => {
      if (!domainId) return;
      navigate(
        `/domains/${encodeURIComponent(domainId)}/activity/${props.row.original.id}`,
        { state: { slideDirection: SLIDE_FORWARD } },
      );
    };
    return (
      <Table.List.Body.Row
        {...props}
        tabIndex={0}
        onClick={openDetail}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openDetail();
          }
        }}
        sx={{ cursor: "pointer" }}
      />
    );
  };

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
      <Table columns={columns} data={DOMAIN_ACTIVITY}>
        <Table.List>
          <Table.List.Head />
          <Table.List.Body renderBodyRow={renderBodyRow} />
        </Table.List>
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
