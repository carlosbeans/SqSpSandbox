---
title: Toolbox
---

import { Box } from '@sqs/rosetta-primitives';
import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { toolboxStories } from './Toolbox';
import ToolboxPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Toolbox/Toolbox';
import ToolboxDividerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Toolbox/Toolbox.Divider.json';
import ToolLabelPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Toolbox/Tool.Label';
import ToolActionPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Toolbox/Tool.Action.json';
import ToolToggleablePropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Toolbox/Tool.Toggleable.json';
import ToolDrawerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Toolbox/Tool.Drawer.json';
import ToolDrawerTriggerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Toolbox/Tool.Drawer.Trigger.json';
import ToolDrawerItemPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Toolbox/Tool.Drawer.Item.json';
import ToolDropdownPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Toolbox/Tool.Dropdown.json';
import ToolPositionPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Toolbox/Toolbox.Position.json';

<Description>A flexible quick action bar for contextual editing.</Description>

<ComponentInformation
  title="Toolbox"
  componentPackage="@sqs/rosetta-compositions"
/>

## Code

### Import

```js
import { Toolbox, Tool } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={[...toolboxStories]} />

### Props

<PropTable docs={ToolboxPropDocs} />

<PropTable docs={ToolboxDividerPropDocs} />

<PropTable docs={ToolLabelPropDocs} />

<PropTable docs={ToolActionPropDocs} />

<PropTable docs={ToolToggleablePropDocs} />

<PropTable docs={ToolDrawerPropDocs} />

<PropTable docs={ToolDrawerItemPropDocs} />

<PropTable docs={ToolDrawerTriggerPropDocs} />

<PropTable docs={ToolDropdownPropDocs} />

<PropTable docs={ToolPositionPropDocs} />

## Usage

### General guidance

The Toolbox is a flexible container for quick actions that can be used for contextual editing in Squarespace website and email editors. The goal of the Toolbox is to create a more flexible system that can be used for any actions.

![Toolbox used for text editing](./images/toolbox-text-editing.png)

![Toolbox used for block editing](./images/toolbox-block-editing.png)

---

### Anatomy

![Anatomy of a Toolbox](./images/anatomy.png)

<AnatomyListItem number="1" title="Toolbox" description="The outer container" />

<AnatomyListItem number="2" title="Tool" />

{
<Box pl={6}>
<AnatomyListItem number="a" title="Action" description="A non-boolean state action button, can use an icon or a word" />

<AnatomyListItem number="b" title="Toggleable" description="A boolean state action button, can use an icon or a word" />

<AnatomyListItem number="c" title="Dropdown" description="A type of tool that allows for clearer text options" />

<AnatomyListItem number="d" title="Label" description="Non-interactive text that can be used to label the element being actioned" />

<AnatomyListItem number="e" title="Divider" description="Divider line to separate groups of actions" />
</Box>
}

<AnatomyListItem
  number="5"
  title="Drawer"
  description="A popover that contains the options for applicable actions"
/>

---

### Construction

Toolboxes can be constructed with any combination of actions — or Tools — appropriate to the use case.

#### Tools

##### Action / Toggleable

Action or Toggleable buttons are the most commonly used Tools, generally with an icon. The Toggleable button is used for boolean state actions while the Action button encompasses a wider range of actions. A word label can be used instead if there is no icon clear enough to represent the action. These buttons can be used for three types of actions:

- Booleans, like “bold,” that can be turned on or off
- Selections, like “text alignment,” which opens a drawer with options
- Triggers, like “replace image” or “delete,” which open a modal or other flow

![Tool actions](./images/construction-tool-button.png)

##### Dropdown

Dropdowns should be used similarly to “selection” action button Tools, allowing users to select between a handful of options. Opt for a dropdown when there aren’t icons clear enough to explain the options, and the selected option should be displayed, such as for “text style” or “button variant.”

![Tool dropdown](./images/construction-tool-dropdown.png)

##### Label

Labels can be used to add extra context to the Toolbox, such as for a block type label in a block editor. Labels are not interactive and purposely use a different type style to buttons.

![Tool label](./images/construction-tool-label.png)

##### Divider

Dividers should be used to separate groups of actions to create hierarchy and improve clarity.

![Tool divider](./images/construction-tool-label.png)

#### Drawer

Drawers can be used in a few different ways to handle different types of controls.

##### Icons

The simplest and most common Drawers contain a series of icon button Tools as options to select.

![Drawer with icon Tools](./images/construction-drawer-icons.png)

##### Text

In cases where icons cannot be clearly understood, opt for text options.

![Drawer with text options](./images/construction-drawer-text.png)

##### Custom

Any form control can be put into a drawer, where appropriate.

![Drawer with custom form control](./images/construction-drawer-custom.png)

---

### Layout

#### Orientation

A Toolbox can be horizontal (“row”) or vertical (“column”) on desktop. On mobile, a Toolbox is always horizontal.

![Toolbox with a row layout](./images/layout-orientation-row.png)

![Toolbox with a column layout](./images/layout-orientation-column.png)

#### Positioning

On desktop, Toolboxes can be anchored to any element. Use spacing appropriate to the scenario, but be sure to rely on Rosetta spacing tokens.

![Toolbox anchored to a website image block](./images/layout-desktop-anchor.png)

On mobile, a Toolbox is always fixed to the top or bottom of the viewport.

![Toolbox on mobile](./images/layout-mobile-anchor.png)

---

### Behavior

#### Mobile

##### Scrolling

The fixed-position Toolbox scrolls horizontally.

![Toolbox scrolling on mobile](./images/behavior-mobile-scrolling.gif)

#### Drawers

Drawers open in place of the Toolbox.

![Drawers on mobile](./images/behavior-mobile-drawer.gif)
