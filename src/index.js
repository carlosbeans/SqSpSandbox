import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//css
import "./styles/styles.scss";

//pages
import Root from "./pages/Root";
import Error from "./Error";
import Home from "./pages/Home";
import SelectAndDrag from "./pages/SelectAndDrag";
import CodePreview from "./pages/CodePreview";
import Domains from "./pages/Domains";
import SafeError from "./SafeError";

//components
const router = createBrowserRouter([
  {
    path: "/",
    // element: <Root />,
    element: <div>Simple home</div>,
    errorElement: <SafeError />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: "selectanddrag",
      //   element: <SelectAndDrag />,
      // },
      // {
      //   path: "codepreview",
      //   element: <CodePreview />,
      // },
      // {
      //   path: "domains",
      //   element: <Domains />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
