---
title: Checkbox (next)
sidebar_position: 1
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Text, Box } from '@sqs/rosetta-primitives';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Token } from '@site/src/components/Markdown/Token';
import CheckboxGroupPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Checkbox/CheckboxGroup';
import { checkboxStories } from './Checkbox';
import SelectionInputRefTable from '@site/src/components/Markdown/SelectionInputRefTable.mdx';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';

import usageDoImage from '../images/checkbox-content-do.png';
import usageDontImage from '../images/checkbox-content-dont.png';
import variantDoImage1 from '../images/checkbox-variant-do-1.png';
import variantDontImage1 from '../images/checkbox-variant-dont-1.png';
import variantDoImage2 from '../images/checkbox-variant-do-2.png';
import variantDontImage2 from '../images/checkbox-variant-dont-2.png';

{

<Description>
  Checkboxes allow users to select one or more items from a list of options, or
  to mark something as complete.
</Description>
}

<ComponentInformation
  title="Checkbox"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?node-id=5909-12029"
/>

Checkbox is the Rosetta implementation of HTML `checkbox` input. The component allows submission of selected values (e.g., within a form) and can also display an indeterminant `checkbox`. See [Action List](/docs/components/compositions/ActionList) as an example.

## Code

### Import

```js
import { Checkbox } from '@sqs/rosetta-elements/checkbox/next';
```

### Examples

<StoryRenderer stories={checkboxStories} />

### Props

<PropTable docs={CheckboxGroupPropDocs} />

## Guidance

![A breakdown of the checkbox anatomy](./images/checkbox-anatomy.png)

### General guidance

Checkboxes should be used when a user needs to select/deselect from a list of options. Ideally, the list of items should be [aligned vertically](https://www.nngroup.com/articles/radio-buttons-default-selection/), with a Checkbox and a label for each item.

{

<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do use Checkboxes for:
</Text.Subtitle>
}

- Multi-select lists
- A single confirmation (such as agreeing to terms and conditions)
- Changing settings/statuses (not for an action)
- Adding friction before a user agrees to a destructive or impactful action
- Enabling or applying a fixed setting to another input, like a [Text Input](/docs/components/elements/TextInput/Next)

{

<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't use Checkboxes for:
</Text.Subtitle>
}

- Single-select lists, use [Radio](/docs/components/primitives/Radio/Next) buttons instead
- Switching settings from “On” to “Off”, use a [Toggle](/docs/components/elements/Toggle/Next) instead

### Content

{

<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={usageDoImage} description="Use active words in the Checkbox label." />

  <Dont src={usageDontImage} description="Do not make a Checkbox a double negative." />
</Box>
}

{

<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Add clear and concise labels to Checkboxes
- Use **active words** in the label if clicking the Checkbox changes the status; e.g., **Enable cookie banner**

{

<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Make a Checkbox a double negative (i.e., don’t make a person check a Checkbox to make something NOT happen)
- Add punctuation to the label, even if it is a complete sentence

It's possible to provide descriptions to help users understand options at both the Group and Control level.

![Checkboxes can have descriptions at both the Group and Control levels](./images/checkbox-descriptions.png)

### Accessibility

Checkboxes must always have an accessible name. A group of Checkboxes must also be wrapped in a `<fieldset\>` element with a `<legend\>` to help increase accessibility and avoid odd screen reader behavior.

Because Checkboxes are small, include the label and associated words as a click target so mouse and touch users can more easily access it. If a `<label\>` element is correctly used to label the control, this behavior will happen automatically.

## Usage

### Variants

#### Selection (Default)

![Default Checkbox variant with square edges](../images/checkbox-variant-default.png)

The default appearance of Checkboxes is square. This style of Checkbox signifies selection. Use this Checkbox when a user is choosing from a set of options or selecting items to complete bulk actions on.

#### Completion (Round)

![Round Checkbox variant to mark items complete](../images/checkbox-variant-round.png)

Round Checkboxes signify completion. Only use this checkbox when a user is marking a task or milestone complete.

#### Touchable Appearance

![Touchable Checkbox variant for use without a visible label](../images/checkbox-variant-touchable.png)

Touchable Checkboxes have increased interactive affordances, increasing the target size and adding a background behind the Checkbox on hover and activation. Use the Touchable variant of square or round Checkboxes when they appear without a visible direct label.

{

<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={variantDoImage1} description="Use Tooltips and ARIA labels to ensure the behavior of a Touchable Checkbox is clear." />

{' '}

<Dont
  src={variantDontImage1}
  description="Do not use Checkbox variants to represent other actions for aesthetic purposes."
/>

{' '}

<Do
  src={variantDoImage2}
  description="Use text Buttons to mark selected items complete in a Table or list that also allows selection."
/>

  <Dont src={variantDontImage2} description="Do not provide square selection Checkboxes and round completion Checkboxes on the same item at the same time." />
</Box>
}

### Checkbox group

Checkbox Groups can help batch related, multi-select options together under a single label and description.

![Checkbox group](./images/checkbox-group.png)

### Table

When using Checkboxes inside [Tables](/docs/components/compositions/Table) for row selection, use the Touchable option. The default Checkbox does not provide enough visual feedback to use as a stand-alone affordance.

![Table cells with Checkboxes](../images/checkbox-table.png)

### Modifying other inputs

Checkboxes can be used to modify another input, like applying a fixed value to a Text or Number Input. It can also be used to reveal other elements when selected.

![Checkbox modifying another input](./images/checkbox-other-input.png)

### Selection inputs

<SelectionInputRefTable />

---

## Related components

{

<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink
    name="Text"
    description="@sqs/rosetta-primitives"
    url="/docs/components/primitives/Text"
  />
</Box>
}
