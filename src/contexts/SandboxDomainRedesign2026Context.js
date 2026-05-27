import * as React from "react";

export const SandboxDomainRedesign2026Context = React.createContext({
  domainRedesign2026Enabled: false,
  setDomainRedesign2026Enabled: () => {},
});

export function useSandboxDomainRedesign2026() {
  return React.useContext(SandboxDomainRedesign2026Context);
}
