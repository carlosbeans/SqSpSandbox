import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroBanner } from "@sqs/rosetta-dashboard";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { EASE_ENTRANCE } from "../../constants/motion";

const BACKGROUND = `${process.env.PUBLIC_URL || ""}/images/email/hero/background.jpg`;

const OVERLAY_GRADIENT = [
  "linear-gradient(83.9deg, rgb(109,123,130) 3.3%, rgba(109,123,130,0.82) 49.4%, rgba(109,123,130,0) 95.5%)",
  "linear-gradient(180deg, rgb(0,0,0) 22.1%, rgba(0,0,0,0.716) 38%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
].join(", ");

const CHIPS = ["Small Businesses", "Solopreneurs", "Growing Teams", "Creators"];

const MAILBOX_NAMES = ["hello", "team", "help", "sales"];
const LINE_HEIGHT_PX = 27;
const HOLD_SECONDS = 1.6;
const SLIDE_SECONDS = 0.4;

const pillTextSx = {
  color: "white",
  fontSize: "20px",
  lineHeight: `${LINE_HEIGHT_PX}px`,
  letterSpacing: "-0.2px",
  whiteSpace: "nowrap",
};

function MailboxNameCycler() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <Text.Heading.Medium as="span" sx={pillTextSx}>
        {MAILBOX_NAMES[0]}
      </Text.Heading.Medium>
    );
  }

  // Each step holds on a name, then slides to the next; the trailing
  // duplicate of the first name lets the loop restart without a visible jump.
  const names = [...MAILBOX_NAMES, MAILBOX_NAMES[0]];
  const steps = MAILBOX_NAMES.length;
  const stepSeconds = HOLD_SECONDS + SLIDE_SECONDS;
  const y = [];
  const times = [];
  for (let i = 0; i < steps; i += 1) {
    const start = (i * stepSeconds) / (steps * stepSeconds);
    const slideStart = (i * stepSeconds + HOLD_SECONDS) / (steps * stepSeconds);
    y.push(-i * LINE_HEIGHT_PX, -i * LINE_HEIGHT_PX);
    times.push(start, slideStart);
  }
  y.push(-steps * LINE_HEIGHT_PX);
  times.push(1);

  return (
    <Box
      aria-hidden
      sx={{
        height: LINE_HEIGHT_PX,
        overflow: "hidden",
        textAlign: "right",
      }}
    >
      <motion.div
        animate={{ y }}
        transition={{
          duration: steps * stepSeconds,
          times,
          ease: EASE_ENTRANCE,
          repeat: Infinity,
        }}
        initial={{ y: 0 }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {names.map((name, i) => (
          <Text.Heading.Medium key={`${name}-${i}`} as="span" sx={pillTextSx}>
            {name}
          </Text.Heading.Medium>
        ))}
      </motion.div>
    </Box>
  );
}

function EmailAddressPill({ domain }) {
  return (
    <Flex
      alignItems="center"
      p={2}
      sx={{ bg: "rgba(255,255,255,0.07)", borderRadius: "6px" }}
    >
      <Box sx={{ minWidth: 51, textAlign: "right" }}>
        <MailboxNameCycler />
      </Box>
      <Text.Heading.Medium as="span" sx={pillTextSx}>
        @{domain}
      </Text.Heading.Medium>
    </Flex>
  );
}

export default function EmailHeroBanner({ domain = "leathergoods.com" }) {
  return (
    <Box
      id="email-hero-banner"
      sx={{
        position: "relative",
        borderRadius: "6px",
        overflow: "hidden",
        bg: "gray.900",
      }}
    >
      <Box
        as="img"
        src={BACKGROUND}
        alt=""
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scaleX(-1)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          backgroundImage: OVERLAY_GRADIENT,
        }}
      />
      <HeroBanner.Base
        imageType={null}
        imageTypeMobile={null}
        backgroundColor="transparent"
        minHeight="250px"
        chips={CHIPS}
        content="Build trust with a custom email address featuring your domain"
      />
      <Box
        p={4}
        display={{ _: "none", "from-l": "block" }}
        sx={{
          position: "absolute",
          top: 86,
          right: 0,
          zIndex: 1,
        }}
      >
        <EmailAddressPill domain={domain} />
      </Box>
    </Box>
  );
}
