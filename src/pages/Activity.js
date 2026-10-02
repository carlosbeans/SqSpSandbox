import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, TextLink } from "@sqs/rosetta-elements";
import { Table } from "@sqs/rosetta-compositions";
import { Flex } from "@sqs/rosetta-primitives";
import { Chip } from "@sqs/rosetta-react";
import { Text } from "@sqs/rosetta-react/text/next";
import { Button } from "@sqs/rosetta-react/button/next";
import { CheckmarkShield, ChevronSmallRight } from "@sqs/rosetta-icons";
import { usePageHeader } from "../layouts/PageHeaderContext";
import { DOMAIN_ACTIVITY, getRevertActivities } from "../constants/domainActivity";
import { useDomainProtections } from "../contexts/DomainProtectionsContext";
import { SLIDE_FORWARD } from "../constants/motion";
import { useRevertedActivities } from "../hooks/useRevertedActivities";

const columnHelper = Table.Utils.createColumnHelper();

function createColumns(reverted) {
  return [
    columnHelper.accessor("action", {
      header: "Action",
      cell: (info) => (
        <Flex alignItems="center" gap={1}>
          {info.getValue()}
          {reverted[info.row.original.id] && (
            <Chip label="Reverted" usage="badge" />
          )}
        </Flex>
      ),
    }),
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("location", { header: "Location" }),
    columnHelper.accessor("time", { header: "Time" }),
    columnHelper.display({
      id: "caret",
      header: "",
      cell: () => (
        <ChevronSmallRight
          className="activity-row-caret"
          aria-hidden="true"
          css={{ width: 16, height: 16, display: "block", marginLeft: "auto", opacity: 0 }}
        />
      ),
      meta: {
        bodyCellProps: { sx: { width: 16, textAlign: "right" } },
      },
    }),
  ];
}

export function ActivityContent({ inlineHeader } = {}) {
  const navigate = useNavigate();
  const { domainId } = useParams();
  const { reverted } = useRevertedActivities();
  const { domain } = useDomainProtections();
  const columns = React.useMemo(() => createColumns(reverted), [reverted]);
  const data = React.useMemo(
    () => [...getRevertActivities(reverted), ...DOMAIN_ACTIVITY],
    [reverted],
  );

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
        sx={{
          cursor: "pointer",
          "&:hover .activity-row-caret, &:focus-visible .activity-row-caret": {
            opacity: 1,
          },
        }}
      />
    );
  };

  return (
    <Stack space={6} mx={inlineHeader ? 0 : 6} id="activity-page-content">
      {inlineHeader && (
        <Flex alignItems="flex-start" justifyContent="space-between" gap={4}>
          <Stack space={1}>
            <Flex alignItems="center" gap={2} flexWrap="wrap">
              <Text.Heading.Large as="h2" mb={0}>
                Activity
              </Text.Heading.Large>
              {domain?.securityAddOn && (
                <Chip
                  label="Advanced Domain Security"
                  glyph={<CheckmarkShield />}
                  usage="badge"
                />
              )}
            </Flex>
            <Text.Body sx={{ color: "gray.500" }}>
              View your domain's activity and notifications.{" "}
              <TextLink href="#">Learn more about activity</TextLink>
            </Text.Body>
          </Stack>
        </Flex>
      )}
      <Table columns={columns} data={data}>
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
