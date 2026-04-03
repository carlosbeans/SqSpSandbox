import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Grid } from "@sqs/rosetta-elements";
import SidePanelNav from "../components/SidePanelNav/SidePanelNav";
import { SidePanelDomainContext } from "./SidePanelDomainContext";

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

export default function SidePanelShell() {
  const { effectiveDomainId } = useStoredDomainId();

  return (
    <SidePanelDomainContext.Provider value={{ effectiveDomainId }}>
      <div className="container full-width">
        <Grid.Container gridConstraint={12}>
          <Grid.Item columns={[12, 2]}>
            <SidePanelNav />
          </Grid.Item>
          <Grid.Item columns={[12, 10]}>
            <Outlet />
          </Grid.Item>
        </Grid.Container>
      </div>
    </SidePanelDomainContext.Provider>
  );
}
