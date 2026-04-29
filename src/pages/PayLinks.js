import { HeroBanner } from "@sqs/rosetta-dashboard";
import { Box } from "@sqs/rosetta-primitives";
import { usePageHeader } from "../layouts/PageHeaderContext";

export default function PayLinks() {
  usePageHeader({ title: "Pay Links" });
  return (
    <Box id="payLinksPage" px={6} pt={2} pb={6}>
      <HeroBanner variant="productsAndServices" />
    </Box>
  );
}
