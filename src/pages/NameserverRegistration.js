import { usePageHeader } from "../layouts/PageHeaderContext";

export function NameserverRegistrationContent() {
  return null;
}

export default function NameserverRegistration() {
  usePageHeader({ title: "Nameserver Registration" });
  return <NameserverRegistrationContent />;
}
