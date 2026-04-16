import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Flex, Box } from "@sqs/rosetta-primitives";
import { Stack } from "@sqs/rosetta-elements";
import { PageHeader } from "@sqs/rosetta-compositions";
import SidePanelNav from "../components/SidePanelNav/SidePanelNav";
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
    <PageHeader>
      <PageHeader.Body>
        <PageHeader.Title title={config.title} subtitle={config.subtitle} />
        {config.actions && (
          <PageHeader.Actions>{config.actions}</PageHeader.Actions>
        )}
      </PageHeader.Body>
    </PageHeader>
  );
}

export default function SidePanelShell() {
  const { effectiveDomainId } = useStoredDomainId();

  return (
    <SidePanelDomainContext.Provider value={{ effectiveDomainId }}>
      <PageHeaderProvider>
        <Flex direction="row">
          <SidePanelNav />
          <Box sx={{ width: "100%" }}>
            
              <ShellPageHeader />
              <Stack px={6}>
              <Outlet />
            </Stack>
          </Box>
        </Flex>
      </PageHeaderProvider>
    </SidePanelDomainContext.Provider>
  );
}
