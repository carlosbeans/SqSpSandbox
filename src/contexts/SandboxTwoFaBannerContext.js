import * as React from "react";

export const SandboxTwoFaBannerContext = React.createContext({
  sandboxTwoFaBannerEnabled: false,
  setSandboxTwoFaBannerEnabled: () => {},
});

export function useSandboxTwoFaBanner() {
  return React.useContext(SandboxTwoFaBannerContext);
}
