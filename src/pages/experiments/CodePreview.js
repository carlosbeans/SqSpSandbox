import { useNavigate } from "react-router-dom";
import { Grid, Stack, BackButton } from "@sqs/rosetta-elements";
import { PageHeader } from "@sqs/rosetta-compositions";

export default function CodePreview() {
  const navigate = useNavigate();
  return (
    <Stack id="codepreview-main">
      <BackButton
        label="Experiments"
        onClick={() => navigate("/experiments")}
        py={4}
        px={6}
      />
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
