import React from "react";
import "./DNS_Settings.scss";
import SidePanelNav from "../components/SidePanelNav/SidePanelNav";
import { Grid } from "@sqs/rosetta-elements";

export default function DNS_Settings() {
  return (
    <div className="container full-width">
      <Grid.Container gridConstraint={12}>
        <Grid.Item columns={[12, 3]}>
          <SidePanelNav />
        </Grid.Item>
        <Grid.Item columns={[12, 9]}>
          <h1>DNS Settings</h1>
          <p>
            DNS records point to services your domain uses, like forwarding your
            domain or setting up an email service.
          </p>
        </Grid.Item>
      </Grid.Container>
    </div>
  );
}
