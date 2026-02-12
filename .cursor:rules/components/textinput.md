---
title: Text Input (next)
sidebar_position: 1
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Box, Text, Flex } from '@sqs/rosetta-primitives';
import { Checkmark } from '@sqs/rosetta-icons';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Token } from '@site/src/components/Markdown/Token';
import TextInputRootPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/TextInput/TextInput.Root';
import TextInputControlPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/TextInput/TextInput.Control';
import { textInputStories } from './TextInput';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import wideDo from './images/textinput-wide-do.png';
import wideDont from './images/textinput-wide-dont.png';
import requiredDo from './images/textinput-required-do.png';
import requiredDont from './images/textinput-required-dont.png';
import placeholderDo from './images/textinput-placeholder-do.png';
import placeholderDont from './images/textinput-placeholder-dont.png';

{

<Description>
  TextInput allows users to enter and edit text. The component also accepts all
  HTML input props.
</Description>
}

<ComponentInformation
  title="TextInput"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?node-id=5909-10602"
/>

## Code

### Import

```js
import { TextInput } from '@sqs/rosetta-elements/textinput/next';
```

### Examples

<StoryRenderer stories={textInputStories} />

### Props

<PropTable docs={TextInputRootPropDocs} />

<PropTable docs={TextInputControlPropDocs} />

## Guidance

### General content guidelines

There are several elements to a TextInput. This is a high-level, generalized set of guidelines for accessible and usable TextInputs. For more details on each of these elements, see their linked sections.

![The basic anatomy of a TextInput](./images/textinput-1.png)

| Element                              | Required?                       | Notes                                             |
| ------------------------------------ | ------------------------------- | ------------------------------------------------- |
| [**Field label**](#field-label)      | <Checkmark color="green.300" /> | Always include labels for accessibility.          |
| [**Error text**](#error-text)        | <Checkmark color="green.300" /> | Always provide context and resolution for errors. |
| [**Placeholder**](#placeholder-text) | -                               | Only use to help with input formatting.           |
| [**Helper**](#helper-text)           | -                               | Only use when more context is necessary.          |

### Field label

![Examples of direct, concise field labels](./images/textinput-2.png)

Labels are required as they are critical for assistive-technology users.

Use short, direct nouns to state the information users need to provide (for example, Address, Phone, Email).

Glyphs in the prefix slot can be used as labels in established and unambiguous patterns as long as they have appropriate alt text. Examples include a magnifying glass icon as a label for a search input.

#### Positioning

By default, the label appears above the input.

In specific contexts like the Editor where forms are constrained by a dense or narrow or short surfaces, display the label in-line with the input.

![Left: standard field label on top, right: in-line labels specifically for the editor menu](./images/textinput-3.png)

<Flex gap={2}>
  <Do
    src={wideDo}
    description="Use vertical label layouts for wide or full page surfaces"
  />

  <Dont
    src={wideDont}
    description=" Don't use horizontal label layout for wide or full page surfaces"
  />
</Flex>

#### Required vs. optional fields

Forms should ideally only include required fields.

<Flex gap={2}>
  <Do
    src={requiredDo}
    description="If an optional field must be used, add 'Optional' at the end of the label, using muted text"
  />

  <Dont
    src={requiredDont}
    description="Don't use markings like asterisks on fields"
  />
</Flex>

It's recommended to progressively disclose optional, additional, or contextual fields by revealing them with an "add X" pattern.

### Error text

Error text should be attached to the field and pushes helper text below the field down when a form is submitted incorrectly.

Error text should include why an input is invalid, supporting context, and
resolution to the error.

![Examples of error messages](./images/textinput-4.png)

Ensure that error text communicates how to fix the input error (e.g., "Enter a valid 5-digit zip code"). This text does not need a period at the end.

Review error messages with a content designer or check the [writing guidelines](/docs/content-design/mechanics/error-messages/) for more help.

### Placeholder text

TextInputs do not require placeholder text. They do not always benefit from the presence of placeholder text.

![Examples of inputs that may benefit from placeholder text](./images/textinput-5.png)

However, placeholders can be particularly useful in describing the recommended format of data. For example, displaying 16 numerical characters in a credit card input may help set expectations for the format of data for this specific input.

<Flex gap={2}>
  <Do
    src={placeholderDo}
    description="Do use placeholders as examples for data format"
  />

  <Dont
    src={placeholderDont}
    description="Don't use unnecessary placeholders that duplicate label information, and don't use placeholders as labels"
  />
</Flex>

See [Behavior](#behavior) for more on formatting and validation.

#### Internationalization considerations for placeholder text

Match each international market's standard formatting and terminology for TextInputs.

Don't assume the format for country-specific inputs, such as phone numbers, postal codes, and dates. These input fields should be automatically formatted as the user types or have more guidance added using the helper text line.

Pay attention to the in-line label length as it can expand drastically when translated. Consider using a top label placement with the default appearance in such cases.

Collaborate with the [#i18n](https://squarespace.slack.com/archives/CAN2R6203) team early to best design for localization.

### Helper text

Helper text is located below the field label. This text is used to provide context or instructions, such as character count or required formatting.

![Helper text appears below the field label](./images/textinput-6.png)

It is also possible to include toggle-able helper text, using an in-line implementation of the [Reveal](/docs/components/elements/Reveal/#inline-with-text) with a trigger that indicates more information will be revealed (e.g. "Show more information.")

## Usage

### General usage

TextInput can be used for managing data by specifying `type` as `text` (default), `email`, `URL`, `number`, and `password`. Use Rosetta's specialized components for [`search`](/docs/components/compositions/Search/), [`date`](/docs/components/compositions/DatePicker/), and [`color`](/docs/components/compositions/ColorPicker/). Specify `inputmode` for the appearance of virtual keyboards.

Aim to have an input field that can accept as many formats as possible and is resilient to common errors.

### Composition

#### Prefixes and suffixes

Prefixes and suffixes are generally used for actions or labels that only feature an [Icon Button](/docs/patterns/other/IconButton/) or [Glyph](/docs/develop/component-packages/glyph).

![Examples of prefixes and suffixes in action in inputs](./images/textinput-7.png)

Icon Buttons can provide small actions, like copy text, reveal password, or clear input.

Glyphs in the prefix slot can be used as labels in established and unambiguous patterns as long as they have appropriate alt text. Examples include a magnifying glass icon as a label for a search input.

#### Slots

Slots differ from prefixes and suffixes as they have a visible border dividing the rest of input. These are particularly more useful for components like [Dropdown](/docs/components/compositions/Dropdown/Next) or [Button](/docs/components/primitives/Button/)

![Examples of slots in inputs being used](./images/textinput-8.png)

The above example of the slot used in a telephone input can help create a denser control that is easier to understand for users while reducing formatting errors.

### Behavior

#### Validation and errors

Within forms, all inputs should be validated and errors clearly displayed to the user on submit.

#### Autocomplete

Wherever possible, use the appropriate [`autocomplete` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) when certain user data is collected, to make filling out forms easier. This attribute helps pre-populate fields for which users have already entered information.

Consider specifying `spellcheck` and `autocapitalize` to ensure intended behavior, with or without spellcheck and autocapitalization is present.

Consider leaving out autocorrect for certain inputs (e.g., "name" or "address") to help improve the user experience.

#### Overflow

Horizontal scroll is enabled when the length of the content exceeds the width of the TextInput. Content doesn't wrap in TextInput and the component won't grow in height.

#### Character limit

If a TextInput has a max character limit, include a text counter within the field.

---

## Related components

{

<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink
    name="Textarea (next)"
    description="@sqs/rosetta-elements/textarea/next"
    url="/docs/components/elements/Textarea/Next"
  />
</Box>
}
