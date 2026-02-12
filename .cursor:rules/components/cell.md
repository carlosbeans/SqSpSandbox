---
title: Cell
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Token } from '@site/src/components/Markdown/Token';
import { cellStories } from './Cell';

{

<Description>
  Cells provide a base for common layouts across the Squarespace UI. They often
  include input controls as well as other components.
</Description>
}

<ComponentInformation
  title="Cell"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components-%5Bv1%5D?node-id=6415%3A464&t=6RhPB11o2cJr647P-4"
/>

A Cell is essentially a container that can compose other components in six
distinct “slots”. See the second example for a visual or the usage guide
for details. Each of the examples below displays a Cell with different
slot combinations, though the last example specifically doesn't use slots
to show how a Cell can be used with an HOC in different ways.

## Code

### Import

```js
import { Cell } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={cellStories} />

## Guidance

### General guidance

Follow individual best practices for each component included in a Cell.

### Content

No guidance.

### Accessibility

No guidance.

## Usage

### Overview

Cells, which were initially inspired by the iOS layout system, are one of the principle building blocks that comprise Rosetta. They are effectively containers that compose other components in different areas. Thus, Cells are flexible, which allows them to provide many functions and uses.

A Cell can be composed with a bottom border, or a Divider line.

Stack Cells vertically with no space between adjacent Cells. Each Cell should also stretch the full width of their container.

---

### Anatomy

A Cell is essentially a container that can compose other components in six distinct “slots”. The shell section provides five areas of composition, whereas the post section just composes anything passed to it.

![Anatomy of a Cell](./images/anatomy-slots.png)

<AnatomyListItem number="1" title="Container" />

<AnatomyListItem
  number="2"
  title="Shell"
  description="Wrapper for the pre, body and accessory slots"
/>

<AnatomyListItem
  number="3"
  title="Exterior pre"
  description="Outer slot for a component to the left of the body, such as an Icon, an Image or a Toggle"
/>

<AnatomyListItem
  number="4"
  title="Interior pre"
  description="Inner slot for a component to the left of the body, such as an Icon or an Image"
/>

<AnatomyListItem
  number="5"
  title="Body"
  description="Main content area, generally for holding a label and/or a subtitle"
/>

<AnatomyListItem
  number="6"
  title="Exterior accessory"
  description="Inner slot for a component to the right of the body, such as a Toggle, a Chevron or a Text Input"
/>

<AnatomyListItem
  number="7"
  title="Interior accessory"
  description="Outer slot for a component to the right of the body, such as a Toggle, a Chevron or a Text Input"
/>

<AnatomyListItem
  number="8"
  title="Post"
  description="Lower slot, most commonly used for error messages"
/>

<AnatomyListItem
  number="9"
  title="Divider"
  description="Optional divider line to visually separate stacked Cells"
/>

---

### Composition

Below are some examples of how components can be composed in a Cell's slots. Note how each slot grows, shrinks or disappears as needed.

![Cell with an Icon, label and subtitle](./images/slots-01.png)

![Cell with a label, detail and chevron, a.k.a. Disclosure](./images/slots-02.png)

![Cell with an Icon, label, subtitle and error](./images/slots-03.png)

![Cell with a label and Stepper](./images/slots-04.png)

---

### Specs

Cells should always be stacked vertically with no space between adjacent Cells.

#### Width

Cells should always be aligned to the Grid. Within a panel, they should take the full width. In wider spaces there may be cases where two Cells stacked horizontally makes more sense, for example, first and last name inputs.

See [layout](/docs/design/interface-guidelines/overview) for guidelines on using Cells with other components on the Grid.

![Cell width](./images/width.png)

#### Height

The height of a Cell is calculated by the components inside, plus top and bottom padding of <Token name="space[2]" />, most commonly resulting in a height of <Token name="sizes.250" themeKey="sizes" />.

![Cell height](./images/height.png)

#### Internal spacing

While the different slots are flexible and optional, fixed spacing gutters ensure consistent alignment. Horizontal gutters in the shell section are <Token name="space[2]" /> wide, and the vertical space between the shell and the post is <Token name="space[6]" />.

The widths of all slots inside the shell are flexible, and grow and shrink as needed (like Flexbox). No slot in either the shell or post section requires a component; the slot can remain empty.

![Internal spacing inside a Cell](./images/spacing-gutters.png)

#### Overflow

Label, subtitle, and detail copy inside Cells should be kept as short as possible in all supported languages.

When content inside a Cell does require more space, copy will wrap and the Cell will grow in height. Note that label and subtitle copy should wrap, but detail text should be truncated. This is because label and subtitle text is generally more under control and unlikely to be long, whereas detail text is less predictable. The <Token name="space[2]" /> gutter between the two sides should remain for readability.

![Text overflow in a Cell](./images/overflow.png)

---

### Common uses

Detailed below are common examples of Cell constructions within Rosetta.

#### Default

The most basic use of the Cell is with [Text](/docs/components/primitives/Text) elements and [Icons](/docs/develop/component-packages/icon#usage).

![Default Cell](./images/variant-default.png)

#### Text Input

It's recommended to use [Text Input](/docs/components/elements/TextInput)s inside Cells, stacked in a form. See more on [Text Input in a Cell](/docs/patterns/other/CellFields/TextInput).

![Text Input in a Cell](./images/variant-text-input.png)

#### Textarea

It's recommended to use [Textarea](/docs/components/elements/Textarea)s inside Cells, stacked in a form.

![Textarea in a Cell](./images/variant-textarea.png)

#### Selectable

Cells with an [Icon](http://localhost:8000/develop/icons?tab=usage) and Label can be used as a Selectable—similar to a checklist. Clicking/tapping anywhere in the whole Cell should trigger the change from “on” to “off”.

![Selectable in a Cell](./images/variant-selectable.png)

#### Slider

It is recommended to use [Slider](/docs/components/elements/Slider)s inside Cells, stacked in a form.

![Slider in a Cell](./images/variant-slider.png)

#### Stepper

It is recommended to use [Stepper](/docs/patterns/other/CellFields/Stepper)s inside Cells, stacked in a form.

![Stepper in a Cell](./images/variant-stepper.png)

#### Toggle

To fit with many Squarespace UI conventions, [Toggle](/docs/components/elements/Toggle/Next)s can be used in stackable Cells with a label. Note that when a Toggle is used in a Cell, the entire Cell should act as the tap zone. See more on [Text Input in a Cell](/docs/patterns/other/CellFields/Toggle).

![Toggle in a Cell](./images/variant-toggle.png)

#### Radio

To fit with many Squarespace UI conventions, [Radio](/docs/components/primitives/Radio/Next) Buttons can be used in stackable Cells with a label. Note that when a Radio Button is used in a Cell, the entire Cell should act as the tap zone.

![Radio Button in a Cell](./images/variant-radio.png)

#### Checkbox

To fit with many Squarespace UI conventions, [Checkbox](/docs/components/elements/Checkbox/Next)es can be used in stackable Cells with a label. Note that when a Radio Button is used in a Cell, the entire Cell should act as the tap zone. See more on [Checkbox in a Cell](/docs/patterns/other/CellFields/CheckboxCell).

![Checkbox in a Cell](./images/variant-checkbox.png)

---

### Behavior

#### Interaction states

##### Focus

When a Cell holds an input that requires a `:focus` state — such as a [Text Input](/docs/components/elements/TextInput) or a [Toggle](/docs/components/elements/Toggle/Next), the Divider line transitions from <Token name="gray.800" themeKey="colors" /> to <Token name="gray.100" themeKey="colors" /> to help with a11y and keyboard navigation. See the [example](/docs/components/elements/Cell?story=with-multiple-composed-cells-and-a-focus-hoc-helper#examples) for a live demo of this.

![Motion in a Cell’s focus state](./images/motion.png)

#### Selected

Cells should not be used as navigational items in the left-side navigation to control what view is shown in the workspace area.
