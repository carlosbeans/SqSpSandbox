import * as React from "react";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { Button } from "@sqs/rosetta-react/button/next";
import { Dialog } from "@sqs/rosetta-compositions";
import { Checkmark } from "@sqs/rosetta-icons";
import { useTheme } from "@sqs/rosetta-styled";

/**
 * Background image customizer — opens from the pencil/Edit overlay on the
 * domain overview thumbnail. Selection is local-only (no API / shared
 * domain store in this sandbox), matching the plan's note that the change
 * resets on reload.
 */
const IMAGE_OPTIONS = Array.from({ length: 8 }, (_, i) => {
  const n = i + 1;
  return {
    key: `img-${n}`,
    src: `/assets/screenshots/Img${n}_Landscape.jpeg`,
  };
});

export default function BackgroundImageDialog({
  isOpen,
  currentImage,
  onSelect,
  onRequestClose,
}) {
  const { colors, radii } = useTheme();
  const [pendingImage, setPendingImage] = React.useState(currentImage);

  React.useEffect(() => {
    if (isOpen) {
      setPendingImage(currentImage);
    }
  }, [isOpen, currentImage]);

  if (!isOpen) return null;

  const hasChanged = pendingImage !== currentImage;

  function handleSave() {
    if (hasChanged) {
      onSelect(pendingImage);
    }
    onRequestClose();
  }

  return (
    <Dialog.Modal onRequestClose={onRequestClose} closeOnEsc closeOnOverlayClicked>
      <Dialog.Overlay />
      <Dialog.Transition>
        <Dialog id="background-image-dialog" size="medium">
          <Dialog.Header>
            <Dialog.Header.Title>Change background image</Dialog.Header.Title>
            <Dialog.CloseButton onClick={onRequestClose} />
          </Dialog.Header>
          <Dialog.Content>
            <Flex flexDirection="column" gap={4}>
              <Text.Body color="gray.300">
                Choose an image to display on your domain overview.
              </Text.Body>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "16px",
                }}
              >
                {IMAGE_OPTIONS.map((option) => {
                  const selected = option.src === pendingImage;
                  return (
                    <Box
                      as="button"
                      type="button"
                      key={option.key}
                      onClick={() => setPendingImage(option.src)}
                      aria-pressed={selected}
                      aria-label="Select background image"
                      sx={{
                        position: "relative",
                        padding: 0,
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        borderRadius: radii?.[1] ?? 4,
                        overflow: "hidden",
                        outline: selected
                          ? `2px solid ${colors?.blue?.[500] ?? "#0b6efc"}`
                          : "2px solid transparent",
                        outlineOffset: "2px",
                        minWidth: "44px",
                        minHeight: "44px",
                      }}
                    >
                      <Box
                        as="img"
                        src={option.src}
                        alt=""
                        sx={{
                          display: "block",
                          width: "100%",
                          aspectRatio: "16 / 9",
                          objectFit: "cover",
                          borderRadius: radii?.[1] ?? 4,
                        }}
                      />
                      {selected && (
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            backgroundColor: colors?.blue?.[500] ?? "#0b6efc",
                          }}
                        >
                          <Checkmark
                            css={{ width: 16, height: 16, color: "white" }}
                          />
                        </Flex>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Flex>
          </Dialog.Content>
          <Dialog.Footer justifyContent="end">
            <Button.Alt size="small" onClick={onRequestClose}>
              Cancel
            </Button.Alt>
            <Button.Strong
              size="small"
              disabled={!hasChanged}
              onClick={handleSave}
            >
              Save
            </Button.Strong>
          </Dialog.Footer>
        </Dialog>
      </Dialog.Transition>
    </Dialog.Modal>
  );
}
