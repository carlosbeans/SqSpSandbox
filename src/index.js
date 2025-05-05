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
import Domains from "./pages/Domains";
import SafeError from "./SafeError";
import Websites from "./pages/Websites";
import DomainWebsiteConnection from "./pages/DomainWebsiteConnection";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
