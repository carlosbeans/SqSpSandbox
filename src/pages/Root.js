import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { rosetta } from "@sqs/rosetta-themes";
import { ThemeContext } from "@sqs/rosetta-styled";
import { I18nContext } from "@sqs/i18n-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

//components
import MainNavigation from "../components/MainNavigation/MainNavigation";
import TwoFactorAuthBanner, {
  TWO_FACTOR_BANNER_HEIGHT_PX,
} from "../components/TwoFactorAuthBanner/TwoFactorAuthBanner";
import { SandboxTwoFaBannerContext } from "../contexts/SandboxTwoFaBannerContext";
import { SandboxDomainRedesign2026Context } from "../contexts/SandboxDomainRedesign2026Context";
import { TopChromeInsetContext } from "../contexts/TopChromeInsetContext";

const TWO_FA_BANNER_DISMISSED_KEY = "sqspSandbox:dismissTwoFactorBanner";

function readBannerDismissed() {
  try {
    return sessionStorage.getItem(TWO_FA_BANNER_DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

/**
 * One stable key for all routes that share <AppShell />. Currently that is
 * /domains/:id/* (which includes pay-links, dns, etc.). Sharing a single key
 * across these paths prevents the shell from remounting on intra-shell nav.
 */
function rootLayoutMotionKey(pathname, search) {
  const p = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  if (/^\/domains\/[^/]+(\/|$)/.test(p)) {
    return `app-shell${search}`;
  }
  return `${pathname}${search}`;
}

export default function Root() {
  const outlet = useOutlet();
  const { pathname, search } = useLocation();
  const reduceMotion = useReducedMotion();

  const [sandboxTwoFaBannerEnabled, setSandboxTwoFaBannerEnabled] =
    React.useState(false);
  const [bannerDismissed, setBannerDismissed] = React.useState(() =>
    readBannerDismissed(),
  );

  React.useEffect(() => {
    if (sandboxTwoFaBannerEnabled) {
      setBannerDismissed(false);
    }
  }, [sandboxTwoFaBannerEnabled]);

  const twoFactorBannerVisible =
    sandboxTwoFaBannerEnabled && !bannerDismissed;

  const [topChromeInsetPx, setTopChromeInsetPx] = React.useState(0);

  React.useEffect(() => {
    if (twoFactorBannerVisible) {
      setTopChromeInsetPx(TWO_FACTOR_BANNER_HEIGHT_PX);
    }
  }, [twoFactorBannerVisible]);

  const sandboxTwoFaBannerContextValue = React.useMemo(
    () => ({
      sandboxTwoFaBannerEnabled,
      setSandboxTwoFaBannerEnabled,
    }),
    [sandboxTwoFaBannerEnabled],
  );

  const [domainRedesign2026Enabled, setDomainRedesign2026Enabled] =
    React.useState(false);
  const sandboxDomainRedesign2026ContextValue = React.useMemo(
    () => ({
      domainRedesign2026Enabled,
      setDomainRedesign2026Enabled,
    }),
    [domainRedesign2026Enabled],
  );

  const dismissTwoFactorBanner = React.useCallback(() => {
    try {
      sessionStorage.setItem(TWO_FA_BANNER_DISMISSED_KEY, "1");
    } catch {
      /* ignore */
    }
    setBannerDismissed(true);
  }, []);

  const onTwoFactorBannerExitComplete = React.useCallback(() => {
    setTopChromeInsetPx(0);
  }, []);

  const rootRouteKey = React.useMemo(
    () => rootLayoutMotionKey(pathname, search),
    [pathname, search],
  );
  const pageTransition = React.useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
    [reduceMotion]
  );

  return (
    <ThemeContext.Provider theme={rosetta.default}>
      <I18nContext.Provider
        value={{
          translationLocale: "en-US",
          formattingLocale: "en-US",
        }}
      >
        <SandboxTwoFaBannerContext.Provider value={sandboxTwoFaBannerContextValue}>
          <SandboxDomainRedesign2026Context.Provider
            value={sandboxDomainRedesign2026ContextValue}
          >
            <TopChromeInsetContext.Provider value={topChromeInsetPx}>
              <AnimatePresence
                initial={false}
                onExitComplete={onTwoFactorBannerExitComplete}
              >
                {twoFactorBannerVisible ? (
                  <TwoFactorAuthBanner
                    key="two-factor-auth-banner"
                    onDismiss={dismissTwoFactorBanner}
                  />
                ) : null}
              </AnimatePresence>
              <div
                className="appContainer"
                style={{ paddingTop: topChromeInsetPx }}
              >
                <MainNavigation />
                <div className="appBody">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={rootRouteKey}
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={pageTransition}
                    >
                      {outlet}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </TopChromeInsetContext.Provider>
          </SandboxDomainRedesign2026Context.Provider>
        </SandboxTwoFaBannerContext.Provider>
      </I18nContext.Provider>
    </ThemeContext.Provider>
  );
}
