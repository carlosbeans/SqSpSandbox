import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Stack, Toggle } from "@sqs/rosetta-elements";
import { BackButton, Divider } from "@sqs/rosetta-react";
import { Button } from "@sqs/rosetta-react/button/next";
import { Text } from "@sqs/rosetta-react/text/next";
import { BasicDialog } from "@sqs/rosetta-compositions";
import { CheckmarkCircle } from "@sqs/rosetta-icons";
import { useDomainProtections } from "../contexts/DomainProtectionsContext";
import { SLIDE_BACK } from "../constants/motion";

/**
 * Secure Email Forwarder — standalone page for domains with the Security
 * Add-on, reached from the Secure email forwarder card's "Manage" link on
 * the Security tab.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1674-80437
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1318-114889
 */
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

  const isEnabled = Boolean(protections.secureEmailForwarder);
  const forwarderAddress = domain?.secureEmailForwarder?.address ?? "";
  const forwardsTo = domain?.whoisRecord?.email ?? "";

  const handleBack = React.useCallback(() => {
    navigate(`/domains/${encodeURIComponent(domainId)}/settings?tab=security`, {
      state: { slideDirection: SLIDE_BACK },
    });
  }, [domainId, navigate]);

  const handleToggleChange = React.useCallback(
    (checked) => {
      if (checked) {
        setProtection("secureEmailForwarder", true);
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
  }, [setProtection]);

  return (
    <Stack space={6} px={6} pt={6} pb={6} id="secure-email-forwarder-page">
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
              {isEnabled && (
                <Flex alignItems="flex-start" gap={1}>
                  <CheckmarkCircle
                    css={{
                      width: 16,
                      height: 16,
                      color: "fg.success",
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  />
                  <Text.Body.Small sx={{ color: "fg.success" }}>
                    Messages to this forwarder address are securely forwarded
                    to your email {forwardsTo}.
                  </Text.Body.Small>
                </Flex>
              )}
            </Stack>
            <Toggle
              checked={isEnabled}
              onChange={handleToggleChange}
              aria-label="Email forwarding"
            />
          </Flex>
          <Divider />
        </Box>

        <Box>
          <DetailRow label="Forwarder address" value={forwarderAddress} />
          <DetailRow label="Forwards to" value={forwardsTo} />
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
    </Stack>
  );
}
