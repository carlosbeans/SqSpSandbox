import React from "react";
import { Outlet } from "react-router-dom";
import { rosetta } from "@sqs/rosetta-themes";
import { ThemeContext } from "@sqs/rosetta-styled";
import { I18nContext } from "@sqs/i18n-react";

//components
import MainNavigation from "../components/MainNavigation/MainNavigation";

//css
import "../styles/styles.scss";

export default function Root() {
  return (
    <ThemeContext.Provider theme={rosetta.default}>
      <I18nContext.Provider
        value={{
          translationLocale: "en-US",
          formattingLocale: "en-US",
        }}
      >
        <div className="appContainer">
          <MainNavigation />
          <div className="appBody">
            <Outlet />
          </div>
        </div>
      </I18nContext.Provider>
    </ThemeContext.Provider>
  );
}
