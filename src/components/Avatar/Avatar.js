import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionList } from "@sqs/rosetta-compositions";
import { Box, Flex, Text } from "@sqs/rosetta-primitives";
import { Dialog } from "@sqs/rosetta-react";
import { Button } from "@sqs/rosetta-react/button/next";
import { Toggle } from "@sqs/rosetta-react/toggle/next";
import { useSandboxTwoFaBanner } from "../../contexts/SandboxTwoFaBannerContext";
import { useSandboxSingleDomain } from "../../contexts/SandboxSingleDomainContext";

const avatarStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "100%",
  backgroundColor: "#e7e7e7",
  backgroundImage: `url("${process.env.PUBLIC_URL || ""}/assets/carlosAvatar.jpg")`,
  backgroundSize: "100%",
  cursor: "pointer",
};

/** Stacks above sticky nav, domain chrome, and 2FA banner; PopOver portals to document.body + position fixed */
const AVATAR_ACTION_LIST_Z_INDEX = 2000;

/** Static account header copy for the avatar menu (sandbox). */
const AVATAR_MENU_DISPLAY_NAME = "Carlos Andujar";
const AVATAR_MENU_EMAIL = "iamcrandujar@gmail.com";

function SandboxSettingsModal({
  open,
  onClose,
  isNewUser,
  setIsNewUser,
  isReturningUser,
  setIsReturningUser,
  singleDomainEnabled,
  setSingleDomainEnabled,
  sandboxTwoFaBannerEnabled,
  setSandboxTwoFaBannerEnabled,
}) {
  if (!open) {
    return null;
  }

  const flags = [
    {
      key: "new-user",
      label: "New User",
      checked: isNewUser,
      onChange: setIsNewUser,
    },
    {
      key: "returning-user",
      label: "Returning User",
      checked: isReturningUser,
      onChange: setIsReturningUser,
    },
    {
      key: "single-domain",
      label: "Single-domain",
      checked: singleDomainEnabled,
      onChange: setSingleDomainEnabled,
    },
    {
      key: "two-fa-banner",
      label: "2FA Banner",
      checked: sandboxTwoFaBannerEnabled,
      onChange: setSandboxTwoFaBannerEnabled,
    },
  ];

  return (
    <Dialog.Modal onRequestClose={onClose} closeOnEsc closeOnOverlayClicked>
      <Dialog.Overlay />
      <Dialog.Transition>
        <Dialog
          id="sandbox-settings-dialog"
          size="small"
          minHeight={{ _: "auto", "mobile-*": "unset" }}
        >
          <Dialog.Header>
            <Dialog.Header.Title>Sandbox Settings</Dialog.Header.Title>
            <Dialog.CloseButton onClick={onClose} />
          </Dialog.Header>
          <Dialog.Content>
            <Flex flexDirection="column" gap={3} width="100%">
              {flags.map(({ key, label, checked, onChange }) => (
                <Flex
                  key={key}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text.Body m={0}>{label}</Text.Body>
                  <Toggle.Root>
                    <Toggle.Control
                      checked={checked}
                      onChange={(event) => onChange(event.target.checked)}
                      aria-label={label}
                    />
                  </Toggle.Root>
                </Flex>
              ))}
            </Flex>
          </Dialog.Content>
          <Dialog.Footer justifyContent="end">
            <Button.Strong size="small" onClick={onClose}>
              Save
            </Button.Strong>
          </Dialog.Footer>
        </Dialog>
      </Dialog.Transition>
    </Dialog.Modal>
  );
}

export default function Avatar() {
  const navigate = useNavigate();
  const { sandboxTwoFaBannerEnabled, setSandboxTwoFaBannerEnabled } =
    useSandboxTwoFaBanner();
  const [isSandboxSettingsOpen, setIsSandboxSettingsOpen] = React.useState(false);
  const [isNewUser, setIsNewUser] = React.useState(false);
  const [isReturningUser, setIsReturningUser] = React.useState(false);
  const { singleDomainEnabled, setSingleDomainEnabled } =
    useSandboxSingleDomain();

  const documentScrollRoot = React.useMemo(
    () =>
      typeof document !== "undefined" ? document.documentElement : undefined,
    [],
  );

  return (
    <Box>
      <ActionList.PopOver
        
        recalculateAnchorOnScroll
        scrollNode={documentScrollRoot}
        zIndex={AVATAR_ACTION_LIST_Z_INDEX}
        renderTrigger={({ toggleActionListOpen }) => (
          <div style={avatarStyle} onClick={toggleActionListOpen} />
        )}
      >
        {({ onRequestClose }) => (
          <Flex
            id="avatar-account-popover"
            flexDirection="column"
            bg="white"
            m={0}
            sx={{
              listStyle: "none",
              minWidth: "min(280px, 92vw)",
            }}
          >
            <Box
              px={4}
              pt={4}
            >
              <Flex flexDirection="column" gap={2} alignItems="flex-start">
                <Text.Body
                  as="p"
                  m={0}
                  color="gray.100"
                  lineHeight="heading"
                  fontWeight="medium"
                >
                  {AVATAR_MENU_DISPLAY_NAME}
                </Text.Body>
                <Text.Body as="p" m={0} fontSize={2} color="gray.300">
                  {AVATAR_MENU_EMAIL}
                </Text.Body>
              </Flex>
            </Box>
            <Flex as="ul" flexDirection="column" py={1} m={0} px={0} sx={{ listStyle: "none" }}>
              <ActionList.Item onClick={onRequestClose}>Account Settings</ActionList.Item>
              <ActionList.Item
                onClick={() => {
                  onRequestClose();
                  setIsSandboxSettingsOpen(true);
                }}
              >
                Sandbox Settings
              </ActionList.Item>
              <ActionList.Item
                onClick={() => {
                  onRequestClose();
                  navigate("/experiments");
                }}
              >
                Experiments
              </ActionList.Item>
            </Flex>
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
        singleDomainEnabled={singleDomainEnabled}
        setSingleDomainEnabled={setSingleDomainEnabled}
        sandboxTwoFaBannerEnabled={sandboxTwoFaBannerEnabled}
        setSandboxTwoFaBannerEnabled={setSandboxTwoFaBannerEnabled}
      />
    </Box>
  );
}