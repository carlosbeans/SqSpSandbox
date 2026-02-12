---
title: Fieldset
---

import { Box } from '@sqs/rosetta-primitives';
import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { fieldsetStories } from './Fieldset';
import { RelatedLink } from '@site/src/components/RelatedLink';

{
<Description>
  Fieldset is a foundational form component that groups related form inputs together with a semantic container. It provides structure, accessibility, and state management for groups of form controls like radio buttons, checkboxes, or related inputs. It automatically handles ARIA relationships between legends, descriptions, error messages, and grouped form controls, ensuring your forms are accessible by default.
</Description>
}

<ComponentInformation
  title="Fieldset"
  componentPackage="@sqs/rosetta-primitives"
/>

## Code

### Import

```js
import { Fieldset } from '@sqs/rosetta-primitives';
```

### Examples

<StoryRenderer stories={fieldsetStories} />

## Guidance

### When to use Fieldset

- **Radio button groups**: Use Fieldset to group related radio buttons with a shared legend
- **Checkbox groups**: Group related checkboxes that share a common purpose or category
- **Related form sections**: Group logically related form inputs that belong together conceptually
- **Complex form organization**: Break large forms into logical sections with clear boundaries
- **Accessibility requirements**: Fieldset provides semantic grouping that screen readers understand

### Accessibility features

Fieldset automatically provides:

- **Semantic grouping**: Uses the native `<fieldset>` element to create logical groups of form controls
- **Legend association**: Fieldset.Legend provides the accessible name for the entire group using the `<legend>` element
- **ARIA relationships**: Sets `aria-labelledby` and `aria-describedby` to connect legends and descriptions to the fieldset
- **Disabled state management**: Disabled state cascades to all child form controls within the fieldset
- **Screen reader navigation**: Screen readers announce the fieldset boundary and legend when entering/exiting the group

### Best practices

**✅ Do**

- Use Fieldset for radio button groups that represent a single choice from multiple options
- Use Fieldset for checkbox groups that represent related options
- Provide clear, descriptive legends that explain the purpose of the grouped controls
- Use Fieldset.Description for complex groups that need additional context
- Apply disabled state to the entire fieldset when all controls should be disabled together

**❌ Don't**

- Use Fieldset for single form inputs (use Field instead)
- Nest Fieldset components inside each other
- Use Fieldset purely for visual grouping without semantic meaning
- Skip Fieldset.Legend for groups that need accessible names
- Use Fieldset when inputs are unrelated or serve different purposes

### Validation patterns

Apply validation states to the entire fieldset when the group selection is required. The `invalid` prop controls the display of error messages and applies error styling to the fieldset. See the "Validation with Error State" example above for an interactive demonstration of form validation with error handling.

### Integration with other components

Fieldset works seamlessly with:

- **Radio Groups**: For single-choice selections from multiple options
- **Checkbox Groups**: For multiple selections from related options
- **Field**: Individual Field components can be grouped within a Fieldset for complex form sections
- **Toggle Groups**: For grouped toggle switches that represent related settings
- **Custom form controls**: Any grouped form inputs that need semantic association

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink
    name="Field"
    description="@sqs/rosetta-primitives"
    url="/docs/components/primitives/Field"
  />
</Box>
}
