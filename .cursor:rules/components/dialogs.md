---
title: Dialogs
---

import { Box } from '@sqs/rosetta-primitives';
import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { RelatedLink } from '@site/src/components/RelatedLink';

{

<Description>
  Dialogs (the generic term to describe a grouping of UI known by other names
  such as, "Overlays," "Sheets," and "Modals") are temporary UI windows that
  appear on top of the main interface to prompt users for input, provide
  information or require a decision to proceed.
</Description>
}

<ComponentInformation
  title="Dialogs"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?node-id=1-830"
/>

## FAQ

### What distinguishes the components within Dialogs?

| Type              | Primary Actions | Size | Sequential                    |
| ----------------- | --------------- | ---- | ----------------------------- |
| Basic Dialog      | One             | XS   | No, seeking quick input       |
| Dialog            | Few             | S, M | No, seeking quick input       |
| Multi-step Dialog | Some            | S, M | Yes, flow must be sequential  |
| Side Drawer       | Many            | L    | No, action done in any order  |
| Drawer w/Steps    | Many            | XL   | Yes, flow must be sequential  |
| Drawer w/Nav      | Many            | XL   | No, actions done in any order |
| Drawer            | Many            | XL   | No, actions done in any order |

### How are Dialogs structured?

All Dialogs use a Header, Body, and Footer.

## Best Practices

### When to use:

- Grabbing a user’s attention and requiring focused interaction before they are able to continue using the product
- Interrupting the user’s flow by notifying them of a warning or a response to their actions
- Confirming a user’s decision by describing the action being confirmed and explaining any potential consequences

### When not to use:

- Showing error states, loading screens, or success states
- Educating users about product areas or promoting a new feature or product; use [`FeaturePromo`](/docs/dashboard/components/FeaturePromo/) or [`Card`](/docs/components/elements/Card#composition)
- Presenting responsive information that doesn’t require an action; use [`Toast`](/docs/components/elements/Toast/)
- Communicating a persistent state on page or form; use [`Banner`](/docs/components/compositions/Banner/#guidance)
- Sending the user out of the page if the task requires concentration or if data could be lost if the user abandons the task
- During navigation change, page load, or other cases where the user has not explicitly initiated an action

## Content

- Actions should be one or two words:
  - Don’t use articles like “an” or “the”
  - No more than 3 actions or 4 icon buttons
    - **Exception: Basic Dialog has a maximum of 2 actions**
  - Destructive actions always shown on the left
  - Forward actions always shown on the right

## Related Components

{

<Box display="grid" gap={2} sx={{ gridTemplateColumns: '1fr 1fr' }}>
  <RelatedLink name="Basic Dialog" description="@sqs/rosetta-compositions" url="/docs/components/compositions/Dialogs/basic-dialog/" />

{' '}
<RelatedLink
  name="Dialog"
  description="@sqs/rosetta-compositions"
  url="/docs/components/compositions/Dialogs/Dialog/"
/>

  <RelatedLink name="Drawer" description="@sqs/rosetta-compositions" url="/docs/components/compositions/Dialogs/Drawer/" />
</Box>
}
