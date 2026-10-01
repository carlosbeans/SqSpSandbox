import * as React from "react";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { Button } from "@sqs/rosetta-react/button/next";
import { Dialog } from "@sqs/rosetta-compositions";
import { Chip, Divider } from "@sqs/rosetta-elements";
import { CheckmarkShield } from "@sqs/rosetta-icons";
import {
  RATING_LEVELS,
  getRatingExplanation,
  getSecuritySummary,
} from "../../constants/securityProtections";

const LABEL_COLUMN_PX = 60;

/**
 * Domain Overview — "How your rating is calculated" dialog, opened from the
 * Security card's "Learn more" link.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1674-95261
 */
export default function SecurityRatingDialog({
  isOpen,
  domain,
  onRequestClose,
}) {
  const { tier } = React.useMemo(() => getSecuritySummary(domain), [domain]);

  if (!isOpen) return null;

  return (
    <Dialog.Modal onRequestClose={onRequestClose} closeOnEsc closeOnOverlayClicked>
      <Dialog.Overlay />
      <Dialog.Transition>
        <Dialog
          id="security-rating-dialog"
          size="small"
          maxHeight={{ _: "calc(100svh - 88px)", "mobile-*": "unset" }}
        >
          <Dialog.Header>
            <Dialog.Header.Title>How your rating is calculated</Dialog.Header.Title>
            <Dialog.CloseButton onClick={onRequestClose} />
          </Dialog.Header>
          <Dialog.Content>
            <Flex flexDirection="column" gap={4}>
              <Flex flexDirection="column" gap={3}>
                <Flex flexDirection="column" gap={1}>
                  <Text.Eyebrow
                    as="span"
                    sx={{ color: "gray.300", textTransform: "uppercase" }}
                  >
                    Your rating
                  </Text.Eyebrow>
                  <Text.Heading.Medium as="p" m={0}>
                    {tier.label}
                  </Text.Heading.Medium>
                </Flex>
                <Text.Body m={0}>{getRatingExplanation(tier.key)}</Text.Body>
              </Flex>

              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "border.default",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <Box p={3} sx={{ backgroundColor: "bg.inset" }}>
                  <Text.Eyebrow
                    as="span"
                    sx={{ color: "gray.300", textTransform: "uppercase" }}
                  >
                    Rating levels
                  </Text.Eyebrow>
                </Box>
                {RATING_LEVELS.map((level) => (
                  <React.Fragment key={level.key}>
                    <Divider />
                    <Flex px={3} py={2} gap={3} alignItems="flex-start">
                      <Text.Bold.Small
                        as="span"
                        m={0}
                        sx={{ color: level.color, flexShrink: 0, width: LABEL_COLUMN_PX }}
                      >
                        {level.label}
                      </Text.Bold.Small>
                      <Flex flexDirection="column" gap={1} alignItems="flex-start" flex="1" minWidth={0}>
                        {level.includedWithAddOn && (
                          <Chip
                            label="Included with Add-on"
                            glyph={<CheckmarkShield />}
                            usage="badge"
                          />
                        )}
                        <Text.Body.Small m={0}>{level.description}</Text.Body.Small>
                      </Flex>
                    </Flex>
                  </React.Fragment>
                ))}
              </Box>
            </Flex>
          </Dialog.Content>
          <Dialog.Footer justifyContent="end">
            <Button.Strong size="small" onClick={onRequestClose}>
              Okay
            </Button.Strong>
          </Dialog.Footer>
        </Dialog>
      </Dialog.Transition>
    </Dialog.Modal>
  );
}
