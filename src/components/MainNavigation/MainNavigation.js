import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Stack } from "@sqs/rosetta-elements";
import { Box, Touchable } from "@sqs/rosetta-primitives";
import { useTheme } from "@sqs/rosetta-styled";
import { Ai } from "@sqs/rosetta-icons";

import Logo from "../Logo/Logo";
import Avatar from "../Avatar/Avatar";
import NotificationsPopover from "../NotificationsPopover/NotificationsPopover";
import { useTopChromeInset } from "../../contexts/TopChromeInsetContext";

const TAB_OPTIONS = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Domains", value: "domains" },
  { label: "Experiments", value: "experiments" },
];

const VALID_TABS = new Set(TAB_OPTIONS.map((o) => o.value));

export default function MainNavigation() {
  const { borders, colors } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const topChromeInsetPx = useTopChromeInset();

  const segment = pathname.split("/")[1] || "";
  const activeTab =
    segment === "" ? "dashboard" : VALID_TABS.has(segment) ? segment : "";

  return (
    <nav
      style={{
        position: "sticky",
        top: topChromeInsetPx,
        zIndex: 2,
        background: "white",
      }}
    >
      <Stack
        space={5}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        px={6}
        sx={{ borderBottom: borders[1], borderColor: colors.gray[800] }}
      >
        <Stack space={2} direction="row" alignItems="center" ml="-16px">
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
          <Stack space={3} direction="row" alignItems="center">
            <NotificationsPopover />
            <Box
              sx={{
                display: "inline-flex",
                flexShrink: 0,
                flexGrow: 0,
                alignItems: "center",
              }}
            >
              <Touchable.Element.Icon
                id="appshell-header-ai-trigger"
                aria-label="Design intelligence"
                onClick={() => {}}
              >
                <Ai
                  css={{
                    width: 22,
                    height: 22,
                    color: colors.gray[100],
                  }}
                />
              </Touchable.Element.Icon>
            </Box>
            <Avatar />
          </Stack>
        </div>
      </Stack>
    </nav>
  );
}
