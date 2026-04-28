import * as React from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { Box, Flex, Text } from "@sqs/rosetta-primitives";
import { Chip } from "@sqs/rosetta-elements";
import { useTheme } from "@sqs/rosetta-styled";
import { radii } from "@sqs/rosetta-tokens";
import { loadJsonData } from "../../utils/dataUtils.ts";
import { SidePanelDomainContext } from "../../layouts/SidePanelDomainContext";

/** Default preview a bit smaller; width/height preserve aspect ratio vs 352×256. */
const PREVIEW_MAX_W = 296;
const PREVIEW_H = Math.round((PREVIEW_MAX_W * 256) / 352);

/** Collapsed domain title: scaled down BY 30% (i.e. 70% of expanded size). */
const TITLE_FONT_EXPANDED_PX = 20;
const TITLE_LINE_EXPANDED_PX = 22;
const TITLE_SCALE_COLLAPSED = 1 - 0.3;
const TITLE_FONT_COLLAPSED_PX =
  TITLE_FONT_EXPANDED_PX * TITLE_SCALE_COLLAPSED;
const TITLE_LINE_COLLAPSED_PX =
  TITLE_LINE_EXPANDED_PX * TITLE_SCALE_COLLAPSED;

/** Edge insets — expanded roomy; collapsed compact toolbar (~Figma density). */
const PADDING_LEFT_PX = 33;
const PADDING_VERTICAL_EXPANDED_PX = 33;
/** 8px = space-1 per project grid — tight strip when scrolled. */
const PADDING_VERTICAL_COLLAPSED_PX = 33;

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

export default function DomainInfoHeader() {
  const { effectiveDomainId } = React.useContext(SidePanelDomainContext);
  const { colors } = useTheme();

  const [domain, setDomain] = React.useState(null);
  const [collapsed, setCollapsed] = React.useState(false);

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
    let cancelled = false;
    async function load() {
      if (!effectiveDomainId) {
        setDomain(null);
        return;
      }
      const decoded = decodeURIComponent(effectiveDomainId);
      setDomain(emptyRecord(decoded));
      const res = await loadJsonData("domains");
      if (cancelled) return;
      if (res.error || !res.data?.domains) {
        setDomain(emptyRecord(decoded));
        return;
      }
      const found =
        res.data.domains.find((d) => d.domainName === decoded) || null;
      setDomain(found || emptyRecord(decoded));
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [effectiveDomainId]);

  if (!effectiveDomainId || !domain) {
    return null;
  }

  const insetBg = colors?.gray?.[950] ?? "#f9f9f9";
  const muted = colors?.gray?.[300] ?? "#666666";

  return (
    <motion.header
      id="appshell-domain-info-header"
      initial={false}
      transition={layoutTransition}
      style={{
        position: "sticky",
        top: 77,
        zIndex: 3,
        overflow: "hidden",
        marginBottom: 24,
        backgroundColor: insetBg,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: colors?.gray?.[800] ?? "rgba(0,0,0,0.06)",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          boxSizing: "border-box",
          paddingLeft: `${PADDING_LEFT_PX}px`,
          paddingRight: 48,
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
          gap={8}
          alignItems="center"
          justifyContent="flex-start"
          width="100%"
          minWidth={0}
          flexWrap="nowrap"
        >
          <motion.div
            initial={false}
            animate={{
              opacity: collapsed ? 0 : 1,
              maxWidth: collapsed ? 0 : PREVIEW_MAX_W,
              maxHeight: collapsed ? 0 : PREVIEW_H,
            }}
            transition={layoutTransition}
            style={{
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
                borderRadius: radii[2],
                backgroundColor: "#fff",
                boxShadow:
                  "0 1px 2px rgba(14,14,14,0.06), 0 0 0 1px rgba(14,14,14,0.04)",
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
                  }}
                />
              ) : (
                <Box width="100%" height="100%" backgroundColor="gray.800" />
              )}
            </Box>
          </motion.div>

          <Flex
            flexDirection={collapsed ? "row" : "column"}
            gap={collapsed ? 2 : 2}
            alignItems={collapsed ? "center" : "flex-start"}
            justifyContent={collapsed ? "flex-start" : "center"}
            flex="1"
            minWidth={0}
            minHeight={0}
          >
            <motion.div
              initial={false}
              animate={{
                fontSize: `${collapsed ? TITLE_FONT_COLLAPSED_PX : TITLE_FONT_EXPANDED_PX}px`,
                lineHeight: `${collapsed ? TITLE_LINE_COLLAPSED_PX : TITLE_LINE_EXPANDED_PX}px`,
              }}
              transition={layoutTransition}
              style={{
                fontWeight: 500,
                letterSpacing: "-0.04px",
                color:
                  typeof colors?.gray?.[100] === "string"
                    ? colors.gray[100]
                    : "#0e0e0e",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: collapsed ? "nowrap" : "normal",
                alignSelf: collapsed ? "center" : "flex-start",
              }}
            >
              {domain.domainName}
            </motion.div>

            <Flex alignItems="center" gap={2} flexWrap={collapsed ? "nowrap" : "wrap"} minWidth={0}>
              <Box flexShrink={0}>
                <Chip
                  label={getStatusLabel(domain.domainStatus)}
                  status={getChipStatus(domain.domainStatus)}
                  usage="badge"
                />
              </Box>
              <motion.div
                initial={false}
                animate={{ opacity: collapsed ? 0 : 1 }}
                transition={layoutTransition}
                style={{
                  maxHeight: collapsed ? 0 : 40,
                  overflow: "hidden",
                  pointerEvents: collapsed ? "none" : undefined,
                }}
              >
                <Text.Body m={0} color="gray.300" css={{ color: muted }}>
                  Provider: {domain.domainProvider || "—"}
                </Text.Body>
              </motion.div>
            </Flex>
          </Flex>
        </Flex>
      </motion.div>
    </motion.header>
  );
}
