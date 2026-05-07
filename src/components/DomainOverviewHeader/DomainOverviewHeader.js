import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, Text, Touchable } from "@sqs/rosetta-primitives";
import { ActionList, Search } from "@sqs/rosetta-compositions";
import { Chip, Toggle, TextLink } from "@sqs/rosetta-elements";
import { useTheme } from "@sqs/rosetta-styled";
import { InfoCircle } from "@sqs/rosetta-icons";
import { ChevronLargeDown, Edit } from "@sqs/rosetta-icons";
import { loadJsonData } from "../../utils/dataUtils.ts";
import { SidePanelDomainContext } from "../../layouts/SidePanelDomainContext";

/**
 * Preview matches Figma "Screenshot Container" ratio (477×272), scaled to fit content area.
 * @see https://www.figma.com/design/LYKKMOEQtdW1oN1VxFEHsD/Global-Domain-Switcher?node-id=261-22033
 */
const PREVIEW_MAX_W = 400;
const PREVIEW_H = Math.round((PREVIEW_MAX_W * 272) / 477);

/** Hero domain line — Figma Desktop/Hero figure (40 / 44, book). */
const TITLE_FONT_EXPANDED_PX = 40;
const TITLE_LINE_EXPANDED_PX = 44;

const PADDING_LEFT_PX = 66;
const PADDING_RIGHT_PX = 66;
const PADDING_VERTICAL_PX = 66;
/** Gap between domain column and screenshot (Figma space-6). */
const COLUMN_GAP_PX = 33;
/** Inset rows: Figma space-4 ≈ 22px — closest 8pt step is 24 (gap 3). */
const INNER_ROW_GAP = 3;

const PREVIEW_RADIUS_PX = 11;
const PREVIEW_SHADOW =
  "0 9px 10.5px rgba(0,0,0,0.2), 0 38px 19px rgba(0,0,0,0.17), 0 85px 25.5px rgba(0,0,0,0.1), 0 151px 30px rgba(0,0,0,0.03)";

function getChipStatus(status) {
  const s = (status || "").toLowerCase();
  if (s === "active") return "success";
  if (s === "transfer-in-progress" || s === "transfer in progress")
    return "warning";
  if (s === "transfer-canceled" || s === "transfer canceled") return "error";
  return "default";
}

function getStatusLabel(status) {
  const s = (status || "").toLowerCase();
  if (s === "active") return "Active";
  if (s === "transfer-in-progress") return "Transfer in progress";
  if (s === "transfer-canceled") return "Transfer canceled";
  if (s === "pending-renewal") return "Pending renewal";
  if (s === "pending") return "Pending";
  return status || "Unknown";
}

function emptyRecord(decodedName) {
  return {
    domainName: decodedName,
    domainStatus: "pending",
    domainProvider: "",
    thumbnailImage: "",
  };
}

/** Preserve /domains/:id/... subpath when switching domains. */
function suffixAfterDomainSegment(pathname) {
  const m = pathname.match(/^\/domains\/[^/]+(\/.*)?$/);
  return m && m[1] ? m[1] : "";
}

export default function DomainOverviewHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { effectiveDomainId } = React.useContext(SidePanelDomainContext);
  const { colors, fontWeights } = useTheme();

  const [domain, setDomain] = React.useState(null);
  const [allDomains, setAllDomains] = React.useState([]);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [domainSwitcherQuery, setDomainSwitcherQuery] = React.useState("");
  const [autoRenew, setAutoRenew] = React.useState(true);

  const prefersReducedMotion = useReducedMotion();
  const chevronRotateTransition = prefersReducedMotion
    ? undefined
    : "transform 0.38s cubic-bezier(0.25, 0.1, 0.25, 1)";

  React.useEffect(() => {
    if (!popoverOpen) {
      setDomainSwitcherQuery("");
    }
  }, [popoverOpen]);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!effectiveDomainId) {
        setDomain(null);
        setAllDomains([]);
        return;
      }
      const decoded = decodeURIComponent(effectiveDomainId);
      setDomain(emptyRecord(decoded));
      const res = await loadJsonData("domains");
      if (cancelled) return;
      const rawList = res.data?.domains;
      const list = Array.isArray(rawList) ? [...rawList] : [];
      list.sort((a, b) =>
        String(a.domainName).localeCompare(String(b.domainName)),
      );
      setAllDomains(list);
      if (res.error || list.length === 0) {
        setDomain(emptyRecord(decoded));
        return;
      }
      const found = list.find((d) => d.domainName === decoded) || null;
      setDomain(found || emptyRecord(decoded));
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [effectiveDomainId]);

  const goToDomain = React.useCallback(
    (domainName, onRequestClose) => {
      if (!domainName || domainName === domain?.domainName) {
        onRequestClose();
        return;
      }
      const tail = suffixAfterDomainSegment(pathname);
      navigate(
        `/domains/${encodeURIComponent(domainName)}${tail || ""}`,
      );
      onRequestClose();
    },
    [domain?.domainName, navigate, pathname],
  );

  const filteredSwitcherDomains = React.useMemo(() => {
    const q = domainSwitcherQuery.trim().toLowerCase();
    if (!q) {
      return allDomains;
    }
    return allDomains.filter((d) =>
      String(d.domainName || "").toLowerCase().includes(q),
    );
  }, [allDomains, domainSwitcherQuery]);

  const insetBg = colors?.gray?.[950] ?? "#f9f9f9";
  const muted = colors?.gray?.[300] ?? "#666666";
  const fg = colors?.gray?.[100] ?? "#0e0e0e";

  const titleStyles = React.useMemo(
    () =>
      ({
        fontWeight: fontWeights?.book ?? "400",
        letterSpacing: "-0.08px",
        color: typeof fg === "string" ? fg : "#0e0e0e",
        margin: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "normal",
        fontSize: `${TITLE_FONT_EXPANDED_PX}px`,
        lineHeight: `${TITLE_LINE_EXPANDED_PX}px`,
        minWidth: 0,
        flex: "1 1 auto",
      }),
    [fontWeights?.book, fg],
  );

  if (!effectiveDomainId || !domain) {
    return null;
  }

  return (
    <Box
      as="header"
      id="domain-overview-header"
      sx={{
        marginBottom: 24,
        backgroundColor: insetBg,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: colors?.gray?.[800] ?? "rgba(0,0,0,0.06)",
        overflow: popoverOpen ? "visible" : "hidden",
      }}
    >
      <Box
        id="domainOverviewHeaderContainer"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          boxSizing: "border-box",
          paddingLeft: `${PADDING_LEFT_PX}px`,
          paddingRight: `${PADDING_RIGHT_PX}px`,
          paddingTop: `${PADDING_VERTICAL_PX}px`,
          paddingBottom: `${PADDING_VERTICAL_PX}px`,
          columnGap: `${COLUMN_GAP_PX}px`,
        }}
      >
        <Box
          sx={{
            position: "relative",
            flex: "1",
            width: "100%",
            minWidth: 0,
          }}
        >
          <Flex flexDirection="column" gap={4} minWidth={0}>
            <Flex
              alignItems="center"
              gap={INNER_ROW_GAP}
              flexWrap="nowrap"
              minWidth={0}
            >
              {/*
                Rosetta PopOver: horizontal "left" uses anchorX − width, so with the default
                (center) anchor the menu shifts far left. bottom-right + anchor left/bottom
                lines the list up with the trigger’s start and drops it below the trigger.
              */}
              <ActionList.PopOver
                position="bottom-right"
                anchorPoint={{ x: "left", y: "bottom" }}
                closeOnClickOutside
                closeOnEsc
                onRequestOpen={() => setPopoverOpen(true)}
                onRequestClose={() => setPopoverOpen(false)}
                renderTrigger={({ toggleActionListOpen, isOpen }) => (
                  <Box
                    id="domain-overview-switcher-trigger"
                    as="button"
                    type="button"
                    flexShrink={0}
                    onClick={toggleActionListOpen}
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    aria-label={`Switch domain, current domain ${domain.domainName}`}
                    css={{
                      display: "inline-flex",
                      alignItems: "center",
                      minWidth: 0,
                      maxWidth: "100%",
                      border: "none",
                      background: "transparent",
                      padding: 0,
                      margin: 0,
                      cursor: "pointer",
                      font: "inherit",
                      textAlign: "left",
                    }}
                  >
                    <Flex
                      alignItems="center"
                      gap={INNER_ROW_GAP}
                      minWidth={0}
                      sx={{ flex: "1 1 auto", minWidth: 0 }}
                    >
                      <span style={{ ...titleStyles, alignSelf: "center" }}>
                        {domain.domainName}
                      </span>
                      <span
                        aria-hidden
                        style={{
                          display: "inline-flex",
                          flexShrink: 0,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: chevronRotateTransition,
                        }}
                      >
                        <ChevronLargeDown
                          css={{
                            width: 22,
                            height: 22,
                            color: fg,
                          }}
                        />
                      </span>
                    </Flex>
                  </Box>
                )}
              >
                {({ onRequestClose }) => (
                  <Flex
                    id="domain-overview-switcher-menu-root"
                    flexDirection="column"
                    maxHeight={320}
                    sx={{
                      width: "100%",
                      minWidth: "min(320px, 92vw)",
                      margin: 0,
                      padding: 0,
                      overflow: "hidden",
                      backgroundColor: "white",
                    }}
                  >
                    <Box
                      flexShrink={0}
                      px={2}
                      pt={2}
                      pb={2}
                      bg="white"
                      sx={{
                        borderBottomWidth: "1px",
                        borderBottomStyle: "solid",
                        borderBottomColor: "gray.900",
                      }}
                    >
                      <Search.Input
                        aria-label="Search your domains"
                        autoFocus={popoverOpen && !prefersReducedMotion}
                        inputValue={domainSwitcherQuery}
                        onChange={setDomainSwitcherQuery}
                        placeholder="Search your domains"
                        variant="floating"
                        sx={{
                          width: "100%",
                          backgroundColor: "transparent",
                        }}
                      />
                    </Box>
                    <Flex
                      id="domain-overview-switcher-menu"
                      flex={1}
                      flexDirection="column"
                      minHeight={0}
                      py={4}
                      bg="white"
                      as="ul"
                      sx={{
                        listStyle: "none",
                        overflowY: "auto",
                      }}
                    >
                      {allDomains.length === 0 ? (
                        <Box px={4} py={4}>
                          <Text.Body fontSize={3} color="gray.300">
                            No domains found
                          </Text.Body>
                        </Box>
                      ) : filteredSwitcherDomains.length === 0 ? (
                        <Box px={4} py={4}>
                          <Text.Body fontSize={3} color="gray.300">
                            No matching domains
                          </Text.Body>
                        </Box>
                      ) : (
                        filteredSwitcherDomains.map((d) => {
                          const isCurrent = d.domainName === domain.domainName;
                          return (
                            <ActionList.Item
                              key={d.domainName}
                              onClick={() =>
                                goToDomain(d.domainName, onRequestClose)}
                              sx={
                                isCurrent
                                  ? {
                                      backgroundColor: "gray.950",
                                      fontWeight: "medium",
                                    }
                                  : undefined
                              }
                            >
                              {d.domainName}
                            </ActionList.Item>
                          );
                        })
                      )}
                    </Flex>
                  </Flex>
                )}
              </ActionList.PopOver>
            </Flex>
            <Flex
              alignItems="center"
              gap={INNER_ROW_GAP}
              flexWrap="wrap"
              minWidth={0}
            >
              <Text.Body
                m={0}
                color="gray.300"
                fontWeight="medium"
                fontSize={3}
                css={{ color: muted, lineHeight: "22px" }}
              >
                Provider: {domain.domainProvider || "—"}
              </Text.Body>
              <Box flexShrink={0}>
                <Chip
                  label={getStatusLabel(domain.domainStatus)}
                  status={getChipStatus(domain.domainStatus)}
                  usage="badge"
                />
              </Box>
            </Flex>

            {/* Expires On */}
            <Flex
              id="expiresOn"
              flexDirection="column"
              gap={2}
              minWidth={0}
            >
              <Flex alignItems="center" gap={1}>
                <Text.Label>Expires On</Text.Label>
                <InfoCircle css={{ color: "gray.400", width: 16, height: 16 }} />
              </Flex>
              <Box>
                <Text.Subtitle>
                  {domain.expirationDate || "Aug 23, 2024"}{" "}
                  <Text.Body as="span">for $12</Text.Body>
                </Text.Subtitle>
              </Box>
              <Flex alignItems="center" gap={2}>
                <Toggle
                  checked={autoRenew}
                  onChange={(checked) => setAutoRenew(checked)}
                  aria-label="Auto-renew"
                />
                <Text.Body>Auto-renew</Text.Body>
              </Flex>
              <TextLink href="#">Add years</TextLink>
            </Flex>
          </Flex>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: 33,
            right: 33,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Box
            width={PREVIEW_MAX_W}
            height={PREVIEW_H}
            maxWidth="100%"
            css={{
              overflow: "hidden",
              borderRadius: `${PREVIEW_RADIUS_PX}px`,
              boxShadow: PREVIEW_SHADOW,
            }}
          >
            {domain.thumbnailImage ? (
              <img
                src={domain.thumbnailImage}
                alt=""
                width={PREVIEW_MAX_W}
                height={PREVIEW_H}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: `${PREVIEW_RADIUS_PX}px`,
                }}
              />
            ) : (
              <Box
                width="100%"
                height="100%"
                css={{ borderRadius: `${PREVIEW_RADIUS_PX}px` }}
              />
            )}
            <Box
              position="absolute"
              bottom={55}
              right={22}
              css={{ zIndex: 1 }}
            >
              <Touchable.Element.Icon
                aria-label="Edit website preview"
                onClick={() => {}}
                sx={{ backgroundColor: "gray.950", borderRadius: "4px" }}
              >
                <Edit />
              </Touchable.Element.Icon>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
