import { Stack } from "@sqs/rosetta-elements";
import { PageHeader } from "@sqs/rosetta-compositions";

export default function Security() {
  return (
    <Stack>
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title title="Security" />
        </PageHeader.Body>
      </PageHeader>
    </Stack>
  );
}
