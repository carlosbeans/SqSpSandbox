import * as React from "react";

export const SandboxDomainRedesign2026Context = React.createContext({
  domainRedesign2026Enabled: true,
  setDomainRedesign2026Enabled: () => {},
});

export function useSandboxDomainRedesign2026() {
  return React.useContext(SandboxDomainRedesign2026Context);
}
