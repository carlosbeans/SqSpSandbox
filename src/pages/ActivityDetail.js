import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Stack } from "@sqs/rosetta-elements";
import { BackButton } from "@sqs/rosetta-react";
import { Button } from "@sqs/rosetta-react/button/next";
import { Text } from "@sqs/rosetta-react/text/next";
import { findActivityById } from "../constants/domainActivity";
import { SLIDE_BACK } from "../constants/motion";

/**
 * Activity detail — reached by clicking a row in the Activity tab on Domain
 * Settings.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=2050-117022
 */
const LABEL_WIDTH = 159;
const CHANGE_LABEL_WIDTH = { _: 96, "from-m": LABEL_WIDTH };

const rowBorderSx = {
  borderBottom: "1px solid",
  borderColor: "border.default",
};

function DetailRow({ label, value, dashed }) {
  return (
    <Flex
      py={2}
      gap={{ _: 1, "from-m": 6 }}
      sx={{
        ...rowBorderSx,
        flexDirection: { _: "column", "from-m": "row" },
        alignItems: { _: "flex-start", "from-m": "center" },
      }}
    >
      <Box sx={{ width: { _: "100%", "from-m": LABEL_WIDTH }, flexShrink: 0 }}>
        <Text.Body sx={{ color: "fg.default", fontWeight: 500 }}>{label}</Text.Body>
      </Box>
      <Box
        sx={
          dashed
            ? { borderBottom: "1px dashed", borderColor: "fg.default" }
            : undefined
        }
      >
        <Text.Body sx={{ color: "fg.default" }}>{value}</Text.Body>
      </Box>
    </Flex>
  );
}

function ChangeHeader() {
  return (
    <Flex gap={6} py={2} sx={{ alignItems: "center" }}>
      <Box sx={{ width: CHANGE_LABEL_WIDTH, flexShrink: 0 }}>
        <Text.Eyebrow sx={{ color: "gray.400" }}>Change</Text.Eyebrow>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Text.Eyebrow sx={{ color: "gray.400" }}>Before</Text.Eyebrow>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Text.Eyebrow sx={{ color: "gray.400" }}>After</Text.Eyebrow>
      </Box>
    </Flex>
  );
}

function ChangeRow({ field, before, after }) {
  return (
    <Flex gap={6} py={2} sx={{ ...rowBorderSx, alignItems: "flex-start" }}>
      <Box sx={{ width: CHANGE_LABEL_WIDTH, flexShrink: 0 }}>
        <Text.Body sx={{ color: "fg.default", fontWeight: 500 }}>{field}</Text.Body>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, overflowWrap: "anywhere" }}>
        <Text.Body sx={{ color: "fg.default" }}>{before}</Text.Body>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, overflowWrap: "anywhere" }}>
        <Text.Body sx={{ color: "fg.default" }}>{after}</Text.Body>
      </Box>
    </Flex>
  );
}

export default function ActivityDetail() {
  const { domainId, activityId } = useParams();
  const navigate = useNavigate();
  const activity = findActivityById(activityId);

  const handleBack = React.useCallback(() => {
    navigate(`/domains/${encodeURIComponent(domainId)}/settings?tab=activity`, {
      state: { slideDirection: SLIDE_BACK },
    });
  }, [domainId, navigate]);

  if (!activity) {
    return (
      <Stack space={6} px={6} pt={4} pb={6} id="activity-detail-not-found">
        <BackButton label="Back" onClick={handleBack} />
        <Text.Heading.Large as="h1" m={0}>
          Activity not found
        </Text.Heading.Large>
      </Stack>
    );
  }

  return (
    <Stack space={6} px={6} pt={4} id="activity-detail-page">
      <Stack space={1} id="activity-detail-header">
        <BackButton label="Back" onClick={handleBack} />
        <Text.Heading.Large as="h1" mt={2}>
          {activity.action}
        </Text.Heading.Large>
      </Stack>

      <Box as="section" id="activity-detail-details">
        <Box py={1}>
          <Text.Eyebrow sx={{ color: "gray.400" }}>Details</Text.Eyebrow>
        </Box>
        <DetailRow label="Name" value={activity.name} dashed />
        <DetailRow label="Date" value={activity.date} />
        <DetailRow label="Time" value={activity.clockTime} />
        <DetailRow label="Location" value={activity.fullLocation} />
        <DetailRow label="IP" value={activity.ip} />
        <DetailRow label="Device" value={activity.device} />
      </Box>

      <Box as="section" id="activity-detail-changes">
        <ChangeHeader />
        {activity.changes.map((change) => (
          <ChangeRow key={change.field} {...change} />
        ))}
      </Box>

      <Stack
        space={1}
        id="activity-detail-revert"
        sx={{ maxWidth: 650, width: "100%" }}
      >
        <Box>
          <Button.Strong size="large">Revert</Button.Strong>
        </Box>
        <Text.Body.Small sx={{ color: "gray.400" }}>
          Can be reverted until {activity.revertUntil}
        </Text.Body.Small>
      </Stack>
    </Stack>
  );
}
