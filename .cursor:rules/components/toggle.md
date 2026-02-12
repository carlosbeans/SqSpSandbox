---
title: Toggle (next)
sidebar_position: 1
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { Flex, Box } from '@sqs/rosetta-primitives';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { toggleStories } from "./Toggle";
import SelectionInputRefTable from '@site/src/components/Markdown/SelectionInputRefTable.mdx';
import { RelatedLink } from '@site/src/components/RelatedLink';

import contentDont from './images/content-dont.png';
import contentDo from './images/content-do.png';

{
<Description>
  A control that is used to quickly switch between two possible states.
</Description>
}

<ComponentInformation
  title="Toggle"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?node-id=284-280028"
/>

## Code

### Import

```js
import { Toggle } from '@sqs/rosetta-elements/toggle/next';
```

### Examples

<StoryRenderer stories={toggleStories} />

## Guidance

### General guidance

Toggles are only used for binary actions that occur immediately after the user slides the Toggle handle. They are commonly used for "on/off" switches. A Toggle should always be accompanied by a clear, concise label.

### Content

- Keep Toggle labels brief to account for panel space in other languages
- Make sure Toggle labels are **_direct objects_**, as the activation state (on or off) is communicated by the component
- Present options in a logical list (simple to complex, numerical/alphabetical order, etc.)
- Don’t use periods at the end of a Toggle label, even if the label is a complete sentence

{
<Flex sx={{ gap: 2 }}>
  <Do src={contentDo} />

  <Dont src={contentDont} />
</Flex>
}

### Accessibility

Toggles must always have an accessible name. A group of Toggles must also be wrapped in a `<fieldset\>` element with a `<legend\>` to help increase accessibility and avoid odd screen reader behavior. A single Toggle that makes sense from its label alone does not require `<fieldset\>` and `<legend\>`.

Because Toggles are small, include the label and associated words as a click target so mouse and touch users can more easily access it. If a `<label\>` element is correctly used to label the control, this behavior will happen automatically.

## Usage

### Anatomy

![Anatomy of a Toggle](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Container"
  description="Background color is the main indicator of whether the Toggle is set to &#x22;on&#x22; or &#x22;off&#x22;"
/>

<AnatomyListItem
  number="2"
  title="Handle"
  description="Position of the handle also indicates whether the Toggle is set to &#x22;on&#x22; or &#x22;off&#x22;"
/>

---

### Specs

The Toggle component is purposely flexible to allow for easier use. It can be used either simply with a text label, or in a Cell.

#### With label

Toggles can be used simply with a label, using the Body Book [type style](/docs/design/foundations/typography) with `space[2]` margins.

![Toggles with labels](./images/layout-labels.png)

#### In Cells

To fit with many Squarespace UI conventions, Toggles can also be used in stackable Cells with a label. See [Cell](/docs/components/elements/Cell) for more information. Note that when a Toggle is used in a Cell, the entire Cell should act as the tap zone.

![Toggle in Cells](./images/layout-cells.png)

---

### Behavior

#### Overflow

In the unlikely case of a long label accompanying a Toggle, the label should wrap next to the Toggle, not underneath it.

### Motion

Upon triggering, both the background color and the handle position transition smoothly to their “on” position.

![Toggle motion](./images/motion.png)

---

### Selection inputs

<SelectionInputRefTable />

## Related Components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Checkbox" description="@sqs/rosetta-elements" url="/docs/components/compositions/Checkbox/Next" />
</Box>
}
