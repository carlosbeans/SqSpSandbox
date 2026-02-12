---
title: Number Input
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Box } from '@sqs/rosetta-primitives';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Checkmark } from '@sqs/rosetta-icons';
import { numberInputStories } from './NumberInput';
import NumberInputDecrementPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/NumberInput/NumberInput.Decrement';
import NumberInputIncrementPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/NumberInput/NumberInput.Increment';
import NumberInputGroupPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/NumberInput/NumberInput.Group';

{

<Description>
  Number Inputs allow users to enter and edit numbers. The component also
  accepts all HTML input props.
</Description>
}

<ComponentInformation
  title="NumberInput"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?node-id=5909-12042"
/>

## Code

### Import

```js
import { NumberInput } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={numberInputStories} />

### Props

<PropTable docs={NumberInputDecrementPropDocs} />

<PropTable docs={NumberInputIncrementPropDocs} />

<PropTable docs={NumberInputGroupPropDocs} />

## Guidance

### General content guidance

This is a generalized set of guidelines for accessible and usable Number Inputs. For more details on each of these elements, see their linked sections.

![Breakdown of the Number Input anatomy](./images/numberinput-anatomy.png)

| Element                                            | Required?                       | Notes                                                      |
|----------------------------------------------------|---------------------------------|------------------------------------------------------------|
| [**Field label**](#field-label)                    | <Checkmark color="green.300" /> | Always include labels for accessibility.                   |
| [**Error text**](#error-text)                      | <Checkmark color="green.300" /> | Always provide context and resolution for errors.          |
| [**Prefixes or suffixes**](#prefixes-and-suffixes) | <Checkmark color="green.300" /> | Number Input includes increment and decrement as a suffix. |
| [**Placeholder**](#placeholder-text)               | -                               | Only use to help with input formatting.                    |
| [**Helper**](#helper)                              | -                               | Only use when more context is necessary.                   |

### Field label

Labels are required as they are critical for assistive-technology users. Use short, direct nouns.

![Labels are necessary for Number Inputs](./images/numberinput-labels.png)

Glyphs in the prefix slot can be used as labels in established and unambiguous patterns as long as they have appropriate alt text.

### Error text

Error text should be attached to the field and pushes helper text below the field down when a form is submitted incorrectly.

![Error text are necessary for Number Inputs](./images/numberinput-error.png)

Error text should include why an input is invalid, supporting context, and resolution to the error. Ensure that error text communicates how to fix the input error (e.g., "Enter a valid 5-digit zip code"). This text does not need a period at the end.

Review error messages with a content designer or check the [writing guidelines](/docs/content-design/mechanics/error-messages/) for more help.

### Placeholder text

Number Inputs do not require placeholder text. They do not always benefit from the presence of placeholder text.

The presence of units in the [prefix or suffix](#prefixes-and-suffixes) can help cue input instead of relying on placeholders.

### Helper

Helper text is located below the field label. This text is used to provide context or instructions, such as character count or required formatting.

![Helper text can help users decipher inputs](./images/numberinput-helper.png)

## Composition

### Prefixes and suffixes

Prefixes and suffixes in Number Inputs can be used for units. These can help users decide what data to enter and reduce data formatting issues.

![Prefixes and suffixes can help provide labels or units as helpful context](./images/numberinput-fixes.png)

### Increment and Decrement

The Number Input contains increment and decrement controls, on the trailing end of the input.

![Increment and decrement buttons](./images/numberinput-increment.gif)

Users can click the chevrons to increment/decrement the input in addition to the standard arrow key inputs.

## Behavior

### Validation and errors

Within forms, all inputs should be validated and errors clearly displayed to the user on submit.

{

<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink
    name="TextInput"
    description="@sqs/rosetta-elements/textinput/next"
    url="/docs/components/elements/TextInput/Next"
  />
</Box>
}
