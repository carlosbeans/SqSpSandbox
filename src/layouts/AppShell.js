import * as React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { Flex, Box } from "@sqs/rosetta-primitives";
import { PageHeader } from "@sqs/rosetta-compositions";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SidePanelNav from "../components/SidePanelNav/SidePanelNav";
import DomainInfoHeader from "../components/DomainInfoHeader/DomainInfoHeader";
import { SidePanelDomainContext } from "./SidePanelDomainContext";
import { PageHeaderProvider, usePageHeaderConfig } from "./PageHeaderContext";

const STORAGE_KEY = "sqspSandbox:lastDomainId";

function domainIdFromPathname(pathname) {
  const m = pathname.match(/^\/domains\/([^/]+)/);
  return m ? m[1] : undefined;
}

function useStoredDomainId() {
  const { pathname } = useLocation();
  const domainIdFromUrl = domainIdFromPathname(pathname);

  const [storedId, setStoredId] = React.useState(() => {
    if (typeof window === "undefined") return "";
    return window.sessionStorage.getItem(STORAGE_KEY) || "";
  });

  React.useEffect(() => {
    if (domainIdFromUrl) {
      sessionStorage.setItem(STORAGE_KEY, domainIdFromUrl);
      setStoredId(domainIdFromUrl);
    }
  }, [domainIdFromUrl]);

  const effectiveDomainId = domainIdFromUrl || storedId || undefined;

  return { effectiveDomainId };
}

function ShellPageHeader() {
  const config = usePageHeaderConfig();
  if (!config) return null;

  return (
    <Box id="appBodyHeader">
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title title={config.title} subtitle={config.subtitle} />
          {config.actions && (
            <PageHeader.Actions>{config.actions}</PageHeader.Actions>
          )}
        </PageHeader.Body>
      </PageHeader>
    </Box>
  );
}

const contentVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function AppShell() {
  const { effectiveDomainId } = useStoredDomainId();
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();
  const contentTransition = React.useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
    [reduceMotion],
  );

  return (
    <SidePanelDomainContext.Provider value={{ effectiveDomainId }}>
      <PageHeaderProvider>
        <Flex direction="row">
          <SidePanelNav />
          <Box sx={{ width: "100%" }} id="contentPanel">
            <DomainInfoHeader />
            <ShellPageHeader />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${location.pathname}${location.search}`}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={contentTransition}
                style={{ width: "100%" }}
              >
                {outlet}
              </motion.div>
            </AnimatePresence>
          </Box>
        </Flex>
      </PageHeaderProvider>
    </SidePanelDomainContext.Provider>
  );
}
