---
title: Action List
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Token } from '@site/src/components/Markdown/Token';
import { KeyboardKey } from '@site/src/components/Markdown/KeyboardKey';
import { Do } from "@site/src/components/Markdown/Do";
import { Dont } from "@site/src/components/Markdown/Dont";
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Box } from '@sqs/rosetta-primitives';
import ActionListSheetDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/ActionList/ActionListSheet';
import ActionListPopOverDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/ActionList/ActionListPopOver';
import ActionListItemDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/ActionList/ActionListItem';
import { actionListStories } from "./ActionList";

import usageDoImage from './images/usage-do.png';
import usageDontImage from './images/usage-dont.png';

{
<Description>
  An Action List displays a list of secondary actions to the user that are concealed either because of space constraints, or to limit distractions.
</Description>
}

<ComponentInformation
  title="ActionList"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6448%3A3998"
/>

## Code

### Import

```js
import { ActionList } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={actionListStories} />

### Props

<PropTable docs={ActionListSheetDocs} />

<PropTable docs={ActionListPopOverDocs} />

<PropTable docs={ActionListItemDocs} />

## Guidance

### General guidance

Action Lists are useful for grouping multiple actions relevant to an item. They can hold anywhere from two actions to as many as needed. On desktop, Action Lists are displayed in a [Pop Over](/docs/components/elements/PopOver), on mobile they are displayed in a [Sheet](/docs/components/elements/Sheet).

{
<Box display="grid" sx={{  gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={usageDoImage} description="When there is only one action, display the action inline, not in an Action List." />

  <Dont src={usageDontImage} description="Do not use an Action List to display just one single action." />
</Box>
}

---

### Anatomy

![Anatomy of an Action List, desktop](./images/anatomy-desktop.png)

![Anatomy of an Action List, mobile](./images/anatomy-mobile.png)

<AnatomyListItem
  number="1"
  title="Trigger"
  description="Ellipses Icon is the default, but the trigger can be another icon or a label"
/>

<AnatomyListItem
  number="2"
  title="Container"
  description="Area that contains the action items"
/>

<AnatomyListItem
  number="3"
  title="List of action items"
  description="Each option should be a clear action verb."
/>

<AnatomyListItem number="4" title="Toolbar" description="Mobile only" />

---

### Specs

#### Mobile

| Property | Value                                                                                                                                        |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Width    | 100% of screen<br />(See [Sheet](/docs/components/elements/Sheet) for more information)                                                      |
| Height   | Set by inner content, but shouldn’t exceed 50% of screen on display<br />(See [Sheet](/docs/components/elements/Sheet) for more information) |
| Padding  | <Token name="space[3]" /> left and right, <Token name="space[6]" /> bottom                                                                   |
| Margin   | <Token name="space[2]" /> bewteen Toolbar and action list items                                                                              |

![Width of an Action List, mobile](./images/width-mobile.png)

![Height of an Action List, mobile](./images/height-mobile.png)

#### Desktop

| Property  | Value                                                                                                                                                                                               |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Width     | Default set by the action item with the greatest width plus left and right padding of <Token name="space[4]" />. An Action List can have a custom width, but it shouldn't be less than the default. |
| Height    | Set by inner content, scrolling begins once the Pop Over hits the the edge of the viewport                                                                                                          |
| Padding   | <Token name="space[1]" /> top and bottom                                                                                                                                                            |
| Margin    | <Token name="space[1]" /> bewteen trigger and Pop Over                                                                                                                                              |
| Elevation | <Token name="shadows[200]" />                                                                                                                                                                       |

![Specs of an Action List, desktop](./images/width-desktop.png)

### Positioning

#### Mobile

Since an Action List is displayed in a [Sheet](/docs/components/elements/Sheet), positioning specs aren't necessary.

#### Desktop

An Action List is always anchored to the trigger and is positioned above or below it. Horizontally, position the component either left-aligned, centered, or right-aligned to the trigger. The default position for an Action List is below and centered to the trigger.

Space between the trigger and the Action List is <Token name="space[1]" />, and space between the Action List and any viewport edge is <Token name="space[4]" />.

![Action List positioning, desktop](./images/positioning-desktop.png)

---

### Behavior

#### Trigger

In most cases, an [Ellipses](/docs/develop/component-packages/icon#components) Icon should serve as the trigger for an Action List. However, any appropriate [Icon](/docs/develop/component-packages/icon) can be used. When using an Icon for the trigger, a <Token name="gray.800" themeKey="colors" />, <Token name="sizes.200" themeKey="sizes" /> circle should appear on hover.

If the added clarity of a label is needed, a Tertiary [Button](/docs/components/primitives/Button) can be an Action List trigger.

![Trigger options](./images/trigger.png)

#### Display

On mobile, the Action List container, [Sheet](/docs/components/elements/Sheet), slides up from the bottom and is anchored to the edge of the screen. On desktop, a user triggers the Action List in a [Pop Over](/docs/components/elements/PopOver) container.

Note that there should be a minimum tap zone of 44×44px on the trigger.

![Trigger tap zone](./images/tap-zone.png)

#### Scrolling

Avoid triggering a scrolling Action List by reducing the amount of action items. Work with Content Design to reduce action options and validate any edge cases before proceeding.

##### Mobile

Action Lists display action items in a [Sheet](/docs/components/elements/Sheet). If the height of the action items in the Sheet exceeds 50% of the screen, then the container should start scrolling with following specifications:

- Sheet [Toolbar](/docs/patterns/other/Toolbar) pins to the top
- Sheet Toolbar is allowed to be pulled up and down the screen
- A "Cancel" [Button](/docs/components/primitives/Button) should be added to the Toolbar to close the Sheet; this is only necessary if Sheet covers the screen

![Scrolling of the Action List on mobile](./images/scrolling-mobile.png)

##### Desktop

The Action List displays action items in a [Pop Over](/docs/components/elements/PopOver). The PopOver's height is set by the number of action items it contains. If the PopOver height edges outside of the viewport, then the PopOver becomes scrollable.

#### Dismissal

##### Mobile

An Action List can be dismissed in multiple ways:

- Swiping the Action List's Sheet down
- A "Cancel" Button in the Action List's Sheet Toolbar; this is only present if Sheet covers the screen
- Tapping the overlay
- Tapping an action within the Sheet

##### Desktop

- Clicking anywhere outside the Action List's Pop Over
- Clicking an action item in the Action List's Pop Over
- Tapping the <KeyboardKey name="Esc" /> key

---

## Content guidance

- Limit action item to a single verb. Validate any exceptions with Content Design.
- Hierarchy of listed action items should be determined by user insights.
- When applicable, destructive action should always be listed last and in red.
- Avoid creating a scrolling Action List by condensing or reducing action items.

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: "1fr 1fr", gap: 2 }}>
  <RelatedLink name="Text" description="@sqs/rosetta-primitives" url="/docs/components/primitives/Text" />

  <RelatedLink name="Icon Button" description="Pattern" url="/docs/patterns/other/IconButton" />

  <RelatedLink name="Sheet" description="@sqs/rosetta-elements" url="/docs/components/elements/Sheet" />

  <RelatedLink name="Pop Over" description="@sqs/rosetta-elements" url="/docs/components/elements/PopOver" />
</Box>
}
