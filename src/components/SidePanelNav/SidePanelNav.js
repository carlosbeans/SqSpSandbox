import "./SidePanelNav.scss";

import * as React from "react";
import { borders, colors } from "@sqs/rosetta-tokens";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { NavMenu } from "@sqs/rosetta-compositions";
import { BackButton } from "@sqs/rosetta-elements";
import { Stack } from "@sqs/rosetta-elements";
import { SidePanelDomainContext } from "../../layouts/SidePanelDomainContext";

const NAV_ITEMS = [
  { value: "overview", label: "Overview", path: "." },
  { value: "dns", label: "DNS", path: "dns" },
  { value: "website", label: "Website", path: "website" },
  { value: "email", label: "Email", path: "email" },
  { value: "activity", label: "Activity", path: "activity" },
  { value: "pay-links", label: "Pay Links", path: "/pay-links" },
  { value: "permissions", label: "Permissions", path: "permissions" },
  { value: "security", label: "Security", path: "security" },
  { value: "billing", label: "Billing", path: "billing" },
];

const DNS_SUB_ITEMS = [
  { value: "dns-settings", label: "DNS Settings", path: "dns" },
  { value: "nameservers", label: "Nameservers", path: "nameservers" },
  { value: "nameserver-registration", label: "Nameserver Registration", path: "nameserver-registration" },
  { value: "dnssec", label: "DNSSEC", path: "dnssec" },
];

const DNS_PATHS = DNS_SUB_ITEMS.map((item) => item.path);

const PAY_LINKS_PREFIX = "/pay-links";

function isPayLinksPath(pathname) {
  return pathname === PAY_LINKS_PREFIX || pathname.startsWith(`${PAY_LINKS_PREFIX}/`);
}

function domainIdFromPathname(pathname) {
  const m = pathname.match(/^\/domains\/([^/]+)/);
  return m ? m[1] : undefined;
}

function getActiveNav(pathname, domainId) {
  if (isPayLinksPath(pathname)) return "pay-links";
  if (!domainId) return "overview";
  const base = `/domains/${domainId}`;
  const sub = pathname.startsWith(base) ? pathname.slice(base.length).replace(/^\//, "") : "";
  if (DNS_PATHS.includes(sub)) return "dns";
  const match = NAV_ITEMS.find((item) => item.path === sub);
  return match ? match.value : "overview";
}

function getActiveDnsSub(pathname, domainId) {
  if (!domainId || isPayLinksPath(pathname)) return "dns-settings";
  const base = `/domains/${domainId}`;
  const sub = pathname.startsWith(base) ? pathname.slice(base.length).replace(/^\//, "") : "";
  const match = DNS_SUB_ITEMS.find((item) => item.path === sub);
  return match ? match.value : "dns-settings";
}

function domainSectionPath(domainId, segment) {
  if (segment === ".") return `/domains/${domainId}`;
  return `/domains/${domainId}/${segment}`;
}

export default function SidePanelNav() {
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
    const item = NAV_ITEMS.find((i) => i.value === value);
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
    <Stack space={1} style={{ borderRight: borders[1], borderColor: colors.gray[800], display: "flex", flexDirection: "column", alignItems: "flex-start", flex: "1 0 auto", minHeight: "100vh" }}>
      <BackButton label="Domains List" onClick={() => navigate("/domains")} py={6} />
      <NavMenu value={activeNav} onChange={onNavChange}>
        {NAV_ITEMS.flatMap(({ value, label }) => {
          const items = [
            <NavItem key={value} value={value} is="div" isSelected={activeNav === value}>
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
                  className="dns-sub-item"
                  onClick={() => navigateDnsSub(sub.path)}
                >
                  <NavText>{sub.label}</NavText>
                </NavItem>
              );
            });
          }
          return items;
        })}
      </NavMenu>
    </Stack>
  );
}
