---
title: Action Bar
---

import { Box } from '@sqs/rosetta-primitives';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Description } from '@site/src/components/Markdown/Description';
import { Token } from '@site/src/components/Markdown/Token';
import { actionBarStories } from './ActionBar';
import ActionBarDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/ActionBar/ActionBar';
import ActionBarAnimatedContainer from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/ActionBar/ActionBarAnimatedContainer';

{

<Description>
  A bar that allows users to perform single or multiple actions on items. Often
  used with Tables for batch actions.
</Description>
}

<ComponentInformation
  title="ActionBar"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=9076%3A9715"
/>

## Code

### Import

```js
import { ActionBar } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={actionBarStories} />

### Props

<PropTable docs={ActionBarAnimatedContainer} />

<PropTable docs={ActionBarDocs} />

## Usage

### General guidance

The Action Bar allows the user to perform an action on multiple items in a list or [Table](/docs/components/compositions/Table).

The Action Bar can contain a single action or scale up to six actions, though it is advised to limit to three when possible. Depending on the available space, additional actions may collapse into an [Action List](/docs/components/compositions/ActionList) component.

---

### Anatomy

![Anatomy of an Action Bar](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Checkbox"
  description="Used for selecting or deselecting all items"
/>

<AnatomyListItem
  number="2"
  title="Label"
  description="Displays number of selected items"
/>

<AnatomyListItem
  number="3"
  title="Action Button"
  description="Tertiary Button, for any actions that can be applied in bulk"
/>

<AnatomyListItem
  number="4"
  title="Action List"
  description="Actions that don’t fit in the bar show in an Action List"
/>

{

<Box pl={6}>
  <AnatomyListItem number="a" title="Trigger" description="Ellipses Icon, opens the dialog on selection" />

  <AnatomyListItem number="b" title="Dialog" description="Displays in a Sheet on mobile" />
</Box>
}

---

### Specs

The Action Bar is always fixed to the bottom of the viewport and to the sides of the [primary content area](/docs/design/interface-guidelines/primary-content-area). The x-padding of the Action Bar should be adjusted so that the [Checkbox](/docs/components/elements/Checkbox/Next/) in the Action Bar aligns with the Checkboxes in the list or [Table](/docs/components/compositions/Table).

The [Buttons](/docs/components/primitives/Button) are always the tertiary variant in the small size.

![Action Bar alignment, mobile](./images/specs-mobile.png)

![Action Bar alignment with a panel, desktop](./images/specs-desktop-sidebar.png)

![Action Bar alignment without a panel, desktop](./images/specs-desktop.png)

---

### Behavior

#### Visibility

The Action Bar is hidden until the user selects an item. It goes away when the user deselects all items or completes an action.

![Action Bar appearing upon item selection](./images/selection.gif)

#### Select all or none

The user can select the entire list by tapping or clicking the bulk selection tool. A second tap or click will deselect the entire list.

![Select all items via the Action Bar](./images/select-all.gif)

#### Overflow

The Action Bar is designed to handle multiple actions. Place the most important actions at the top of the list. As the width of the container shrinks, and the space between the checkbox label and the leftmost action hits <Token name="space[5]" />, actions move into an Action List.

![Action Bar overflow](./images/overflow.png)

---

### Content guidance

- Actions are designed to reveal themselves at the top level when layout space permits. With this in mind, order actions from most frequently used to least frequently used.
- Single-verb actions are ideal for both space and scanning. When possible, keep Button labels between one to three words.
- Avoid using articles (i.e. “a”, “an”, “the”) and possessive adjectives (i.e. your) in Buttons.
- Action colors should align with Button guidelines (i.e. use red for destructive actions, such as “Delete”).
