//css
import "./SidePanelNav.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavMenu } from "@sqs/rosetta-compositions";
import { BackButton } from "@sqs/rosetta-elements";
import { Stack } from "@sqs/rosetta-elements";

export default function SidePanelNav() {
  const { NavItem, NavText } = NavMenu;
  const navigate = useNavigate();

  const [navValue, setNavValue] = React.useState("overview");
  const navRoutes = {
    overview: null, // stay on current page
    dns: "/dns-settings",
    website: "/website",
    email: "/email",
    activity: "/activity",
    permissions: "/permissions",
    billing: "/billing",
  };

  const onNavChange = (value) => {
    setNavValue(value);
    const route = navRoutes[value];
    if (route) {
      navigate(route);
    }
  };

  return (
    <Stack space={2}>
      <BackButton label="Domains List" onClick={() => navigate(-1)} />
      <NavMenu value={navValue} onChange={onNavChange}>
        <NavItem value="overview" is="div" isSelected={navValue === "overview"}>
          <NavText variant="subtitle">Overview</NavText>
        </NavItem>
        <NavItem value="dns" is="div">
          <NavText variant="subtitle">DNS</NavText>
        </NavItem>
        <NavItem value="website" is="div">
          <NavText variant="subtitle">Website</NavText>
        </NavItem>
        <NavItem value="email" is="div">
          <NavText variant="subtitle">Email</NavText>
        </NavItem>
        <NavItem value="activity" is="div">
          <NavText variant="subtitle">Activity</NavText>
        </NavItem>
        <NavItem value="permissions" is="div">
          <NavText variant="subtitle">Permissions</NavText>
        </NavItem>
        <NavItem value="billing" is="div">
          <NavText variant="subtitle">Billing</NavText>
        </NavItem>
      </NavMenu>
    </Stack>
  );
}
