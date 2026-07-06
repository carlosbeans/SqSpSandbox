import { Stack, Divider, TextLink } from "@sqs/rosetta-elements";
import { Text, Flex, Box, Button } from "@sqs/rosetta-primitives";
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

export function BillingContent() {
  const { colors } = useTheme();

  return (
    <Flex flexDirection="column" px={6} space={6} pt={2} pb={8} id="billing-page-content">
      <Flex
        mb={8}
        gap={4}
        id="billing-subscriptions-banner-container"
        width="100%"
      >
        <Banner.Info
          layout="wide"
          id="billing-subscriptions-banner"
          sx={{ width: "100%" }}
        >
          <Banner.Info.Main>
            <Banner.Info.Row alignItems="flex-start">
              <Banner.Info.Glyph />
              <Banner.Info.Column>
                <Banner.Info.Title>Important</Banner.Info.Title>
                <Banner.Info.Body>
                  Changing payment here will impact all subscriptions associated.{" "}
                  <TextLink
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    View subscriptions.
                  </TextLink>
                </Banner.Info.Body>
              </Banner.Info.Column>
            </Banner.Info.Row>
          </Banner.Info.Main>
        </Banner.Info>
      </Flex>      
      <Flex flexDirection="column" mb={4}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text.Subtitle>Billing Address</Text.Subtitle>
          <Button.Tertiary size="small">Edit</Button.Tertiary>
        </Flex>
        <Flex flexDirection="column" space={1} pb={4}>
          <Text.Body m={0}>{BILLING_ADDRESS.name}</Text.Body>
          <Text.Body m={0}>{BILLING_ADDRESS.line1}</Text.Body>
          <Text.Body m={0}>{BILLING_ADDRESS.line2}</Text.Body>
          <Text.Body m={0}>{BILLING_ADDRESS.country}</Text.Body>
        </Flex>
        <Divider sx={{ borderColor: colors.gray[800] }} />
      </Flex>

      <Stack space={4}>
        <Flex alignItems="center" justifyContent="space-between" gap={4}>
          <Text.Subtitle>Payment Method</Text.Subtitle>
          <Button.Tertiary size="small">Edit</Button.Tertiary>
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
    </Flex>
  );
}

export default function Billing() {
  usePageHeader({
    title: "Payment Information",
    subtitle: "All your payment information is securely submitted.",
  });

  return <BillingContent />;
}
