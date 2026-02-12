// SafeError.js
import { useRouteError } from "react-router-dom";
import { Button } from '@sqs/rosetta-primitives';
import { Grid } from '@sqs/rosetta-elements';



export default function SafeError() {
  // Check if we're in a router context
  let isInErrorBoundary = false;
  let errorInfo = { message: "Unknown error" };

  try {
    // This will throw if not in a data router context
    errorInfo = useRouteError() || errorInfo;
    isInErrorBoundary = true;
  } catch (e) {
    console.error("Not in router error boundary context");
  }

  // If we're not in an error boundary, we might be rendered directly
  if (!isInErrorBoundary) {
    return (
      <div>
        <h1>Application Error</h1>
        <p>The application encountered an unexpected error.</p>
      </div>
    );
  }

  // We're in an error boundary, so we can use the error info
  return (
    <Grid.Container gridConstraint={12}>
      <Grid.Item columns={12} mb={1}>      
      <h1>:/ Oh shit, y'all done fucked up now.</h1>
      <h2>{errorInfo.statusText || errorInfo.message}</h2>
      </Grid.Item>

      <Grid.Item columns={12} mb={1}>
          <Button.Primary>Back to the Account Dashboard</Button.Primary>
      </Grid.Item>
    </Grid.Container>
  );
}
