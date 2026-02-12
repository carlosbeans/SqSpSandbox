---
title: Textarea (next)
sidebar_position: 1
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Box, Flex, Text } from '@sqs/rosetta-primitives';
import { Checkmark } from '@sqs/rosetta-icons';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Token } from '@site/src/components/Markdown/Token';
import TextareaRootPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Textarea/Textarea.Root';
import TextareaControlPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Textarea/Textarea.Control';
import { textareaStories } from './Textarea';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import labelDo from './images/textarea-label-do.png';
import labelDont from './images/textarea-label-dont.png';
import placeholderDo from './images/textarea-4.png';
import placeholderDont from './images/textarea-description-dont.png';
import placeholderDont2 from './images/textarea-description-dont-2.png';

{

<Description>
  A text input that expands for multiple lines of text. Input can also be
  configured to display a character count.
</Description>
}

<ComponentInformation
  title="Textarea"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?node-id=5909-10781"
/>

## Code

### Import

```js
import { Textarea } from '@sqs/rosetta-elements/textarea/next';
```

### Examples

<StoryRenderer stories={textareaStories} />

### Props

<PropTable docs={TextareaRootPropDocs} />

<PropTable docs={TextareaControlPropDocs} />

## Guidance

### General content guidelines

There are several elements to a Textarea. This a high-level, generalized set of guidelines for accessible and usable Textarea. For more details on each of these elements, see their linked sections.

Textareas should be used instead of standard [Text Inputs](/docs/components/elements/TextInput/Next) when the expected content is longer than a few words.

![The basic anatomy of a Textarea](./images/textarea-1.png)

| Element                              | Required?                       | Notes                                             |
| ------------------------------------ | ------------------------------- | ------------------------------------------------- |
| [**Field label**](#field-label)      | <Checkmark color="green.300" /> | Always include labels for accessibility.          |
| [**Error text**](#error-text)        | <Checkmark color="green.300" /> | Always provide context and resolution for errors. |
| [**Placeholder**](#placeholder-text) | -                               | Only use to help with input formatting.           |
| [**Helper**](#helper-text)           | -                               | Only use when more context is necessary.          |

### Field label

![Field labels are required for Textareas](./images/textarea-2.png)

Textareas should always be accompanied by a label.

<Flex gap={2}>
  <Do
    src={labelDo}
    description="Always include a field label in any Textarea"
  />

  <Dont src={labelDont} description="Never use placeholder text as labels" />
</Flex>

### Error text

Textareas should display an error message once the character limit is reached, or if the input was incorrect.

![Always include error messages in Textarea](./images/textarea-3.png)

### Placeholder text

Placeholder text is not required. Only use placeholder text if it helps cue users to the data format, or shows important information that helps users decide what to input.

<Flex gap={2}>
  <Dont
    src={placeholderDont}
    description="Don't repeat unnecessary, or duplicate information like character counts when they're already present"
  />

  <Dont
    src={placeholderDont2}
    description="Don't use ellipses in placeholders"
  />
</Flex>

<Flex gap={2}>
  <Do
    src={placeholderDo}
    description="Use plachedolers to indicate formatting or critical information"
  />
</Flex>

### Helper text

Helper text is located below the field label. This text is used to provide context or instructions, such as character count or required formatting.

![Use helper text for specific instructions or tips](./images/textarea-5.png)

It is also possible to include toggle-able helper text, using an in-line implementation of the [Reveal](/docs/components/elements/Reveal/#inline-with-text) with a trigger that indicates more information will be revealed (e.g. "Show more information.")

### Character count

Textareas can have a character limit. If so, a character count displays on the top right showing the remaining available characters. Once the limit is reached, display an error message.

![You can include character count in Textareas](./images/textarea-6.png)

---

## Behavior

### Sizing

The suggested default height is five lines of text.

### Overflow

Textareas scroll vertically when the length of the content exceeds the available space.

### Validation and errors

Within forms, all inputs should be validated and errors clearly displayed to the user on submit.

---

## Related components

{

<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink
    name="TextInput (next)"
    description="@sqs/rosetta-elements/textinput/next"
    url="/docs/components/elements/TextInput/Next"
  />
</Box>
}
