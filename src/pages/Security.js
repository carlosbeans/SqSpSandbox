import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Card, Grid, Stack, TextLink, Toggle } from "@sqs/rosetta-elements";
import { Text } from "@sqs/rosetta-react/text/next";
import { useTheme } from "@sqs/rosetta-styled";
import { usePageHeader } from "../layouts/PageHeaderContext";
import { SLIDE_FORWARD } from "../constants/motion";

/**
 * Domain Settings — Security tab content.
 * @see https://www.figma.com/design/sLKjrT1verCjfxjCrOmny8/Domain-Settings?node-id=101-7491
 */
const SECURITY_FEATURES = [
  {
    key: "whoisPrivacy",
    title: "WHOIS privacy",
    description:
      "Hides your name and contact details from the public WHOIS directory, so your personal information stays private.",
    hasToggle: true,
    linkLabel: "Manage",
    linkTo: "registration",
  },
  {
    key: "dnssec",
    title: "DNSSEC",
    description:
      "Adds cryptographic signatures to DNS records, using a chain of trust to prevent cache poisoning and spoofing.",
    hasToggle: true,
  },
  {
    key: "domainLock",
    title: "Domain lock",
    description:
      "Prevents unauthorized transfers by restricting changes to your domain's registrar settings without explicit approval.",
    hasToggle: true,
  },
  {
    key: "sslCertificate",
    title: "SSL certificate",
    description:
      "Replaces your contact info with registrar details, keeping your name hidden from spammers.",
    hasToggle: false,
    linkLabel: "View certificate",
  },
];

export function SecurityContent({ inlineHeader } = {}) {
  const { radii } = useTheme();
  const { domainId } = useParams();
  const navigate = useNavigate();
  const [toggles, setToggles] = React.useState({
    whoisPrivacy: true,
    dnssec: true,
    domainLock: true,
  });

  const handleToggleChange = React.useCallback(
    (key) => (checked) => {
      setToggles((prev) => ({ ...prev, [key]: checked }));
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
