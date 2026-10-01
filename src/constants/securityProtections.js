/**
 * Security protection catalogue shared by the Domain Overview score card
 * (`src/components/SecurityScoreCard/SecurityScoreCard.js`) and the Security
 * tab's Advanced protections section (`src/pages/Security.js`).
 *
 * Every domain always has the four base protections plus the account-level
 * 2FA flag. Add-on domains also carry the five ADDON_PROTECTIONS keys in
 * `domain.securityProtections`. `getSecuritySummary` derives the score and
 * rating tier from whichever keys are present, so the rating meter, the
 * "N protections are inactive" copy, and the protection list can never
 * disagree with each other.
 *
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1670-82994
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1673-87804
 */

export const BASE_PROTECTIONS = [
  {
    key: "whoisPrivacy",
    weight: 4,
    title: "WHOIS privacy",
    description:
      "Hides your name and contact details from the public WHOIS directory, so your personal information stays private.",
    linkLabel: "Manage",
    linkTo: "whois-privacy",
  },
  {
    key: "dnssec",
    weight: 4,
    title: "DNSSEC",
    description:
      "Adds cryptographic signatures to DNS records, using a chain of trust to prevent cache poisoning and spoofing.",
  },
  {
    key: "domainLock",
    weight: 4,
    title: "Domain lock",
    description:
      "Prevents unauthorized transfers by restricting changes to your domain's registrar settings without explicit approval.",
  },
  {
    key: "sslCertificate",
    weight: 4,
    title: "SSL certificate",
    description:
      "Replaces your contact info with registrar details, keeping your name hidden from spammers.",
    linkLabel: "View certificate",
  },
];

/**
 * Account-scoped protections. Stored as top-level fields on the domain (not
 * inside `securityProtections`) and deliberately kept out of
 * BASE_PROTECTIONS so the Security tab's per-domain toggle cards are unchanged.
 */
export const ACCOUNT_PROTECTIONS = [
  {
    key: "twoFactorAuth",
    title: "2FA",
    weight: 14,
    description:
      "Adds a second verification step when signing in, protecting your account against takeover.",
    linkLabel: "Account settings",
  },
];

/** Live add-on protections — count toward the security score. */
export const ADDON_PROTECTIONS = [
  {
    key: "protectedActionAlerts",
    weight: 2,
    title: "Protected action alerts",
    description:
      "Sends instant notifications whenever critical domain settings or records are changed.",
  },
  {
    key: "secureEmailForwarder",
    weight: 2,
    title: "Secure email forwarder",
    description:
      "Creates private forwarding addresses so you can receive emails without exposing your personal address.",
    linkLabel: "Manage",
    linkTo: "secure-email-forwarder",
  },
  {
    key: "extendedExpiryProtection",
    weight: 2,
    title: "Extended expiry protection",
    description:
      "An extra 30 days to renew after your domain expires to prevent squatters can act within hours of a lapse.",
    linkLabel: "Renew early",
  },
  {
    key: "improvedDdosPrevention",
    weight: 2,
    title: "Improved DDoS prevention",
    description:
      "Absorbs sudden surges of fake web traffic to keep your website online and accessible during automated attacks.",
    linkLabel: "Manage",
  },
  {
    key: "secondaryDns",
    weight: 2,
    title: "Secondary DNS",
    description:
      "Keeps your website online using backup servers if your main provider experiences an outage.",
    linkLabel: "Manage",
  },
];

/** Upcoming add-on protections — do not count toward the score, no toggle. */
export const COMING_SOON_PROTECTIONS = [
  {
    key: "anycastNetworkPerformance",
    title: "Anycast network performance",
    description:
      "Connects visitors to the closest available server instead of one far away, so your site loads faster wherever they are.",
  },
  {
    key: "dnsHealthAudit",
    title: "DNS health audit",
    description:
      "Checks your DNS and security configuration for misconfigurations and vulnerabilities, with steps to fix each.",
  },
  {
    key: "unlimitedDomainForwarding",
    title: "Unlimited domain forwarding",
    description:
      "Redirects multiple domains to your main site, useful for misspellings, brand variants, and different TLDs.",
  },
  {
    key: "unlimitedEmailForwarding",
    title: "Unlimited email forwarding",
    description:
      "Lets you create unlimited addresses at your domain and forward each to any inbox. Add or remove them anytime.",
  },
  {
    key: "unlimitedDnsRecords",
    title: "Unlimited DNS records",
    description:
      "Lets you add unlimited A, CNAME, MX, and TXT records so any tool or service can be connected to your domain.",
  },
  {
    key: "tertiaryAuthentication",
    title: "Tertiary authentication",
    description:
      "Adds a third verification step for high-risk domain changes to ensure maximum account security.",
  },
  {
    key: "multiUserApprovalLock",
    title: "Multi-user approval lock",
    description:
      "Requires approval from at least two domain managers before sensitive settings or transfers can be changed.",
  },
  {
    key: "subdomainMonitoring",
    title: "Subdomain monitoring",
    description:
      "Scans connected subdomains for security risks and alerts you if unexpected changes occur.",
  },
];

/** Score every Squarespace domain starts with, before any feature weights. */
export const PLATFORM_BASELINE = 60;

/**
 * Rating tiers from the Advanced Security Panel spec. `min` is the lowest
 * score (inclusive) that maps to the tier; ordered ascending.
 */
export const SECURITY_TIERS = [
  { key: "medium", label: "Medium", min: 0 },
  { key: "good", label: "Good", min: 61 },
  { key: "excellent", label: "Excellent", min: 75 },
  { key: "advanced", label: "Advanced", min: 91 },
];

export function getSecurityTier(score) {
  let tierIndex = 0;
  SECURITY_TIERS.forEach((tier, index) => {
    if (score >= tier.min) tierIndex = index;
  });
  return { tierIndex, tier: SECURITY_TIERS[tierIndex] };
}

const RATING_STATUS = {
  advanced: "Your domain has maximum protection.",
  excellent: "Your domain has strong protection.",
  good: "Your domain has good protection.",
  medium: "Your domain has baseline protection.",
};

export function getRatingStatus(tierKey) {
  return RATING_STATUS[tierKey] || RATING_STATUS.medium;
}

/**
 * Score = platform baseline + the weights of every protection that is on.
 * Add-on protections only earn weight when the domain has the add-on, so a
 * fully-configured non-add-on domain tops out at 90 (Excellent). Only
 * protections the domain actually has (base and account-level always, add-on
 * ones only when `securityAddOn` is true) are returned in `inactive`, since
 * those are the only ones with a "Review" action; unavailable add-on
 * protections are surfaced via `addOnProtectionsAvailable` for upsell copy.
 *
 * @param {object} domain
 * @returns {{
 *   score: number,
 *   tier: { key: string, label: string, min: number },
 *   tierIndex: number,
 *   hasAddOn: boolean,
 *   activeCount: number,
 *   totalCount: number,
 *   inactive: Array<{ key: string, title: string }>,
 *   addOnProtectionsAvailable: number,
 * }}
 */
export function getSecuritySummary(domain) {
  const hasAddOn = Boolean(domain?.securityAddOn);
  const protections = domain?.securityProtections || {};

  const isOn = (key, account) =>
    Boolean(account ? domain?.[key] : protections[key]);

  const scored = [
    ...BASE_PROTECTIONS.map((p) => ({ ...p, on: isOn(p.key) })),
    ...ACCOUNT_PROTECTIONS.map((p) => ({ ...p, on: isOn(p.key, true) })),
    ...(hasAddOn
      ? ADDON_PROTECTIONS.map((p) => ({ ...p, on: isOn(p.key) }))
      : []),
  ];

  const earned = scored.reduce((sum, p) => (p.on ? sum + p.weight : sum), 0);
  const score = Math.min(100, PLATFORM_BASELINE + earned);
  const { tier, tierIndex } = getSecurityTier(score);

  return {
    score,
    tier,
    tierIndex,
    hasAddOn,
    activeCount: scored.filter((p) => p.on).length,
    totalCount: scored.length,
    inactive: scored
      .filter((p) => !p.on)
      .map(({ key, title }) => ({ key, title })),
    addOnProtectionsAvailable: hasAddOn ? 0 : ADDON_PROTECTIONS.length,
  };
}
