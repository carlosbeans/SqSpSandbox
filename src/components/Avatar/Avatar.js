import "./Avatar.scss";
import React from "react";
import { ActionList } from "@sqs/rosetta-compositions";
import { Box, Button, Flex, Text } from "@sqs/rosetta-primitives";
import { Stack, Toggle } from "@sqs/rosetta-elements";

export default function Avatar() {
  const [isSandboxSettingsOpen, setIsSandboxSettingsOpen] = React.useState(false);
  const [isNewUser, setIsNewUser] = React.useState(false);
  const [isReturningUser, setIsReturningUser] = React.useState(false);
  const [singleDomainUser, setSingleDomainUser] = React.useState(false);
  return (
    <div className="avatarContainer">
      <ActionList.PopOver
        renderTrigger={({ toggleActionListOpen }) => (
          <div className="avatar" onClick={toggleActionListOpen}></div>
        )}
        position="bottom-right"
      >
        {({ onRequestClose }) => (
          <Flex as="ul" bg="white" flexDirection="column" py={1}>
            <ActionList.Item onClick={onRequestClose}>Account Settings</ActionList.Item>
            <ActionList.Item onClick={onRequestClose}>Duplicate</ActionList.Item>
            <ActionList.Item onClick={onRequestClose}>Delete</ActionList.Item>
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

      {isSandboxSettingsOpen && (
        <Box
          onClick={() => setIsSandboxSettingsOpen(false)}
          sx={{
            position: "fixed",
            inset: 0,
            bg: "rgba(0, 0, 0, 0.32)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1400,
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
              <Button.Tertiary
                size="small"
                onClick={() => setIsSandboxSettingsOpen(false)}
              >
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
                  aria-label="Returning User"
                />
              </Flex>              
            </Stack>

            <Flex
              justifyContent="flex-end"
              px={4}
              py={3}
              sx={{ borderTop: "1px solid", borderColor: "gray.700" }}
            >
              <Button.Primary onClick={() => setIsSandboxSettingsOpen(false)}>
                Save
              </Button.Primary>
            </Flex>
          </Box>
        </Box>
      )}
    </div>
  );
}