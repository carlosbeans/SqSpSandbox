import React from "react";
import { Box, Flex, Text } from "@sqs/rosetta-primitives";

const ASSETS = `${process.env.PUBLIC_URL || ""}/images/pay-links/hero`;

function GlassPill({ children }) {
  return (
    <Box
      sx={{
        px: "11px",
        py: "6px",
        borderRadius: "30px",
        bg: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
      }}
    >
      <Text.Caption sx={{ color: "#FFFFFF", fontSize: "12px", lineHeight: 1.4 }}>
        {children}
      </Text.Caption>
    </Box>
  );
}

function OrderSummaryCard() {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 46,
        top: 72,
        width: 307,
        height: 164,
        borderRadius: "8px",
        overflow: "hidden",
        bg: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(14.75px)",
        WebkitBackdropFilter: "blur(14.75px)",
        boxShadow:
          "0px 0px 1px 0px rgba(0,0,0,0.08), 0px 16px 64px 0px rgba(0,0,0,0.12)",
      }}
    >
      <Flex
        flexDirection="column"
        gap="20px"
        sx={{ position: "absolute", left: 31, top: 35, width: 252 }}
      >
        <Flex flexDirection="column" gap="4px">
          <Text.Caption sx={{ color: "#FFFFFF", fontWeight: 500, fontSize: "12px" }}>
            Order summary
          </Text.Caption>
          <Text.Caption
            sx={{ color: "#FFFFFF", fontSize: "12px", lineHeight: "21px" }}
          >
            $40.00
          </Text.Caption>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          sx={{
            bg: "white",
            border: "0.685px solid",
            borderColor: "gray.800",
            borderRadius: "4px",
            minHeight: "37.6px",
            px: "15px",
            py: "11px",
            width: "100%",
          }}
        >
          <Text.Caption
            sx={{
              color: "gray.100",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.34px",
              textTransform: "uppercase",
              lineHeight: "15px",
            }}
          >
            Checkout
          </Text.Caption>
        </Flex>
      </Flex>
    </Box>
  );
}

function QrCard() {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="14px"
      sx={{
        position: "absolute",
        left: 260,
        top: 0,
        width: 136,
        height: 154,
        p: "7px",
        borderRadius: "13px",
        bg: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(9.58px)",
        WebkitBackdropFilter: "blur(9.58px)",
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 74,
          height: 74,
          borderRadius: "8px",
          bg: "white",
          border: "1px solid white",
          filter: "drop-shadow(-2px 4px 4px rgba(201,201,201,0.3))",
        }}
      >
        <Box
          as="img"
          src={`${ASSETS}/qr-code.png`}
          alt=""
          sx={{ width: 58, height: 58, objectFit: "contain" }}
        />
      </Flex>
      <Flex flexDirection="column" alignItems="center" gap="4px">
        <Text.Caption sx={{ color: "#F2F2F2", fontSize: "9px", lineHeight: 1 }}>
          Pay
        </Text.Caption>
        <Text.Caption
          sx={{ color: "#F2F2F2", fontSize: "20px", lineHeight: 1 }}
        >
          $200
        </Text.Caption>
      </Flex>
    </Flex>
  );
}

function PaymentSuccessPill() {
  return (
    <Flex
      alignItems="center"
      gap="11px"
      sx={{
        position: "absolute",
        left: 0,
        bottom: 146,
        px: "22px",
        py: "16px",
        borderRadius: "12px",
        bg: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(14.75px)",
        WebkitBackdropFilter: "blur(14.75px)",
      }}
    >
      <Box
        as="img"
        src={`${ASSETS}/notification-check.png`}
        alt=""
        sx={{ width: 20, height: 20 }}
      />
      <Text.Body sx={{ color: "#FFFFFF", fontSize: "16px", lineHeight: 1 }}>
        Payment successful
      </Text.Body>
    </Flex>
  );
}

function AbstractUiCluster() {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "calc(58.33% - 18px)",
        top: 22,
        width: 396,
        height: 236,
        display: { _: "none", "tablet-100": "block" },
      }}
    >
      <PaymentSuccessPill />
      <OrderSummaryCard />
      <QrCard />
    </Box>
  );
}

export default function HeroBanner() {
  return (
    <Box
      id="pay-links-hero-banner"
      sx={{
        position: "relative",
        width: "100%",
        minHeight: 280,
        borderRadius: "6px",
        overflow: "hidden",
        bg: "#212121",
      }}
    >
      <Box
        as="img"
        src={`${ASSETS}/background.jpg`}
        alt=""
        sx={{
          position: "absolute",
          right: { _: "-60%", "tablet-50": "-431px" },
          bottom: { _: "-200px", "tablet-50": "-488px" },
          width: { _: "200%", "tablet-50": "1807px" },
          height: { _: "auto", "tablet-50": "1351px" },
          maxWidth: "none",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />

      <Flex
        flexDirection="column"
        justifyContent="space-between"
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: 280,
          p: "22px",
          maxWidth: 477,
        }}
      >
        <Text
          sx={{
            color: "#FFFFFF",
            fontFamily: "'Clarkson', sans-serif",
            fontWeight: 500,
            fontSize: "28px",
            lineHeight: "32px",
            letterSpacing: "-0.28px",
            whiteSpace: "pre-wrap",
          }}
        >
          Create shareable pay links{"\n"}
          with your custom domain,{"\n"}
          no website required
        </Text>
        <Flex alignItems="center" gap="11px" flexWrap="wrap" mt={4}>
          <Text.Body
            sx={{
              color: "#FFFFFF",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "22px",
              whiteSpace: "nowrap",
            }}
          >
            Share links with
          </Text.Body>
          <Flex gap={1} flexWrap="wrap">
            <GlassPill>SMS</GlassPill>
            <GlassPill>Email</GlassPill>
            <GlassPill>Social Media</GlassPill>
            <GlassPill>QR Code</GlassPill>
          </Flex>
        </Flex>
      </Flex>

      <AbstractUiCluster />
    </Box>
  );
}
