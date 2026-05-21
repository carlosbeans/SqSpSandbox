import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Stack, Card, TextLink, Grid } from "@sqs/rosetta-elements";
import { Text, Button, Flex, Box } from "@sqs/rosetta-primitives";
import { Checkmark } from "@sqs/rosetta-icons";
import { usePageHeader } from "../layouts/PageHeaderContext";

const AUDIENCE_TAGS = [
  "Small Businesses",
  "Solopreneurs",
  "Growing Teams",
  "Creators",
];

const GOOGLE_FEATURES = [
  "Custom Gmail featuring your domain name",
  "Premium versions of Google Docs, Calendar, Meet, and more",
  "Integrated AI assistant",
  "30 GB+ of storage per user",
  "Add users as you grow",
];

const TITAN_FEATURES = [
  "Custom email featuring your domain name",
  "Built-in calendar and contacts",
  "10 GB storage",
  "Designed for a single user",
];

function FeatureRow({ children }) {
  return (
    <Flex alignItems="center" gap={1} sx={{ width: "100%" }}>
      <Checkmark
        css={{ width: 16, height: 16, flexShrink: 0, color: "gray.500" }}
      />
      <Text.Caption m={0} sx={{ flex: "1 0 0", minWidth: 0 }}>
        {children}
      </Text.Caption>
    </Flex>
  );
}

function AudiencePill({ children }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 1,
        borderRadius: 999,
        backgroundColor: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(25px)",
      }}
    >
      <Text.Caption m={0} sx={{ color: "white", lineHeight: "16px" }}>
        {children}
      </Text.Caption>
    </Box>
  );
}

export default function Email() {
  const { domainId } = useParams();
  const domainName = domainId ? decodeURIComponent(domainId) : "yourdomain.com";
  const exampleEmail = useMemo(
    () => `admin@${domainName}`,
    [domainName],
  );

  usePageHeader({
    title: "Email",
    subtitle:
      "Choose professional email for your domain or set up forwarding.",
  });

  return (
    <Stack
      space={6}
      pt={2}
      pb={8}
      px={6}
      id="email-page-content"
      sx={{ width: "100%", maxWidth: "100%" }}
    >
      <Box
        as="section"
        id="email-hero-banner"
        sx={{
          position: "relative",
          width: "100%",
          minHeight: 250,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/assets/email/hero.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(98deg, rgba(33, 2, 1, 0) 2.2%, rgba(33, 2, 1, 0.12) 33%, rgba(33, 2, 1, 0.18) 73%, rgba(33, 2, 1, 0.24) 99%), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%)",
          }}
        />
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          sx={{
            position: "relative",
            zIndex: 1,
            minHeight: 250,
            pt: 5,
            pb: 5,
            px: 6,
          }}
        >
          <Flex
            flexDirection={["column", "row"]}
            alignItems={["flex-start", "flex-start"]}
            justifyContent="space-between"
            gap={4}
            sx={{ width: "100%" }}
          >
            <Text.Title
              as="h1"
              m={0}
              sx={{
                color: "white",
                fontSize: [5, 6],
                lineHeight: ["28px", "32px"],
                letterSpacing: "-0.02em",
                fontWeight: 500,
                maxWidth: 640,
              }}
            >
              Up-level your productivity and communicate like a pro
            </Text.Title>
            <Box
              id="email-hero-example-address"
              sx={{
                flexShrink: 0,
                backgroundColor: "rgba(255,255,255,0.07)",
                borderRadius: 1,
                px: 2,
                py: 2,
                alignSelf: ["stretch", "flex-start"],
              }}
            >
              <Text.Label m={0} sx={{ color: "white" }}>
                {exampleEmail}
              </Text.Label>
            </Box>
          </Flex>
          <Flex
            flexWrap="wrap"
            alignItems="center"
            gap={2}
            sx={{ mt: [4, 6], rowGap: 2, columnGap: 2 }}
          >
            <Text.Body m={0} sx={{ color: "white", fontWeight: 500 }}>
              Popular with
            </Text.Body>
            {AUDIENCE_TAGS.map((tag) => (
              <AudiencePill key={tag}>{tag}</AudiencePill>
            ))}
          </Flex>
        </Flex>
      </Box>

      <Grid.Container          
        gridConstraint={12}
        id="email-provider-cards"
      >
        <Grid.Item columns={[12, 6]} id="email-provider-card-google-container" px={0}>
          <Card
            sx={{
              height: "100%",
              border: "1px solid",
              borderColor: "gray.800",
              borderRadius: 1,
            }}
            id="email-provider-card-google"
          >
            <Card.Body>
              <Stack space={2} sx={{ height: "100%" }} id="email-provider-card-google-body">
                <Flex alignItems="center" gap={2} id="email-provider-card-google">
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="/assets/email/google-g.png"
                      alt=""
                      width={22}
                      height={22}
                      style={{ display: "block" }}
                    />
                  </Box>
                  <Text.Subtitle m={0}>Google Workspace</Text.Subtitle>
                </Flex>
                <Text.Body m={0} color="gray.300">
                  Simplify your work with a suite of connected collaboration
                  tools including professional email.
                </Text.Body>
                <Stack space={1}>
                  {GOOGLE_FEATURES.map((line) => (
                    <FeatureRow key={line}>{line}</FeatureRow>
                  ))}
                </Stack>
                <Text.Caption m={0} color="gray.300">
                  Plans starting at $7/mo
                </Text.Caption>
                <Box pt={2}>
                  <Button.Secondary sx={{ width: "100%" }}>
                    Get started
                  </Button.Secondary>
                </Box>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item columns={[12, 6]}>
          <Card
            sx={{
              height: "100%",
              border: "1px solid",
              borderColor: "gray.800",
              borderRadius: 1,
            }}
          >
            <Card.Body>
              <Stack space={2} sx={{ height: "100%" }}>
                <Flex alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="/assets/email/titan-logo.png"
                      alt=""
                      width={22}
                      height={22}
                      style={{ display: "block" }}
                    />
                  </Box>
                  <Text.Subtitle>
                    Essential Email by Titan
                  </Text.Subtitle>
                </Flex>
                <Text.Body m={0} color="gray.300">
                  Communicate professionally with a custom business email
                  address.
                </Text.Body>
                <Stack space={1}>
                  {TITAN_FEATURES.map((line) => (
                    <FeatureRow key={line}>{line}</FeatureRow>
                  ))}
                </Stack>
                <Text.Caption m={0} color="gray.300">
                  Plan starting at $3/mo
                </Text.Caption>
                <Box pt={2}>
                  <Button.Secondary sx={{ width: "100%" }}>
                    Get started
                  </Button.Secondary>
                </Box>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
      </Grid.Container>

      <Flex
        as="section"
        id="email-forwarding"
        flexDirection={["column", "row"]}
        alignItems={["flex-start", "center"]}
        justifyContent="space-between"
        gap={4}
        sx={{
          width: "100%",
          border: "1px solid",
          borderColor: "gray.800",
          borderRadius: 1,
          backgroundColor: "white",
          p: 6,
        }}
      >
        <Stack space={2} sx={{ maxWidth: 532, flex: "1 0 auto" }}>
          <Text.Subtitle m={0}>Email Forwarding</Text.Subtitle>
          <Text.Caption m={0} color="gray.300">
            Create email aliases associated with your domain and forward them to
            another email address. You can have up to 100 email aliases.{" "}
            <TextLink href="#">Learn more</TextLink>
          </Text.Caption>
        </Stack>
        <Box sx={{ flexShrink: 0 }}>
          <Button.Tertiary>Add rule</Button.Tertiary>
        </Box>
      </Flex>
    </Stack>
  );
}
