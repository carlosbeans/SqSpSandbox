import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Card, Chip, Grid, Stack, TextLink, Toggle } from "@sqs/rosetta-elements";
import { Text } from "@sqs/rosetta-react/text/next";
import { useTheme } from "@sqs/rosetta-styled";
import { CheckmarkShield } from "@sqs/rosetta-icons";
import { usePageHeader } from "../layouts/PageHeaderContext";
import { loadJsonData } from "../utils/dataUtils.ts";
import { SLIDE_FORWARD } from "../constants/motion";
import {
  BASE_PROTECTIONS,
  ADDON_PROTECTIONS,
  COMING_SOON_PROTECTIONS,
} from "../constants/securityProtections";

/**
 * Domain Settings — Security tab content. Every domain gets the four base
 * protection cards below; domains with the Security Add-on additionally get
 * the "Advanced protections" grid.
 * @see https://www.figma.com/design/sLKjrT1verCjfxjCrOmny8/Domain-Settings?node-id=101-7491
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1673-87804
 */
const SECURITY_FEATURES = BASE_PROTECTIONS.map((feature) => ({
  ...feature,
  hasToggle: feature.key !== "sslCertificate",
}));

export function SecurityContent({ inlineHeader } = {}) {
  const { radii } = useTheme();
  const { domainId } = useParams();
  const navigate = useNavigate();
  const [domain, setDomain] = React.useState(null);
  const [toggles, setToggles] = React.useState({
    whoisPrivacy: true,
    dnssec: true,
    domainLock: true,
  });
  const [addOnToggles, setAddOnToggles] = React.useState({});

  React.useEffect(() => {
    let cancelled = false;
    async function fetchDomain() {
      const response = await loadJsonData("domains");
      if (cancelled) return;
      const all = response.data?.domains || [];
      const decodedId = domainId ? decodeURIComponent(domainId) : "";
      const found = all.find((d) => d.domainName === decodedId) || null;
      setDomain(found);
      if (found?.securityProtections) {
        setAddOnToggles({
          protectedActionAlerts: Boolean(
            found.securityProtections.protectedActionAlerts,
          ),
          secureEmailForwarder: Boolean(
            found.securityProtections.secureEmailForwarder,
          ),
          extendedExpiryProtection: Boolean(
            found.securityProtections.extendedExpiryProtection,
          ),
          improvedDdosPrevention: Boolean(
            found.securityProtections.improvedDdosPrevention,
          ),
          secondaryDns: Boolean(found.securityProtections.secondaryDns),
        });
      }
    }
    fetchDomain();
    return () => {
      cancelled = true;
    };
  }, [domainId]);

  const hasAddOn = Boolean(domain?.securityAddOn);

  const handleToggleChange = React.useCallback(
    (key) => (checked) => {
      setToggles((prev) => ({ ...prev, [key]: checked }));
    },
    [],
  );

  const handleAddOnToggleChange = React.useCallback(
    (key) => (checked) => {
      setAddOnToggles((prev) => ({ ...prev, [key]: checked }));
    },
    [],
  );

  const handleManageClick = React.useCallback(
    (feature) => (event) => {
      if (feature.linkTo !== "registration" || !domainId) return;
      event.preventDefault();
      navigate(`/domains/${encodeURIComponent(domainId)}/registration`, {
        state: { slideDirection: SLIDE_FORWARD },
      });
    },
    [domainId, navigate],
  );

  return (
    <Box px={inlineHeader ? 0 : 6} id="security-page-content">
      <Flex flexDirection="column" gap={4}>
        {inlineHeader && (
          <Stack space={1}>
            <Text.Heading.Large as="h2" mb={0}>
              Security
            </Text.Heading.Large>
            <Text.Body sx={{ color: "gray.500" }}>
              Configure security settings related to your domain, like WHOIS
              privacy, DNSSEC, and domain lock.
            </Text.Body>
          </Stack>
        )}
        <Grid.Container gridConstraint={12} margin={0}>
          {SECURITY_FEATURES.map((feature) => (
            <Grid.Item key={feature.key} columns={[12, 6, 3]} mb={4}>
              <Card sx={{ borderRadius: radii[1], height: "100%" }}>
                <Card.Body>
                  <Flex flexDirection="column" gap={3} height="100%">
                    <Flex
                      alignItems="flex-start"
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Text.Heading.Small as="h3" m={0}>
                        {feature.title}
                      </Text.Heading.Small>
                      {feature.hasToggle && (
                        <Toggle
                          checked={toggles[feature.key]}
                          onChange={handleToggleChange(feature.key)}
                          aria-label={feature.title}
                        />
                      )}
                    </Flex>
                    <Text.Body color="gray.300">
                      {feature.description}
                    </Text.Body>
                    {feature.linkLabel && (
                      <TextLink href="#" onClick={handleManageClick(feature)}>
                        <Text.Body.Small>{feature.linkLabel}</Text.Body.Small>
                      </TextLink>
                    )}
                  </Flex>
                </Card.Body>
              </Card>
            </Grid.Item>
          ))}
        </Grid.Container>

        {hasAddOn && (
          <Stack space={4} id="advanced-protections">
            <Stack space={1}>
              <Flex alignItems="center" gap={2}>
                <Text.Heading.Medium as="h2" m={0}>
                  Advanced protections
                </Text.Heading.Medium>
                <Chip
                  label="Included with Add-on"
                  glyph={<CheckmarkShield />}
                  usage="badge"
                />
              </Flex>
              <Text.Body sx={{ color: "gray.500" }}>
                Extra protections included with your subscription.{" "}
                <TextLink href="#">Manage subscription</TextLink>
              </Text.Body>
            </Stack>
            <Grid.Container gridConstraint={12} margin={0}>
              {ADDON_PROTECTIONS.map((feature) => (
                <Grid.Item key={feature.key} columns={[12, 6, 4]} mb={4}>
                  <Card sx={{ borderRadius: radii[1], height: "100%" }}>
                    <Card.Body>
                      <Flex flexDirection="column" gap={3} height="100%">
                        <Flex
                          alignItems="flex-start"
                          justifyContent="space-between"
                          gap={2}
                        >
                          <Text.Heading.Small as="h3" m={0}>
                            {feature.title}
                          </Text.Heading.Small>
                          <Toggle
                            checked={addOnToggles[feature.key]}
                            onChange={handleAddOnToggleChange(feature.key)}
                            aria-label={feature.title}
                          />
                        </Flex>
                        <Text.Body color="gray.300">
                          {feature.description}
                        </Text.Body>
                        {feature.linkLabel && (
                          <TextLink href="#">
                            <Text.Body.Small>
                              {feature.linkLabel}
                            </Text.Body.Small>
                          </TextLink>
                        )}
                      </Flex>
                    </Card.Body>
                  </Card>
                </Grid.Item>
              ))}
              {COMING_SOON_PROTECTIONS.map((feature) => (
                <Grid.Item key={feature.key} columns={[12, 6, 4]} mb={4}>
                  <Card sx={{ borderRadius: radii[1], height: "100%" }}>
                    <Card.Body>
                      <Stack space={3}>
                        <Flex
                          alignItems="flex-start"
                          justifyContent="space-between"
                          gap={2}
                        >
                          <Text.Heading.Small as="h3" m={0} sx={{ color: "gray.400" }}>
                            {feature.title}
                          </Text.Heading.Small>
                          <Chip label="Coming soon" usage="badge" />
                        </Flex>
                        <Text.Body color="gray.400">
                          {feature.description}
                        </Text.Body>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Grid.Item>
              ))}
            </Grid.Container>
          </Stack>
        )}
      </Flex>
    </Box>
  );
}

export default function Security() {
  usePageHeader({
    title: "Security",
    subtitle:
      "Configure security settings related to your domain, like WHOIS privacy, DNSSEC, and domain lock.",
  });
  return <SecurityContent />;
}
