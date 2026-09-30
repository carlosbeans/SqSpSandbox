import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex } from "@sqs/rosetta-primitives";
import { Stack, TextLink, Toggle } from "@sqs/rosetta-elements";
import { BackButton, Divider, Reveal } from "@sqs/rosetta-react";
import { Button } from "@sqs/rosetta-react/button/next";
import { Text } from "@sqs/rosetta-react/text/next";
import { useTheme } from "@sqs/rosetta-styled";
import { ExclamationMarkCircle } from "@sqs/rosetta-icons";
import { loadJsonData } from "../utils/dataUtils.ts";
import { SLIDE_BACK } from "../constants/motion";

/**
 * WHOIS Privacy Management — standalone page for domains with the Security
 * Add-on, reached from the WHOIS Privacy card's "Manage" link on the
 * Security tab.
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1318-99122
 */
const RECORD_LABEL_WIDTH = 159;

function RecordRow({ label, value, isFirst }) {
  return (
    <Box>
      {!isFirst && <Divider />}
      <Flex gap={4} py={3}>
        <Box sx={{ width: RECORD_LABEL_WIDTH, flexShrink: 0 }}>
          <Text.Body.Small sx={{ color: "gray.400" }}>
            {label}
          </Text.Body.Small>
        </Box>
        <Text.Body.Small sx={{ color: "fg.default" }}>{value}</Text.Body.Small>
      </Flex>
    </Box>
  );
}

export default function WhoisPrivacy() {
  const { radii } = useTheme();
  const { domainId } = useParams();
  const navigate = useNavigate();
  const [domain, setDomain] = React.useState(null);
  const [privacyEnabled, setPrivacyEnabled] = React.useState(true);
  const [isRecordOpen, setIsRecordOpen] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    async function fetchDomain() {
      const response = await loadJsonData("domains");
      if (cancelled) return;
      const all = response.data?.domains || [];
      const decodedId = domainId ? decodeURIComponent(domainId) : "";
      const found = all.find((d) => d.domainName === decodedId) || null;
      setDomain(found);
      setPrivacyEnabled(Boolean(found?.securityProtections?.whoisPrivacy));
    }
    fetchDomain();
    return () => {
      cancelled = true;
    };
  }, [domainId]);

  const handleBack = React.useCallback(() => {
    navigate(`/domains/${encodeURIComponent(domainId)}/settings?tab=security`, {
      state: { slideDirection: SLIDE_BACK },
    });
  }, [domainId, navigate]);

  const whoisRecord = domain?.whoisRecord;

  return (
    <Stack space={6} px={6} pt={6} pb={6} id="whois-privacy-page">
      <BackButton label="Back" onClick={handleBack} />

      <Stack space={2}>
        <Text.Heading.Large as="h1" m={0}>
          WHOIS privacy
        </Text.Heading.Large>
        <Text.Body sx={{ color: "gray.500" }}>
          Hides your name and contact details from the public WHOIS
          directory, so your personal information stays private.
        </Text.Body>
      </Stack>

      <Box
        id="whois-privacy-protection"
        sx={{
          border: "1px solid",
          borderColor: "border.default",
          borderRadius: radii[2],
        }}
        p={4}
      >
        <Stack space={4}>
          <Flex alignItems="center" justifyContent="space-between" gap={2}>
            <Text.Heading.Small as="h2" m={0}>
              Privacy protection
            </Text.Heading.Small>
            <Toggle
              checked={privacyEnabled}
              onChange={setPrivacyEnabled}
              aria-label="Privacy protection"
            />
          </Flex>
          {!privacyEnabled && (
            <Flex gap={2} alignItems="flex-start">
              <ExclamationMarkCircle
                sx={{ color: "fg.warning", flexShrink: 0, mt: "2px" }}
              />
              <Text.Body.Small sx={{ color: "fg.warning" }}>
                By turning off domain privacy, you're consenting to your
                domain registration information being shared with the TLD
                registry, which may make your personal data public.{" "}
                <TextLink
                  href="https://support.squarespace.com/hc/articles/205812438"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more
                </TextLink>
              </Text.Body.Small>
            </Flex>
          )}
        </Stack>
      </Box>

      {whoisRecord && (
        <Box
          id="whois-privacy-record"
          sx={{
            border: "1px solid",
            borderColor: "border.default",
            borderRadius: radii[2],
          }}
          p={4}
        >
          <Stack space={2}>
            <Text.Eyebrow sx={{ color: "gray.400" }}>
              WHOIS RECORD
            </Text.Eyebrow>
            <Box>
              <RecordRow
                isFirst
                label="Registrant"
                value={whoisRecord.registrant}
              />
              <RecordRow label="Email" value={whoisRecord.email} />
              <RecordRow label="Register" value={whoisRecord.register} />
              <RecordRow label="Expires" value={whoisRecord.expires} />
              <RecordRow label="Status" value={whoisRecord.status} />
              <RecordRow
                label="Name servers"
                value={whoisRecord.nameServers?.join(", ")}
              />
            </Box>
            <Reveal
              trigger={
                <Reveal.Trigger
                  isOpen={isRecordOpen}
                  onToggle={() => setIsRecordOpen((prev) => !prev)}
                >
                  View full WHOIS record
                </Reveal.Trigger>
              }
              body={
                <Reveal.Body isOpen={isRecordOpen}>
                  <Box
                    pt={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <Text.Monospace sx={{ color: "gray.400" }}>
                      Registrant: {whoisRecord.registrant}
                    </Text.Monospace>
                    <Text.Monospace sx={{ color: "gray.400" }}>
                      Email: {whoisRecord.email}
                    </Text.Monospace>
                    <Text.Monospace sx={{ color: "gray.400" }}>
                      Register: {whoisRecord.register}
                    </Text.Monospace>
                    <Text.Monospace sx={{ color: "gray.400" }}>
                      Expires: {whoisRecord.expires}
                    </Text.Monospace>
                    <Text.Monospace sx={{ color: "gray.400" }}>
                      Status: {whoisRecord.status}
                    </Text.Monospace>
                    <Text.Monospace sx={{ color: "gray.400" }}>
                      Name servers: {whoisRecord.nameServers?.join(", ")}
                    </Text.Monospace>
                  </Box>
                </Reveal.Body>
              }
            />
          </Stack>
        </Box>
      )}

      <Flex gap={2} justifyContent="flex-end">
        <Button size="large" onClick={handleBack}>
          Cancel
        </Button>
        <Button.Strong size="large" onClick={handleBack}>
          Save
        </Button.Strong>
      </Flex>
    </Stack>
  );
}
