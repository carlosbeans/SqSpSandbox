---
title: Field
---

import { Box } from '@sqs/rosetta-primitives';
import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { fieldStories } from './Field';
import { RelatedLink } from '@site/src/components/RelatedLink';

{

<Description>
  Field is a foundational form component that provides structure, accessibility,
  and state management for individual form inputs. It automatically handles ARIA
  relationships between labels, descriptions, error messages, and form controls,
  ensuring your forms are accessible by default.
</Description>
}

<ComponentInformation
  title="Field"
  componentPackage="@sqs/rosetta-primitives"
/>

## Code

### Import

```js
import { Field } from '@sqs/rosetta-primitives';
```

### Examples

<StoryRenderer stories={fieldStories} />

## Guidance

### When to use Field

- **Individual form inputs**: Use Field to wrap any form input (TextInput, Dropdown, Textarea, etc.) that needs a label, description, or error message
- **Accessibility requirements**: Field automatically manages ARIA attributes and ID relationships for screen readers
- **Form validation**: Field provides consistent styling and structure for error states
- **Consistent spacing**: Field ensures uniform spacing and layout across your form fields

### Accessibility features

Field automatically provides:

- **ID management**: Generates unique IDs and properly links labels to inputs using `htmlFor`/`id` attributes
- **ARIA relationships**: Sets `aria-describedby` to connect descriptions and error messages to the input
- **Error announcements**: Error messages are properly announced to screen readers when validation fails
- **Disabled state propagation**: Disabled state cascades to all child components consistently

### Best practices

**✅ Do**

- Always wrap form inputs with Field.Root when they need labels or descriptions
- Use Field.Label for all form input labels to ensure proper accessibility
- Include Field.Description for complex inputs that need additional context
- Use Field.Error for validation messages that appear conditionally

**❌ Don't**

- Use Field for purely decorative text near inputs (use regular Text components instead)
- Nest Field components inside each other
- Skip Field.Label for inputs that need labels (use `aria-label` on the input as an alternative only when necessary)

### Validation patterns

```jsx
const [isInvalid, setIsInvalid] = useState(false);

return (
  <Field.Root invalid={isInvalid} name="email">
    <Field.Label>Email Address</Field.Label>
    <Field.Description>We'll never share your email</Field.Description>
    <TextInput onChange={handleValidation} value={email} />
    <Field.Error>Please enter a valid email address</Field.Error>
  </Field.Root>
);
```

### Integration with other components

Field works seamlessly with:

- [**TextInput**](/docs/components/elements/TextInput/Next)
- [**Dropdown**](/docs/components/compositions/Dropdown/Next)
- [**Textarea**](/docs/components/elements/Textarea/Next)
- [**Checkbox**](/docs/components/elements/Checkbox/Next) (when used individually, use Fieldset for groups)
- [**Radio**](/docs/components/primitives/Radio/Next) (when used individually, use Fieldset for groups)
- **Custom inputs** (any form control that needs labels and descriptions)

---

## Related components

{

<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink
    name="Fieldset"
    description="@sqs/rosetta-primitives"
    url="/docs/components/primitives/Fieldset"
  />
</Box>
}
