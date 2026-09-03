import * as React from "react";
import { Box } from "@sqs/rosetta-primitives";
import { useTheme } from "@sqs/rosetta-styled";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { NavMenu } from "@sqs/rosetta-compositions";
import { BackButton } from "@sqs/rosetta-elements";
import { Stack } from "@sqs/rosetta-elements";
import { Flex, Text } from "@sqs/rosetta-primitives";
import { Button } from "@sqs/rosetta-primitives";
import { Button as ButtonNext } from "@sqs/rosetta-react/button/next";
import { Badge } from "@sqs/rosetta-elements";
import { Settings } from "@sqs/rosetta-glyphs";
import { SidePanelDomainContext } from "../../layouts/SidePanelDomainContext";
import { useTopChromeInset } from "../../contexts/TopChromeInsetContext";
import { loadJsonData } from "../../utils/dataUtils.ts";

/** Main nav stripe + banner offset (<MainNavigation /> tabs + chrome). */
const SIDE_PANEL_STICKY_TOP_BASE_PX = 78;

const NAV_ITEMS = [
  { value: "overview", label: "Overview", path: "." },
  { value: "website", label: "Website", path: "website" },
  { value: "email", label: "Email", path: "email" },
  { value: "pay-links", label: "Pay Links", path: "pay-links" },
];

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
  const match = NAV_ITEMS.find((item) => item.path === sub);
  return match ? match.value : "";
}

function domainSectionPath(domainId, segment) {
  if (segment === ".") return `/domains/${domainId}`;
  return `/domains/${domainId}/${segment}`;
}

export default function SidePanelNav() {
  const topChromeInsetPx = useTopChromeInset();
  const { borders, colors, radii } = useTheme();
  const { NavItem, NavText } = NavMenu;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { domainId: paramDomainId } = useParams();
  const { effectiveDomainId } = React.useContext(SidePanelDomainContext);

  const domainIdForActive = paramDomainId || domainIdFromPathname(pathname);
  const domainIdForNav = paramDomainId || effectiveDomainId;

  const activeNav = getActiveNav(pathname, domainIdForActive);

  const [currentDomain, setCurrentDomain] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    async function fetchDomain() {
      if (!domainIdForActive) {
        setCurrentDomain(null);
        return;
      }
      const response = await loadJsonData("domains");
      if (cancelled) return;
      const all = response.data?.domains || [];
      const decodedId = decodeURIComponent(domainIdForActive);
      setCurrentDomain(all.find((d) => d.domainName === decodedId) || null);
    }
    fetchDomain();
    return () => {
      cancelled = true;
    };
  }, [domainIdForActive]);

  const isPayLinksHidden = currentDomain?.eligibility === "ineligible";
  const visibleNavItems = isPayLinksHidden
    ? NAV_ITEMS.filter((item) => item.value !== "pay-links")
    : NAV_ITEMS;

  const onNavChange = (value) => {
    const item = NAV_ITEMS.find((i) => i.value === value);
    if (!item) return;
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
        sx={{ position: "sticky", top: SIDE_PANEL_STICKY_TOP_BASE_PX + topChromeInsetPx }}
      >
        <Box px={6}>
          <BackButton
            label="Domains List"
            onClick={() => navigate("/domains")}
            py={6}
          />
        </Box>

        <NavMenu value={activeNav} onChange={onNavChange}>
          {visibleNavItems.map(({ value, label }) => (
            <NavItem
              key={value}
              value={value}
              is="div"
              isSelected={activeNav === value}
            >
              <NavText variant="subtitle">{label}</NavText>
            </NavItem>
          ))}
        </NavMenu>
      </Flex>
      <Box id="sidenav-footerLinks" sx={{ position: "fixed", bottom: 0 }}>
        <Box px={6} pb={6} pt={3}>
          <Stack space={2}>
            <ButtonNext.Subtle
              width="100%"
              icon={Settings}
              onClick={navigateToSettings}
              sx={{ justifyContent: "flex-start" }}
            >
              Domain Settings
            </ButtonNext.Subtle>
            <Button
              size="medium"
              variant="secondary"
              sx={{
                width: "100%",
                textTransform: "none",
                fontSize: "16px",
                borderRadius: radii[1],
                textAlign: "left",
                letterSpacing: "0",
              }}
            >
              Form an LLC{" "}
              <Badge appearance="blue" mx={2}>
                New
              </Badge>
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
