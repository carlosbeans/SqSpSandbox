import { Link } from "react-router-dom";
import { Stack, Grid, Card } from "@sqs/rosetta-elements";
import { Text, Button } from "@sqs/rosetta-primitives";

export default function Experiments() {
  return (
    <Stack py={5}>
      <Grid.Container gridConstraint={12}>
        <Grid.Item columns={[12, 12, 12]}>
          <h1>Experiments</h1>
        </Grid.Item>
        <Grid.Item columns={[4, 3, 4]}>
          <Card isHoverable>
            <Card.Body pb={1}>
              <Stack space={1}>
                <Text.Subtitle fontWeight="semibold">
                  Selectable Cards
                </Text.Subtitle>
                <Text.Body>
                  Allows a user to select multiple items from a grid by
                  clicking and dragging to select items.
                </Text.Body>
                <Link className="mainNavLink" to="/SelectAndDrag">
                  Demo
                </Link>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item columns={[4, 3, 4]}>
          <Card>
            <Card.Body pb={1}>
              <Stack space={1}>
                <Text.Subtitle fontWeight="semibold">
                  Enterprise Code Preview
                </Text.Subtitle>
                <Text.Body>
                  As an Enterprise customer, see a preview of what your
                  custom code snippet will result in.
                </Text.Body>
                <Link className="mainNavLink" to="/CodePreview">
                  Demo
                </Link>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item columns={[4, 3, 4]}>
          <Card>
            <Card.Body pb={1}>
              <Stack space={1}>
                <Text.Subtitle fontWeight="semibold">
                  Domain Website Connection
                </Text.Subtitle>
                <Text.Body>
                  As an Enterprise customer, see a preview of what your
                  custom code snippet will result in.
                </Text.Body>
                <Link className="mainNavLink" to="/DomainWebsiteConnection">
                  Demo
                </Link>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item columns={[4, 3, 4]}>
          <Card>
            <Card.Body pb={1}>
              <Stack space={1}>
                <Text.Subtitle fontWeight="semibold">
                  Connect & Move Redesign
                </Text.Subtitle>
                <Text.Body>
                  Re-imagining the Connect & Move experience.
                </Text.Body>
                <Link className="mainNavLink" to="/DomainWebsiteConnection">
                  Demo
                </Link>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
      </Grid.Container>
    </Stack>
  );
}
