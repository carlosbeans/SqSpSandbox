import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Stack } from "@sqs/rosetta-elements";
import { useTheme } from "@sqs/rosetta-styled";

import Logo from "../Logo/Logo";
import Avatar from "../Avatar/Avatar";

const TAB_OPTIONS = [
  { label: "Dashboard", value: "websites" },
  { label: "Domains", value: "domains" },
  { label: "Experiments", value: "experiments" },
];

const VALID_TABS = new Set(TAB_OPTIONS.map((o) => o.value));

export default function MainNavigation() {
  const { borders, colors } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const segment = pathname.split("/")[1] || "";
  const activeTab = VALID_TABS.has(segment) ? segment : "";

  return (
    <nav>
      <Stack
        space={5}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        px={2}
        sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}
      >
        <Stack space={2} direction="row" alignItems="center">
          <Link className="mainNavLink" to="/" id="logo">
            <Logo color="#000" size="55" />
          </Link>
          <Tabs
            options={TAB_OPTIONS}
            value={activeTab}
            onChange={(val) => navigate(`/${val}`)}
            sx={{
              minHeight: "77px",
              '&::before': { display: 'none' },
            }}
          />
        </Stack>
        <div className="userInfo">
          <Stack space={2} direction="row" alignItems="center">
            <Link className="mainNavLink" to="#">
              Help
            </Link>
            <Link className="mainNavLink" to="#">
              Account Settings
            </Link>
            <Avatar />
          </Stack>
        </div>
      </Stack>
    </nav>
  );
}
