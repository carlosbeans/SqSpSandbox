import React, { useState, useEffect, useCallback, useRef } from "react";
import { Stack, Card, TextLink, Chip, Checkbox, Toast } from "@sqs/rosetta-elements";
import { TextInput } from "@sqs/rosetta-elements/textinput/next";
import { Text, Button, Flex, Box, Touchable } from "@sqs/rosetta-primitives";
import { Table, Drawer, ActionList, BasicDialog } from "@sqs/rosetta-compositions";
import { InfoCircle, Trash, Search, CheckmarkCircle } from "@sqs/rosetta-icons";
import { useTheme } from "@sqs/rosetta-styled";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { usePageHeader } from "../layouts/PageHeaderContext";
import DNSPresetCard from "../components/DNSPresetCard/DNSPresetCard";
import dnsData from "../data/dns.json";

const {
  filterTypes: FILTER_TYPES,
  defaultRecords,
  customRecords,
  presets: DNS_PRESETS,
  presetRecords: PRESET_RECORDS,
} = dnsData;

const columnHelper = Table.Utils.createColumnHelper();

function headerWithInfo(label) {
  return () => (
    <Flex alignItems="center" gap={1}>
      {label}
      <InfoCircle css={{ color: "gray.400", width: 14, height: 14 }} />
    </Flex>
  );
}

const columns = [
  columnHelper.accessor("host", {
    header: "HOST",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("type", {
    header: "TYPE",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("priority", {
    header: "PRIORITY",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("ttl", {
    header: "TTL",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
  columnHelper.accessor("data", {
    header: "DATA",
    cell: (info) => <Text.Body>{info.getValue()}</Text.Body>,
  }),
];

function DNSTable({ records }) {
  return (
    <Box css={{ "& tr:last-child": { borderBottom: "none" } }}>
      <Table columns={columns} data={records}>
        <Table.List>
          <Table.List.Head />
          <Table.List.Body />
        </Table.List>
      </Table>
    </Box>
  );
}

export function DNSSettingsContent({ toastRef }) {
  const { radii, borders, colors } = useTheme();
  const [isDrawerMounted, setIsDrawerMounted] = useState(false);
  const [isPresetDrawerOpen, setIsPresetDrawerOpen] = useState(false);
  const [selectedPresets, setSelectedPresets] = useState(new Set());
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [addedPresets, setAddedPresets] = useState([]);
  const [presetToDelete, setPresetToDelete] = useState(null);

  const confirmDeletePreset = useCallback(() => {
    if (!presetToDelete) return;
    setAddedPresets((prev) => prev.filter((p) => p.title !== presetToDelete));
    setPresetToDelete(null);
    if (toastRef?.current) {
      toastRef.current.show({
        content: "DNS Preset has been removed",
        variant: "success",
        duration: 4000,
      });
    }
  }, [presetToDelete, toastRef]);

  const openDrawer = useCallback(() => {
    setIsDrawerMounted(true);
    requestAnimationFrame(() => setIsPresetDrawerOpen(true));
  }, []);

  const closeDrawer = useCallback(() => {
    setIsPresetDrawerOpen(false);
  }, []);

  const handleDrawerExited = useCallback(() => {
    setIsDrawerMounted(false);
  }, []);

  const addedTitles = new Set(addedPresets.map((p) => p.title));

  const togglePreset = (title) => {
    if (addedTitles.has(title)) return;
    setSelectedPresets((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const toggleFilter = (type) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const handleAddPresets = useCallback(() => {
    const newTitles = [...selectedPresets].filter((t) => !addedTitles.has(t));
    const newPresets = newTitles.map((title) => ({
      title,
      records: PRESET_RECORDS[title] || [],
    }));
    setAddedPresets((prev) => [...prev, ...newPresets]);
    closeDrawer();
    setSelectedPresets(new Set());
    setActiveFilters(new Set());
    const count = newPresets.length;
    if (count > 0 && toastRef?.current) {
      toastRef.current.show({
        content: count === 1 ? "Preset added" : `${count} presets added`,
        variant: "success",
        duration: 4000,
      });
    }
  }, [selectedPresets, addedTitles, toastRef, closeDrawer]);

  const filteredPresets = activeFilters.size === 0
    ? DNS_PRESETS
    : DNS_PRESETS.filter((p) => activeFilters.has(p.type));

  const hasNewSelection = [...selectedPresets].some((t) => !addedTitles.has(t));
  const hasActiveFilters = activeFilters.size > 0;

  return (
    <Flex id="dnsSettingsPage" flexDirection="column" gap={6} px={6}>
      <Flex alignItems="center" justifyContent="space-between">
        <Stack>
          <Text.Subtitle>DNS Presets</Text.Subtitle>
          <Text.Body>
            DNS records point to services your domain uses, like forwarding your
            domain or setting up an email service. <br />
            <TextLink href="#">Learn more about DNS settings</TextLink>          
          </Text.Body>
        </Stack>
        <Button.Primary size="medium" onClick={openDrawer}>
          Add Preset
        </Button.Primary>
      </Flex>
      <Card sx={{ borderRadius: radii[1] }}>
        <Card.Body>
          <Stack space={3}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text.Subtitle px={2}>Squarespace Defaults</Text.Subtitle>
              <Touchable.Element.Icon>
              <Box
                as="button"
                aria-label="Delete defaults"
                css={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "#c00" },
                }}
              >
                <Trash color="red.300" />
              </Box>
              </Touchable.Element.Icon>
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
                <Text.Subtitle px={2}>{preset.title}</Text.Subtitle>
                <Box
                  as="button"
                  aria-label={`Delete ${preset.title}`}
                  onClick={() => setPresetToDelete(preset.title)}
                  css={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                    color: "#900",
                    display: "flex",
                    alignItems: "center",
                    "&:hover": { color: "#c00" },
                  }}
                >
                  <Touchable.Element.Icon>
                    <Trash color="red.300" />
                  </Touchable.Element.Icon>
                </Box>
              </Flex>
              <DNSTable records={preset.records} />
            </Stack>
          </Card.Body>
        </Card>
      ))}

      {/* Custom Records */}
      <Stack space={4}>
        <Flex alignItems="center" justifyContent="space-between">
          <Stack>
            <Text.Subtitle>Custom records</Text.Subtitle>
            <Text.Body>
              DNS records point to services your domain uses, like forwarding
              your domain or setting up an email service. <br />
              <TextLink href="#">Learn more about DNS settings</TextLink>
            </Text.Body>
          </Stack>
          <Button.Primary size="medium">Add Record</Button.Primary>
        </Flex>
        <Stack
          p={3}
          sx={{
            borderRadius: radii[1],
            border: borders[1],
            borderColor: colors.gray[800],
          }}
        >
          <DNSTable records={customRecords} />
        </Stack>
      </Stack>

      {presetToDelete && (
        <BasicDialog.Modal
          onRequestClose={() => setPresetToDelete(null)}
          closeOnEsc
          closeOnOverlayClicked
        >
          <BasicDialog.Overlay />
          <BasicDialog.Transition>
            <BasicDialog.Position position="center">
              <BasicDialog>
                <BasicDialog.Content>
                  <BasicDialog.Title>Remove {presetToDelete}?</BasicDialog.Title>
                  <BasicDialog.Description>
                    Removing this DNS preset will delete all associated records.
                    This could disrupt your website connection or linked services
                    if they depend on these settings.
                  </BasicDialog.Description>
                </BasicDialog.Content>
                <BasicDialog.Actions>
                  <BasicDialog.Button onClick={() => setPresetToDelete(null)}>
                    Cancel
                  </BasicDialog.Button>
                  <BasicDialog.Button.Danger onClick={confirmDeletePreset}>
                    Remove Preset
                  </BasicDialog.Button.Danger>
                </BasicDialog.Actions>
              </BasicDialog>
            </BasicDialog.Position>
          </BasicDialog.Transition>
        </BasicDialog.Modal>
      )}

      {isDrawerMounted && (
        <Drawer.Modal
          onRequestClose={closeDrawer}
          closeOnEsc
          closeOnOverlayClicked
        >
          <Drawer.Overlay />
          <Drawer.Transition
            onTransitionEnd={(phase) => {
              if (phase === "exiting") handleDrawerExited();
            }}
          >
            {isPresetDrawerOpen ? <Drawer.Sheet>
              <Drawer.Header>
                <Drawer.Header.TitleRow>
                  <Drawer.Header.Title>Add DNS Preset</Drawer.Header.Title>
                  <Drawer.CloseButton onClick={closeDrawer} />
                </Drawer.Header.TitleRow>
                <Drawer.Header.Description>
                  DNS presets simplify your domain setup by instantly adding the
                  right settings for your services and showing you which
                  connections are currently active.
                </Drawer.Header.Description>
              </Drawer.Header>
              <Drawer.Body px={6} py={5}>
                <Flex
                  id="dns-preset-search-filter"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={5}
                >
                  <TextInput.Root variant="base" sx={{ width: 300 }}>
                    <Search css={{ width: 16, height: 16, color: "gray.300" }} />
                    <TextInput.Control placeholder="Search for a preset" />
                  </TextInput.Root>
                  <Flex alignItems="center" gap={2}>
                    <Text.Label color="gray.300">FILTER BY</Text.Label>
                    <ActionList.PopOver
                      position="bottom-right"
                      anchorPoint={{ x: "right", y: "bottom" }}
                      closeOnClickOutside
                      closeOnEsc
                      renderTrigger={({ toggleActionListOpen, isOpen }) => (
                        <Chip
                          label="Type"
                          accessory={<Chip.ChevronDown />}
                          onClick={toggleActionListOpen}
                          isSelected={hasActiveFilters}
                        />
                      )}
                    >
                      {() => (
                        <Box css={{ padding: 16, minWidth: 180 }}>
                          <Stack space={0}>
                            {FILTER_TYPES.map((type) => (
                              <Flex key={type} alignItems="center" gap={2} py={2}>
                                <Checkbox
                                  checked={activeFilters.has(type)}
                                  onChange={() => toggleFilter(type)}
                                />
                                <Text.Body>{type}</Text.Body>
                              </Flex>
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </ActionList.PopOver>
                  </Flex>
                </Flex>
                <Box
                  id="dns-preset-grid"
                  css={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 11,
                  }}
                >
                  {filteredPresets.map((preset) => (
                    <DNSPresetCard
                      key={preset.title}
                      title={preset.title}
                      description={preset.description}
                      state={addedTitles.has(preset.title) || selectedPresets.has(preset.title) ? "selected" : "default"}
                      onClick={() => togglePreset(preset.title)}
                    />
                  ))}
                </Box>
              </Drawer.Body>
              <Drawer.Footer justifyContent="end">
                <Button.Secondary size="small" onClick={closeDrawer}>
                  Cancel
                </Button.Secondary>
                <Button.Primary size="small" disabled={!hasNewSelection} onClick={handleAddPresets}>Add</Button.Primary>
              </Drawer.Footer>
            </Drawer.Sheet> : null}
          </Drawer.Transition>
        </Drawer.Modal>
      )}      
    </Flex>
  );
}

export default function DNS_Settings() {
  const toastRef = useRef(null);

  usePageHeader({
    title: "DNS Settings",
    subtitle:
      "DNS records point to services your domain uses, like forwarding your domain or setting up an email service. Learn more about DNS settings",   
  });

  return (
    <>
      <DNSSettingsContent toastRef={toastRef} />
      <Toast.Container ref={toastRef} />
    </>
  );
}
