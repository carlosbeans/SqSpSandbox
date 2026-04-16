import { PageHeader } from "@sqs/rosetta-compositions";
import { Stack } from "@sqs/rosetta-elements";
import { HeroBanner } from "@sqs/rosetta-dashboard";

export default function PayLinks() {
  return (
    <Stack space={4}>
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title title="Pay Links" />
        </PageHeader.Body>
      </PageHeader>
      <HeroBanner variant="productsAndServices" />
    </Stack>
  );
}
