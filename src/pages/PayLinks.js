import { Box } from "@sqs/rosetta-primitives";
import { Stack } from "@sqs/rosetta-elements";
import { usePageHeader } from "../layouts/PageHeaderContext";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import PaymentMethodCompare from "../components/PaymentMethodCompare/PaymentMethodCompare";

export default function PayLinks() {
  usePageHeader({ title: "Pay Links" });
  return (
    <Box id="payLinksPage" px={6} pt={2} pb={6}>
      <Stack space={6}>
        <HeroBanner />
        <PaymentMethodCompare />
      </Stack>
    </Box>
  );
}
