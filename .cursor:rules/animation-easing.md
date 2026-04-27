## Animation Easing Curves

Use these easing curves for all UI motion work in this project unless a component guideline explicitly overrides them.

### Required Curves

- Entrance animations must use `cubic-bezier(0.32, 0.94, 0.60, 1.00)`.
- Exit animations must use `cubic-bezier(0.40, 0, 0.68, 0.06)`.

### Scope

- Apply to component enter/exit transitions.
- Apply to page and route transitions.
- Apply to open/close transitions for overlays like dialogs, drawers, popovers, sheets, and toasts.

### Implementation Guidance

- Prefer shared motion tokens/variants over per-component inline easing values.
- Keep animation durations aligned with existing project motion timing conventions.
- Respect reduced-motion preferences when implementing animated behaviors.

### Example

```ts
export const ease = {
  entrance: [0.32, 0.94, 0.60, 1.00],
  exit: [0.40, 0, 0.68, 0.06],
} as const;
```
