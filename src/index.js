import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//css
import "./styles/styles.scss";

//pages
import Root from "./pages/Root";

import SelectAndDrag from "./pages/SelectAndDrag";
import CodePreview from "./pages/CodePreview";
import Domains from "./pages/Domains.tsx";
import SafeError from "./SafeError";
import Websites from "./pages/Websites";
import DomainWebsiteConnection from "./pages/DomainWebsiteConnection";
import DomainOverview from "./pages/DomainOverview";
import DNS_Settings from "./pages/DNS_Settings.js";
import Experiments from "./pages/Experiments.js";
import Activity from "./pages/Activity";
import Billing from "./pages/Billing";
import DNSSEC from "./pages/DNSSEC";
import DomainNameservers from "./pages/DomainNameservers";
import Email from "./pages/Email";
import NameserverRegistration from "./pages/NameserverRegistration";
import PayLinks from "./pages/PayLinks";
import Permissions from "./pages/Permissions";
import Security from "./pages/Security";
import Website from "./pages/Website";

//layouts
import SidePanelShell from "./layouts/SidePanelShell";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <SafeError />,
    children: [
      {
        index: true,
        element: <Websites />,
      },
      {
        path: "websites",
        element: <Websites />,
      },
      {
        path: "selectanddrag",
        element: <SelectAndDrag />,
      },
      {
        path: "codepreview",
        element: <CodePreview />,
      },
      {
        path: "domains",
        element: <Domains />,
      },
      {
        path: "experiments",
        element: <Experiments />,
      },
      {
        path: "DomainWebsiteConnection",
        element: <DomainWebsiteConnection />,
      },
      {
        element: <SidePanelShell />,
        children: [
          {
            path: "pay-links",
            element: <PayLinks />,
          },
          {
            path: "domains/:domainId",
            element: <Outlet />,
            children: [
              { index: true, element: <DomainOverview /> },
              { path: "dns", element: <DNS_Settings /> },
              { path: "website", element: <Website /> },
              { path: "email", element: <Email /> },
              { path: "activity", element: <Activity /> },
              { path: "permissions", element: <Permissions /> },
              { path: "security", element: <Security /> },
              { path: "billing", element: <Billing /> },
              { path: "dnssec", element: <DNSSEC /> },
              { path: "nameservers", element: <DomainNameservers /> },
              { path: "nameserver-registration", element: <NameserverRegistration /> },
              { path: "connection", element: <DomainWebsiteConnection /> },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
