import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Tabs } from "@sqs/rosetta-elements";
import { Flex, Box } from "@sqs/rosetta-primitives";
import { Stack } from "@sqs/rosetta-elements";
import { usePageHeader } from "../layouts/PageHeaderContext";
import { ActivityContent } from "./Activity";
import { BillingContent } from "./Billing";
import { NameserversContent } from "./DomainNameservers";
import { NameserverRegistrationContent } from "./NameserverRegistration";
import { DNSSECContent } from "./DNSSEC";
import { DNSSettingsContent } from "./DNS_Settings";
import { PermissionsContent } from "./Permissions";

const TAB_KEYS = ["dns", "activity", "permissions", "billing"];

const TAB_LABELS = {
  dns: "DNS",
  activity: "Activity",
  permissions: "Permissions",
  billing: "Billing",
};

const panelVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function DomainSettingsTabPanel({ tab }) {
  switch (tab) {
    case "dns":
      return (
        <Stack space={6} sx={{ width: "100%" }} id="domain-settings-dns-tab-stack">
          <DNSSettingsContent inlineHeader />
          <DNSSECContent inlineHeader />
          <NameserversContent inlineHeader />
          <NameserverRegistrationContent inlineHeader />
        </Stack>
      );
    case "activity":
      return <ActivityContent />;
    case "permissions":
      return <PermissionsContent inlineHeader />;
    case "billing":
      return <BillingContent inlineHeader />;
    default:
      return null;
  }
}

export default function DomainSettings() {
  usePageHeader({
    title: "Domain Settings",
    subtitle: "DNS, activity, permissions, and billing for this domain.",
  });

  const [activeTab, setActiveTab] = React.useState("dns");
  const reduceMotion = useReducedMotion();

  const panelTransition = React.useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] },
    [reduceMotion]
  );

  return (
    <Box as="main" id="domain-settings-page-main" px={6} pb={8} sx={{ width: "100%" }}>
      <Stack space={4}>
        <Tabs
          value={activeTab}
          onChange={(val) => setActiveTab(val)}
          options={TAB_KEYS.map((value) => ({
            value,
            label: TAB_LABELS[value],
          }))}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={panelTransition}
            style={{ width: "100%" }}
          >
            <Flex flexDirection="column" gap={4} id={`domain-settings-panel-${activeTab}`}>
              <DomainSettingsTabPanel tab={activeTab} />
            </Flex>
          </motion.div>
        </AnimatePresence>
      </Stack>
    </Box>
  );
}
