import React from "react";
import Modal from "../components/Modal/Modal";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { Button, Touchable } from "@sqs/rosetta-primitives";
import { Print, Ellipses } from "@sqs/rosetta-icons";
import { Banner } from "@sqs/rosetta-compositions";
import { rosetta } from "@sqs/rosetta-themes";
import { ThemeContext } from "@sqs/rosetta-styled";
import { I18nContext } from "@sqs/i18n-react";
import { PageHeader } from "@sqs/rosetta-compositions";
import { SegmentedControl, Grid } from "@sqs/rosetta-elements";
import { Website } from "@sqs/rosetta-icons";
import { MultiColumn } from "@sqs/rosetta-icons";
import SidePanelNav from "../components/SidePanelNav/SidePanelNav";

export default function Home() {
  const { Option } = SegmentedControl;
  const [value, setValue] = React.useState(1);
  return (
    <ThemeContext.Provider theme={rosetta.default}>
      <I18nContext.Provider
        value={{
          translationLocale: "en-US",
          formattingLocale: "en-US",
        }}
      >
        <div className="container full-width">
          <Grid.Container gridConstraint={12}>
            <Grid.Item columns={[12, 3]}>
              <SidePanelNav />
            </Grid.Item>
            <Grid.Item columns={[12, 9]}>
              <PageHeader>
                <PageHeader.Body>
                  <PageHeader.Title title="Dashboard" />
                  <PageHeader.Actions>
                    <Breakpoint.Provider>
                      <Breakpoint.Renderer
                        render={{
                          default: () => (
                            <>
                              <Button.Primary>Create Website</Button.Primary>
                              <SegmentedControl onChange={setValue} value={value}>
                                <Option value={1} data-test="id-1">
                                  <Website />
                                </Option>
                                <Option value={2} data-test="id-2">
                                  <MultiColumn />
                                </Option>
                              </SegmentedControl>
                            </>
                          ),
                          "mobile-0": () => (
                            <>
                              <Button.Primary>Create Website</Button.Primary>
                              <Touchable.Element.Icon
                                aria-label="Extra Options"
                                onClick={() => {}}
                              >
                                <Ellipses />
                              </Touchable.Element.Icon>
                            </>
                          ),
                        }}
                      />
                    </Breakpoint.Provider>
                  </PageHeader.Actions>
                </PageHeader.Body>
              </PageHeader>
            </Grid.Item>
          </Grid.Container>
        </div>
      </I18nContext.Provider>
    </ThemeContext.Provider>
  );
}
