import { useParams, useNavigate } from "react-router-dom";
import { loadJsonData } from "../utils/dataUtils.ts";
import React, { useEffect, useState } from "react";
import { BackButton } from "@sqs/rosetta-elements";
import { ActivityIndicator } from "@sqs/rosetta-elements";
import { Text } from "@sqs/rosetta-primitives";
import { Button } from "@sqs/rosetta-primitives";
import { Button as ButtonNext } from "@sqs/rosetta-react/button/next";
import { Flex } from "@sqs/rosetta-primitives";
import { Box } from "@sqs/rosetta-primitives";
import { Card } from "@sqs/rosetta-elements";
import { Tabs } from "@sqs/rosetta-elements";
import { Grid, Stack } from "@sqs/rosetta-elements";
import DomainOverviewHeader from "../components/DomainOverviewHeader/DomainOverviewHeader";
import DomainSetupGuide from "../components/DomainSetupGuide/DomainSetupGuide";
import SecurityScoreCard from "../components/SecurityScoreCard/SecurityScoreCard";
import SuggestedForYou from "../components/SuggestedForYou/SuggestedForYou";

/**
 * Domain Overview — Redesign 2026.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1670-82994
 */
export default function DomainOverview() {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      <Box px={6}>
        <DomainSetupGuide domainName={domain.domainName} />
      </Box>

      {/* Security + Registration information */}
      <Box px={6}>
        <Grid.Container gridConstraint={12} margin={0}>
          <Grid.Item columns={[12, 6]}>
            <SecurityScoreCard domain={domain} />
          </Grid.Item>

          <Grid.Item columns={[12, 6]}>
            <Card sx={{ borderRadius: 2, height: "100%" }}>
              <Card.Body>
                <Stack space={3}>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text.Subtitle>Registration information</Text.Subtitle>
                    <ButtonNext.Subtle
                      size="small"
                      onClick={() =>
                        navigate(
                          `/domains/${encodeURIComponent(domainId)}/registration`,
                        )
                      }
                    >
                      Manage
                    </ButtonNext.Subtle>
                  </Flex>

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
        </Grid.Container>
      </Box>

      <Box px={6}>
        <SuggestedForYou />
      </Box>

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
