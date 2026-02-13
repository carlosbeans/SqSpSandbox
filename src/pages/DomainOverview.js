//css
import "../styles/styles.scss";
import { useParams, useNavigate } from "react-router-dom";
import { loadJsonData } from "../utils/dataUtils.ts";
import React, { useEffect, useState } from "react";
import { BackButton } from "@sqs/rosetta-elements";
import { ActivityIndicator } from "@sqs/rosetta-elements";
import { Text } from "@sqs/rosetta-primitives";
import { Button } from "@sqs/rosetta-primitives";
import { Chip } from "@sqs/rosetta-elements";
import { CheckmarkCircle, InfoCircle } from "@sqs/rosetta-icons";
import { Flex } from "@sqs/rosetta-primitives";
import { Divider } from "@sqs/rosetta-elements";
import { Box } from "@sqs/rosetta-primitives";
import { Image } from "@sqs/rosetta-elements";
import { Card } from "@sqs/rosetta-elements";
import { Toggle } from "@sqs/rosetta-elements";
import { Tabs } from "@sqs/rosetta-elements";
import { TextLink } from "@sqs/rosetta-elements";

//components
import SiteThumbnail from "../components/SiteThumbnail/SiteThumbnail";
import { Grid, Stack } from "@sqs/rosetta-elements";
import SidePanelNav from "../components/SidePanelNav/SidePanelNav";

export default function DomainOverview() {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toggle states
  const [autoRenew, setAutoRenew] = useState(true);
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
    return (
      <div className="container full-width">
        <div className="row">
          <div className="col">
            <ActivityIndicator />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container full-width">
        <div className="row">
          <div className="col">{error}</div>
        </div>
      </div>
    );
  }

  if (!domain) {
    return (
      <div className="container full-width">
        <div className="row">
          <div className="col">
            <div className="pageSubNav">
              <BackButton onClick={() => navigate(-1)} />
            </div>
            <h1>Domain not found</h1>
            <p>The requested domain "{domainId}" was not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container full-width">
      <Grid.Container gridConstraint={12}>
        {/* Left sidebar nav */}
        <Grid.Item columns={[12, 3]}>
          <SidePanelNav />
        </Grid.Item>

        {/* Main content area */}
        <Grid.Item columns={[12, 9]}>
          <Stack space={6}>
            {/* Hero Card — domain name + thumbnail */}
            <Card>
              <Card.Body>
                <Flex alignItems="center" gap={4}>
                  <SiteThumbnail size="small" />
                  <Stack space={1}>
                    <Flex alignItems="center" gap={2}>
                      <Text.Title>{domain.domainName}</Text.Title>
                      <Chip.Container status="success" sx={{ flex: "0 0 auto" }}>
                        <CheckmarkCircle
                          css={{
                            flex: "0 0 auto",
                            marginRight: 4,
                            color: "inherit",
                          }}
                        />
                        <Chip.Label>Active</Chip.Label>
                      </Chip.Container>
                    </Flex>
                    <Text.Body color="gray.300">
                      Provider: {domain.domainProvider || "Squarespace"}
                    </Text.Body>
                  </Stack>
                </Flex>
              </Card.Body>
            </Card>

            {/* Info section — 3 columns */}
            <Grid.Container gridConstraint={12}>
              {/* Expires On */}
              <Grid.Item
                columns={[12, 4]}
                p={2}
                divider={<Divider.Vertical my={1} />}
              >
                <Stack space={2}>
                  <Flex alignItems="center" gap={1}>
                    <Text.Label>Expires On</Text.Label>
                    <InfoCircle css={{ color: "gray.400", width: 16, height: 16 }} />
                  </Flex>
                  <Box>
                    <Text.Subtitle fontWeight="semibold">
                      {domain.expirationDate || "Aug 23, 2024"}{" "}
                      <Text.Body as="span">for $12</Text.Body>
                    </Text.Subtitle>
                  </Box>
                  <Flex alignItems="center" gap={2}>
                    <Toggle
                      checked={autoRenew}
                      onChange={(checked) => setAutoRenew(checked)}
                      aria-label="Auto-renew"
                    />
                    <Text.Body>Auto-renew</Text.Body>
                  </Flex>
                  <TextLink href="#">Add years</TextLink>
                </Stack>
              </Grid.Item>

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
                  <Text.Subtitle fontWeight="semibold">On</Text.Subtitle>
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
                  <Text.Subtitle fontWeight="semibold">On</Text.Subtitle>
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
                <Card>
                  <Card.Body>
                    <Stack space={3}>
                      {/* Header */}
                      <Flex alignItems="center" justifyContent="space-between">
                        <Text.Subtitle fontWeight="semibold">
                          Registration Information
                        </Text.Subtitle>
                        <Button.Tertiary size="small">Edit</Button.Tertiary>
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

                      <Divider.Horizontal />

                      {/* Additional Information */}
                      <Flex alignItems="center" justifyContent="space-between">
                        <Text.Body fontWeight="semibold">
                          Additional Information
                        </Text.Body>
                        <Button.Tertiary size="small">Edit</Button.Tertiary>
                      </Flex>
                    </Stack>
                  </Card.Body>
                </Card>
              </Grid.Item>

              {/* Upsell Card */}
              <Grid.Item columns={[12, 6]}>
                <Card>
                  <Image src="../assets/upsellImg1.png" alt="Create a website" />
                  <Card.Body>
                    <Stack space={2}>
                      <Text.Label>Suggested for You</Text.Label>
                      <Text.Subtitle fontWeight="semibold">
                        Create a website
                      </Text.Subtitle>
                      <Text.Body color="gray.300">
                        Stand out online with a professional website, online
                        store, or portfolio.
                      </Text.Body>
                      <Stack space={2}>
                        <Button.Secondary>Start Trial</Button.Secondary>
                        <Button.Tertiary>Connect Existing Website</Button.Tertiary>
                      </Stack>
                    </Stack>
                  </Card.Body>
                </Card>
              </Grid.Item>
            </Grid.Container>

            {/* Footer actions */}
            <Box mt={2} mb={4}>
              <Flex direction="row" gap={4} justifyContent="center">
                <Button.Tertiary>Request Transfer Code</Button.Tertiary>
                <Button.Danger>Delete Domain</Button.Danger>
                <Button.Tertiary>Move Domain</Button.Tertiary>
              </Flex>
            </Box>
          </Stack>
        </Grid.Item>
      </Grid.Container>
    </div>
  );
}
