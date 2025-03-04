import { useRouteError } from "react-router-dom";

export default function Error() {
  /*
  This version wraps the useRouteError hook in
  a try-catch block. If it's used within the router's error
  boundary context, it will work normally.
  If it's accidentally rendered elsewhere, it will gracefully
  fall back to a default error message.
  */

  let errorMessage = "An unknown error occurred";
  let errorDetails = {};

  try {
    const error = useRouteError();
    console.error(error);
    errorDetails = error; // Store the whole error object
    errorMessage = error.statusText || error.message || errorMessage;
  } catch (e) {
    console.error("Could not access route error:", e);
  }

  return (
    <div>
      <h1>:/ Oh shit, y'all done fucked up now.</h1>
      <h2>{errorMessage}</h2>
      {errorDetails.statusText && <h2>{errorDetails.statusText}</h2>}
    </div>
  );
}
