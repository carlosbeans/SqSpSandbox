import { Outlet } from "react-router-dom";
import { Grid } from "@sqs/rosetta-elements";
import SidePanelNav from "../components/SidePanelNav/SidePanelNav";

export default function DomainLayout() {
  return (
    <div className="container full-width">
      <Grid.Container gridConstraint={12}>
        <Grid.Item columns={[12, 2]}>
          <SidePanelNav />
        </Grid.Item>
        <Grid.Item columns={[12, 10]}>
          <Outlet />
        </Grid.Item>
      </Grid.Container>
    </div>
  );
}
