import WebsitePreview from "../components/WebsitePreview/WebsitePreview";
import "../styles/styles.scss";
import { rosetta } from "@sqs/rosetta-themes";
import { ThemeContext } from "@sqs/rosetta-styled";
import { Button } from "@sqs/rosetta-primitives";
import { PageHeader } from "@sqs/rosetta-compositions";
import { Banner } from "@sqs/rosetta-compositions/banner/next";
import { Breakpoint } from "@sqs/rosetta-utilities";
import { Touchable } from "@sqs/rosetta-primitives";
import { Print, Ellipses } from "@sqs/rosetta-icons";

export default function Websites() {
  // #region agent log
  fetch("http://127.0.0.1:7242/ingest/a68b89c3-a8fd-4d27-8840-939e3ec42511", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "716dd8",
    },
    body: JSON.stringify({
      sessionId: "716dd8",
      location: "Websites.js:render",
      message: "Post-fix component check",
      data: {
        Banner: typeof Banner,
        "Banner.Main": typeof Banner?.Main,
        "Banner.Row": typeof Banner?.Row,
        "Banner.Glyph": typeof Banner?.Glyph,
        "Banner.Column": typeof Banner?.Column,
        "Banner.Action": typeof Banner?.Action,
        "Banner.Close": typeof Banner?.Close,
      },
      timestamp: Date.now(),
      runId: "post-fix",
      hypothesisId: "A-verify",
    }),
  }).catch(() => {});
  // #endregion
  return (
    <ThemeContext.Provider theme={rosetta.dark}>
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title
            subtitle="Modern solutions making it with Squarespace"
            title="L1-2 Page Title"
          />
          <PageHeader.Actions>
            <Breakpoint.Provider>
              <Breakpoint.Renderer
                render={{
                  default: () => (
                    <>
                      <Button.Tertiary>Button</Button.Tertiary>
                      <Button.Primary>Button</Button.Primary>
                      <Touchable.Element.Icon
                        aria-label="Print icon"
                        onClick={() => {}}
                      >
                        <Print />
                      </Touchable.Element.Icon>
                      <Touchable.Element.Icon
                        aria-label="Extra Options"
                        onClick={() => {}}
                      >
                        <Ellipses />
                      </Touchable.Element.Icon>
                    </>
                  ),
                  "mobile-0": () => (
                    <>
                      <Button.Primary>Button</Button.Primary>
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
        <Banner>
          <Banner.Main>
            <Banner.Row>
              <Banner.Glyph />
              <Banner.Column>
                <Banner.Title>Title</Banner.Title>
                <Banner.Body>Description</Banner.Body>
              </Banner.Column>
            </Banner.Row>
            <Banner.Action>Action</Banner.Action>
          </Banner.Main>
          <Banner.Close />
        </Banner>
      </PageHeader>
      <div className="container">
        <div className="row space-between">
          <h1 ref={el => {
            // #region agent log
            if (el) { const cs = window.getComputedStyle(el); fetch('http://127.0.0.1:7242/ingest/a68b89c3-a8fd-4d27-8840-939e3ec42511',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'716dd8'},body:JSON.stringify({sessionId:'716dd8',location:'Websites.js:h1-ref',message:'h1 computed styles',data:{color:cs.color,backgroundColor:cs.backgroundColor,parentBg:window.getComputedStyle(el.parentElement).backgroundColor,bodyBg:window.getComputedStyle(document.body).backgroundColor,themeScope:'rosetta.dark wraps h1'},timestamp:Date.now(),runId:'h1-style',hypothesisId:'theme-scope'})}).catch(()=>{}); }
            // #endregion
          }}>Dashboard</h1>
          <Button buttonLabel={"Create Website"} />
          <Button backgroundColor="pink.200">click me</Button>
        </div>

        <div className="websitesGrid">
          <WebsitePreview />

          <WebsitePreview>
            <div className="websiteActions">
              <Button buttonLabel={"Edit"} />
              <Button buttonLabel={"Delete"} />
            </div>
          </WebsitePreview>

          <WebsitePreview>
            <div className="websiteStatus">
              <p>Status: Live</p>
              <p>Visitors: 1,234</p>
            </div>
          </WebsitePreview>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
