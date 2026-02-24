import WebsitePreview from "../components/WebsitePreview/WebsitePreview";
import "../styles/styles.scss";
import { rosetta } from "@sqs/rosetta-themes";
import { ThemeContext } from "@sqs/rosetta-styled";
import { Button } from "@sqs/rosetta-primitives";

export default function Websites() {
  return (
    <ThemeContext.Provider theme={rosetta.dark}>
      <div className="container">
        <div className="row space-between">
          <h1>Dashboard</h1>
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
