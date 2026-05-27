import { usePageHeader } from "../layouts/PageHeaderContext";

export default function Email() {
  usePageHeader({ title: "Email", subtitle: "Manage your domain's email settings. Learn more about email" });
  return null;
}
