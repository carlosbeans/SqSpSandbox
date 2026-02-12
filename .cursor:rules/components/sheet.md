---
title: Sheet
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Box } from '@sqs/rosetta-primitives';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Token } from '@site/src/components/Markdown/Token';
import { KeyboardKey } from '@site/src/components/Markdown/KeyboardKey';
import SheetPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Sheet/Sheet';
import SheetDrawerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Sheet/Drawer';
import SheetBodyPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Sheet/Body';
import SheetOverlayPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Sheet/Overlay';
import { sheetStories } from "./Sheet";

import usageDoImage from './images/usage-do.png';
import usageDontImage from './images/usage-dont.png';

{
<Description>
  Sheet — also known as Sliding Sheet — is a modal that is unique to mobile. It slides up from the bottom of the screen and appears above all other content.
</Description>
}

<ComponentInformation
  title="Sheet"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6781%3A5944"
/>

## Code

### Import

```js
import { Sheet } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={sheetStories} />

### Props

<PropTable docs={SheetPropDocs} />

<PropTable docs={SheetDrawerPropDocs} />

<PropTable docs={SheetBodyPropDocs} />

<PropTable docs={SheetOverlayPropDocs} />

## Guidance

### General guidance

Sheets are the way [Modals](/docs/components/elements/Modal), [Dropdowns](/docs/components/compositions/Dropdown/Next) and any other [PopOvers](/docs/components/elements/PopOver) are displayed on mobile. They enable a consistent experience for the user and allow for an optimized experience for any of these overlay components.

Sheets come in two variants: blocking and non-blocking. Blocking Sheets open with an overlay and block the content underneath (Modals, Dropdowns). Non-blocking Sheets allow the user to continue to interact with content underneath (PopOvers).

Sheets can contain several components. Please follow content and accessibility guidelines for respective components inside the Sheet:

- [Cards](/docs/components/elements/Card)
- [Cells](/docs/components/elements/Cell)
- [Tabs](/docs/components/elements/Tabs)

### Content

Sheets can contain several CTAs and options for users to act on. Be sure to make the content clear, short, and use verbs for any actions that can be taken.

When Sheets interrupt a task, avoid adding links that go outside the flow that the user is in.

### Accessibility

Blocking Sheets should close when the user clicks the <KeyboardKey name="Esc" /> key (`closeOnEsc`). Non-blocking Sheets should close when the focus is inside the Sheet and the user clicks the <KeyboardKey name="Esc" /> key.

## Usage

### Anatomy

![Anatomy of a Sheet](./images/anatomy.png)

<AnatomyListItem number="1" title="Container" />

<AnatomyListItem
  number="2"
  title="Toolbar"
  description="Flexible space that can hold a collapsed title and other actionable Buttons"
/>

<AnatomyListItem
  number="3"
  title="Overlay"
  description="Covers and blocks all the content under the sheet, only used in Blocking Sheet"
/>

<AnatomyListItem
  number="4"
  title="Handle"
  description="A visual affordance to Indicate the Sheet is draggable"
/>

---

### Variants

#### Non-blocking

By default, the Sheet displays on top of all content without an overlay. When open, the user can still interact with the content underneath.

![Non-blocking Sheet](./images/variant-default.png)

#### Blocking

Sheets can also open with an overlay, blocking the content underneath. The user must interact with or dismiss the Sheet in order to close it and “unblock” the content underneath. Use this option in components like Action Lists and [Dropdowns](/docs/components/compositions/Dropdown/Next).

![Non-blocking Sheet](./images/variant-blocking.png)

---

### Composition

Any component can go inside a Sheet, they are purposely flexible in order to accomodate any use case. Some common compositions are detailed below.

#### [Cells](/docs/components/elements/Cell)

![Cells in a Sheet](./images/composition-cells.png)

#### [Cards](/docs/components/elements/Card)

![Cards in a Sheet](./images/composition-cards.png)

#### [Tabs](/docs/components/elements/Tabs)

A Sheet can have multiple content sections, split into [Tabs](/docs/components/elements/Tabs). Because the Toolbar and Tabs combined take a large amount of space, consider whether the content sections can be split into multiple Sheets with separate triggers.

![Tabs in a Sheet](./images/composition-tabs.png)

#### Dropdowns

<Dont
  src={usageDontImage}
  description="Don't place a Dropdown inside a Sheet, as it will result in one Sheet on top of another."
/>

<Do
  src={usageDoImage}
  description="Opt for a Disclosure instead of a Dropdown within a Sheet, which will push the user into a panel within the Sheet."
/>

---

### Specs

| Property  | Value                                                                                    |
|-----------|------------------------------------------------------------------------------------------|
| Position  | Anchored to the bottom of the screen                                                     |
| Width     | 100%                                                                                     |
| Height    | Determined by the height of the inner content, max. 50% on display                       |
| Elevation | <Token name="shadows[300]" />                                                            |
| Margin    | <Token name="space[2]" /> below the [Toolbar](/docs/patterns/other/Toolbar)              |
| Padding   | <Token name="space[3]" /> left and right, per the [Grid](/docs/components/elements/Grid) |

![Sheet specs](./images/specs.png)

---

### Behavior

#### Display

The Sheet enters from the bottom and is anchored to the edge of the screen. The initial height of the sheet cannot exceed 50% of the viewport height.

There are three possible scenarios for the initial height of the Sheet:

##### Minimal

The [Toolbar](/docs/patterns/other/Toolbar) is the only visible part of the sheet.

![Minimal Sheet](./images/appearance-minimal.png)

##### Flexible

The height of the content within the Sheet sets the height of the sheet.

![Flexible Sheet](./images/appearance-flexible.png)

##### Capped at 50%

The height of the content within the Sheet is more than 50% of the viewport height, but the Sheet caps at 50% and scrolls within.

![Capped Sheet](./images/appearance-capped.png)

#### Scrolling

If the content of a sheet exceeds 50% of the viewport, the user can scroll through content. A Sheet can also be pulled up by the header to the top of the viewport. If scrolling is required, the Sheet's [Toolbar](/docs/patterns/other/Toolbar) remains sticky at the top.

![Scrolling in a Sheet](./images/scrolling.png)

#### Transitions

When a non-blocking Sheet is pulled up to full screen by the [Toolbar](/docs/patterns/other/Toolbar), the dark overlay fades in, matching the speed of the Sheet transition. The overlay transitions from 0% opacity to 40% opacity. The same in reverse applies when the sheet is pulled down.

![Transitions in a Sheet](./images/transitions.png)

#### Dismissal

A sheet can be dismissed in multiple ways:

- Swiping the Sheet down
- Using a close affordance within the Sheet's [Toolbar](/docs/patterns/other/Toolbar), such as a “Close” button
- Tapping the overlay (blocking variant only)
- Tapping an action within the Sheet (blocking variant only)

#### Sheet and the native keyboard

The system keyboard doesn’t slide on top of the sheet.

When users select any text in the section, the keyboard slides up first. To edit the styles of that section, users can dismiss the keyboard. After dismissing the keyboard, the Sheet slides up.

If a section is already selected and the user taps on text to edit, the modal slides down and the keyboard slides up.

![Sheet and the native keyboard](./images/native-keyboard.png)

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: "1fr 1fr", gap: 2 }}>
  <RelatedLink name="Modal" description="@sqs/rosetta-elements" url="/docs/components/elements/Modal" />

  <RelatedLink name="Toolbar" url="/docs/patterns/other/Toolbar" />
</Box>
}
