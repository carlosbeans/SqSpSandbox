import * as React from "react";

const PageHeaderContext = React.createContext({
  config: null,
  setConfig: () => {},
});

export function PageHeaderProvider({ children }) {
  const [config, setConfig] = React.useState(null);
  const value = React.useMemo(() => ({ config, setConfig }), [config]);
  return (
    <PageHeaderContext.Provider value={value}>
      {children}
    </PageHeaderContext.Provider>
  );
}

export function usePageHeader({ title, subtitle, actions } = {}) {
  const { setConfig } = React.useContext(PageHeaderContext);
  const configRef = React.useRef();
  configRef.current = { title, subtitle, actions };

  React.useLayoutEffect(() => {
    setConfig(configRef.current);
    return () => setConfig(null);
  }, [setConfig]);
}

export function usePageHeaderConfig() {
  return React.useContext(PageHeaderContext).config;
}
