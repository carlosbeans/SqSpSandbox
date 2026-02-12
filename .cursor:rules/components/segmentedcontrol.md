---
title: Segmented Control
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { Box } from '@sqs/rosetta-primitives';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import SelectionInputRefTable from '@site/src/components/Markdown/SelectionInputRefTable.mdx';
import SegmentedControlDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/SegmentedControl/SegmentedControl';
import SegmentedControlOptionDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/SegmentedControl/Option';
import { segmentedControlStories } from './SegmentedControl';

import layoutDoImage from './images/layout-do.png';
import layoutDontImage from './images/layout-dont.png';

{

<Description>
  Segmented Control is a group of related buttons that acts as a switch; only
  one option can be selected at a time.
</Description>
}

<ComponentInformation
  title="SegmentedControl"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6387%3A1226"
/>

## Code

### Import

```js
import { SegmentedControl } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={segmentedControlStories} />

### Props

<PropTable docs={SegmentedControlDocs} />

<PropTable docs={SegmentedControlOptionDocs} />

## Guidance

### General guidance

Segmented Controls are effectively stylized radio buttons, providing users with a visual way to choose between a small handful of options. One, and only one, option is always selected.

Don't use Segmented Controls as an alternative to [Tabs](/docs/components/elements/Tabs). Segmented Controls are inputs for single selection, similar to a [Radio Button](/docs/components/primitives/Radio/Next); Tabs are for navigation.

### Content

Don’t use periods at the end of a Segmented Control label, even if the label is a complete sentence. Limit the content inside to one or two words whenever possible.

### Accessibility

Segmented Controls must always have an accessible name. To increase accessibility and avoid odd screen reader behavior, wrap a group of Segmented Controls in a `<fieldset>` element with a `<legend>`.

Include the Segmented Control container and associated words as a click target so mouse and touch users can easily access it.

## Usage

### Anatomy

![Anatomy of a Segmented Control](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Option"
  description="A single, selectable option "
/>

<AnatomyListItem
  number="2"
  title="Label"
  description="Either text or an Icon, but not both in one option"
/>

<AnatomyListItem
  number="3"
  title="Indicator"
  description="Indicates selected option"
/>

<AnatomyListItem number="4" title="Container" />

---

### Variants

#### Default

The default Segmented Control provides a bold visual element for option selection. Always use it with an external label, and ensure the content fits in all supported languages. If there's a chance that the labels get too long, or that there will be too many labels to fit in the container, use a Dropdown or Radio buttons.

Generally, use the default variant with two to three options. Though there is no defined maximum number of options because of varying container widths and Rosetta use cases.

![Default Segmented Control with text labels](./images/variant-default-labels.png)

You can use icons as an alternative to text labels, but ensure the meaning of the icon is easily understood by users globally.

![Default Segmented Control with icon labels](./images/variant-default-icons.png)

##### Layout

As of March 2022, default Segmented Controls **should not** be offset by 2px on each side to aid in alignment with other elements—they now have a squared edge that aligns by default.

![Default Segmented Control in situ](./images/specs-default-context.png)

#### Compact

Use compact Segmented Controls when you need to save vertical space, and the selection does not need to be as visually prominent as the default variant. Compact Segmented Controls should always be used in a [Cell](/docs/components/elements/Cell).

Generally, use the default variant with two to three options. Though there is no defined maximum number of options because of varying container widths and Rosetta use cases. Ensure the label does not wrap in all supported languages.

![Compact Segmented Control with icon labels](./images/variant-compact-labels.png)

Compact Segmented Controls should ideally use icons, with the exception of one or two letter text labels, such as S/M/L. Ensure these labels work in all supported languages.

![Compact Segmented Control with text labels](./images/variant-compact-icons.png)

##### Layout

Compact Segmented Controls should always be used in [Cells](/docs/components/elements/Cell), stacked with other Cells.

![Default Segmented Control in situ](./images/specs-compact-context.png)

{

<Box display="grid" sx={{ gridTemplateColumns: "1fr 1fr", gap: 2 }}>
  <Do src={layoutDoImage} description="Use the default variant for any “floating” — i.e. outside of a stack of Cells — use cases." />

  <Dont src={layoutDontImage} description="Don’t use the compact variant for any “floating” use cases. Without the wrapper of a Cell, the compact variant lacks affordance to show how the icons are a group of options." />
</Box>
}

---

### Selection inputs

<SelectionInputRefTable />
