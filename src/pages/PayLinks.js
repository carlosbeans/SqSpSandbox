import { HeroBanner } from "@sqs/rosetta-dashboard";
import { Box } from "@sqs/rosetta-primitives";
import { usePageHeader } from "../layouts/PageHeaderContext";

export default function PayLinks() {
  usePageHeader({ title: "Pay Links", subtitle: "Create a pay link to collect payments from your customers. Learn more about pay links" });
  return (
    <Box id="payLinksPage" px={6}>
      <HeroBanner variant="productsAndServices" />
    </Box>
  );
}
