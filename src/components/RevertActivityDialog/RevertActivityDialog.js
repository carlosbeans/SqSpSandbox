import * as React from "react";
import { Stack } from "@sqs/rosetta-elements";
import { Dialog } from "@sqs/rosetta-react";
import { Button } from "@sqs/rosetta-react/button/next";
import { Text } from "@sqs/rosetta-react/text/next";

/**
 * Confirmation shown before an activity is reverted. Renders nothing while
 * `activity` is null.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1759-99433
 */
export default function RevertActivityDialog({ activity, onCancel, onConfirm }) {
  if (!activity) return null;

  const restorable = activity.changes.filter(
    (change) => change.before !== change.after,
  );

  return (
    <Dialog.Modal onRequestClose={onCancel} closeOnEsc closeOnOverlayClicked>
      <Dialog.Overlay />
      <Dialog.Transition>
        <Dialog id="revert-activity-dialog" size="small">
          <Dialog.Header>
            <Dialog.Header.Title>Revert this change?</Dialog.Header.Title>
            <Dialog.CloseButton onClick={onCancel} />
          </Dialog.Header>
          <Dialog.Content>
            <Stack space={1}>
              {restorable.map(({ field, before, after }) => (
                <Text.Body key={field} m={0}>
                  This will restore {field} from {after} to {before}.
                </Text.Body>
              ))}
              {activity.revertWarning && (
                <Text.Body m={0}>{activity.revertWarning}</Text.Body>
              )}
            </Stack>
          </Dialog.Content>
          <Dialog.Footer justifyContent="end">
            <Button size="small" onClick={onCancel}>
              Cancel
            </Button>
            <Button.Strong size="small" onClick={onConfirm}>
              Revert
            </Button.Strong>
          </Dialog.Footer>
        </Dialog>
      </Dialog.Transition>
    </Dialog.Modal>
  );
}
