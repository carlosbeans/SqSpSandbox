---
title: Radio (next)
sidebar_position: 1
---

import { Text, Box, Flex } from '@sqs/rosetta-primitives';
import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { radioStories } from './Radio';
import { RelatedLink } from '@site/src/components/RelatedLink';
import SelectionInputRefTable from '@site/src/components/Markdown/SelectionInputRefTable.mdx';
import RadioGroupPropDocs from '@sqs/rosetta-prop-docs/docs/packages/primitives/components/Radio/Radio.Group';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Token } from '@site/src/components/Markdown/Token';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import optionsDo from './images/radio-options-do.png';
import optionsDont from './images/radio-options-dont.png';
import noneDo from './images/radio-none-do.png';
import noneDont from './images/radio-none-dont.png';

{

<Description>
  Radio buttons allow users to select one option from a group of related
  options.
</Description>
}

<ComponentInformation
  title="Radio"
  componentPackage="@sqs/rosetta-primitives"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?node-id=5909-12016"
/>

## Code

### Import

```js
import { Radio } from '@sqs/rosetta-primitives/radio/next';
```

### Examples

<StoryRenderer stories={radioStories} />

### Props

<PropTable docs={RadioGroupPropDocs} />

## Guidance

![A breakdown of the anatomy of a Radio group](./images/radio-anatomy.png)

### General guidance

Radio buttons should be used when a user needs to make a single selection from a short list of **_mutually exclusive_** options. Always include clear, concise labels.

Clicking a Radio button deselects a previously selected Radio button in the list of options. Consider having a pre-selected option to suggest preferred choices.

<Flex gap={2}>
  <Dont
    src={optionsDont}
    description={<>Don't create a list with more than five Radio options. Consider using a <a href="/docs/components/compositions/Dropdown/Next/">Dropdown</a> instead</>}
  />

  <Do
    src={optionsDo}
    description="Display all options to the user, up to five options"
  />
</Flex>

<Flex gap={2}>
  <Dont
    src={noneDont}
    description="Don't force users to leave a Radio group empty. Users may be unable to de-select a selected Radio option"
  />

  <Do
    src={noneDo}
    description="Offer a “None” option when the user doesn’t need to select an option"
  />
</Flex>

### Content

Don’t use periods at the end of a Radio button label, even if the label is a complete sentence.

Present options in a logical list (simple to complex, numerical/alphabetical order, etc.)

The Radio Group can contain a description. Individual Radio Options can include their own descriptions, as well.

![Radio groups can include descriptions at both the Fieldset level and the individual control level](./images/radio-descriptions.png)

### Accessibility

Radio buttons must always have an accessible name. A group of Radio buttons must also be wrapped in a `<Fieldset>` element with a `<Fieldset.Legend>` to help increase accessibility and avoid odd screen reader behavior.

Because Radio buttons are small, include the aria-label and associated words as a click target so mouse and touch users can more easily access it.

## Usage

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
