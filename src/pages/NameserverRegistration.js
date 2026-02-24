import SidePanelNav from "../components/SidePanelNav/SidePanelNav";
import { Grid } from "@sqs/rosetta-elements";

export default function NameserverRegistration() {
  return (
    <div className="container full-width">
      <Grid.Container gridConstraint={12}>
        <Grid.Item columns={[12, 3]}>
          <SidePanelNav />
        </Grid.Item>
        <Grid.Item columns={[12, 9]}>
          <h1>Nameserver Registration</h1>
        </Grid.Item>
      </Grid.Container>
    </div>
  );
}
