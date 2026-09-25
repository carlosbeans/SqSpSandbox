import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Text } from "@sqs/rosetta-primitives";
import { Image, TextLink } from "@sqs/rosetta-elements";
import { IconButton } from "@sqs/rosetta-react";
import { useTheme } from "@sqs/rosetta-styled";
import { Edit, ExternalLink } from "@sqs/rosetta-icons";
import { loadJsonData } from "../../utils/dataUtils.ts";
import { SidePanelDomainContext } from "../../layouts/SidePanelDomainContext";
import { SLIDE_FORWARD } from "../../constants/motion";
import BackgroundImageDialog from "../BackgroundImageDialog/BackgroundImageDialog";
import ConnectedProducts from "../ConnectedProducts/ConnectedProducts";

/**
 * Domain Overview header — Redesign 2026.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1670-82994
 */
const THUMBNAIL_W_PX = 375;
const THUMBNAIL_H_PX = 260;

function getStatusLabel(status) {
  const s = (status || "").toLowerCase();
  if (s === "active") return "Active";
  if (s === "transfer-in-progress") return "Transfer in progress";
  if (s === "transfer-canceled") return "Transfer canceled";
  if (s === "pending-renewal") return "Pending renewal";
  if (s === "pending") return "Pending";
  return status || "Unknown";
}

function getStatusDotColor(status, colors) {
  const s = (status || "").toLowerCase();
  if (s === "active") return colors.fg.success;
  if (s === "transfer-in-progress" || s === "pending-renewal")
    return colors.fg.warning;
  if (s === "transfer-canceled") return colors.fg.danger;
  return colors.gray[400];
}

function formatExpirationDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function emptyRecord(decodedName) {
  return {
    domainName: decodedName,
    domainStatus: "pending",
    domainProvider: "",
    thumbnailImage: "",
    connectedPayments: [],
  };
}

export default function DomainOverviewHeader() {
  const { effectiveDomainId } = React.useContext(SidePanelDomainContext);
  const { colors } = useTheme();
  const navigate = useNavigate();

  const [domain, setDomain] = React.useState(null);
  const [isBackgroundDialogOpen, setIsBackgroundDialogOpen] = React.useState(false);

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

  const formattedExpiration = formatExpirationDate(domain.expirationDate);

  return (
    <Flex>
      <Box
        as="header"
        id="domain-overview-header"
        p={6}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: 6,
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: colors?.white ?? "#ffffff",
        }}
      >
        <Flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          minWidth={0}
          gap={4}
        >
          <Flex alignItems="center" gap={1}>
            <Box
              flexShrink={0}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: getStatusDotColor(domain.domainStatus, colors),
              }}
            />
            <Text.Body
              m={0}
              css={{ fontSize: "14px", lineHeight: "22px" }}
              color="gray.300"
            >
              {getStatusLabel(domain.domainStatus)}
            </Text.Body>
          </Flex>

          <Box>
            <Text.Subtitle
              as="h1"
              m={0}
              css={{
                fontSize: "40px",
                lineHeight: "44px",
                letterSpacing: "-0.08px",
                color: colors?.gray?.[100] ?? "#0e0e0e",
                wordBreak: "break-word",
              }}
            >
              {domain.domainName}
            </Text.Subtitle>
          </Box>

          <Flex alignItems="center" gap={1} flexWrap="wrap" width="100%">
            <Text.Body
              m={0}
              color="gray.300"
              css={{ fontSize: "14px", lineHeight: "22px" }}
            >
              Provider: {domain.domainProvider || "—"}
            </Text.Body>
            {formattedExpiration && (
              <>
                <Text.Body m={0} color="gray.300" css={{ fontSize: "14px", lineHeight: "22px" }}>
                  {" | "}Auto-renews on {formattedExpiration}
                </Text.Body>
                <TextLink
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(
                      `/domains/${encodeURIComponent(effectiveDomainId)}/registration`,
                      { state: { slideDirection: SLIDE_FORWARD } },
                    );
                  }}
                >
                  <Text.Caption>Manage</Text.Caption>
                </TextLink>
                <Text.Body m={0} color="gray.300" css={{ fontSize: "14px", lineHeight: "22px" }}>
                  {" | "}
                </Text.Body>
                <TextLink
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(
                      `/domains/${encodeURIComponent(effectiveDomainId)}/registration`,
                      { state: { slideDirection: SLIDE_FORWARD } },
                    );
                  }}
                >
                  <Text.Caption>Add years</Text.Caption>
                </TextLink>
              </>
            )}
          </Flex>

          <ConnectedProducts connectedPayments={domain.connectedPayments} />
        </Flex>

        <Box
          flexShrink={0}
          width={THUMBNAIL_W_PX}
          height={THUMBNAIL_H_PX}
          overflow="hidden"
          position="relative"
          sx={{ borderRadius: 2, backgroundColor: colors?.gray?.[900] ?? "#f5f5f5" }}
          aria-hidden={!domain.thumbnailImage}
        >
          {domain.thumbnailImage ? (
            <>
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
              <Flex
                gap={1}
                sx={{
                  position: "absolute",
                  bottom: 3,
                  right: 3,
                }}
              >
                <IconButton.Alt
                  icon={Edit}
                  label="Edit background image"
                  onClick={() => setIsBackgroundDialogOpen(true)}
                  sx={{
                    backgroundColor: "white",
                    boxShadow:
                      "0px 0px 0.5px rgba(0,0,0,0.08), 0px 6px 12px rgba(0,0,0,0.12)",
                  }}
                />
                <IconButton.Alt
                  icon={ExternalLink}
                  label="Open website"
                  sx={{
                    backgroundColor: "white",
                    boxShadow:
                      "0px 0px 0.5px rgba(0,0,0,0.08), 0px 6px 12px rgba(0,0,0,0.12)",
                  }}
                />
              </Flex>
            </>
          ) : null}
        </Box>
      </Box>

      <BackgroundImageDialog
        isOpen={isBackgroundDialogOpen}
        currentImage={domain.thumbnailImage}
        onSelect={(next) =>
          setDomain((prev) => (prev ? { ...prev, thumbnailImage: next } : prev))
        }
        onRequestClose={() => setIsBackgroundDialogOpen(false)}
      />
    </Flex>
  );
}
