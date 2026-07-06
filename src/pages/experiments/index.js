import { useNavigate } from "react-router-dom";
import { Stack, Grid, Card, Image } from "@sqs/rosetta-elements";
import { Text, Button } from "@sqs/rosetta-primitives";
import { PageHeader } from "@sqs/rosetta-compositions";
export default function Experiments() {
  const navigate = useNavigate();
  return (
    <Stack>
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title title="Experiments" />
        </PageHeader.Body>
      </PageHeader>
      <Grid.Container gridConstraint={12} gutter={4}>
        <Grid.Item columns={[4, 3, 4]} mb={4}>
          <Card isHoverable>
            <Card.Body pb={1}>
              <Stack space={1}>
                <Text.Subtitle>Selectable Cards</Text.Subtitle>
                <Text.Body>
                  Allows a user to select multiple items from a grid by clicking
                  and dragging to select items.
                </Text.Body>
                <Button.Secondary
                  width="100%"
                  size={2}
                  onClick={() => navigate("/experiments/selectanddrag")}
                >
                  Demo
                </Button.Secondary>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item columns={[4, 3, 4]}>
          <Card>
            <Card.Body pb={1}>
              <Stack space={1}>
                <Text.Subtitle>Enterprise Code Preview</Text.Subtitle>
                <Text.Body>
                  As an Enterprise customer, see a preview of what your custom
                  code snippet will result in.
                </Text.Body>
                <Button.Secondary
                  width="100%"
                  size={2}
                  onClick={() => navigate("/experiments/codepreview")}
                >
                  Demo
                </Button.Secondary>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item columns={[4, 3, 4]}>
          <Card>
            <Card.Body pb={1}>
              <Stack space={1}>
                <Text.Subtitle>Domain Website Connection</Text.Subtitle>
                <Text.Body>
                  As an Enterprise customer, see a preview of what your custom
                  code snippet will result in.
                </Text.Body>
                <Button.Secondary
                  width="100%"
                  size={2}
                  onClick={() => navigate("/experiments/domainwebsiteconnection")}
                >
                  Demo
                </Button.Secondary>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item columns={[4, 3, 4]}>
          <Card>
            <Card.Body pb={1}>
              <Stack space={1}>
                <Text.Subtitle>Component Test</Text.Subtitle>
                <Text.Body>
                  Component Playground
                </Text.Body>
                <Button.Secondary
                  width="100%"
                  size={2}
                  onClick={() => navigate("/experiments/componenttest")}
                >
                  Demo
                </Button.Secondary>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item columns={[4, 3, 4]}>
          <Card>
            <Card.Body pb={1}>
              <Stack space={1}>
                <Text.Subtitle>Domain Overview Redesign Q2 2026</Text.Subtitle>
                <Text.Body>
                  Re-imagining the Domain Overview experience.
                </Text.Body>
                <Button.Secondary
                  width="100%"
                  size={2}
                  onClick={() => navigate("/experiments/domain-overview-redesign-q2-2026")}
                >
                  Demo
                </Button.Secondary>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item columns={[4, 3, 4]}>
          <Card>
            <Card.Body pb={1}>
              <Stack space={1}>
                <Text.Subtitle>Domain Activity - V2</Text.Subtitle>
                <Text.Body>
                  Reimagining the domain activity experience.
                </Text.Body>
                <Button.Secondary
                  width="100%"
                  size={2}
                  onClick={() => navigate("/experiments/domain-activity-v2")}
                >
                  Demo
                </Button.Secondary>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
      </Grid.Container>
    </Stack>
  );
}
