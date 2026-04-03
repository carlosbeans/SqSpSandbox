import { PageHeader } from "@sqs/rosetta-compositions";
import { Stack } from "@sqs/rosetta-elements";

import HeroBanner from "../components/HeroBanner/HeroBanner";

export default function PayLinks() {
  return (
    <Stack space={4}>
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title title="Pay Links" />
        </PageHeader.Body>
      </PageHeader>
      <HeroBanner
        title="Create shareable pay links on your custom domain"
        chips={[
          "Small businesses",
          "Product creators",
          "Event organizers",
          "Freelancers",
        ]}
      />
    </Stack>
  );
}
