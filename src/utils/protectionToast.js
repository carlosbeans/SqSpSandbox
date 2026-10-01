/**
 * Shows a success toast after a security protection is turned on or off.
 * `toastRef` points at a Rosetta `Toast.Container`.
 */
export function showProtectionToast(toastRef, title, enabled) {
  toastRef?.current?.show({
    content: `${title} turned ${enabled ? "on" : "off"}`,
    variant: "success",
    duration: 4000,
  });
}
