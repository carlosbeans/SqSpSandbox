import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { rosetta } from "@sqs/rosetta-themes";
import { ThemeContext } from "@sqs/rosetta-styled";
import { I18nContext } from "@sqs/i18n-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

//components
import MainNavigation from "../components/MainNavigation/MainNavigation";

//css
import "../styles/styles.scss";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function Root() {
  const outlet = useOutlet();
  const { pathname, search } = useLocation();
  const reduceMotion = useReducedMotion();
  const rootRouteKey = React.useMemo(() => {
    const topSegment = pathname.split("/").filter(Boolean)[0] || "root";
    return `${topSegment}${search}`;
  }, [pathname, search]);
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
        <div className="appContainer">
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
      </I18nContext.Provider>
    </ThemeContext.Provider>
  );
}
