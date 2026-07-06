import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Stack,
  Card,
  TextLink,
  Tabs,
  Chip,
  Checkbox,
  Toast,
} from "@sqs/rosetta-elements";
import { TextInput } from "@sqs/rosetta-elements/textinput/next";
import { Text, Button, Flex, Box, Touchable } from "@sqs/rosetta-primitives";
import {
  Table,
  Drawer,
  ActionList,
  BasicDialog,
} from "@sqs/rosetta-compositions";
import { InfoCircle, Trash, Search, CheckmarkCircle } from "@sqs/rosetta-icons";
import { useTheme } from "@sqs/rosetta-styled";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { usePageHeader } from "../layouts/PageHeaderContext";
import DNSPresetCard from "../components/DNSPresetCard/DNSPresetCard";
import dnsData from "../data/dns.json";

const {
  filterTypes: FILTER_TYPES,
  categoryOrder: CATEGORY_ORDER,
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
  const [deselectedAddedPresets, setDeselectedAddedPresets] = useState(
    new Set(),
  );
  const [pendingConfirm, setPendingConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState("presets");

  const tabOptions = [
    { label: "DNS Presets", value: "presets" },
    { label: "Custom DNS Records", value: "custom" },
    { label: "Nameservers", value: "nameservers" },
  ];

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
    setDeselectedAddedPresets(new Set());
  }, []);

  const addedTitles = new Set(addedPresets.map((p) => p.title));

  const presetByTitle = Object.fromEntries(
    DNS_PRESETS.map((p) => [p.title, p]),
  );

  const togglePreset = (title) => {
    if (addedTitles.has(title)) {
      setDeselectedAddedPresets((prev) => {
        const next = new Set(prev);
        if (next.has(title)) {
          next.delete(title);
        } else {
          next.add(title);
        }
        return next;
      });
      return;
    }
    const category = presetByTitle[title]?.type;
    setSelectedPresets((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        if (category) {
          DNS_PRESETS.filter(
            (p) => p.type === category && p.title !== title,
          ).forEach((p) => next.delete(p.title));
        }
        next.add(title);
      }
      return next;
    });
  };

  const confirmRemoveAndAdd = useCallback(() => {
    setPendingConfirm(false);
    const removedTitles = deselectedAddedPresets;
    setAddedPresets((prev) => prev.filter((p) => !removedTitles.has(p.title)));

    const newTitles = [...selectedPresets].filter((t) => !addedTitles.has(t));
    const newPresets = newTitles.map((title) => ({
      title,
      records: PRESET_RECORDS[title] || [],
    }));
    setAddedPresets((prev) => [...prev, ...newPresets]);

    closeDrawer();
    setSelectedPresets(new Set());
    setDeselectedAddedPresets(new Set());
    setActiveFilters(new Set());

    const messages = [];
    if (removedTitles.size > 0) {
      messages.push(
        removedTitles.size === 1
          ? "1 preset removed"
          : `${removedTitles.size} presets removed`,
      );
    }
    if (newPresets.length > 0) {
      messages.push(
        newPresets.length === 1
          ? "1 preset added"
          : `${newPresets.length} presets added`,
      );
    }
    if (messages.length > 0 && toastRef?.current) {
      toastRef.current.show({
        content: messages.join(", "),
        variant: "success",
        duration: 4000,
      });
    }
  }, [
    deselectedAddedPresets,
    selectedPresets,
    addedTitles,
    toastRef,
    closeDrawer,
  ]);

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

  const handleConfirm = useCallback(() => {
    if (deselectedAddedPresets.size > 0) {
      setPendingConfirm(true);
      return;
    }
    const newTitles = [...selectedPresets].filter((t) => !addedTitles.has(t));
    const newPresets = newTitles.map((title) => ({
      title,
      records: PRESET_RECORDS[title] || [],
    }));
    setAddedPresets((prev) => [...prev, ...newPresets]);
    closeDrawer();
    setSelectedPresets(new Set());
    setDeselectedAddedPresets(new Set());
    setActiveFilters(new Set());
    const count = newPresets.length;
    if (count > 0 && toastRef?.current) {
      toastRef.current.show({
        content: count === 1 ? "Preset added" : `${count} presets added`,
        variant: "success",
        duration: 4000,
      });
    }
  }, [
    deselectedAddedPresets,
    selectedPresets,
    addedTitles,
    toastRef,
    closeDrawer,
  ]);

  const filteredPresets =
    activeFilters.size === 0
      ? DNS_PRESETS
      : DNS_PRESETS.filter((p) => activeFilters.has(p.type));

  const selectedByCategory = {};
  for (const title of selectedPresets) {
    const cat = presetByTitle[title]?.type;
    if (cat) selectedByCategory[cat] = title;
  }
  const effectiveAddedTitles = new Set(
    [...addedTitles].filter((t) => !deselectedAddedPresets.has(t)),
  );
  const addedByCategory = {};
  for (const t of effectiveAddedTitles) {
    const cat = presetByTitle[t]?.type;
    if (cat) addedByCategory[cat] = t;
  }

  const getCardState = (preset) => {
    const isDeselected = deselectedAddedPresets.has(preset.title);
    if (isDeselected) return "default";
    if (
      effectiveAddedTitles.has(preset.title) ||
      selectedPresets.has(preset.title)
    ) {
      return "selected";
    }
    const cat = preset.type;
    if (selectedByCategory[cat] || addedByCategory[cat]) {
      return "disabled";
    }
    return "default";
  };

  const groupedPresets = CATEGORY_ORDER.map((category) => ({
    category,
    presets: filteredPresets.filter((p) => p.type === category),
  })).filter((group) => group.presets.length > 0);

  const hasChanges =
    [...selectedPresets].some((t) => !addedTitles.has(t)) ||
    deselectedAddedPresets.size > 0;
  const hasActiveFilters = activeFilters.size > 0;

  return (
    <Flex id="dnsSettingsPage" flexDirection="column" gap={6} px={6}>
      <Tabs
        options={tabOptions}
        value={activeTab}
        onChange={setActiveTab}
        showIndicator
      />

      {activeTab === "presets" && (
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <Stack>
              <Text.SectionTitle mb={3}>DNS Presets</Text.SectionTitle>
              <Text.Body>
                DNS presets in Squarespace simplify common connections for your
                website and email services.
                <br />
                <TextLink href="#">Learn more about DNS presets</TextLink>
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
        </>
      )}

      {activeTab === "custom" && (
        <Stack space={4}>
          <Flex alignItems="center" justifyContent="space-between">
            <Stack>
              <Text.SectionTitle mb={3}>Custom records</Text.SectionTitle>
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
      )}

      {activeTab === "nameservers" && (
        <>
          <Stack>
            <Flex alignItems="center" justifyContent="space-between">
              <Text.SectionTitle mb={3}>Nameservers</Text.SectionTitle>
              <Button.Primary size="medium">
                Use Custom Nameservers
              </Button.Primary>
            </Flex>
            <Text.Body>
              Use Squarespace Nameservers to manage your domain's nameservers.
              Learn more about nameservers
            </Text.Body>
            <Stack my={6} border={borders[1]} borderColor={colors.gray[800]} borderRadius={radii[1]} p={4}>
              <Box
                pb={4}
                sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}
              >
                ns-cloud-b1.googledomains.com
              </Box>
              <Box
                py={4}
                sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}
              >
                ns-cloud-b2.googledomains.com
              </Box>
              <Box
                py={4}
                sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}
              >
                ns-cloud-b3.googledomains.com
              </Box>
              <Box
                pt={4}                
              >
                ns-cloud-b4.googledomains.com
              </Box>
            </Stack>
            <Flex flexDirection="column" gap={3}>
              <Flex alignItems="center" justifyContent="space-between">
                <Text.SectionTitle mb={0}>
                  Nameserver Registration
                </Text.SectionTitle>
                <Button.Primary size="medium">Add host record</Button.Primary>
              </Flex>
              <Text.Body>
                Create a host record to associate a nameserver with an IP
                address. Learn more
              </Text.Body>
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                py={10}
                gap={2}
                border={borders[1]}
                borderColor={colors.gray[800]}
                borderRadius={radii[1]}
                
              >
                <Text.Subtitle>No host records</Text.Subtitle>
                <Text.Body color="gray.300">
                  When you add host records, they will show up here.
                </Text.Body>
              </Flex>
            </Flex>
          </Stack>
        </>
      )}

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
                  <BasicDialog.Title>
                    Remove {presetToDelete}?
                  </BasicDialog.Title>
                  <BasicDialog.Description>
                    Removing this DNS preset will delete all associated records.
                    This could disrupt your website connection or linked
                    services if they depend on these settings.
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

      {pendingConfirm && (
        <BasicDialog.Modal
          onRequestClose={() => setPendingConfirm(false)}
          closeOnEsc
          closeOnOverlayClicked
        >
          <BasicDialog.Overlay />
          <BasicDialog.Transition>
            <BasicDialog.Position position="center">
              <BasicDialog>
                <BasicDialog.Content>
                  <BasicDialog.Title>
                    Remove selected presets?
                  </BasicDialog.Title>
                  <BasicDialog.Description>
                    You've deselected one or more active DNS presets. Removing
                    them will delete their records and could disrupt your domain
                    connection or linked services. Do you want to continue?
                  </BasicDialog.Description>
                </BasicDialog.Content>
                <BasicDialog.Actions>
                  <BasicDialog.Button onClick={() => setPendingConfirm(false)}>
                    Cancel
                  </BasicDialog.Button>
                  <BasicDialog.Button.Danger onClick={confirmRemoveAndAdd}>
                    Confirm
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
            {isPresetDrawerOpen ? (
              <Drawer.Sheet>
                <Drawer.Header>
                  <Drawer.Header.TitleRow>
                    <Drawer.Header.Title>Add DNS Preset</Drawer.Header.Title>
                    <Drawer.CloseButton onClick={closeDrawer} />
                  </Drawer.Header.TitleRow>
                  <Drawer.Header.Description>
                    DNS presets simplify your domain setup by instantly adding
                    the right settings for your services and showing you which
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
                      <Search
                        css={{ width: 16, height: 16, color: "gray.300" }}
                      />
                      <TextInput.Control placeholder="Search for a preset" />
                    </TextInput.Root>
                    <Flex alignItems="center" gap={2}>
                      <Text.Label color="gray.300">FILTER BY</Text.Label>
                      <ActionList.PopOver
                        position="bottom"
                        anchorPoint={{ x: "right", y: "top" }}
                        offset={{ y: 4 }}
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
                                <Flex
                                  key={type}
                                  alignItems="center"
                                  gap={2}
                                  py={2}
                                >
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
                  <Stack space={5}>
                    {groupedPresets.map(({ category, presets }) => (
                      <Box key={category}>
                        <Text.SectionTitle mb={3}>{category}</Text.SectionTitle>
                        <Box
                          css={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: 11,
                          }}
                        >
                          {presets.map((preset) => (
                            <DNSPresetCard
                              key={preset.title}
                              title={preset.title}
                              description={preset.description}
                              state={getCardState(preset)}
                              onClick={() => togglePreset(preset.title)}
                            />
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Drawer.Body>
                <Drawer.Footer justifyContent="end">
                  <Button.Secondary size="small" onClick={closeDrawer}>
                    Cancel
                  </Button.Secondary>
                  <Button.Primary
                    size="small"
                    disabled={!hasChanges}
                    onClick={handleConfirm}
                  >
                    Confirm
                  </Button.Primary>
                </Drawer.Footer>
              </Drawer.Sheet>
            ) : null}
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
