---
title: Alert Dialog
---

import { Box } from '@sqs/rosetta-primitives';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Description } from '@site/src/components/Markdown/Description';
import { Token } from '@site/src/components/Markdown/Token';
import { alertDialogStories } from './AlertDialog';
import AlertDialogDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/AlertDialog/AlertDialog';

{

<Description>
  A Modal that is used to request confirmation of the terms or consequences of a
  user-selected action.
</Description>
}

:::danger Component Deprecated
This component has been deprecated. Please use the new, redesigned [BasicDialog](/docs/components/compositions/Dialogs/basic-dialog/) component.
:::

<ComponentInformation
  title="AlertDialog"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6448%3A3996"
/>

## Code

### Import

```js
import { Modal } from '@sqs/rosetta-elements';
import { AlertDialog } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={alertDialogStories} />

### Props

<PropTable docs={AlertDialogDocs} />

## Usage

### General guidance

An Alert Dialog is a type of [Modal](/docs/components/elements/Modal) that confirms a user-selected action. They are purposefully disruptive and use an overlay to block the content behind until an action is selected.

---

### Anatomy

![Anatomy of an Alert Dialog](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Title"
  description="Short phrase requesting confirmation or acknowledgement of user-selected action"
/>

<AnatomyListItem
  number="2"
  title="Description"
  description="Brief text explaining the effects or consequences of the action"
/>

<AnatomyListItem
  number="3"
  title="Button Container"
  description="Up to two Buttons; the primary action should be the rightmost Button"
/>

<AnatomyListItem
  number="4"
  title="Checkbox"
  description="An additional confirmation step used for agreements"
/>

---

### Variants

#### Warning

The most common use of an Alert Dialog is to provide a warning when a user has selected an action that is irreversible (e.g. deleting changes).

Use a red danger [Button](/docs/components/primitives/Button) to communicate that the primary action is irreversible or destructive. Pair it with a second Button that allows the user to cancel the action. This teaches the user how the system works (e.g. no automatic saving) and gives them a chance to go back and save, if desired.

![Danger Alert Dialog](./images/variant-danger.png)

#### Additional action

A [Checkbox](/docs/components/elements/Checkbox/Next/) may be used in the Alert Dialog when it is convenient to combine relative actions.

![Alert Dialog with an additional action](./images/variant-confirmation.png)

#### Follow up

Using an Alert Dialog if an action is not permanent or reversible. Context around how to reverse an action should be provided in the previous screen. In rare cases, the follow up variant may be used to help provide additional context.

![Follw up Alert Dialog](./images/variant-default.png)

---

### Specs

| Property | Value                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| Width    | <Token name="sizes.700" themeKey="sizes" />, including <Token name="space[6]" /> left/right padding           |
| Height   | Set by inner content, plus <Token name="space[5]" /> top padding and <Token name="space[3]" /> bottom padding |

![Width of an Alert Dialog](./images/specs-width.png)

![Height of an Alert Dialog](./images/specs-height.png)

---

### Behavior

#### Position

Alert Dialog should load in the center of the screen, with an overlay behind it to block access to the content behind.

#### Buttons

In the Button container, the hierarchy moves from right to left—i.e. the primary action [Button](/docs/components/primitives/Button) goes on the far right. If the primary action is destructive, use a red danger Button. The cancel button, or secondary action, should be positioned on the left.

![Alert Dialog Button hierarchy](./images/behavior-buttons.png)

Alert Dialog should use a maximum of two Buttons. A “Learn more” Button or link should be provided on previous screens in order to avoid taking the user outside of the dialog action. Work with Content Design to resolve any other possible edge cases.

#### Overflow

Content in Alert Dialogs should be kept as concise as possible in all supported languages. If Button labels wrap, work with [Content Design](https://squarespace.slack.com/archives/CLXP6UWSD) to reduce the number of words.

In cases where there is no solve for length, all content will wrap and the height of the dialog will grow. The Button container will also wrap, keeping the primary action in the bottom rightmost position.

#### With a Modal

In cases where a confirmation is needed for a change in a [Modal](/docs/components/elements/Modal), it is acceptable to display an Alert Dialog on top of a Modal. Use a second overlay.

![Alert Dialog on top of a Modal](./images/modal.png)

---

### Content guidance

- The action in the Alert Dialog title should correspond with the primary Button label.
- Warning variant should always be formatted as a question, i.e. “Discard changes?”
- Warning variant description should clearly state how the action cannot be undone or will result in lost content.
- The follow up variant should only be used in cases in which context cannot be provided on prior screen.

---

## Related components

{

<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Modal" description="@sqs/rosetta-elements" url="/docs/components/elements/Modal" />

{' '}

<RelatedLink
  name="Text"
  description="@sqs/rosetta-primitives"
  url="/docs/components/primitives/Text"
/>

{' '}

<RelatedLink
  name="Button"
  description="@sqs/rosetta-primitives"
  url="/docs/components/primitives/Button"
/>

  <RelatedLink name="Checkbox" description="@sqs/rosetta-elements" url="/docs/components/elements/Checkbox/Next/" />
</Box>
}
