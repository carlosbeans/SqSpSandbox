import * as React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Button, Flex } from "@sqs/rosetta-primitives";

const entrance = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

function getRouteErrorMessage(error) {
  if (error == null) return "An unknown error occurred.";
  if (typeof error === "string") return error;
  if (error instanceof Error)
    return error.message || "An unknown error occurred.";
  if (typeof error.message === "string") return error.message;
  if (typeof error.statusText === "string" && error.statusText)
    return error.statusText;
  return "An unknown error occurred.";
}

/**
 * Presentational full-page error layout. Use anywhere you already have a title and description.
 */
export function ErrorState({
  title = "Something went wrong",
  description,
  primaryLabel = "Back to dashboard",
  onPrimary,
}) {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] };

  return (
    <motion.div
      variants={entrance}
      initial="initial"
      animate="animate"
      transition={transition}
      style={{
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100dvh",
        paddingInline: 32,
      }}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        gap={4}
        sx={{
          width: "100%",
          maxWidth: "480px",
          textAlign: "center",
        }}
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          gap={2}
          sx={{ width: "100%" }}
        >
          <h1>{title}</h1>
          {description ? <h2>{description}</h2> : null}
        </Flex>
        {onPrimary ? (
          <Button.Primary type="button" onClick={onPrimary}>
            {primaryLabel}
          </Button.Primary>
        ) : null}
      </Flex>
    </motion.div>
  );
}

/**
 * Router error boundary page — use as route `errorElement`.
 */
export default function RouteErrorState() {
  const error = useRouteError();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.error(error);
  }, [error]);

  const description = getRouteErrorMessage(error);

  return (
    <ErrorState
      description={description}
      onPrimary={() => navigate("/", { replace: true })}
    />
  );
}
