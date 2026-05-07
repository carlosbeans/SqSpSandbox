import { Stack, Divider, TextLink } from "@sqs/rosetta-elements";
import { Text, Flex, Box } from "@sqs/rosetta-primitives";
import { Banner } from "@sqs/rosetta-compositions";
import { useTheme } from "@sqs/rosetta-styled";
import { usePageHeader } from "../layouts/PageHeaderContext";

const BILLING_ADDRESS = {
  name: "Carlos R Andujar",
  line1: "1173 North Carter Road",
  line2: "Decatur, GA 30030",
  country: "United States",
};

function MastercardLogo({ size = 32 }) {
  const h = Math.round((size * 24) / 34);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 34 24"
      aria-hidden
      focusable="false"
    >
      <circle cx="13" cy="12" r="10" fill="#EB001B" />
      <circle cx="21" cy="12" r="10" fill="#F79E1B" />
    </svg>
  );
}

const editLinkSx = {
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  display: "inline-flex",
  alignItems: "center",
  minHeight: 44,
  py: 2,
  px: 2,
  marginRight: -2,
};

/**
 * @param {{ inlineHeader?: boolean }} props
 * When `inlineHeader` is true (e.g. Domain Settings tab), renders title + subtitle that were previously in the shell page header.
 */
export function BillingContent({ inlineHeader = false }) {
  const { colors } = useTheme();

  return (
    <Stack
      space={6}
      pt={inlineHeader ? 0 : 2}
      pb={inlineHeader ? 0 : 8}
      id={inlineHeader ? "domain-settings-tab-billing" : "billing-page-content"}
    >
      {inlineHeader ? (
        <Stack space={2} id="domain-settings-billing-intro">
          <Text.Subtitle>Payment Information</Text.Subtitle>
          <Text.Body color="gray.300">
            All your payment information is securely submitted.
          </Text.Body>
        </Stack>
      ) : null}
      <Banner.Info>
        <Banner.Main>
          <Banner.Row alignItems="flex-start">
            <Banner.Glyph />
            <Banner.Column>
              <Banner.Body>
                Changing payment here will impact all subscriptions associated.{" "}
                <TextLink href="#">View subscriptions.</TextLink>
              </Banner.Body>
            </Banner.Column>
          </Banner.Row>
        </Banner.Main>
      </Banner.Info>

      <Stack space={4}>
        <Flex alignItems="center" justifyContent="space-between" gap={4}>
          <Text.Subtitle>Billing Address</Text.Subtitle>
          <TextLink
            href="#"
            onClick={(e) => e.preventDefault()}
            sx={editLinkSx}
          >
            Edit
          </TextLink>
        </Flex>
        <Stack space={1}>
          <Text.Body m={0}>{BILLING_ADDRESS.name}</Text.Body>
          <Text.Body m={0}>{BILLING_ADDRESS.line1}</Text.Body>
          <Text.Body m={0}>{BILLING_ADDRESS.line2}</Text.Body>
          <Text.Body m={0}>{BILLING_ADDRESS.country}</Text.Body>
        </Stack>
        <Divider sx={{ borderColor: colors.gray[800] }} />
      </Stack>

      <Stack space={4}>
        <Flex alignItems="center" justifyContent="space-between" gap={4}>
          <Text.Subtitle>Payment Method</Text.Subtitle>
          <TextLink
            href="#"
            onClick={(e) => e.preventDefault()}
            sx={editLinkSx}
          >
            Edit
          </TextLink>
        </Flex>
        <Flex alignItems="center" gap={3}>
          <Box sx={{ flexShrink: 0, display: "flex" }}>
            <MastercardLogo size={40} />
          </Box>
          <Text.Body
            m={0}
            sx={{
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "0.02em",
            }}
          >
            •••• •••• •••• 7424
          </Text.Body>
        </Flex>
        <Divider sx={{ borderColor: colors.gray[800] }} />
      </Stack>
    </Stack>
  );
}

export default function Billing() {
  usePageHeader({
    title: "Payment Information",
    subtitle: "All your payment information is securely submitted.",
  });

  return (
    <Box px={6}>
      <BillingContent inlineHeader={false} />
    </Box>
  );
}
