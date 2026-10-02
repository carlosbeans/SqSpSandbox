import {
  SANDBOX_USER_DEVICE,
  SANDBOX_USER_FULL_LOCATION,
  SANDBOX_USER_IP,
  SANDBOX_USER_LOCATION,
} from "./sandboxUser";

export const DOMAIN_ACTIVITY = [
  {
    id: "registered-domain",
    action: "Registered domain",
    name: "Carlos Andujar",
    location: "Atlanta, GA",
    time: "3 days ago",
    date: "Sunday Sep 27, 2026",
    clockTime: "10:25:05 GMT",
    fullLocation: "Atlanta, GA, USA",
    ip: "108.60.123.78",
    device: "Chrome on Mac",
    revertUntil: "Oct 4, 2026 at 10:25 AM",
    changes: [
      { field: "Status", before: "Available", after: "Registered" },
      { field: "Registrant", before: "None", after: "Carlos Andujar" },
      { field: "Term", before: "None", after: "1 year" },
      { field: "Auto-renew", before: "Off", after: "On" },
    ],
  },
  {
    id: "transferred-domain",
    action: "Transferred domain",
    name: "Laura Lejano",
    location: "Richmond, VA",
    time: "5 hrs ago",
    date: "Wednesday Sep 30, 2026",
    clockTime: "13:12:44 GMT",
    fullLocation: "Richmond, VA, USA",
    ip: "72.14.201.36",
    device: "Safari on Mac",
    revertUntil: "Oct 3, 2026 at 1:12 PM",
    revertWarning: "Reverting a transfer may take up to 24 hours and can briefly interrupt your website and email.",
    changes: [
      { field: "Registrar", before: "GoDaddy", after: "Squarespace" },
      { field: "Transfer lock", before: "Unlocked", after: "Locked" },
      { field: "Expires", before: "Jan 12, 2027", after: "Jan 12, 2028" },
      { field: "Name servers", before: "ns1.godaddy.com", after: "ns1.squarespacedns.com" },
    ],
  },
  {
    id: "renewed-domain",
    action: "Renewed domain",
    name: "Carlos Andujar",
    location: "Atlanta, GA",
    time: "2 weeks ago",
    date: "Wednesday Sep 16, 2026",
    clockTime: "18:45:10 GMT",
    fullLocation: "Atlanta, GA, USA",
    ip: "108.60.123.78",
    device: "Chrome on Mac",
    revertUntil: "Sep 19, 2026 at 6:45 PM",
    changes: [
      { field: "Expires", before: "Sep 16, 2026", after: "Sep 16, 2027" },
      { field: "Term", before: "1 year", after: "2 years" },
      { field: "Payment method", before: "Visa ending 4242", after: "Visa ending 4242" },
      { field: "Auto-renew", before: "On", after: "On" },
    ],
  },
  {
    id: "updated-dns-records",
    action: "Updated DNS records",
    name: "Laura Lejano",
    location: "Richmond, VA",
    time: "1 mon ago",
    date: "Sunday Aug 30, 2026",
    clockTime: "20:30:27 GMT",
    fullLocation: "Richmond, VA, USA",
    ip: "72.14.201.36",
    device: "Firefox on Windows",
    revertUntil: "Sep 2, 2026 at 8:30 PM",
    revertWarning: "DNS changes can take up to 48 hours to propagate, so your site or email may be unavailable in the meantime.",
    changes: [
      { field: "A record", before: "198.49.23.144", after: "198.185.159.144" },
      { field: "CNAME (www)", before: "ext-cust.squarespace.com", after: "ext-sq.squarespace.com" },
      { field: "MX record", before: "mx1.mail.example.com", after: "aspmx.l.google.com" },
      { field: "TXT record", before: "None", after: "v=spf1 include:_spf.google.com ~all" },
    ],
  },
  {
    id: "connected-website",
    action: "Connected website",
    name: "Carlos Andujar",
    location: "Atlanta, GA",
    time: "6 mon ago",
    date: "Monday Mar 30, 2026",
    clockTime: "15:20:02 GMT",
    fullLocation: "Atlanta, GA, USA",
    ip: "108.60.123.78",
    device: "Chrome on Mac",
    revertUntil: "Apr 2, 2026 at 3:20 PM",
    changes: [
      { field: "Website", before: "Not connected", after: "My Squarespace Site" },
      { field: "Primary domain", before: "mysite.squarespace.com", after: "ramensuperstarsatl.com" },
      { field: "SSL", before: "Not issued", after: "Active" },
      { field: "Redirect www", before: "Off", after: "On" },
    ],
  },
  {
    id: "enabled-dnssec",
    action: "Enabled DNSSEC",
    name: "Laura Lejano",
    location: "Richmond, VA",
    time: "1 year ago",
    date: "Tuesday Sep 30, 2025",
    clockTime: "12:05:51 GMT",
    fullLocation: "Richmond, VA, USA",
    ip: "72.14.201.36",
    device: "Safari on iPhone",
    revertUntil: "Oct 3, 2025 at 12:05 PM",
    changes: [
      { field: "DNSSEC", before: "Disabled", after: "Enabled" },
      { field: "Algorithm", before: "None", after: "13 (ECDSA P-256)" },
      { field: "Digest type", before: "None", after: "2 (SHA-256)" },
      { field: "Key tag", before: "None", after: "2371" },
    ],
  },
];

export const REVERT_ID_PREFIX = "revert-";

function formatShortDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatRelativeTime(isoString) {
  const then = isoString ? new Date(isoString) : null;
  if (!then || Number.isNaN(then.getTime())) return "Just now";
  const minutes = Math.floor((Date.now() - then.getTime()) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hr" : "hrs"} ago`;
  return formatShortDate(then);
}

function formatClockTimeGmt(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} GMT`;
}

export function buildRevertActivity(original, record) {
  const revertedAt = record.revertedAt ? new Date(record.revertedAt) : null;
  const hasValidDate = revertedAt && !Number.isNaN(revertedAt.getTime());
  return {
    id: `${REVERT_ID_PREFIX}${original.id}`,
    isRevert: true,
    action: `Reverted: ${original.action}`,
    name: record.revertedBy,
    location: SANDBOX_USER_LOCATION,
    time: formatRelativeTime(record.revertedAt),
    date: hasValidDate
      ? `${revertedAt.toLocaleDateString("en-US", { weekday: "long" })} ${formatShortDate(revertedAt)}`
      : record.revertedOn,
    clockTime: hasValidDate ? formatClockTimeGmt(revertedAt) : "—",
    fullLocation: SANDBOX_USER_FULL_LOCATION,
    ip: SANDBOX_USER_IP,
    device: SANDBOX_USER_DEVICE,
    revertedAtMs: hasValidDate ? revertedAt.getTime() : 0,
    changes: original.changes
      .filter((change) => change.before !== change.after)
      .map((change) => ({
        field: change.field,
        before: change.after,
        after: change.before,
      })),
  };
}

export function getRevertActivities(reverted = {}) {
  return DOMAIN_ACTIVITY.filter((activity) => reverted[activity.id])
    .map((activity) => buildRevertActivity(activity, reverted[activity.id]))
    .sort((a, b) => b.revertedAtMs - a.revertedAtMs);
}

export function findActivityById(activityId, reverted = {}) {
  if (activityId?.startsWith(REVERT_ID_PREFIX)) {
    const originalId = activityId.slice(REVERT_ID_PREFIX.length);
    const original = DOMAIN_ACTIVITY.find((activity) => activity.id === originalId);
    const record = reverted[originalId];
    return original && record ? buildRevertActivity(original, record) : null;
  }
  return DOMAIN_ACTIVITY.find((activity) => activity.id === activityId) || null;
}
