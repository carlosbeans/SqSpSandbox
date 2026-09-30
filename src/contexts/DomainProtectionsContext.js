import * as React from "react";
import { Outlet, useParams } from "react-router-dom";
import { loadJsonData } from "../utils/dataUtils.ts";

const noop = () => {};

const DomainProtectionsContext = React.createContext({
  domain: null,
  protections: {},
  setProtection: noop,
});

/**
 * Loads the active domain once per `/domains/:domainId` route and keeps its
 * `securityProtections` editable in memory, so toggles flipped on the
 * Security tab or the Secure Email Forwarder page are reflected on the DNS
 * tab and the score gauge.
 */
export function DomainProtectionsProvider() {
  const { domainId } = useParams();
  const [baseDomain, setBaseDomain] = React.useState(null);
  const [protections, setProtections] = React.useState({});

  React.useEffect(() => {
    let cancelled = false;
    async function fetchDomain() {
      const response = await loadJsonData("domains");
      if (cancelled) return;
      const all = response.data?.domains || [];
      const decodedId = domainId ? decodeURIComponent(domainId) : "";
      const found = all.find((d) => d.domainName === decodedId) || null;
      setBaseDomain(found);
      setProtections({ ...(found?.securityProtections || {}) });
    }
    setBaseDomain(null);
    setProtections({});
    fetchDomain();
    return () => {
      cancelled = true;
    };
  }, [domainId]);

  const setProtection = React.useCallback((key, value) => {
    setProtections((prev) => ({ ...prev, [key]: Boolean(value) }));
  }, []);

  const value = React.useMemo(() => {
    const domain = baseDomain
      ? { ...baseDomain, securityProtections: protections }
      : null;
    return { domain, protections, setProtection };
  }, [baseDomain, protections, setProtection]);

  return (
    <DomainProtectionsContext.Provider value={value}>
      <Outlet />
    </DomainProtectionsContext.Provider>
  );
}

export function useDomainProtections() {
  return React.useContext(DomainProtectionsContext);
}
