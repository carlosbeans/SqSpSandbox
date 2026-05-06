import React from "react";
import { Box, Flex, Text, Button } from "@sqs/rosetta-primitives";
import { TextLink } from "@sqs/rosetta-elements";

const ASSETS = `${process.env.PUBLIC_URL || ""}/images/pay-links`;

function FlatBadge({ src, alt }) {
  return (
    <Box
      sx={{
        width: 51,
        height: 35,
        flexShrink: 0,
        position: "relative",
      }}
    >
      <img
        alt={alt}
        src={src}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}

function FilledBadge({ bg, src, alt, imgSx }) {
  return (
    <Box
      sx={{
        width: 51,
        height: 35,
        flexShrink: 0,
        position: "relative",
        bg,
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      <Box
        as="img"
        src={src}
        alt={alt}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "none",
          objectFit: "cover",
          ...imgSx,
        }}
      />
    </Box>
  );
}

function AchBadge({ iconSrc }) {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      gap="4px"
      sx={{
        width: 51,
        height: 35,
        flexShrink: 0,
        bg: "white",
        border: "1px solid",
        borderColor: "gray.800",
        borderRadius: "4px",
      }}
    >
      <Box as="img" src={iconSrc} alt="" sx={{ width: 10, height: "auto" }} />
      <Text.Caption
        sx={{
          fontWeight: 500,
          letterSpacing: "0.3px",
          textTransform: "uppercase",
          fontSize: "10px",
          lineHeight: "16px",
          color: "gray.100",
        }}
      >
        ACH
      </Text.Caption>
    </Flex>
  );
}

function MethodPanel({
  id,
  logo,
  title,
  description,
  fee,
  badges,
  buttonLabel,
  showRightBorder,
}) {
  return (
    <Flex
      id={id}
      flexDirection="column"
      flex="1 0 0"
      p={6}
      sx={{
        bg: "white",
        minWidth: 0,
        alignSelf: "stretch",
        ...(showRightBorder
          ? { borderRight: "1px solid", borderColor: "gray.800" }
          : {}),
      }}
    >
      <Flex flexDirection="column" sx={{ flex: 1 }}>
        {logo}
        <Box pt={2}>
          <Text.Subtitle sx={{ fontWeight: 500 }}>{title}</Text.Subtitle>
        </Box>
        <Box pt={1}>
          <Text.Body color="fg.muted">{description}</Text.Body>
        </Box>
        <Box py={4}>
          <Text.Caption color="gray.100">{fee}</Text.Caption>
        </Box>
        <Flex flexWrap="wrap" gap={1} pb={4}>
          {badges}
        </Flex>
      </Flex>
      <Button.Primary size="large" sx={{ width: "100%" }}>
        {buttonLabel}
      </Button.Primary>
    </Flex>
  );
}

export default function PaymentMethodCompare() {
  const squarespaceLogo = (
    <Box
      sx={{
        width: 38,
        height: 38,
        position: "relative",
      }}
    >
      <Box
        as="img"
        src={`${ASSETS}/squarespace-logo.png`}
        alt="Squarespace"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  );

  const paypalLogo = (
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: "7px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        as="img"
        src={`${ASSETS}/paypal-logo.png`}
        alt="PayPal"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );

  const squarespaceBadges = (
    <>
      <FlatBadge src={`${ASSETS}/apple-pay.png`} alt="Apple Pay" />
      <FilledBadge
        bg="#ffb1d2"
        src={`${ASSETS}/klarna.png`}
        alt="Klarna"
        imgSx={{ width: 54, height: 26 }}
      />
      <FlatBadge src={`${ASSETS}/afterpay.png`} alt="Afterpay" />
      <AchBadge iconSrc={`${ASSETS}/ach-icon-large.png`} />
      <FlatBadge src={`${ASSETS}/visa.png`} alt="Visa" />
      <FlatBadge src={`${ASSETS}/mastercard.png`} alt="Mastercard" />
      <FlatBadge src={`${ASSETS}/amex.png`} alt="American Express" />
      <FlatBadge src={`${ASSETS}/discover.png`} alt="Discover" />
    </>
  );

  const paypalBadges = (
    <>
      <FilledBadge
        bg="#60cdff"
        src={`${ASSETS}/paypal-wordmark.png`}
        alt="PayPal"
        imgSx={{ width: 121, height: 19 }}
      />
      <FilledBadge
        bg="#008cff"
        src={`${ASSETS}/venmo-wordmark.png`}
        alt="Venmo"
        imgSx={{ width: 155, height: 24 }}
      />
      <FilledBadge
        bg="#60cdff"
        src={`${ASSETS}/paypal-paylater.png`}
        alt="PayPal Pay Later"
        imgSx={{ width: 78, height: 12 }}
      />
      <AchBadge iconSrc={`${ASSETS}/ach-icon-small.png`} />
      <FlatBadge src={`${ASSETS}/apple-pay-pp.png`} alt="Apple Pay" />
    </>
  );

  return (
    <Box
      id="pay-links-payment-method-compare"
      sx={{
        border: "1px solid",
        borderColor: "gray.800",
        borderRadius: 2,
        overflow: "hidden",
        bg: "white",
      }}
    >
      <Flex
        id="pay-links-payment-method-compare-header"
        flexDirection="column"
        alignItems="center"
        gap={1}
        py={6}
        px={6}
        sx={{
          textAlign: "center",
          borderBottom: "1px solid",
          borderColor: "gray.800",
        }}
      >
        <Text.Subtitle sx={{ fontWeight: 500 }}>
          Two flexible options to start accepting payments
        </Text.Subtitle>
        <Text.Body>
          Choose Squarespace Payments, PayPal, or connect both to give your
          customers more ways to pay.
        </Text.Body>
        <TextLink href="#">Learn more</TextLink>
      </Flex>

      <Flex id="pay-links-payment-method-compare-body" alignItems="stretch">
        <MethodPanel
          id="pay-links-payment-method-squarespace"
          logo={squarespaceLogo}
          title="Squarespace"
          description="Create unlimited links and customize your checkout with every selling tool built into your Squarespace account."
          fee="2.9% + $0.30 per transaction"
          badges={squarespaceBadges}
          buttonLabel="Get Started"
          showRightBorder
        />
        <MethodPanel
          id="pay-links-payment-method-paypal"
          logo={paypalLogo}
          title="PayPal"
          description="Connect a PayPal Business account and create up to 10 links with PayPal’s branded checkout."
          fee="2.99% + $0.49 per transaction"
          badges={paypalBadges}
          buttonLabel="Get Started"
        />
      </Flex>
    </Box>
  );
}
