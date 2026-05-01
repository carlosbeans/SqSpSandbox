import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, Text, Touchable } from "@sqs/rosetta-primitives";
import { ActionList } from "@sqs/rosetta-compositions";
import { Chip } from "@sqs/rosetta-elements";
import { useTheme } from "@sqs/rosetta-styled";
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
/** Collapsed toolbar — ~35% of hero for compact strip. */
const TITLE_FONT_COLLAPSED_PX = Math.round(TITLE_FONT_EXPANDED_PX * 0.35);
const TITLE_LINE_COLLAPSED_PX = Math.round(TITLE_LINE_EXPANDED_PX * 0.35);

const PADDING_LEFT_PX = 66;
const PADDING_RIGHT_PX = 66;
const PADDING_VERTICAL_EXPANDED_PX = 66;
const PADDING_VERTICAL_COLLAPSED_PX = 22;
/** Gap between domain column and screenshot (Figma space-6). */
const COLUMN_GAP_PX = 33;
/** Inset rows: Figma space-4 ≈ 22px — closest 8pt step is 24 (gap 3). */
const INNER_ROW_GAP = 3;

const PREVIEW_RADIUS_PX = 11;
const PREVIEW_SHADOW =
  "0 9px 10.5px rgba(0,0,0,0.2), 0 38px 19px rgba(0,0,0,0.17), 0 85px 25.5px rgba(0,0,0,0.1), 0 151px 30px rgba(0,0,0,0.03)";

const easeSmooth = [0.25, 0.1, 0.25, 1];

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

export default function DomainInfoHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { effectiveDomainId } = React.useContext(SidePanelDomainContext);
  const { colors, fontWeights } = useTheme();

  const [domain, setDomain] = React.useState(null);
  const [allDomains, setAllDomains] = React.useState([]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [switcherOpen, setSwitcherOpen] = React.useState(false);

  const prefersReducedMotion = useReducedMotion();
  const layoutTransition = React.useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0.01 }
        : { duration: 0.4, ease: easeSmooth },
    [prefersReducedMotion],
  );

  React.useEffect(() => {
    const onScroll = () => {
      const y = Math.max(0, window.scrollY || 0);
      setCollapsed(y > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (collapsed) {
      setSwitcherOpen(false);
    }
  }, [collapsed]);

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

  const insetBg = colors?.gray?.[950] ?? "#f9f9f9";
  const muted = colors?.gray?.[300] ?? "#666666";
  const fg = colors?.gray?.[100] ?? "#0e0e0e";

  const titleMotionStyles = React.useMemo(
    () => ({
      fontWeight: fontWeights?.book ?? "400",
      letterSpacing: "-0.08px",
      color: typeof fg === "string" ? fg : "#0e0e0e",
      margin: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: collapsed ? "nowrap" : "normal",
    }),
    [fontWeights?.book, fg, collapsed],
  );

  if (!effectiveDomainId || !domain) {
    return null;
  }

  return (
    <motion.header
      id="appshell-domain-info-header"
      initial={false}
      transition={layoutTransition}
      style={{
        position: "sticky",
        top: 77,
        zIndex: 3,
        overflow:
          "hidden",
        marginBottom: 24,
        backgroundColor: insetBg,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: colors?.gray?.[800] ?? "rgba(0,0,0,0.06)",
      }}
    >
      <motion.div
        id="domainInfoContainer"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          boxSizing: "border-box",
          columnGap: collapsed ? 0 : COLUMN_GAP_PX,
          paddingLeft: `${PADDING_LEFT_PX}px`,
          paddingRight: `${PADDING_RIGHT_PX}px`,
        }}
        animate={{
          paddingTop: collapsed ? PADDING_VERTICAL_COLLAPSED_PX : PADDING_VERTICAL_EXPANDED_PX,
          paddingBottom: collapsed
            ? PADDING_VERTICAL_COLLAPSED_PX
            : PADDING_VERTICAL_EXPANDED_PX,
        }}
        transition={layoutTransition}
      >
        <Flex
          flexDirection="column"
          justifyContent={collapsed ? "center" : "flex-start"}
          flex="1"
          gap={collapsed ? 2 : 4}
          minWidth={0}
          minHeight={0}
        >
          {collapsed ? (
            <Flex alignItems="center" gap={2} flexWrap="nowrap">
              <motion.div
                initial={false}
                animate={{
                  fontSize: `${TITLE_FONT_COLLAPSED_PX}px`,
                  lineHeight: `${TITLE_LINE_COLLAPSED_PX}px`,
                }}
                transition={layoutTransition}
                style={{ ...titleMotionStyles, alignSelf: "center" }}
              >
                {domain.domainName}
              </motion.div>
              <Chip
                label={getStatusLabel(domain.domainStatus)}
                status={getChipStatus(domain.domainStatus)}
                usage="badge"
              />
            </Flex>
          ) : (
            <>
              <ActionList.PopOver
                position="bottom-left"
                onRequestOpen={() => setSwitcherOpen(true)}
                onRequestClose={() => setSwitcherOpen(false)}
                renderTrigger={({ toggleActionListOpen, isOpen }) => (
                  <Box
                    id="appshell-domain-switcher-trigger"
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
                      <motion.div
                        initial={false}
                        animate={{
                          fontSize: `${TITLE_FONT_EXPANDED_PX}px`,
                          lineHeight: `${TITLE_LINE_EXPANDED_PX}px`,
                        }}
                        transition={layoutTransition}
                        style={{ ...titleMotionStyles, minWidth: 0 }}
                      >
                        {domain.domainName}
                      </motion.div>
                      <ChevronLargeDown
                        aria-hidden
                        css={{
                          width: 22,
                          height: 22,
                          color: fg,
                          flexShrink: 0,
                          transform: isOpen ? "rotate(180deg)" : undefined,
                          transition: prefersReducedMotion
                            ? "none"
                            : "transform 0.2s ease",
                        }}
                      />
                    </Flex>
                  </Box>
                )}
              >
                {({ onRequestClose }) => (
                  <Flex
                    id="appshell-domain-switcher-menu"
                    as="ul"
                    flexDirection="column"
                    mx={0}
                    my={0}
                    px={0}
                    py={2}
                    bg="white"
                    sx={{
                      listStyle: "none",
                      minWidth: "min(320px, 92vw)",
                      maxHeight: 320,
                      overflowY: "auto",
                    }}
                  >
                    {allDomains.length === 0 ? (
                      <Box px={4} py={2}>
                        <Text.Body fontSize={3} color="gray.300">
                          No domains found
                        </Text.Body>
                      </Box>
                    ) : (
                      allDomains.map((d) => {
                        const isCurrent = d.domainName === domain.domainName;
                        return (
                          <ActionList.Item
                            key={d.domainName}
                            onClick={() => goToDomain(d.domainName, onRequestClose)}
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
                )}
              </ActionList.PopOver>
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
            </>
          )}
        </Flex>

        <motion.div
          initial={false}
          animate={{
            opacity: collapsed ? 0 : 1,
            maxWidth: collapsed ? 0 : PREVIEW_MAX_W,
            maxHeight: collapsed ? 0 : PREVIEW_H,
          }}
          transition={layoutTransition}
          style={{
            position: "absolute",
            top: 33,
            right: 33,
            overflow: "hidden",
            flexShrink: 0,
            pointerEvents: collapsed ? "none" : undefined,
            minHeight: collapsed ? 0 : undefined,
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
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
