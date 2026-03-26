//css
import "../styles/styles.scss";

import { Grid, Stack } from "@sqs/rosetta-elements";
import { PageHeader } from "@sqs/rosetta-compositions";

export default function CodePreview() {
  return (
    <Stack>
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title title="Code Preview" />
        </PageHeader.Body>
      </PageHeader>
      <Grid.Container gridConstraint={12}>        
        <Grid.Item columns={[12, 9]}>          
          <div className="codeBlock">
            <code></code>
          </div>
        </Grid.Item>
      </Grid.Container>
    </Stack>
  );
}
