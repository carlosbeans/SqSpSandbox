import * as React from "react";

export const SandboxSingleDomainContext = React.createContext({
  singleDomainEnabled: false,
  setSingleDomainEnabled: () => {},
});

export function useSandboxSingleDomain() {
  return React.useContext(SandboxSingleDomainContext);
}
