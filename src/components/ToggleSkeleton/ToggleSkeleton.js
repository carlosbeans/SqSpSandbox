import * as React from "react";
import { Skeleton } from "@sqs/rosetta-react";

/**
 * Placeholder shown in a toggle's place while the domain record loads, so an
 * unknown protection never renders as "off". Sized from the same tokens as
 * Rosetta's toggle indicator.
 */
export default function ToggleSkeleton({ label }) {
  return (
    <Skeleton
      height="sizes.125"
      width="sizes.175"
      aria-label={label}
      sx={{ borderRadius: "pill", flexShrink: 0 }}
    />
  );
}
