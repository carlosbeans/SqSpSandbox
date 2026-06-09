import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./global.scss";


//pages
import Root from "./pages/Root";

import SelectAndDrag from "./pages/SelectAndDrag";
import CodePreview from "./pages/CodePreview";
import Domains from "./pages/Domains.tsx";
import RouteErrorState from "./components/ErrorState/ErrorState";
import Dashboard from "./pages/Dashboard";
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
import DomainRegistration from "./pages/DomainRegistration";
import DomainSettings from "./pages/DomainSettings";
import ComponentTest from "./pages/ComponentTest.tsx";

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
        path: "componenttest",
        element: <ComponentTest />,
      },
      {
        path: "DomainWebsiteConnection",
        element: <DomainWebsiteConnection />,
      },
      {
        element: <AppShell />,
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
              { path: "registration", element: <DomainRegistration /> },
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
