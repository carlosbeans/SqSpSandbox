import { Card, TextLink } from "@sqs/rosetta-elements";
import { Flex, Box } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { Button } from "@sqs/rosetta-react/button/next";
import { Banner } from "@sqs/rosetta-compositions";
import { useTheme } from "@sqs/rosetta-styled";
import { usePageHeader } from "../layouts/PageHeaderContext";

const BILLING_ADDRESS = {
  name: "Carlos R Andujar",
  line1: "1173 North Carter Road",
  cityState: "Decatur, GA",
  zip: "30030",
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

export function BillingContent({ inlineHeader } = {}) {
  const { borders, colors, radii } = useTheme();

  const cardSx = {
    flex: "1 0 0",
    minWidth: 0,
    borderRadius: radii[1],
    border: borders[1],
    borderColor: colors.gray[800],
  };

  return (
    <Flex
      flexDirection="column"
      px={inlineHeader ? 0 : 6}
      space={6}
      pt={inlineHeader ? 0 : 2}
      pb={inlineHeader ? 0 : 8}
      id="billing-page-content"
    >
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
      <Flex
        flexDirection={{ "mobile-*": "column", _: "row" }}
        gap={6}
        width="100%"
        alignItems="stretch"
        id="billing-details-container"
      >
        <Card sx={cardSx} id="billing-address-card">
          <Card.Body p={6}>
            <Flex
              flexDirection="column"
              gap={2}
              height="100%"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Flex flexDirection="column" gap={2} width="100%">
                <Text.Heading.Small as="h2" m={0}>
                  Billing address
                </Text.Heading.Small>
                <Flex flexDirection="column" width="100%">
                  <Text.Body m={0}>{BILLING_ADDRESS.name}</Text.Body>
                  <Text.Body m={0}>{BILLING_ADDRESS.line1}</Text.Body>
                  <Flex alignItems="flex-start">
                    <Text.Body m={0}>{BILLING_ADDRESS.cityState}</Text.Body>
                    <Text.Body m={0}>{BILLING_ADDRESS.zip}</Text.Body>
                  </Flex>
                  <Text.Body m={0}>{BILLING_ADDRESS.country}</Text.Body>
                </Flex>
              </Flex>
              <Button.Subtle size="small">Edit</Button.Subtle>
            </Flex>
          </Card.Body>
        </Card>

        <Card sx={cardSx} id="billing-payment-method-card">
          <Card.Body p={6}>
            <Flex
              flexDirection="column"
              height="100%"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Flex flexDirection="column" gap={2} width="100%">
                <Text.Heading.Small as="h2" m={0}>
                  Payment Method
                </Text.Heading.Small>
                <Flex alignItems="flex-start" gap={2}>
                  <Box sx={{ flexShrink: 0, display: "flex" }}>
                    <MastercardLogo size={22} />
                  </Box>
                  <Flex alignItems="center" gap={1}>
                    <Text.Body
                      m={0}
                      sx={{
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "0.02em",
                      }}
                    >
                      •••• •••• ••••
                    </Text.Body>
                    <Text.Body
                      m={0}
                      sx={{
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "0.02em",
                      }}
                    >
                      7424
                    </Text.Body>
                  </Flex>
                </Flex>
              </Flex>
              <Button.Subtle size="small">Edit</Button.Subtle>
            </Flex>
          </Card.Body>
        </Card>
      </Flex>
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
