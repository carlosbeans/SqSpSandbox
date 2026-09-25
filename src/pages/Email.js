import React from "react";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Card, Stack } from "@sqs/rosetta-elements";
import { Text } from "@sqs/rosetta-react/text/next";
import { Button } from "@sqs/rosetta-react/button/next";
import { Checkbox } from "@sqs/rosetta-react/checkbox/next";
import {
  Checkmark,
  ExclamationMarkCircle,
  LogoGoogle,
  LogoTitan,
} from "@sqs/rosetta-icons";
import { usePageHeader } from "../layouts/PageHeaderContext";
import EmailHeroBanner from "../components/EmailHeroBanner/EmailHeroBanner";

const GOOGLE_WORKSPACE_FEATURES = [
  "Premium versions of Gmail, Docs, Calendar, Meet, and more",
  "Integrated AI assistant",
  "30 GB+ of storage per user",
  "Add users as you grow",
];

const TITAN_FEATURES = ["Built-in calendar and contacts", "10 GB of storage"];

const cardSx = {
  bg: "white",
  borderRadius: "6px",
};

function ProviderCard({ id, title, description, children, price }) {
  return (
    <Card
      id={id}
      flex={{ _: "none", "from-l": "1 0 0" }}
      sx={{ ...cardSx, minWidth: 0 }}
    >
      <Card.Body p={6} sx={{ height: "100%" }}>
        <Flex flexDirection="column" gap={2} sx={{ height: "100%" }}>
          {title}
          <Text.Body>{description}</Text.Body>
          <Box sx={{ flex: 1 }}>{children}</Box>
          <Text.Body.Small color="fg.muted">{price}</Text.Body.Small>
          <Button.Strong sx={{ width: "100%" }}>Get started</Button.Strong>
        </Flex>
      </Card.Body>
    </Card>
  );
}

function GoogleWorkspaceCard() {
  return (
    <ProviderCard
      id="email-google-workspace-card"
      title={
        <Flex alignItems="center" gap={1}>
          <LogoGoogle width={22} height={22} />
          <Text.Heading.Medium as="h2">Google Workspace</Text.Heading.Medium>
        </Flex>
      }
      description="Professional email plus a suite of collaboration tools"
      price="Plans starting at $7/mo"
    >
      <Stack space={1}>
        {GOOGLE_WORKSPACE_FEATURES.map((feature) => (
          <Checkbox.Root key={feature}>
            <Checkbox.Control defaultChecked />
            <Checkbox.Label>{feature}</Checkbox.Label>
          </Checkbox.Root>
        ))}
      </Stack>
    </ProviderCard>
  );
}

function TitanCard() {
  return (
    <ProviderCard
      id="email-titan-card"
      title={
        <Flex alignItems="center" gap={1}>
          <LogoTitan width={22} height={22} />
          <Text.Heading.Medium as="h2">
            Essential Email <Box as="span" sx={{ color: "fg.muted" }}>by Titan</Box>
          </Text.Heading.Medium>
        </Flex>
      }
      description="Communicate with a custom business email address"
      price="Plan starting at $3/mo"
    >
      <Stack space={1}>
        {TITAN_FEATURES.map((feature) => (
          <Flex key={feature} alignItems="center" gap={1}>
            <Checkmark width={16} height={16} color="fg.muted" />
            <Text.Body.Small color="fg.muted">{feature}</Text.Body.Small>
          </Flex>
        ))}
        <Flex alignItems="flex-start" gap={1}>
          <ExclamationMarkCircle
            width={16}
            height={16}
            color="fg.warning"
            sx={{ flexShrink: 0, mt: "2px" }}
          />
          <Text.Body color="fg.warning">
            Single user only. Multiple mailboxes coming soon.
          </Text.Body>
        </Flex>
      </Stack>
    </ProviderCard>
  );
}

function EmailForwardingCard() {
  return (
    <Card id="email-forwarding-card" sx={cardSx}>
      <Card.Body p={3}>
        <Flex
          gap={3}
          flexDirection={{ _: "column", "from-m": "row" }}
          alignItems={{ _: "flex-start", "from-m": "center" }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Text.Heading.Medium as="h2">Email Forwarding</Text.Heading.Medium>
            <Text.Body color="fg.muted">
              Create email aliases associated with your domain and forward them
              to another email address. You can have up to 100 email aliases.
            </Text.Body>
          </Box>
          <Button.Subtle sx={{ flexShrink: 0 }}>Add rule</Button.Subtle>
        </Flex>
      </Card.Body>
    </Card>
  );
}

export default function Email() {
  usePageHeader({ title: "Email", subtitle: "Manage your domain's email settings. Learn more about email" });

  return (
    <Box id="emailPage" px={6}>
      <Stack space={6}>
        <EmailHeroBanner />
        <Flex
          gap={6}
          alignItems="stretch"
          flexDirection={{ _: "column", "from-l": "row" }}
        >
          <GoogleWorkspaceCard />
          <TitanCard />
        </Flex>
        <EmailForwardingCard />
      </Stack>
    </Box>
  );
}
