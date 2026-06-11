import * as React from "react";
import { Box, Flex, Text } from "@sqs/rosetta-primitives";
import { Chip, Image } from "@sqs/rosetta-elements";
import { useTheme } from "@sqs/rosetta-styled";
import { loadJsonData } from "../../utils/dataUtils.ts";
import { SidePanelDomainContext } from "../../layouts/SidePanelDomainContext";

/**
 * Domain Overview header — Redesign 2026.
 * @see https://www.figma.com/design/fQCQuaAESVa9K4JXL3O7dB/Domain-Overview-%E2%80%94-Redesign-2026?node-id=2807-8043
 */
const THUMBNAIL_W_PX = 191;
const THUMBNAIL_H_PX = 110;

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

export default function DomainOverviewHeader() {
  const { effectiveDomainId } = React.useContext(SidePanelDomainContext);
  const { colors } = useTheme();

  const [domain, setDomain] = React.useState(null);

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
      const rawList = res.data?.domains;
      const list = Array.isArray(rawList) ? rawList : [];
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

  if (!effectiveDomainId || !domain) {
    return null;
  }

  return (
    <Flex px={6} pt={6}>
      <Box
        as="header"
        id="domain-overview-header"
        p={6}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          width: "100%",
          boxSizing: "border-box",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: colors?.gray?.[800] ?? "#e7e7e7",
          backgroundColor: colors?.white ?? "#ffffff",
        }}
      >
        <Box
          flexShrink={0}
          width={THUMBNAIL_W_PX}
          height={THUMBNAIL_H_PX}
          overflow="hidden"
          position="relative"
          aria-hidden={!domain.thumbnailImage}
        >
          {domain.thumbnailImage ? (
            <Image
              src={domain.thumbnailImage}
              alt=""
              width={THUMBNAIL_W_PX}
              height={THUMBNAIL_H_PX}
              sx={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : null}
        </Box>

        <Flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          minWidth={0}
          gap={0}
        >
          <Flex alignItems="center" gap={1} width="100%" flexWrap="nowrap">
            <Box py={1}>
              <Text.Subtitle
                m={0}
                css={{
                  fontSize: "22px",
                  lineHeight: "28px",
                  color: colors?.gray?.[100] ?? "#0e0e0e",
                  wordBreak: "break-word",
                }}
              >
                {domain.domainName}
              </Text.Subtitle>
            </Box>
            <Box flexShrink={0}>
              <Chip
                label={getStatusLabel(domain.domainStatus)}
                status={getChipStatus(domain.domainStatus)}
                usage="badge"
              />
            </Box>
          </Flex>

          <Text.Body
            m={0}
            fontWeight="medium"
            fontSize={3}
            color="gray.300"
            css={{ lineHeight: "22px" }}
          >
            Provider: {domain.domainProvider || "—"}
          </Text.Body>
        </Flex>
      </Box>
    </Flex>
  );
}
