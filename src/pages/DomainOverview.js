import { useParams, useNavigate } from "react-router-dom";
import { loadJsonData } from "../utils/dataUtils.ts";
import React, { useEffect, useState } from "react";
import { BackButton } from "@sqs/rosetta-elements";
import { ActivityIndicator } from "@sqs/rosetta-elements";
import { Text } from "@sqs/rosetta-primitives";
import { Button } from "@sqs/rosetta-primitives";
import { InfoCircle } from "@sqs/rosetta-icons";
import { Flex } from "@sqs/rosetta-primitives";
import { Divider } from "@sqs/rosetta-elements";
import { Box } from "@sqs/rosetta-primitives";
import { Image } from "@sqs/rosetta-elements";
import { Card } from "@sqs/rosetta-elements";
import { Toggle } from "@sqs/rosetta-elements";
import { Tabs } from "@sqs/rosetta-elements";
import { TextLink } from "@sqs/rosetta-elements";
import { Grid, Stack } from "@sqs/rosetta-elements";
import DomainOverviewHeader from "../components/DomainOverviewHeader/DomainOverviewHeader";

export default function DomainOverview() {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toggle states
  const [privateRegistration, setPrivateRegistration] = useState(true);
  const [domainLock, setDomainLock] = useState(true);

  // Tabs state
  const [activeTab, setActiveTab] = useState("admin");

  useEffect(() => {
    const fetchDomain = async () => {
      const response = await loadJsonData("domains");
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }
      const allDomains = response.data?.domains || [];
      const decodedId = domainId ? decodeURIComponent(domainId) : "";
      const found = allDomains.find((d) => d.domainName === decodedId) || null;
      setDomain(found);
      setLoading(false);
    };
    fetchDomain();
  }, [domainId]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!domain) {
    return (
      <div>
        <BackButton onClick={() => navigate("/domains")} />
        <h1>Domain not found</h1>
        <p>The requested domain "{domainId}" was not found.</p>
      </div>
    );
  }

  return (
    <Flex gap={6} flexDirection="column" id="domainOverview">
      <DomainOverviewHeader />
      {/* Info section — 2 columns */}
      <Grid.Container gridConstraint={12}>
        {/* WHOIS Privacy */}
        <Grid.Item
          columns={[12, 4]}
          p={2}
          divider={<Divider.Vertical my={1} />}
        >
          <Stack space={2}>
            <Flex alignItems="center" gap={1}>
              <Text.Label>WHOIS Privacy</Text.Label>
              <InfoCircle css={{ color: "gray.400", width: 16, height: 16 }} />
            </Flex>
            <Text.Subtitle>On</Text.Subtitle>
            <Flex alignItems="center" gap={2}>
              <Toggle
                checked={privateRegistration}
                onChange={(checked) => setPrivateRegistration(checked)}
                aria-label="Private registration"
              />
              <Text.Body>Private registration</Text.Body>
            </Flex>
            <TextLink href="#">WHOIS info</TextLink>
          </Stack>
        </Grid.Item>

        {/* Domain Lock */}
        <Grid.Item columns={[12, 4]} p={2}>
          <Stack space={2}>
            <Flex alignItems="center" gap={1}>
              <Text.Label>Domain Lock</Text.Label>
              <InfoCircle css={{ color: "gray.400", width: 16, height: 16 }} />
            </Flex>
            <Text.Subtitle>On</Text.Subtitle>
            <Flex alignItems="center" gap={2}>
              <Toggle
                checked={domainLock}
                onChange={(checked) => setDomainLock(checked)}
                aria-label="Lock"
              />
              <Text.Body>Lock</Text.Body>
            </Flex>
          </Stack>
        </Grid.Item>
      </Grid.Container>

      {/* Bottom section — Registration Info + Upsell */}
      <Grid.Container gridConstraint={12}>
        {/* Registration Information */}
        <Grid.Item columns={[12, 6]}>
          <Card sx={{ borderRadius: 2 }}>
            <Card.Body>
              <Stack space={3}>
                {/* Header */}
                <Flex alignItems="center" justifyContent="space-between">
                  <Text.Subtitle>Registration Information</Text.Subtitle>
                  <Button.Tertiary
                    size="small"
                    onClick={() => navigate(`/domains/${encodeURIComponent(domainId)}/registration`)}
                  >
                    Edit
                  </Button.Tertiary>
                </Flex>

                {/* Tabs */}
                <Tabs
                  value={activeTab}
                  onChange={(val) => setActiveTab(val)}
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "Billing", value: "billing" },
                    { label: "Owner", value: "owner" },
                    { label: "Tech", value: "tech" },
                  ]}
                />

                {/* Contact info */}
                <Stack space={1}>
                  <Text.Body>Madeline Engle</Text.Body>
                  <Text.Body>1234 Address Street</Text.Body>
                  <Text.Body>Brooklyn, NY 11222</Text.Body>
                  <Text.Body>123-345-6789</Text.Body>
                  <Text.Body>email@email.com</Text.Body>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>

        {/* Upsell Card — horizontal layout */}
        <Grid.Item columns={[12, 6]} id="upsellCard">
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Flex direction="row">
              <Box sx={{ width: "40%", flexShrink: 0 }}>
                <Image
                  src="../assets/upsellImg1.png"
                  alt="Create a website"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Card.Body sx={{ width: "60%" }}>
                <Stack space={2}>
                  <Text.Label>Suggested for You</Text.Label>
                  <Text.Subtitle>
                    Create a website
                  </Text.Subtitle>
                  <Text.Body color="gray.300">
                    Stand out online with a professional website, online store,
                    or portfolio.
                  </Text.Body>
                  <Stack space={2}>
                    <Button.Secondary sx={{ width: "100%" }}>
                      Start Trial
                    </Button.Secondary>
                    <Button.Tertiary sx={{ width: "100%" }}>
                      Connect Existing Website
                    </Button.Tertiary>
                  </Stack>
                </Stack>
              </Card.Body>
            </Flex>
          </Card>
        </Grid.Item>

      </Grid.Container>

      {/* Security & Health + Email */}
      <Grid.Container gridConstraint={12}>
        <Grid.Item columns={[12, 6]}>
          <Card sx={{ borderRadius: 2 }}>
            <Card.Body>
              <Stack space={2}>
                <Text.Subtitle>Security & health</Text.Subtitle>
                <Text.Body color="gray.300">
                  No security or health issues detected.
                </Text.Body>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item columns={[12, 6]}>
          <Card sx={{ borderRadius: 2 }}>
            <Card.Body>
              <Stack space={2}>
                <Text.Subtitle>Email connections</Text.Subtitle>
                <Text.Body color="gray.300">
                  No email connections configured.
                </Text.Body>
              </Stack>
            </Card.Body>
          </Card>
        </Grid.Item>
      </Grid.Container>

      {/* Footer actions */}
      <Box px={6} mt={2} mb={4} id="appBodyFooterActions">
        <Flex direction="row" gap={4}>
          <Button.Tertiary>Request Transfer Code</Button.Tertiary>
          <Button.Danger>Delete Domain</Button.Danger>
          <Button.Tertiary>Move Domain</Button.Tertiary>
        </Flex>
      </Box>
    </Flex>
  );
}
