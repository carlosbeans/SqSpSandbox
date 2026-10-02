const STORAGE_PREFIX = "sqsp-sandbox:reverted-activities:";

export function readRevertedActivities(domainName) {
  if (!domainName) return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_PREFIX + domainName);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function writeRevertedActivity(domainName, activityId, record) {
  const next = { ...readRevertedActivities(domainName), [activityId]: record };
  try {
    window.sessionStorage.setItem(STORAGE_PREFIX + domainName, JSON.stringify(next));
  } catch {
    // Storage can be blocked or full; callers keep the in-memory state.
  }
  return next;
}
