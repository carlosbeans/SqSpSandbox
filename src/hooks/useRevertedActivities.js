import * as React from "react";
import { useParams } from "react-router-dom";
import {
  readRevertedActivities,
  writeRevertedActivity,
} from "../utils/revertedActivities";

export function useRevertedActivities() {
  const { domainId } = useParams();
  const domainName = domainId ? decodeURIComponent(domainId) : "";
  const [reverted, setReverted] = React.useState(() =>
    readRevertedActivities(domainName),
  );

  React.useEffect(() => {
    setReverted(readRevertedActivities(domainName));
  }, [domainName]);

  const markReverted = React.useCallback(
    (activityId, record) => {
      if (!domainName) return;
      setReverted(writeRevertedActivity(domainName, activityId, record));
    },
    [domainName],
  );

  return { reverted, markReverted };
}
