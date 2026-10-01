import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Card, Chip, Grid, Stack, TextLink } from "@sqs/rosetta-elements";
import { Text } from "@sqs/rosetta-react/text/next";
import { Toggle } from "@sqs/rosetta-react/toggle/next";
import { useTheme } from "@sqs/rosetta-styled";
import { CheckmarkShield } from "@sqs/rosetta-icons";
import { usePageHeader } from "../layouts/PageHeaderContext";
import SecuritySummaryPanel from "../components/SecuritySummaryPanel/SecuritySummaryPanel";
import { useDomainProtections } from "../contexts/DomainProtectionsContext";
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
  const { domain, protections, setProtection } = useDomainProtections();

  const hasAddOn = Boolean(domain?.securityAddOn);

  const handleToggleChange = React.useCallback(
    (key) => (event) => {
      setProtection(key, event.target.checked);
    },
    [setProtection],
  );

  const handleManageClick = React.useCallback(
    (feature) => (event) => {
      if (!feature.linkTo || !domainId) return;
      event.preventDefault();
      navigate(`/domains/${encodeURIComponent(domainId)}/${feature.linkTo}`, {
        state: { slideDirection: SLIDE_FORWARD },
      });
    },
    [domainId, navigate],
  );

  return (
    <Box px={inlineHeader ? 0 : 6} id="security-page-content">
      <Flex flexDirection="column" gap={8}>
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
        {domain && <SecuritySummaryPanel domain={domain} />}
        <Flex
          flexDirection="column"
          gap={6}
          id="security-standard-protections"
        >
          <Stack space={1}>
            <Text.Heading.Small as="h2" m={0}>
              Standard protections
            </Text.Heading.Small>
            <Text.Body sx={{ color: "gray.300" }}>
              Privacy and security features standard with every domain.
            </Text.Body>
          </Stack>
          <Grid.Container gridConstraint={12} margin={0} gutter={4}>
            {SECURITY_FEATURES.map((feature) => (
              <Grid.Item
                key={feature.key}
                columns={[12, 6, 4]}
                mb={4}
                display="flex"
              >
                <Card sx={{ borderRadius: radii[1], width: "100%" }}>
                  <Card.Body>
                    <Flex flexDirection="column" gap={3}>
                      <Flex
                        alignItems="flex-start"
                        justifyContent="space-between"
                        gap={2}
                      >
                        <Text.Heading.Small as="h3" m={0}>
                          {feature.title}
                        </Text.Heading.Small>
                        {feature.hasToggle && (
                          <Toggle.Root>
                            <Toggle.Control
                              checked={Boolean(protections[feature.key])}
                              onChange={handleToggleChange(feature.key)}
                              aria-label={feature.title}
                            />
                          </Toggle.Root>
                        )}
                      </Flex>
                      <Text.Body color="gray.300">
                        {feature.description}
                      </Text.Body>
                      {feature.linkLabel &&
                        (feature.key !== "whoisPrivacy" || hasAddOn) && (
                          <TextLink
                            href="#"
                            onClick={handleManageClick(feature)}
                          >
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
          </Grid.Container>
        </Flex>

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
            <Grid.Container gridConstraint={12} margin={0} gutter={4}>
              {ADDON_PROTECTIONS.map((feature) => (
                <Grid.Item
                  key={feature.key}
                  columns={[12, 6, 4]}
                  mb={4}
                  display="flex"
                >
                  <Card sx={{ borderRadius: radii[1], width: "100%" }}>
                    <Card.Body>
                      <Flex flexDirection="column" gap={3}>
                        <Flex
                          alignItems="flex-start"
                          justifyContent="space-between"
                          gap={2}
                        >
                          <Text.Heading.Small as="h3" m={0}>
                            {feature.title}
                          </Text.Heading.Small>
                          <Toggle.Root>
                            <Toggle.Control
                              checked={Boolean(protections[feature.key])}
                              onChange={handleToggleChange(feature.key)}
                              aria-label={feature.title}
                            />
                          </Toggle.Root>
                        </Flex>
                        <Text.Body color="gray.300">
                          {feature.description}
                        </Text.Body>
                        {feature.linkLabel && (
                          <TextLink
                            href="#"
                            onClick={handleManageClick(feature)}
                          >
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
                <Grid.Item
                  key={feature.key}
                  columns={[12, 6, 4]}
                  mb={4}
                  display="flex"
                >
                  <Card sx={{ borderRadius: radii[1], width: "100%" }}>
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
                          <Chip
                            label="Coming soon"
                            usage="badge"
                            sx={{ flexShrink: 0, whiteSpace: "nowrap" }}
                          />
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
