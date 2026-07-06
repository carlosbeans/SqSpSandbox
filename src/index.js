import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./global.scss";


//pages
import Root from "./pages/Root";

import SelectAndDrag from "./pages/experiments/SelectAndDrag";
import CodePreview from "./pages/experiments/CodePreview";
import Domains from "./pages/Domains.tsx";
import RouteErrorState from "./components/ErrorState/ErrorState";
import Dashboard from "./pages/Dashboard";
import DomainWebsiteConnection from "./pages/experiments/DomainWebsiteConnection";
import DomainOverview from "./pages/DomainOverview";
import DNS_Settings from "./pages/DNS_Settings.js";
import Experiments from "./pages/experiments/index.js";
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
import DomainRegistration from "./pages/DomainRegistration";
import DomainSettings from "./pages/DomainSettings";
import ComponentTest from "./pages/experiments/ComponentTest.tsx";
import DomainOverviewRedesignQ22026 from "./pages/experiments/DomainOverviewRedesignQ22026.js";
import DomainActivityV2 from "./pages/experiments/DomainActivityV2.js";

//layouts
import AppShell from "./layouts/AppShell";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RouteErrorState />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "domains",
        element: <Domains />,
      },
      {
        path: "experiments",
        children: [
          { index: true, element: <Experiments /> },
          { path: "selectanddrag", element: <SelectAndDrag /> },
          { path: "codepreview", element: <CodePreview /> },
          { path: "domainwebsiteconnection", element: <DomainWebsiteConnection /> },
          { path: "componenttest", element: <ComponentTest /> },
        ],
      },
      {
        element: <AppShell />,
        children: [
          {
            path: "experiments/domain-overview-redesign-q2-2026",
            element: <DomainOverviewRedesignQ22026 />,
          },
          {
            path: "experiments/domain-activity-v2",
            element: <DomainActivityV2 />,
          },
          {
            path: "domains/:domainId",
            element: <Outlet />,
            children: [
              { index: true, element: <DomainOverview /> },
              { path: "registration", element: <DomainRegistration /> },
              { path: "dns", element: <DNS_Settings /> },
              { path: "website", element: <Website /> },
              { path: "email", element: <Email /> },
              { path: "activity", element: <Activity /> },
              { path: "pay-links", element: <PayLinks /> },
              { path: "permissions", element: <Permissions /> },
              { path: "security", element: <Security /> },
              { path: "billing", element: <Billing /> },
              { path: "dnssec", element: <DNSSEC /> },
              { path: "nameservers", element: <DomainNameservers /> },
              { path: "nameserver-registration", element: <NameserverRegistration /> },
              { path: "connection", element: <DomainWebsiteConnection /> },
              { path: "settings", element: <DomainSettings /> },
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
