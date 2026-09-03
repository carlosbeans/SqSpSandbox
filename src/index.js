import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useParams } from "react-router-dom";
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
import Experiments from "./pages/experiments/index.js";
import Email from "./pages/Email";
import PayLinks from "./pages/PayLinks";
import Website from "./pages/Website";
import DomainRegistration from "./pages/DomainRegistration";
import DomainSettings from "./pages/DomainSettings";
import ComponentTest from "./pages/experiments/ComponentTest.tsx";
import DomainOverviewRedesignQ22026 from "./pages/experiments/DomainOverviewRedesignQ22026.js";
import DomainActivityV2 from "./pages/experiments/DomainActivityV2.js";

//layouts
import AppShell from "./layouts/AppShell";

/** Old standalone domain sub-pages now live as tabs on Domain Settings. */
function RedirectToSettingsTab({ tab }) {
  const { domainId } = useParams();
  return <Navigate to={`/domains/${domainId}/settings?tab=${tab}`} replace />;
}

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
              { path: "dns", element: <RedirectToSettingsTab tab="dns" /> },
              { path: "website", element: <Website /> },
              { path: "email", element: <Email /> },
              { path: "activity", element: <RedirectToSettingsTab tab="activity" /> },
              { path: "pay-links", element: <PayLinks /> },
              { path: "permissions", element: <RedirectToSettingsTab tab="permissions" /> },
              { path: "security", element: <RedirectToSettingsTab tab="security" /> },
              { path: "billing", element: <RedirectToSettingsTab tab="billing" /> },
              { path: "dnssec", element: <RedirectToSettingsTab tab="dns" /> },
              { path: "nameservers", element: <RedirectToSettingsTab tab="dns" /> },
              { path: "nameserver-registration", element: <RedirectToSettingsTab tab="dns" /> },
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
