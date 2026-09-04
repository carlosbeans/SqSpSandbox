import React from "react";
import { Stack, Card, TextLink } from "@sqs/rosetta-elements";
import { Flex, Box } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { Button } from "@sqs/rosetta-react/button/next";
import { IconButton } from "@sqs/rosetta-react";
import { Trash } from "@sqs/rosetta-icons";
import { useTheme } from "@sqs/rosetta-styled";
import DNSTable from "./DNSTable";

export default function DNSPresetsSection({
  sectionId,
  scrollMarginTop,
  defaultRecords,
  addedPresets,
  onAddPreset,
  onDeletePreset,
}) {
  const { radii } = useTheme();

  return (
    <Box as="section" id={sectionId} sx={{ scrollMarginTop }}>
      <Stack space={4}>
        <Flex alignItems="center" justifyContent="space-between">
          <Stack>
            <Text.Heading.Large as="h2" mb={3}>DNS Presets</Text.Heading.Large>
            <Text.Body>
              DNS presets in Squarespace simplify common connections for your
              website and email services.
              <br />
              <TextLink href="#">Learn more about DNS presets</TextLink>
            </Text.Body>
          </Stack>
          <Button.Strong size="medium" onClick={onAddPreset}>
            Add Preset
          </Button.Strong>
        </Flex>
        <Card sx={{ borderRadius: radii[1] }}>
          <Card.Body>
            <Stack space={3}>
              <Flex alignItems="center" justifyContent="space-between">
                <Text.Heading.Small as="h3" px={2}>
                  Squarespace Defaults
                </Text.Heading.Small>
                <IconButton.Subtle
                  icon={Trash}
                  label="Delete defaults"
                  sx={{ color: "fg.danger" }}
                  css={{ margin: "-7px" }}
                />
              </Flex>
              <DNSTable records={defaultRecords} />
            </Stack>
          </Card.Body>
        </Card>

        {addedPresets.map((preset) => (
          <Card key={preset.title} sx={{ borderRadius: radii[1] }}>
            <Card.Body>
              <Stack space={3}>
                <Flex alignItems="center" justifyContent="space-between">
                  <Text.Heading.Small as="h3" px={2}>
                    {preset.title}
                  </Text.Heading.Small>
                  <IconButton.Subtle
                    icon={Trash}
                    label={`Delete ${preset.title}`}
                    onClick={() => onDeletePreset(preset.title)}
                    sx={{ color: "fg.danger" }}
                    css={{ margin: "-7px" }}
                  />
                </Flex>
                <DNSTable records={preset.records} />
              </Stack>
            </Card.Body>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
