import * as React from "react";
import { Stack } from "@sqs/rosetta-elements";
import { TextInput } from "@sqs/rosetta-elements/textinput/next";
import { Field } from "@sqs/rosetta-react";
import { Text } from "@sqs/rosetta-react/text/next";
import { Button } from "@sqs/rosetta-react/button/next";
import { Dialog } from "@sqs/rosetta-compositions";

const EMAIL_PATTERN = /.+@.+\..+/;

/** Opened from the Permissions tab's "Invite Domain Manager" button. */
export default function InviteDomainManagerDialog({
  isOpen,
  onRequestClose,
  onInvite,
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const canInvite = trimmedName.length > 0 && EMAIL_PATTERN.test(trimmedEmail);

  function handleSubmit(event) {
    event.preventDefault();
    if (!canInvite) return;
    onInvite({ name: trimmedName, email: trimmedEmail });
  }

  return (
    <Dialog.Modal onRequestClose={onRequestClose} closeOnEsc closeOnOverlayClicked>
      <Dialog.Overlay />
      <Dialog.Transition>
        <Dialog id="invite-domain-manager-dialog" size="small">
          <Dialog.Header>
            <Dialog.Header.Title>Invite Domain Manager</Dialog.Header.Title>
            <Dialog.CloseButton onClick={onRequestClose} />
          </Dialog.Header>
          <Dialog.Content>
            <form id="invite-domain-manager-form" onSubmit={handleSubmit}>
              <Stack space={4}>
                <Text.Body color="gray.300">
                  Domain managers will receive full domain management access.
                  They will not have access to billing.
                </Text.Body>
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <TextInput.Root>
                    <TextInput.Control
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                    />
                  </TextInput.Root>
                </Field.Root>
                <Field.Root>
                  <Field.Label>Email</Field.Label>
                  <TextInput.Root>
                    <TextInput.Control
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                    />
                  </TextInput.Root>
                </Field.Root>
              </Stack>
            </form>
          </Dialog.Content>
          <Dialog.Footer justifyContent="end">
            <Button.Alt size="small" onClick={onRequestClose}>
              Cancel
            </Button.Alt>
            <Button.Strong
              size="small"
              type="submit"
              form="invite-domain-manager-form"
              disabled={!canInvite}
            >
              Invite
            </Button.Strong>
          </Dialog.Footer>
        </Dialog>
      </Dialog.Transition>
    </Dialog.Modal>
  );
}
