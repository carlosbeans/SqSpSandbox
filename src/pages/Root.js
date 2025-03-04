import React from "react";
import { Outlet } from "react-router-dom";

//components
import MainNavigation from "../components/MainNavigation/MainNavigation";

export default function Root() {
  return (
    <div className="appContainer">
      <MainNavigation />
      <div className="appBody">
        <Outlet />
      </div>
    </div>
  );
}
