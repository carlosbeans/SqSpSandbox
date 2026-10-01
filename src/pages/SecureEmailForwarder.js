import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Stack, Toast } from "@sqs/rosetta-elements";
import { Toggle } from "@sqs/rosetta-react/toggle/next";
import { BackButton, Divider } from "@sqs/rosetta-react";
import { Button } from "@sqs/rosetta-react/button/next";
import { Text } from "@sqs/rosetta-react/text/next";
import { BasicDialog } from "@sqs/rosetta-compositions";
import { CheckmarkCircle } from "@sqs/rosetta-icons";
import { ExclamationMarkCircleFilled } from "@sqs/rosetta-glyphs";
import { useDomainProtections } from "../contexts/DomainProtectionsContext";
import { EASE_ENTRANCE, EASE_EXIT, SLIDE_BACK } from "../constants/motion";
import { showProtectionToast } from "../utils/protectionToast";

/**
 * Secure Email Forwarder — standalone page for domains with the Security
 * Add-on, reached from the Secure email forwarder card's "Manage" link on
 * the Security tab.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1674-80437
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1318-114889
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1674-80438 (inactive)
 */
function getVariants(reduceMotion) {
  const enter = reduceMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: EASE_ENTRANCE };
  const leave = reduceMotion
    ? { duration: 0 }
    : { duration: 0.15, ease: EASE_EXIT };
  return {
    message: {
      initial: { opacity: 0, y: reduceMotion ? 0 : 4 },
      animate: { opacity: 1, y: 0, transition: enter },
      exit: { opacity: 0, y: reduceMotion ? 0 : -4, transition: leave },
    },
    details: {
      initial: { opacity: 0, height: 0 },
      animate: { opacity: 1, height: "auto", transition: enter },
      exit: { opacity: 0, height: 0, transition: leave },
    },
  };
}

// The zero-width space gives the wrapper the text's line height, so the icon
// centers on the first line even when the message wraps.
function StatusIcon({ children }) {
  return (
    <Text.Body.Small
      as="span"
      m={0}
      sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}
    >
      {"\u200b"}
      {children}
    </Text.Body.Small>
  );
}

function DetailRow({ label, value }) {
  return (
    <Box>
      <Stack space={1} py={3}>
        <Text.Body>{label}</Text.Body>
        <Text.Body.Small sx={{ color: "gray.400" }}>{value}</Text.Body.Small>
      </Stack>
      <Divider />
    </Box>
  );
}

export default function SecureEmailForwarder() {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const { domain, protections, setProtection } = useDomainProtections();
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const toastRef = React.useRef(null);
  const reduceMotion = useReducedMotion();
  const variants = React.useMemo(
    () => getVariants(reduceMotion),
    [reduceMotion],
  );

  const isEnabled = Boolean(protections.secureEmailForwarder);
  const forwarderAddress = domain?.secureEmailForwarder?.address ?? "";
  const forwardsTo = domain?.whoisRecord?.email ?? "";

  const handleBack = React.useCallback(() => {
    navigate(`/domains/${encodeURIComponent(domainId)}/settings?tab=security`, {
      state: { slideDirection: SLIDE_BACK },
    });
  }, [domainId, navigate]);

  const handleToggleChange = React.useCallback(
    (event) => {
      if (event.target.checked) {
        setProtection("secureEmailForwarder", true);
        showProtectionToast(toastRef, "Secure email forwarder", true);
        return;
      }
      setIsConfirmOpen(true);
    },
    [setProtection],
  );

  const closeConfirm = React.useCallback(() => setIsConfirmOpen(false), []);

  const confirmTurnOff = React.useCallback(() => {
    setProtection("secureEmailForwarder", false);
    setIsConfirmOpen(false);
    showProtectionToast(toastRef, "Secure email forwarder", false);
  }, [setProtection]);

  return (
    <Stack space={6} px={6} pt={4} pb={6} id="secure-email-forwarder-page">
      <BackButton label="Back" onClick={handleBack} />

      <Stack space={2} sx={{ maxWidth: 650 }}>
        <Text.Heading.Large as="h1" m={0}>
          Secure email forwarder
        </Text.Heading.Large>
        <Text.Body sx={{ color: "gray.500" }}>
          Generates a private contact address for your domain that forwards to
          your inbox, keeping your real email hidden.
        </Text.Body>
      </Stack>

      <Stack
        space={4}
        id="secure-email-forwarder-details"
        sx={{ maxWidth: 650, width: "100%" }}
      >
        <Box>
          <Flex
            alignItems="flex-start"
            justifyContent="space-between"
            gap={2}
            py={3}
          >
            <Stack space={1}>
              <Text.Body fontWeight="medium">Email forwarding</Text.Body>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isEnabled ? "active" : "inactive"}
                  variants={variants.message}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {isEnabled ? (
                    <Flex alignItems="flex-start" gap={1}>
                      <StatusIcon>
                        <CheckmarkCircle
                          color="fg.success"
                          sx={{ width: 16, height: 16, display: "block" }}
                        />
                      </StatusIcon>
                      <Text.Body.Small sx={{ color: "fg.success" }}>
                        Messages to this forwarder address are securely
                        forwarded to your email {forwardsTo}.
                      </Text.Body.Small>
                    </Flex>
                  ) : (
                    <Flex alignItems="flex-start" gap={1}>
                      <StatusIcon>
                        <ExclamationMarkCircleFilled
                          color="fg.warning"
                          css={{ width: 16, height: 16, display: "block" }}
                        />
                      </StatusIcon>
                      <Text.Body.Small sx={{ color: "fg.warning" }}>
                        By turning off secure email forwarding, your email
                        address {forwarderAddress} will stop receiving messages
                        and contacts will no longer be able to reach you
                        through it.
                      </Text.Body.Small>
                    </Flex>
                  )}
                </motion.div>
              </AnimatePresence>
            </Stack>
            <Toggle.Root>
              <Toggle.Control
                checked={isEnabled}
                onChange={handleToggleChange}
                aria-label="Email forwarding"
              />
            </Toggle.Root>
          </Flex>
          <AnimatePresence initial={false}>
            {isEnabled && (
              <motion.div
                key="address-details"
                id="secure-email-forwarder-address-details"
                variants={variants.details}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ overflow: "hidden" }}
              >
                <Divider />
                <Box mt={4}>
                  <DetailRow
                    label="Forwarder address"
                    value={forwarderAddress}
                  />
                  <DetailRow label="Forwards to" value={forwardsTo} />
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        <Flex gap={2}>
          <Button.Strong size="large" onClick={handleBack}>
            Save
          </Button.Strong>
          <Button size="large" onClick={handleBack}>
            Cancel
          </Button>
        </Flex>
      </Stack>

      {isConfirmOpen && (
        <BasicDialog.Modal
          onRequestClose={closeConfirm}
          closeOnEsc
          closeOnOverlayClicked
        >
          <BasicDialog.Overlay />
          <BasicDialog.Transition>
            <BasicDialog.Position position="center">
              <BasicDialog id="secure-email-forwarder-turn-off-dialog">
                <BasicDialog.Content>
                  <BasicDialog.Title>
                    Turn off secure email forwarder?
                  </BasicDialog.Title>
                  <BasicDialog.Description>
                    By turning off secure email forwarding, your email address{" "}
                    {forwarderAddress} will stop receiving messages and contacts will
                    no longer be able to reach you through it.
                  </BasicDialog.Description>
                </BasicDialog.Content>
                <BasicDialog.Actions>
                  <BasicDialog.Button onClick={closeConfirm}>
                    Cancel
                  </BasicDialog.Button>
                  <BasicDialog.Button onClick={confirmTurnOff}>
                    Confirm
                  </BasicDialog.Button>
                </BasicDialog.Actions>
              </BasicDialog>
            </BasicDialog.Position>
          </BasicDialog.Transition>
        </BasicDialog.Modal>
      )}
      <Toast.Container ref={toastRef} />
    </Stack>
  );
}
