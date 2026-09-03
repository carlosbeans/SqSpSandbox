import { Box } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { usePageHeader } from "../layouts/PageHeaderContext";

export function SecurityContent({ inlineHeader } = {}) {
  return (
    <Box px={inlineHeader ? 0 : 6} id="security-page-content">
      <Text.Body color="gray.300">
        Security settings for this domain are coming soon.
      </Text.Body>
    </Box>
  );
}

export default function Security() {
  usePageHeader({ title: "Security" });
  return <SecurityContent />;
}
