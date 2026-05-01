import * as React from "react";
import { Box } from "@sqs/rosetta-primitives";
import { useTheme } from "@sqs/rosetta-styled";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { NavMenu } from "@sqs/rosetta-compositions";
import { BackButton } from "@sqs/rosetta-elements";
import { Stack } from "@sqs/rosetta-elements";
import { Flex } from "@sqs/rosetta-primitives";
import { Button } from "@sqs/rosetta-primitives";
import { Badge } from "@sqs/rosetta-elements";
import { SidePanelDomainContext } from "../../layouts/SidePanelDomainContext";
import { radii } from "@sqs/rosetta-tokens";

const NAV_ITEMS = [
  { value: "overview", label: "Overview", path: "." },
  { value: "dns", label: "DNS", path: "dns" },
  { value: "website", label: "Website", path: "website" },
  { value: "email", label: "Email", path: "email" },
  { value: "pay-links", label: "Pay Links", path: "/pay-links" },
  { value: "permissions", label: "Permissions", path: "permissions" },
];

const FOOTER_NAV_ITEMS = [
  { value: "activity", label: "Activity", path: "activity" },
  { value: "billing", label: "Billing", path: "billing" },
];

const ALL_NAV_ITEMS = [...NAV_ITEMS, ...FOOTER_NAV_ITEMS];

const DNS_SUB_ITEMS = [
  { value: "dns-settings", label: "DNS Settings", path: "dns" },
  { value: "nameservers", label: "Nameservers", path: "nameservers" },
  {
    value: "nameserver-registration",
    label: "Nameserver Registration",
    path: "nameserver-registration",
  },
  { value: "dnssec", label: "DNSSEC", path: "dnssec" },
];

const DNS_PATHS = DNS_SUB_ITEMS.map((item) => item.path);

const PAY_LINKS_PREFIX = "/pay-links";

function isPayLinksPath(pathname) {
  return (
    pathname === PAY_LINKS_PREFIX || pathname.startsWith(`${PAY_LINKS_PREFIX}/`)
  );
}

function domainIdFromPathname(pathname) {
  const m = pathname.match(/^\/domains\/([^/]+)/);
  return m ? m[1] : undefined;
}

function getActiveNav(pathname, domainId) {
  if (isPayLinksPath(pathname)) return "pay-links";
  if (!domainId) return "overview";
  const base = `/domains/${domainId}`;
  const sub = pathname.startsWith(base)
    ? pathname.slice(base.length).replace(/^\//, "")
    : "";
  if (DNS_PATHS.includes(sub)) return "dns";
  const match = ALL_NAV_ITEMS.find((item) => item.path === sub);
  return match ? match.value : "overview";
}

function getActiveDnsSub(pathname, domainId) {
  if (!domainId || isPayLinksPath(pathname)) return "dns-settings";
  const base = `/domains/${domainId}`;
  const sub = pathname.startsWith(base)
    ? pathname.slice(base.length).replace(/^\//, "")
    : "";
  const match = DNS_SUB_ITEMS.find((item) => item.path === sub);
  return match ? match.value : "dns-settings";
}

function domainSectionPath(domainId, segment) {
  if (segment === ".") return `/domains/${domainId}`;
  return `/domains/${domainId}/${segment}`;
}

export default function SidePanelNav() {
  const { borders, colors } = useTheme();
  const { NavItem, NavText } = NavMenu;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { domainId: paramDomainId } = useParams();
  const { effectiveDomainId } = React.useContext(SidePanelDomainContext);

  const domainIdForActive = paramDomainId || domainIdFromPathname(pathname);
  const domainIdForNav = paramDomainId || effectiveDomainId;

  const activeNav = getActiveNav(pathname, domainIdForActive);
  const activeDnsSub = getActiveDnsSub(pathname, domainIdForActive);
  const isDnsActive = activeNav === "dns";

  const onNavChange = (value) => {
    const item = ALL_NAV_ITEMS.find((i) => i.value === value);
    if (!item) return;
    if (item.path.startsWith("/")) {
      navigate(item.path);
      return;
    }
    if (!domainIdForNav) {
      navigate("/domains");
      return;
    }
    navigate(domainSectionPath(domainIdForNav, item.path));
  };

  const navigateDnsSub = (subPath) => {
    if (!domainIdForNav) {
      navigate("/domains");
      return;
    }
    navigate(domainSectionPath(domainIdForNav, subPath));
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
      <Flex flexDirection="column" sx={{ position: "sticky", top: 78 }}>
        <Box px={6}>
          <BackButton
            label="Domains List"
            onClick={() => navigate("/domains")}
            py={6}
          />
        </Box>

        <NavMenu value={activeNav} onChange={onNavChange}>
          {NAV_ITEMS.flatMap(({ value, label }) => {
            const items = [
              <NavItem
                key={value}
                value={value}
                is="div"
                isSelected={activeNav === value}
              >
                <NavText variant="subtitle">{label}</NavText>
              </NavItem>,
            ];
            if (value === "dns" && isDnsActive) {
              DNS_SUB_ITEMS.forEach((sub) => {
                items.push(
                  <NavItem
                    key={sub.value}
                    value={sub.value}
                    is="div"
                    isSelected={activeDnsSub === sub.value}
                    onClick={() => navigateDnsSub(sub.path)}
                  >
                    <NavText variant="body">{sub.label}</NavText>
                  </NavItem>,
                );
              });
            }
            return items;
          })}
        </NavMenu>
      </Flex>
      <Box id="sidenav-footerLinks" sx={{ position: "fixed", bottom: 0 }}>
        <NavMenu value={activeNav} onChange={onNavChange}>
          {FOOTER_NAV_ITEMS.map(({ value, label }) => (
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
        <Box px={6} py={6}>
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
        </Box>
      </Box>
    </Box>
  );
}
