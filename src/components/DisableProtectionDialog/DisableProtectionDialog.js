import * as React from "react";
import { BasicDialog } from "@sqs/rosetta-compositions";

/**
 * Confirmation shown before a security protection is turned off on the
 * Security tab. Renders nothing while `protection` is null.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=737-40450
 */
export default function DisableProtectionDialog({
  protection,
  onCancel,
  onConfirm,
}) {
  if (!protection?.disableWarning) return null;

  const { title, description } = protection.disableWarning;

  return (
    <BasicDialog.Modal onRequestClose={onCancel} closeOnEsc closeOnOverlayClicked>
      <BasicDialog.Overlay />
      <BasicDialog.Transition>
        <BasicDialog.Position position="center">
          <BasicDialog id="disable-protection-dialog">
            <BasicDialog.Content>
              <BasicDialog.Title>{title}</BasicDialog.Title>
              <BasicDialog.Description>{description}</BasicDialog.Description>
            </BasicDialog.Content>
            <BasicDialog.Actions>
              <BasicDialog.Button onClick={onCancel}>Cancel</BasicDialog.Button>
              <BasicDialog.Button.Danger onClick={onConfirm}>
                Disable
              </BasicDialog.Button.Danger>
            </BasicDialog.Actions>
          </BasicDialog>
        </BasicDialog.Position>
      </BasicDialog.Transition>
    </BasicDialog.Modal>
  );
}
