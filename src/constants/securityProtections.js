/**
 * Security protection catalogue shared by the Domain Overview score card
 * (`src/components/SecurityScoreCard/SecurityScoreCard.js`) and the Security
 * tab's Advanced protections section (`src/pages/Security.js`).
 *
 * Every domain always has the four base protections. Add-on domains also
 * carry the five ADDON_PROTECTIONS keys in `domain.securityProtections`.
 * `getSecuritySummary` derives a single score from whichever keys are
 * present, so the gauge, the "N protections are inactive" copy, and the
 * protection chips can never disagree with each other.
 *
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1670-82994
 * @see https://www.figma.com/design/7SPZm4hGkNBvVaMmSOhd9s/Security-on-Domains?node-id=1673-87804
 */

export const BASE_PROTECTIONS = [
  {
    key: "whoisPrivacy",
    title: "WHOIS privacy",
    description:
      "Hides your name and contact details from the public WHOIS directory, so your personal information stays private.",
    linkLabel: "Manage",
    linkTo: "registration",
  },
  {
    key: "dnssec",
    title: "DNSSEC",
    description:
      "Adds cryptographic signatures to DNS records, using a chain of trust to prevent cache poisoning and spoofing.",
  },
  {
    key: "domainLock",
    title: "Domain lock",
    description:
      "Prevents unauthorized transfers by restricting changes to your domain's registrar settings without explicit approval.",
  },
  {
    key: "sslCertificate",
    title: "SSL certificate",
    description:
      "Replaces your contact info with registrar details, keeping your name hidden from spammers.",
    linkLabel: "View certificate",
  },
];

/** Live add-on protections — count toward the security score. */
export const ADDON_PROTECTIONS = [
  {
    key: "protectedActionAlerts",
    title: "Protected action alerts",
    description:
      "Sends instant notifications whenever critical domain settings or records are changed.",
  },
  {
    key: "secureEmailForwarder",
    title: "Secure email forwarder",
    description:
      "Creates private forwarding addresses so you can receive emails without exposing your personal address.",
    linkLabel: "Manage",
  },
  {
    key: "extendedExpiryProtection",
    title: "Extended expiry protection",
    description:
      "An extra 30 days to renew after your domain expires to prevent squatters can act within hours of a lapse.",
    linkLabel: "Renew early",
  },
  {
    key: "improvedDdosPrevention",
    title: "Improved DDoS prevention",
    description:
      "Absorbs sudden surges of fake web traffic to keep your website online and accessible during automated attacks.",
    linkLabel: "Manage",
  },
  {
    key: "secondaryDns",
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

const SCORE_PENALTY_PER_INACTIVE = 5;

/**
 * Score treats every domain as having all 9 protections: base protections
 * that are off count as inactive, and — for domains without the add-on —
 * the 5 add-on protections count as inactive too (since they aren't
 * available at all), which is why a fully-protected non-add-on domain
 * still scores 75% instead of 100%. Only protections the domain actually
 * has (base always, add-on ones only when `securityAddOn` is true) are
 * returned in `inactive`, since those are the only ones with a "Review"
 * action; the unavailable add-on protections are surfaced separately via
 * `addOnProtectionsAvailable` for an upsell message instead.
 *
 * @param {object} domain
 * @returns {{
 *   score: number,
 *   hasAddOn: boolean,
 *   inactive: Array<{ key: string, title: string }>,
 *   addOnProtectionsAvailable: number,
 * }}
 */
export function getSecuritySummary(domain) {
  const hasAddOn = Boolean(domain?.securityAddOn);
  const protections = domain?.securityProtections || {};

  const inactive = BASE_PROTECTIONS.filter(({ key }) => !protections[key]);
  let inactiveCount = inactive.length;

  if (hasAddOn) {
    const inactiveAddOn = ADDON_PROTECTIONS.filter(
      ({ key }) => !protections[key],
    );
    inactive.push(...inactiveAddOn);
    inactiveCount += inactiveAddOn.length;
  } else {
    inactiveCount += ADDON_PROTECTIONS.length;
  }

  const score = Math.max(
    0,
    100 - inactiveCount * SCORE_PENALTY_PER_INACTIVE,
  );

  return {
    score,
    hasAddOn,
    inactive: inactive.map(({ key, title }) => ({ key, title })),
    addOnProtectionsAvailable: hasAddOn ? 0 : ADDON_PROTECTIONS.length,
  };
}
