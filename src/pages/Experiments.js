import { Link, useNavigate } from "react-router-dom";
import { Stack, Grid, Card, Image } from "@sqs/rosetta-elements";
import { Text, Button } from "@sqs/rosetta-primitives";
import { PageHeader } from "@sqs/rosetta-compositions";

export default function Experiments() {
  const navigate = useNavigate();
  return (
    <Stack py={5}>
      <Grid.Container gridConstraint={12}>
        <Grid.Item columns={[12, 12, 12]}>
          <PageHeader>
            <PageHeader.Body>
              <PageHeader.Title title="Experiments" />
            </PageHeader.Body>
          </PageHeader>
        </Grid.Item>
        <Grid.Item columns={[4, 3, 4]}>
          <Card isHoverable>
            <Image
              alt="Lemon"
              css={{ objectFit: "cover" }}
              height={200}
              width="100%"
              src="https://images.squarespace-cdn.com/content/v1/5997798117bffc4019521880/1740577736114-E4X2G101XG6F6LQ0T7XN/yellow-lemon.jpg"
            />
            <Card.Body pb={1}>
              <Stack space={1}>
                <Text.Subtitle>Selectable Cards</Text.Subtitle>
                <Text.Body>
                  Allows a user to select multiple items from a grid by clicking
                  and dragging to select items.
                </Text.Body>
                <Button.Primary width="100%" size={2} onClick={() => navigate("/selectanddrag")}>
                  Demo
                </Button.Primary>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item columns={[4, 3, 4]}>
          <Card>
            <Card.Body pb={1}>
              <Stack space={1}>
                <Text.Subtitle>
                  Enterprise Code Preview
                </Text.Subtitle>
                <Text.Body>
                  As an Enterprise customer, see a preview of what your custom
                  code snippet will result in.
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
                  As an Enterprise customer, see a preview of what your custom
                  code snippet will result in.
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
