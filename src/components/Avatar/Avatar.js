import React from "react";
import { createPortal } from "react-dom";
import { ActionList } from "@sqs/rosetta-compositions";
import { Box, Button, Flex, Text } from "@sqs/rosetta-primitives";
import { Stack, Toggle } from "@sqs/rosetta-elements";
import { useSandboxTwoFaBanner } from "../../contexts/SandboxTwoFaBannerContext";

const avatarContainerStyle = {
  padding: "11px",
};

const avatarStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "100%",
  backgroundColor: "#e7e7e7",
  backgroundImage: `url("${process.env.PUBLIC_URL || ""}/assets/carlosAvatar.jpg")`,
  backgroundSize: "100%",
  cursor: "pointer",
};

const SANDBOX_SETTINGS_MODAL_Z = 1700;

function SandboxSettingsModal({
  open,
  onClose,
  isNewUser,
  setIsNewUser,
  isReturningUser,
  setIsReturningUser,
  singleDomainUser,
  setSingleDomainUser,
  securityEnabled,
  setSecurityEnabled,
  sandboxTwoFaBannerEnabled,
  setSandboxTwoFaBannerEnabled,
}) {
  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <Box
      id="sandbox-settings-modal-overlay"
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        bg: "rgba(0, 0, 0, 0.32)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: SANDBOX_SETTINGS_MODAL_Z,
        px: 2,
      }}
    >
      <Box
        role="dialog"
        aria-modal="true"
        aria-labelledby="sandbox-settings-title"
        onClick={(event) => event.stopPropagation()}
        sx={{
          bg: "white",
          width: "100%",
          maxWidth: 360,
          borderRadius: 4,
          boxShadow:
            "0 16px 40px rgba(26, 26, 26, 0.24), 0 2px 8px rgba(26, 26, 26, 0.12)",
        }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={3}
          sx={{ borderBottom: "1px solid", borderColor: "gray.700" }}
        >
          <Text.Subtitle id="sandbox-settings-title">Sandbox Settings</Text.Subtitle>
          <Button.Tertiary size="small" onClick={onClose}>
            Close
          </Button.Tertiary>
        </Flex>

        <Stack space={3} p={4}>
          <Flex alignItems="center" justifyContent="space-between">
            <Text.Body>New User</Text.Body>
            <Toggle
              checked={isNewUser}
              onChange={(checked) => setIsNewUser(checked)}
              aria-label="New User"
            />
          </Flex>

          <Flex alignItems="center" justifyContent="space-between">
            <Text.Body>Returning User</Text.Body>
            <Toggle
              checked={isReturningUser}
              onChange={(checked) => setIsReturningUser(checked)}
              aria-label="Returning User"
            />
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Text.Body>Single-domain</Text.Body>
            <Toggle
              checked={singleDomainUser}
              onChange={(checked) => setSingleDomainUser(checked)}
              aria-label="Single-domain"
            />
          </Flex>

          <Flex alignItems="center" justifyContent="space-between">
            <Text.Body>Security</Text.Body>
            <Toggle
              checked={securityEnabled}
              onChange={(checked) => setSecurityEnabled(checked)}
              aria-label="Security"
            />
          </Flex>

          <Flex alignItems="center" justifyContent="space-between">
            <Text.Body>2FA</Text.Body>
            <Toggle
              checked={sandboxTwoFaBannerEnabled}
              onChange={(checked) => setSandboxTwoFaBannerEnabled(checked)}
              aria-label="Show two-factor authentication banner"
            />
          </Flex>
        </Stack>

        <Flex
          justifyContent="flex-end"
          px={4}
          py={3}
          sx={{ borderTop: "1px solid", borderColor: "gray.700" }}
        >
          <Button.Primary onClick={onClose}>Save</Button.Primary>
        </Flex>
      </Box>
    </Box>,
    document.body
  );
}

export default function Avatar() {
  const { sandboxTwoFaBannerEnabled, setSandboxTwoFaBannerEnabled } =
    useSandboxTwoFaBanner();
  const [isSandboxSettingsOpen, setIsSandboxSettingsOpen] = React.useState(false);
  const [isNewUser, setIsNewUser] = React.useState(false);
  const [isReturningUser, setIsReturningUser] = React.useState(false);
  const [singleDomainUser, setSingleDomainUser] = React.useState(false);
  const [securityEnabled, setSecurityEnabled] = React.useState(false);
  return (
    <div style={avatarContainerStyle}>
      <ActionList.PopOver
        renderTrigger={({ toggleActionListOpen }) => (
          <div style={avatarStyle} onClick={toggleActionListOpen} />
        )}
        position="bottom-right"
      >
        {({ onRequestClose }) => (
          <Flex as="ul" bg="white" flexDirection="column" py={1}>
            <ActionList.Item onClick={onRequestClose}>Account Settings</ActionList.Item>            
            <ActionList.Item
              onClick={() => {
                onRequestClose();
                setIsSandboxSettingsOpen(true);
              }}
            >
              Sandbox Settings
            </ActionList.Item>
          </Flex>
        )}
      </ActionList.PopOver>

      <SandboxSettingsModal
        open={isSandboxSettingsOpen}
        onClose={() => setIsSandboxSettingsOpen(false)}
        isNewUser={isNewUser}
        setIsNewUser={setIsNewUser}
        isReturningUser={isReturningUser}
        setIsReturningUser={setIsReturningUser}
        singleDomainUser={singleDomainUser}
        setSingleDomainUser={setSingleDomainUser}
        securityEnabled={securityEnabled}
        setSecurityEnabled={setSecurityEnabled}
        sandboxTwoFaBannerEnabled={sandboxTwoFaBannerEnabled}
        setSandboxTwoFaBannerEnabled={setSandboxTwoFaBannerEnabled}
      />
    </div>
  );
}