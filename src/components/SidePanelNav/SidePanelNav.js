import * as React from "react";
import { Box } from "@sqs/rosetta-primitives";
import { useTheme } from "@sqs/rosetta-styled";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { NavMenu } from "@sqs/rosetta-compositions";
import { BackButton } from "@sqs/rosetta-elements";
import { Flex } from "@sqs/rosetta-primitives";
import { Button as ButtonNext } from "@sqs/rosetta-react/button/next";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Settings } from "@sqs/rosetta-glyphs";
import { SidePanelDomainContext } from "../../layouts/SidePanelDomainContext";
import { useTopChromeInset } from "../../contexts/TopChromeInsetContext";
import { loadJsonData } from "../../utils/dataUtils.ts";
import { getVisibleDomains } from "../../utils/sandboxDomains.ts";
import { useSandboxSingleDomain } from "../../contexts/SandboxSingleDomainContext";
import { TOP_CHROME_STICKY_BASE_PX } from "../../constants/layout";
import { EASE_ENTRANCE } from "../../constants/motion";
import DomainSwitcher from "../DomainSwitcher/DomainSwitcher";

const NAV_ITEMS = [
  { value: "overview", label: "Overview", path: "." },
  { value: "website", label: "Website", path: "website" },
  { value: "email", label: "Email", path: "email" },
  { value: "pay-links", label: "Pay Links", path: "pay-links" },
  { value: "llc-formation", label: "LLC Formation", isExternal: true },
];

const llcArrowVariants = {
  rest: { opacity: 0, x: -2 },
  hover: { opacity: 1, x: 0 },
};

function getLlcArrowVariants(reduceMotion) {
  return reduceMotion
    ? { rest: { opacity: 0, x: 0 }, hover: { opacity: 1, x: 0 } }
    : llcArrowVariants;
}

function domainIdFromPathname(pathname) {
  const m = pathname.match(/^\/domains\/([^/]+)/);
  return m ? m[1] : undefined;
}

function getActiveNav(pathname, domainId) {
  if (!domainId) return "overview";
  const base = `/domains/${domainId}`;
  const sub = pathname.startsWith(base)
    ? pathname.slice(base.length).replace(/^\//, "")
    : "";
  if (sub === "") return "overview";
  const match = NAV_ITEMS.find((item) => !item.isExternal && item.path === sub);
  return match ? match.value : "";
}

function domainSectionPath(domainId, segment) {
  if (segment === ".") return `/domains/${domainId}`;
  return `/domains/${domainId}/${segment}`;
}

export default function SidePanelNav() {
  const topChromeInsetPx = useTopChromeInset();
  const { borders, colors } = useTheme();
  const reduceMotion = useReducedMotion();
  const { NavItem, NavText } = NavMenu;
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const { domainId: paramDomainId } = useParams();
  const { effectiveDomainId } = React.useContext(SidePanelDomainContext);

  const domainIdForActive = paramDomainId || domainIdFromPathname(pathname);
  const domainIdForNav = paramDomainId || effectiveDomainId;

  const activeNav = getActiveNav(pathname, domainIdForActive);

  const { singleDomainEnabled } = useSandboxSingleDomain();
  const [allDomains, setAllDomains] = React.useState([]);
  const [currentDomain, setCurrentDomain] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    async function fetchDomains() {
      const response = await loadJsonData("domains");
      if (cancelled) return;
      const all = response.data?.domains || [];
      setAllDomains(all);
      if (!domainIdForActive) {
        setCurrentDomain(null);
        return;
      }
      const decodedId = decodeURIComponent(domainIdForActive);
      setCurrentDomain(all.find((d) => d.domainName === decodedId) || null);
    }
    fetchDomains();
    return () => {
      cancelled = true;
    };
  }, [domainIdForActive]);

  const onDomainSwitch = (nextDomainName) => {
    if (!nextDomainName || nextDomainName === domainIdForNav) return;
    const target = allDomains.find((d) => d.domainName === nextDomainName);
    const rawSuffix = pathname.replace(/^\/domains\/[^/]+/, "");
    const isPayLinksRoute = /(^|\/)pay-links(\/|$)/.test(rawSuffix);
    const suffix =
      isPayLinksRoute && target?.eligibility === "ineligible" ? "" : rawSuffix;
    navigate(
      `/domains/${encodeURIComponent(nextDomainName)}${suffix}${search}${hash}`,
    );
  };

  const isPayLinksHidden = currentDomain?.eligibility === "ineligible";
  const visibleNavItems = isPayLinksHidden
    ? NAV_ITEMS.filter((item) => item.value !== "pay-links")
    : NAV_ITEMS;

  const onNavChange = (value) => {
    const item = NAV_ITEMS.find((i) => i.value === value);
    if (!item || item.isExternal) return;
    if (!domainIdForNav) {
      navigate("/domains");
      return;
    }
    navigate(domainSectionPath(domainIdForNav, item.path));
  };

  const navigateToSettings = () => {
    if (!domainIdForNav) {
      navigate("/domains");
      return;
    }
    navigate(domainSectionPath(domainIdForNav, "settings"));
  };

  return (
    <Box
      id="sidePanelNav"
      sx={{
        borderRight: borders[1],
        borderColor: colors.gray[800],
        flex: "0 0 250px",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Flex
        flexDirection="column"
        sx={{
          position: "sticky",
          top: TOP_CHROME_STICKY_BASE_PX + topChromeInsetPx,
        }}
      >
        <Box px={6}>
          <BackButton
            label="Domains List"
            onClick={() => navigate("/domains")}
            py={6}
          />
        </Box>

        <DomainSwitcher
          domains={getVisibleDomains(allDomains, singleDomainEnabled)}
          currentDomainName={currentDomain?.domainName || domainIdForNav}
          onChange={onDomainSwitch}
        />

        <NavMenu value={activeNav} onChange={onNavChange}>
          {visibleNavItems.map(({ value, label, isExternal }) => (
            <NavItem
              key={value}
              value={value}
              is="div"
              isSelected={!isExternal && activeNav === value}
            >
              {isExternal ? (
                <motion.div
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  style={{ width: "100%" }}
                >
                  <Flex alignItems="center" gap={1}>
                    <NavText variant="subtitle">{label}</NavText>
                    <motion.span
                      aria-hidden="true"
                      variants={getLlcArrowVariants(reduceMotion)}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.15, ease: EASE_ENTRANCE }
                      }
                      style={{ display: "flex" }}
                    >
                      <ArrowUpRight
                        css={{ width: 16, height: 16, display: "block" }}
                      />
                    </motion.span>
                  </Flex>
                </motion.div>
              ) : (
                <NavText variant="subtitle">{label}</NavText>
              )}
            </NavItem>
          ))}
        </NavMenu>
      </Flex>
      <Box id="sidenav-footerLinks" sx={{ position: "fixed", bottom: 0 }}>
        <Box px={6} pb={6} pt={3}>
          <ButtonNext.Subtle
            width="100%"
            icon={Settings}
            onClick={navigateToSettings}
            sx={{ justifyContent: "flex-start" }}
          >
            Domain Settings
          </ButtonNext.Subtle>
        </Box>
      </Box>
    </Box>
  );
}
