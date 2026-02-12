---
title: Button
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { buttonStories } from './Button';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { commonPropDocs, buttonPropDocs, } from '@site/src/components/ComponentsPage/PropTable/primitivePropDocs';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Text } from '@sqs/rosetta-primitives';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Token } from '@site/src/components/Markdown/Token';

{
<Description>
  Buttons are clickable elements used to perform an action. They are easily visible and the nature of their intended action should be immediately apparent.
</Description>
}

<ComponentInformation
  title="Button"
  componentPackage="@sqs/rosetta-primitives"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6382%3A3903"
/>

Button leverages Styled System `variant` utility to connect the component with styles as defined in Rosetta Themes. See Examples to view style variants and how to use `variant` prop.

## Code

### Import

```js
import { Button } from '@sqs/rosetta-primitives';
```

### Examples

<StoryRenderer stories={buttonStories} />

### Props

<PropTable docs={commonPropDocs('Button', buttonPropDocs)} />

## Guidance

### General guidance

Buttons should be used to start actions, and their labels should express what action will happen when the user interacts with it. However, Buttons should not be used to send a user away from the page they are on.

### Buttons vs. links

Buttons are primarily used for actions, such as “Add”, “Close”, “Cancel”, or “Save”. Tertiary Buttons, which look like links, are used for less important or less common actions, such as “Replace image.” Links are primarily used for navigation, and usually appear within or directly following a sentence.

View [Buttons & Links](/docs/content-design/mechanics/links) for more guidelines.

### Content

Be as specific as possible when creating Button labels. Consider what detail a user may need to take the next step in a flow, or how a button label can provide clarity when making a decision.

Use title case. View [CTAs](/docs/content-design/mechanics/buttons) for additional content guidelines.

{
<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use a **verb** for the label to describe the Button action; e.g., **Delete, Publish, Submit, Continue**
- Use a **verb-phrase** for the label if the Button action acts on a single setting; e.g., **Select image**
- Use **OK** for the label when the only user option is to acknowledge the dialog and close it
- Use **Cancel** as the secondary CTA for most actions requiring a decision, e.g. "Delete page?"

{
<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Label Buttons using “Now”, e.g., “Purchase now”, because Buttons typically perform an immediate action
- Add articles, i.e., “a”, “an”, “the”, in Button labels; without these articles Button labels are more consistent

### Accessibility

All Buttons should have an accessible name that describes what the Button does (follow content guidelines above). If a Button has an icon instead of a name, it must be given a name via alt text or through an ARIA label.

## Usage

### Overview

Buttons should be used to initialize actions, and their labels should express what action will occur when the user interacts with it.

Every Button will have both a **size** and a **variant**.

---

### Anatomy

![Anatomy of a Button](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Label"
  description="Names the action that will be performed on click or tap"
/>

<AnatomyListItem
  number="2"
  title="Icon"
  description="An optional Icon that relates to the Button’s action"
/>

<AnatomyListItem number="3" title="Container" />

---

### Variants

Buttons are available in four variants; primary, secondary, tertiary and danger. These variants allow us to express a hierarchy on the screen, helping the user to know which actions are more or less important.

![The four Button variants](./images/types.png)

#### Primary

Primary Buttons hold the highest emphasis and should be used to indicate the single most dominant action on a page. A primary Button should only appear once within a screen.

![Primary Button](./images/type-primary.png)

#### Secondary

Secondary Buttons should be used for calls-to-action of medium importance. They will often make sense alongside a primary Button, as an alternative option.

![Secondary Button](./images/type-secondary.png)

#### Tertiary

Tertiary Buttons are used for most regular actions throughout the product. They are the most commonly used Buttons throughout the product. You can have as many Tertiary Buttons as needed in any given screen. They can stack vertically, or be used inside cells. They can also stack horizontally next to Primary or Secondary Buttons.

![Tertiary Button](./images/type-tertiary.png)

#### Danger

Danger Buttons should be used sparsely for cautionary actions, such as “delete”.
They resemble Tertiary buttons and follow their layout and spacing specs.

![Danger Button](./images/type-danger.png)

---

### Sizes and specs

Buttons can be shown in two sizes, large and small; where large is the default they can also be shown full-width in their container, if appropriate for the layout.

#### Large

Large Buttons should be used for main actions to allow for easy tap/clickability. Labels are recommended, but if appropriate, an Icon can be used as well or instead.

| Property | Value                                                      |
|----------|------------------------------------------------------------|
| Width    | Set by label length, but minimum <Token name="space[6]" /> |
| Height   | <Token name="sizes.300" themeKey="sizes" />                |
| Padding  | <Token name="space[4]" /> left and right                   |
| Margin   | <Token name="space[2]" /> between the label and Icon       |

![Large Buttons](./images/size-large.png)

#### Medium

Medium Buttons should be used for main actions to allow for easy tap/clickability, and generally where the available space requires. It is not recommended to use an Icon in a medium Button

| Property | Value                                                                        |
|----------|------------------------------------------------------------------------------|
| Width    | Set by label length, but minimum <Token name="sizes.250" themeKey="sizes" /> |
| Height   | <Token name="sizes.250" themeKey="sizes" />                                  |
| Padding  | <Token name="space[3]" /> left and right                                     |

![Medium Buttons](./images/size-medium.png)

#### Small

Small buttons should be used inside Cells, and generally where the available space requires. It is not recommended to use an Icon in a small Button.

| Property | Value                                                                                |
|----------|--------------------------------------------------------------------------------------|
| Width    | Set by label length, but minimum <Token name="sizes.200" themeKey="sizes" />         |
| Height   | <Token name="sizes.200" themeKey="sizes" />                                          |
| Padding  | <Token name="space[2]" /> left and right for Primary and Secondary, 0px for Tertiary |

![Small Buttons](./images/size-small.png)

#### Full-width Buttons

Buttons can be displayed full-width in their container.

Note that due to current restraints with Figma's Autolayout feature, you will need to detach the component or wrap it in a parent frame in order to achieve full-width Buttons in your designs.

![Full-width Buttons](./images/full-width.png)

#### Stacking

Buttons can be stacked horizontally or vertically. In general, ensure there is <Token name="space[2]" /> space between any two Buttons. However, this spacing is not part of the  component itself and may need to be adjusted for specific scenarios.

![Examples of how Buttons can stack](./images/stacking.png)

#### Buttons inside Cells

Tertiary Buttons can also be used inside Cells.

![Button Cell pattern](./images/button-cell.png)
