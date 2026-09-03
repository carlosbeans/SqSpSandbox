import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Tabs } from "@sqs/rosetta-elements";
import { Flex, Box } from "@sqs/rosetta-primitives";
import { usePageHeader } from "../layouts/PageHeaderContext";
import { ActivityContent } from "./Activity";
import { BillingContent } from "./Billing";
import { DNSSettingsContent } from "./DNS_Settings";
import { PermissionsContent } from "./Permissions";
import { SecurityContent } from "./Security";

const TAB_KEYS = ["dns", "security", "activity", "permissions", "billing"];

const TAB_LABELS = {
  dns: "DNS",
  security: "Security",
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
      return <DNSSettingsContent inlineHeader />;
    case "security":
      return <SecurityContent inlineHeader />;
    case "activity":
      return <ActivityContent inlineHeader />;
    case "permissions":
      return <PermissionsContent inlineHeader />;
    case "billing":
      return <BillingContent inlineHeader />;
    default:
      return null;
  }
}

export default function DomainSettings() {
  usePageHeader({ title: "Domain Settings" });

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab = TAB_KEYS.includes(tabParam) ? tabParam : "dns";
  const reduceMotion = useReducedMotion();

  const handleTabChange = React.useCallback(
    (value) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("tab", value);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const panelTransition = React.useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] },
    [reduceMotion]
  );

  return (
    <Box as="main" id="domain-settings-page-main" px={6} pb={8} sx={{ width: "100%" }}>
      <Flex flexDirection="column" gap={4}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
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
      </Flex>
    </Box>
  );
}
