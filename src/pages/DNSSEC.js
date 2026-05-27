import { usePageHeader } from "../layouts/PageHeaderContext";

export function DNSSECContent() {
  return null;
}

export default function DNSSEC() {
  usePageHeader({ title: "DNSSEC" });
  return <DNSSECContent />;
}
