import * as React from "react";
import { Outlet, useParams } from "react-router-dom";
import { loadJsonData } from "../utils/dataUtils.ts";

const noop = () => {};

const DomainProtectionsContext = React.createContext({
  domain: null,
  protections: {},
  setProtection: noop,
  setTwoFactorAuth: noop,
});

const STORAGE_PREFIX = "sqsp-sandbox:protections:";

function readStoredProtections(domainName) {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_PREFIX + domainName);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredProtections(domainName, snapshot) {
  try {
    window.sessionStorage.setItem(
      STORAGE_PREFIX + domainName,
      JSON.stringify(snapshot),
    );
  } catch {
    // Storage can be blocked or full; fall back to in-memory state.
  }
}

/**
 * Loads the active domain once per `/domains/:domainId` route and keeps its
 * `securityProtections` editable, so toggles flipped on the Security tab,
 * the WHOIS privacy page or the Secure Email Forwarder page are reflected on
 * the DNS tab and the score gauge. Changes are mirrored to sessionStorage per
 * domain so they survive a refresh.
 */
export function DomainProtectionsProvider() {
  const { domainId } = useParams();
  const [baseDomain, setBaseDomain] = React.useState(null);
  const [protections, setProtections] = React.useState({});
  const [twoFactorAuth, setTwoFactorAuthState] = React.useState(false);
  const [hydratedFor, setHydratedFor] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    async function fetchDomain() {
      const response = await loadJsonData("domains");
      if (cancelled) return;
      const all = response.data?.domains || [];
      const decodedId = domainId ? decodeURIComponent(domainId) : "";
      const found = all.find((d) => d.domainName === decodedId) || null;
      const stored = found ? readStoredProtections(found.domainName) : null;
      setBaseDomain(found);
      setProtections({
        ...(found?.securityProtections || {}),
        ...(stored?.protections || {}),
      });
      setTwoFactorAuthState(
        typeof stored?.twoFactorAuth === "boolean"
          ? stored.twoFactorAuth
          : Boolean(found?.twoFactorAuth),
      );
      setHydratedFor(found?.domainName || null);
    }
    setHydratedFor(null);
    setBaseDomain(null);
    setProtections({});
    setTwoFactorAuthState(false);
    fetchDomain();
    return () => {
      cancelled = true;
    };
  }, [domainId]);

  React.useEffect(() => {
    if (!hydratedFor || baseDomain?.domainName !== hydratedFor) return;
    writeStoredProtections(hydratedFor, { protections, twoFactorAuth });
  }, [hydratedFor, baseDomain, protections, twoFactorAuth]);

  const setProtection = React.useCallback((key, value) => {
    setProtections((prev) => ({ ...prev, [key]: Boolean(value) }));
  }, []);

  const setTwoFactorAuth = React.useCallback((value) => {
    setTwoFactorAuthState(Boolean(value));
  }, []);

  const value = React.useMemo(() => {
    const domain = baseDomain
      ? { ...baseDomain, securityProtections: protections, twoFactorAuth }
      : null;
    return { domain, protections, setProtection, setTwoFactorAuth };
  }, [baseDomain, protections, twoFactorAuth, setProtection, setTwoFactorAuth]);

  return (
    <DomainProtectionsContext.Provider value={value}>
      <Outlet />
    </DomainProtectionsContext.Provider>
  );
}

export function useDomainProtections() {
  return React.useContext(DomainProtectionsContext);
}
