import React, { useState } from "react";
import { Stack, Card, TextLink, TextField, Chip, Checkbox } from "@sqs/rosetta-elements";
import { Text, Button, Flex, Box } from "@sqs/rosetta-primitives";
import { Table, Drawer, ActionList } from "@sqs/rosetta-compositions";
import { InfoCircle, Trash, Search } from "@sqs/rosetta-icons";
import { useTheme } from "@sqs/rosetta-styled";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { usePageHeader } from "../layouts/PageHeaderContext";
import DNSPresetCard from "../components/DNSPresetCard/DNSPresetCard";

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

const defaultRecords = [
  {
    host: "@",
    type: "A",
    priority: "N/A",
    ttl: "4 hrs",
    data: "198.185.159.144",
  },
  {
    host: "@",
    type: "CNAME",
    priority: "N/A",
    ttl: "4 hrs",
    data: "ext-sq.squarespace.com",
  },
];

const customRecords = [
  {
    host: "www",
    type: "CNAME",
    priority: "N/A",
    ttl: "4 hrs",
    data: "ext-sq.squarespace.com",
  },
];

const FILTER_TYPES = ["Hosting", "Email", "Verification"];

const DNS_PRESETS = [
  { title: "Defaults", description: "Standard Squarespace DNS records", type: "Hosting" },
  { title: "Domain Connect", description: "Auto-configure supported services", type: "Hosting" },
  { title: "Email Campaigns", description: "Squarespace email marketing records", type: "Email" },
  { title: "Google Workspace", description: "Gmail and Google apps for your domain", type: "Email" },
  { title: "Zoho Mail", description: "Zoho email hosting records", type: "Email" },
  { title: "Fastmail", description: "Fastmail email service records", type: "Email" },
  { title: "Proton Mail", description: "Proton Mail encrypted email records", type: "Email" },
  { title: "Titan Mail", description: "Titan email hosting records", type: "Email" },
  { title: "Neo Mail", description: "Neo email service records", type: "Email" },
  { title: "iCloud Mail", description: "Apple iCloud custom domain email", type: "Email" },
  { title: "Microsoft 365", description: "Outlook and Microsoft apps records", type: "Email" },
  { title: "Webflow", description: "Connect your domain to Webflow", type: "Hosting" },
  { title: "Vercel", description: "Connect your domain to Vercel", type: "Hosting" },
  { title: "GitHub Pages", description: "Host a site with GitHub Pages", type: "Hosting" },
  { title: "Framer", description: "Connect your domain to Framer", type: "Hosting" },
  { title: "Netlify", description: "Connect your domain to Netlify", type: "Hosting" },
  { title: "Railway", description: "Connect your domain to Railway", type: "Hosting" },
  { title: "Lovable", description: "Connect your domain to Lovable", type: "Hosting" },
  { title: "GitHub Domain Verification", description: "Verify domain ownership on GitHub", type: "Verification" },
  { title: "Google Workspace Verification", description: "Verify domain ownership for Google", type: "Verification" },
];

function DNSTable({ records }) {
  return (
    <Table columns={columns} data={records}>
      <Table.List>
        <Table.List.Head />
        <Table.List.Body />
      </Table.List>
    </Table>
  );
}

export function DNSSettingsContent() {
  const { radii, borders, colors } = useTheme();
  const [isPresetDrawerOpen, setIsPresetDrawerOpen] = useState(false);
  const [selectedPresets, setSelectedPresets] = useState(new Set());
  const [activeFilters, setActiveFilters] = useState(new Set());

  const togglePreset = (title) => {
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

  const filteredPresets = activeFilters.size === 0
    ? DNS_PRESETS
    : DNS_PRESETS.filter((p) => activeFilters.has(p.type));

  const hasSelection = selectedPresets.size > 0;
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
        <Button.Primary size="medium" onClick={() => setIsPresetDrawerOpen(true)}>
          Add Preset
        </Button.Primary>
      </Flex>
      <Card sx={{ borderRadius: radii[1] }}>
        <Card.Body>
          <Stack space={3}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text.Subtitle px={2}>Squarespace Defaults</Text.Subtitle>

              <Box
                as="button"
                aria-label="Delete defaults"
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
                <Trash css={{ width: 20, height: 20 }} />
              </Box>
            </Flex>
            <DNSTable records={defaultRecords} />
          </Stack>
        </Card.Body>
      </Card>

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

      {isPresetDrawerOpen && (
        <Drawer.Modal
          isOpen={isPresetDrawerOpen}
          onClose={() => setIsPresetDrawerOpen(false)}
        >
          <Drawer.Overlay />
          <Drawer.Transition>
            <Drawer.Sheet>
              <Drawer.Header>
                <Drawer.Header.TitleRow>
                  <Drawer.Header.Title>Add DNS Preset</Drawer.Header.Title>
                  <Drawer.CloseButton onClick={() => setIsPresetDrawerOpen(false)} />
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
                  <Box css={{ width: 400 }}>
                    <TextField
                      interiorPre={
                        <Search css={{ width: 16, height: 16, color: "gray.300" }} />
                      }
                      inputProps={{ placeholder: "Search for a preset" }}
                      appearance="cell"
                    />
                  </Box>
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
                      state={selectedPresets.has(preset.title) ? "selected" : "default"}
                      onClick={() => togglePreset(preset.title)}
                    />
                  ))}
                </Box>
              </Drawer.Body>
              <Drawer.Footer>
                <Button.Secondary size="small" onClick={() => setIsPresetDrawerOpen(false)}>
                  Cancel
                </Button.Secondary>
                <Button.Primary size="small" disabled={!hasSelection}>Add</Button.Primary>
              </Drawer.Footer>
            </Drawer.Sheet>
          </Drawer.Transition>
        </Drawer.Modal>
      )}
    </Flex>
  );
}

export default function DNS_Settings() {
  usePageHeader({
    title: "DNS Settings",
    subtitle:
      "DNS records point to services your domain uses, like forwarding your domain or setting up an email service. Learn more about DNS settings",   
  });

  return <DNSSettingsContent />;
}
