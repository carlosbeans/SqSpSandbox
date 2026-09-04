import * as React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { Flex, Box } from "@sqs/rosetta-primitives";
import { PageHeader } from "@sqs/rosetta-compositions";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SidePanelNav from "../components/SidePanelNav/SidePanelNav";
import { SidePanelDomainContext } from "./SidePanelDomainContext";
import { PageHeaderProvider, usePageHeaderConfig } from "./PageHeaderContext";
import { shellVariants } from "../constants/motion";

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

export default function AppShell() {
  const { effectiveDomainId } = useStoredDomainId();
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();
  // Opt-in per-navigation: pass `state: { slideDirection: SLIDE_FORWARD }`
  // to `navigate()` for a Rosetta-style horizontal slide instead of the
  // default fade. `custom` is forwarded to the exiting page too, so both
  // sides of the transition agree on direction and motion preference.
  const motionCustom = React.useMemo(
    () => ({ direction: location.state?.slideDirection, reduceMotion }),
    [location.state, reduceMotion],
  );

  return (
    <SidePanelDomainContext.Provider value={{ effectiveDomainId }}>
      <PageHeaderProvider>
        <Flex direction="row">
          <SidePanelNav />
          <Box sx={{ width: "100%" }} id="contentPanel" pb={6}>
            <ShellPageHeader />
            <AnimatePresence mode="wait" initial={false} custom={motionCustom}>
              <motion.div
                key={location.pathname}
                custom={motionCustom}
                variants={shellVariants}
                initial="initial"
                animate="animate"
                exit="exit"
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
