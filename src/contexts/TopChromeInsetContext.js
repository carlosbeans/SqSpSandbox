import * as React from "react";

export const TopChromeInsetContext = React.createContext(0);

export function useTopChromeInset() {
  return React.useContext(TopChromeInsetContext);
}
