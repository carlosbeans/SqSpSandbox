//css
import "../styles/styles.scss";
import SidePanelNav from "../components/SidePanelNav/SidePanelNav";
import { Grid } from "@sqs/rosetta-elements";

export default function CodePreview() {
  return (
    <div className="container full-width">
      <Grid.Container gridConstraint={12}>
        <Grid.Item columns={[12, 3]}>
          <SidePanelNav />
        </Grid.Item>
        <Grid.Item columns={[12, 9]}>
          <h1>Code Preview</h1>
          <div className="codeBlock">
            <code></code>
          </div>
        </Grid.Item>
      </Grid.Container>
    </div>
  );
}
