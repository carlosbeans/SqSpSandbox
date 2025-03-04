// SafeError.js
import { useRouteError } from "react-router-dom";

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
    <div>
      <h1>:/ Oh shit, y'all done fucked up now.</h1>
      <h2>{errorInfo.statusText || errorInfo.message}</h2>
    </div>
  );
}
