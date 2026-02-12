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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
