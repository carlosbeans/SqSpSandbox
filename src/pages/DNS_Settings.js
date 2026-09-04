import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Stack,
  Chip,
  Checkbox,
  Toast,
  StepIndicator,
} from "@sqs/rosetta-elements";
import { TextInput } from "@sqs/rosetta-elements/textinput/next";
import { Flex, Box } from "@sqs/rosetta-primitives";
import { Text } from "@sqs/rosetta-react/text/next";
import { Button } from "@sqs/rosetta-react/button/next";
import {
  Drawer,
  ActionList,
  BasicDialog,
  Dialog,
} from "@sqs/rosetta-compositions";
import { Search } from "@sqs/rosetta-icons";
import { usePageHeader } from "../layouts/PageHeaderContext";
import { useTopChromeInset } from "../contexts/TopChromeInsetContext";
import {
  TOP_CHROME_STICKY_BASE_PX,
  SECTION_RAIL_STICKY_GAP_PX,
} from "../constants/layout";
import DNSPresetCard from "../components/DNSPresetCard/DNSPresetCard";
import SectionRail from "../components/SectionRail/SectionRail";
import DNSPresetsSection from "./dns/DNSPresetsSection";
import DNSCustomRecordsSection from "./dns/DNSCustomRecordsSection";
import DNSNameserversSection from "./dns/DNSNameserversSection";
import { DNS_SECTIONS } from "./dns/sections";
import dnsData from "../data/dns.json";

const {
  filterTypes: FILTER_TYPES,
  categoryOrder: CATEGORY_ORDER,
  defaultRecords,
  customRecords,
  presets: DNS_PRESETS,
  presetRecords: PRESET_RECORDS,
} = dnsData;

const VERIFICATION_REQUIRED_PRESETS = new Set([
  "Microsoft 365",
  "Webflow",
  "GitHub Pages",
  "Framer",
  "Netlify",
  "Railway",
  "Lovable",
  "GitHub Domain Verification",
  "Google Workspace Verification",
]);

export function DNSSettingsContent({ toastRef, inlineHeader }) {
  const location = useLocation();
  const topChromeInsetPx = useTopChromeInset();
  const sectionTopOffsetPx =
    TOP_CHROME_STICKY_BASE_PX + SECTION_RAIL_STICKY_GAP_PX + topChromeInsetPx;
  const scrollMarginTop = sectionTopOffsetPx;
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
  const [verificationQueue, setVerificationQueue] = useState([]);
  const [verificationStepIndex, setVerificationStepIndex] = useState(0);
  const [verificationCodes, setVerificationCodes] = useState({});
  const [pendingAddition, setPendingAddition] = useState(null);

  const initialHashSectionId = location.hash ? location.hash.slice(1) : undefined;

  // Deep links (e.g. from the old standalone Nameservers page) land with a
  // section hash; scroll to it once on mount rather than always opening at
  // the top of the page.
  useEffect(() => {
    if (!initialHashSectionId) return;
    const element = document.getElementById(initialHashSectionId);
    if (!element) return;
    requestAnimationFrame(() => {
      element.scrollIntoView({ block: "start", behavior: "auto" });
    });
    // Intentionally only runs on mount for the initial deep link.
  }, []);

  const handleActiveSectionChange = useCallback(
    (sectionId) => {
      if (!sectionId || typeof window === "undefined") return;
      const nextUrl = `${location.pathname}${location.search}#${sectionId}`;
      window.history.replaceState(null, "", nextUrl);
    },
    [location.pathname, location.search],
  );

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

  const finalizeAddition = useCallback(
    (newPresets, removedTitles) => {
      if (removedTitles.size > 0) {
        setAddedPresets((prev) =>
          prev.filter((p) => !removedTitles.has(p.title)),
        );
      }
      if (newPresets.length > 0) {
        setAddedPresets((prev) => [...prev, ...newPresets]);
      }

      closeDrawer();
      setSelectedPresets(new Set());
      setDeselectedAddedPresets(new Set());
      setActiveFilters(new Set());
      setVerificationQueue([]);
      setVerificationStepIndex(0);
      setVerificationCodes({});
      setPendingAddition(null);

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
    },
    [closeDrawer, toastRef],
  );

  const beginAddition = useCallback(
    (removedTitles) => {
      const newTitles = [...selectedPresets].filter(
        (t) => !addedTitles.has(t),
      );
      const newPresets = newTitles.map((title) => ({
        title,
        records: PRESET_RECORDS[title] || [],
      }));
      const needsVerification = newTitles.filter((t) =>
        VERIFICATION_REQUIRED_PRESETS.has(t),
      );

      if (needsVerification.length > 0) {
        setPendingAddition({ newPresets, removedTitles });
        setVerificationCodes({});
        setVerificationStepIndex(0);
        setVerificationQueue(needsVerification);
        return;
      }

      finalizeAddition(newPresets, removedTitles);
    },
    [selectedPresets, addedTitles, finalizeAddition],
  );

  const confirmRemoveAndAdd = useCallback(() => {
    setPendingConfirm(false);
    beginAddition(deselectedAddedPresets);
  }, [deselectedAddedPresets, beginAddition]);

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
    beginAddition(new Set());
  }, [deselectedAddedPresets, beginAddition]);

  const currentVerificationTitle = verificationQueue[verificationStepIndex];
  const currentVerificationCode =
    verificationCodes[currentVerificationTitle] ?? "";
  const isLastVerificationStep =
    verificationStepIndex === verificationQueue.length - 1;
  const isFirstVerificationStep = verificationStepIndex === 0;

  const handleCancelVerification = useCallback(() => {
    setVerificationQueue([]);
    setVerificationStepIndex(0);
    setVerificationCodes({});
    setPendingAddition(null);
  }, []);

  const handleVerificationBack = useCallback(() => {
    setVerificationStepIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleVerificationCodeChange = useCallback(
    (event) => {
      const value = event.target.value;
      setVerificationCodes((prev) => ({
        ...prev,
        [currentVerificationTitle]: value,
      }));
    },
    [currentVerificationTitle],
  );

  const handleVerificationContinue = useCallback(() => {
    if (isLastVerificationStep) {
      if (pendingAddition) {
        finalizeAddition(
          pendingAddition.newPresets,
          pendingAddition.removedTitles,
        );
      }
      return;
    }
    setVerificationStepIndex((i) => i + 1);
  }, [isLastVerificationStep, pendingAddition, finalizeAddition]);

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
    <Flex
      id="dnsSettingsPage"
      px={inlineHeader ? 0 : 6}
      gap={10}
      sx={{
        flexDirection: "column",
        alignItems: "stretch",
        "@media (min-width: 1024px)": {
          flexDirection: "row",
          alignItems: "stretch",
        },
      }}
    >
      <Flex
        flexDirection="column"
        gap={8}
        sx={{ minWidth: 0, width: "100%", flex: "1 1 auto" }}
      >
        <DNSPresetsSection
          sectionId="dns-presets-section"
          scrollMarginTop={scrollMarginTop}
          defaultRecords={defaultRecords}
          addedPresets={addedPresets}
          onAddPreset={openDrawer}
          onDeletePreset={setPresetToDelete}
        />

        <DNSCustomRecordsSection
          sectionId="dns-custom-records-section"
          scrollMarginTop={scrollMarginTop}
          customRecords={customRecords}
        />

        <DNSNameserversSection
          sectionId="dns-nameservers-section"
          scrollMarginTop={scrollMarginTop}
        />
      </Flex>

      <Box
        sx={{
          display: "none",
          "@media (min-width: 1024px)": {
            display: "block",
            flex: "0 0 200px",
          },
        }}
      >
        <SectionRail
          sections={DNS_SECTIONS}
          initialActiveId={initialHashSectionId}
          onActiveChange={handleActiveSectionChange}
          topOffsetPx={sectionTopOffsetPx}
        />
      </Box>

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

      {verificationQueue.length > 0 && (
        <Dialog.Modal
          onRequestClose={handleCancelVerification}
          closeOnEsc
          closeOnOverlayClicked
        >
          <Dialog.Overlay />
          <Dialog.Transition>
            <Dialog id="dns-preset-verification-dialog" size="small">
              <Dialog.Header>
                <Dialog.Header.Title>Verification required</Dialog.Header.Title>
                <Dialog.CloseButton onClick={handleCancelVerification} />
              </Dialog.Header>
              <Dialog.Content>
                <Stack space={5} css={{ width: "100%" }}>
                  <Stack space={2}>
                    <Text.Body fontWeight="medium">
                      {currentVerificationTitle}
                    </Text.Body>
                    <Text.Body color="gray.300">
                      Before adding this preset, enter the verification code
                      that {currentVerificationTitle} emailed to you.
                    </Text.Body>
                  </Stack>
                  <TextInput.Root>
                    <TextInput.Control
                      placeholder="Enter verification code"
                      value={currentVerificationCode}
                      onChange={handleVerificationCodeChange}
                    />
                  </TextInput.Root>
                </Stack>
              </Dialog.Content>
              {verificationQueue.length > 1 ? (
                <Dialog.Footer.Grid>
                  {isFirstVerificationStep ? (
                    <Button.Alt
                      size="small"
                      onClick={handleVerificationBack}
                      css={{ justifySelf: "start", visibility: "hidden" }}
                    >
                      Back
                    </Button.Alt>
                  ) : (
                    <Button.Alt
                      size="small"
                      onClick={handleVerificationBack}
                      css={{ justifySelf: "start" }}
                    >
                      Back
                    </Button.Alt>
                  )}
                  <StepIndicator.Horizontal
                    stepIndex={verificationStepIndex}
                    steps={verificationQueue.map((title) => ({
                      key: title,
                    }))}
                  />
                  <Button.Strong
                    size="small"
                    disabled={currentVerificationCode.trim().length === 0}
                    onClick={handleVerificationContinue}
                    css={{ justifySelf: "end" }}
                  >
                    {isLastVerificationStep ? "Done" : "Continue"}
                  </Button.Strong>
                </Dialog.Footer.Grid>
              ) : (
                <Dialog.Footer justifyContent="end">
                  <Button.Alt size="small" onClick={handleCancelVerification}>
                    Cancel
                  </Button.Alt>
                  <Button.Strong
                    size="small"
                    disabled={currentVerificationCode.trim().length === 0}
                    onClick={handleVerificationContinue}
                  >
                    {isLastVerificationStep ? "Done" : "Continue"}
                  </Button.Strong>
                </Dialog.Footer>
              )}
            </Dialog>
          </Dialog.Transition>
        </Dialog.Modal>
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
                    <TextInput.Root sx={{ width: 300 }}>
                      <Search
                        css={{ width: 16, height: 16, color: "gray.300" }}
                      />
                      <TextInput.Control placeholder="Search for a preset" />
                    </TextInput.Root>
                    <Flex alignItems="center" gap={2}>
                      <Text.Eyebrow color="gray.300">FILTER BY</Text.Eyebrow>
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
                        <Text.Heading.Large as="h3" mb={3}>{category}</Text.Heading.Large>
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
                  <Button.Alt size="small" onClick={closeDrawer}>
                    Cancel
                  </Button.Alt>
                  <Button.Strong
                    size="small"
                    disabled={!hasChanges}
                    onClick={handleConfirm}
                  >
                    Confirm
                  </Button.Strong>
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
