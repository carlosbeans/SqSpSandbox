import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//css
import "./styles/styles.scss";

//pages
import Root from "./pages/Root";
import Home from "./pages/Home";
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
import Permissions from "./pages/Permissions";
import Website from "./pages/Website";

//components
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <SafeError />,
    children: [
      {
        index: true,
        element: <Home />,
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
        path: "domainwebsiteconnection",
        element: <DomainWebsiteConnection />,
      },
      {
        path: "domainoverview/:domainId",
        element: <DomainOverview />,
      },
        {
          path: "dns-settings",
          element: <DNS_Settings />,
        },
        {
          path: "experiments",
          element: <Experiments />,
        },
        {
          path: "activity",
          element: <Activity />,
        },
        {
          path: "billing",
          element: <Billing />,
        },
        {
          path: "dnssec",
          element: <DNSSEC />,
        },
        {
          path: "domain-nameservers",
          element: <DomainNameservers />,
        },
        {
          path: "email",
          element: <Email />,
        },
        {
          path: "nameserver-registration",
          element: <NameserverRegistration />,
        },
        {
          path: "permissions",
          element: <Permissions />,
        },
        {
          path: "website",
          element: <Website />,
        },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
