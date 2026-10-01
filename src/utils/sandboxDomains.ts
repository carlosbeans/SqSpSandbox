interface SandboxScopedDomain {
  sandboxSingleDomain?: boolean;
}

/**
 * With the Single-domain sandbox flag on, only the domain marked
 * `sandboxSingleDomain` in the mock data is shown in the Domains list and
 * the side-panel domain switcher.
 */
export function getVisibleDomains<T extends SandboxScopedDomain>(
  domains: T[],
  singleDomainEnabled: boolean,
): T[] {
  if (!singleDomainEnabled) return domains;
  return domains.filter((domain) => domain.sandboxSingleDomain);
}
