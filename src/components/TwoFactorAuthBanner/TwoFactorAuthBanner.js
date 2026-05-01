import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Box, Flex, Text } from "@sqs/rosetta-primitives";
import { Lock, CrossSmall } from "@sqs/rosetta-icons";

/** Must match Root `TopChromeInsetContext` while the banner is visible. */
export const TWO_FACTOR_BANNER_HEIGHT_PX = 96;

const BANNER_BG = "#1a1a1a";

const bannerVariants = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

/**
 * Fixed top promotional banner for 2FA (matches product chrome above main nav).
 */
export default function TwoFactorAuthBanner({ onDismiss }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const transition = React.useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
    [reduceMotion],
  );

  const goToSecuritySetup = React.useCallback(() => {
    const m = pathname.match(/^\/domains\/([^/]+)/);
    if (m) {
      navigate(`/domains/${decodeURIComponent(m[1])}/security`);
      return;
    }
    navigate("/domains");
  }, [navigate, pathname]);

  return (
    <motion.header
      id="appshell-2fa-security-banner"
      role="banner"
      variants={bannerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        minHeight: TWO_FACTOR_BANNER_HEIGHT_PX,
        backgroundColor: BANNER_BG,
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={4}
        px={6}
        py={4}
        sx={{ minHeight: TWO_FACTOR_BANNER_HEIGHT_PX, maxWidth: "100%" }}
      >
        <Flex alignItems="flex-start" gap={3} minWidth={0} sx={{ flex: "1 1 220px" }}>
          <Box
            as="span"
            flexShrink={0}
            aria-hidden
            sx={{ display: "inline-flex", marginTop: "2px" }}
          >
            <Lock color="currentColor" css={{ width: 22, height: 22 }} />
          </Box>
          <Flex flexDirection="column" gap={2} minWidth={0}>
            <Text
              as="p"
              fontWeight="semibold"
              fontSize={2}
              lineHeight="solid"
              sx={{ color: "#fff", margin: 0 }}
            >
              Secure your account with Two-factor Authentication
            </Text>
            <Text
              as="p"
              fontWeight="book"
              fontSize={1}
              lineHeight="body"
              sx={{ color: "rgba(255,255,255,0.88)", margin: 0 }}
            >
              Keep your Squarespace account secure by adding an additional layer
              of security, two-factor authentication (2FA).
            </Text>
          </Flex>
        </Flex>

        <Flex alignItems="center" gap={3} flexShrink={0} sx={{ marginLeft: "auto" }}>
          <Box
            as="button"
            type="button"
            onClick={goToSecuritySetup}
            aria-label="Set up two-factor authentication"
            css={{
              border: "none",
              borderRadius: 0,
              backgroundColor: "#fff",
              color: "#0e0e0e",
              fontFamily: "inherit",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              padding: "11px 22px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Set up
          </Box>
          <Box
            as="button"
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss two-factor authentication reminder"
            css={{
              border: "none",
              background: "transparent",
              padding: 8,
              margin: 0,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <CrossSmall color="currentColor" css={{ width: 18, height: 18 }} />
          </Box>
        </Flex>
      </Flex>
    </motion.header>
  );
}
