---
title: Text Field
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Box } from '@sqs/rosetta-primitives';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Token } from '@site/src/components/Markdown/Token';
import TextFieldPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/TextField/TextField';
import { textFieldStories } from './TextField';

{
<Description>
  TextField allow users to enter and edit text. The component also accepts all
  HTML input props through an inputProps object.
</Description>
}

:::warning New Component Available
TextField is being replaced. Please use the new [TextInput](/docs/components/elements/TextInput/Next/) component and migrate existing instances using the [Migration Guide](/docs/components/elements/TextInput/MigrationGuide).
:::

<ComponentInformation
  title="TextField"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6384%3A5446"
/>

## Code

### Import

```js
import { TextField } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={textFieldStories} />

### Props

<PropTable docs={TextFieldPropDocs} />

## Guidance

### General guidance

Text Field is an HTML input field with a styled wrapper and should be used in place of the deprecated [Text Input in a Cell](/docs/patterns/other/CellFields/TextInput/) component as Text Field has a significantly improved UX.

Text Field can be used for managing data by specifying `type` as `text` (default), `email`, `URL`, `number`, and `password`. Use Rosetta's specialized components for [`search`](/docs/components/compositions/Search/), [`date`](/docs/components/compositions/DatePicker/), and [`color`](/docs/components/compositions/ColorPicker/). Specify `inputmode` for the appearance of virtual keyboards.

Always include a descriptive label. Placeholder text should be avoided. If more description or formatting is necessary, use Helper text to convey this information.

The component is configurable to fit different appearances including the default (previously called "floating") appearance and the Cell appearance.

#### Default appearance

The default appearance is the recommended pattern for forms. Whenever possible, use this appearance as it more clearly affords interaction and can be used across any surface. By default this variant places the label above the input.

![TextField default appearance](./images/guidance-default.png)

#### Cell appearance

The cell appearance should only be used to match styling when placed within stacks of other Cell components. If possible, consider using the Default appearance for its clearer affordances. By default this variant places the label inline with the input.

![TextField cell appearance](./images/guidance-cell.png)

#### Alternative labels

It is also possible to configure alternative label placements. Shown below, for example, is a Cell appearance Text Field with a top label.

![TextField alternative labels](./images/guidance-alternative-labels.png)

### Content

Aim to have an input field that can accept as many formats as possible and is resilient to common errors. However, if the input field only allows specific formatting, provide helper text.

#### Label text

Labels are required as they are critical for assistive-technology users. They remain persistent, either above or in-line with the input. Use short, direct nouns to state the information users need to provide (e.g., Address, Phone, Email).

Forms should ideally only include required fields; do not use markings like asterisks on these fields. If an optional field must be used, add "(optional)" at the end of the label.

[Icons](/docs/components/icons) can be used as labels in established and unambiguous patterns, such as a magnifying glass icon as a label for a search input. Always ensure they have appropriate alt text.

#### Placeholder text

Avoid using placeholder text whenever possible. Instead, use labels to describe the intent of the input and helper text to communicate complex formatting.

#### Helper text

Helper text is located below the text field and assists the user as they type. This text is specifically used to provide instructions, such as character count or required formatting.

![TextField helper text](./images/guidance-helper-text.png)

It is also possible to include toggle-able helper text, using an in-line implementation of the [Reveal](/docs/components/elements/Reveal/#inline-with-text) with a trigger that indicates more information will be revealed (e.g. "What is this?" or "Show more information.")

#### Error text

Error text replaces helper text when a form is submitted incorrectly. Ensure that error text communicates how to fix the input error (e.g., "Enter a valid 5-digit zip code"). This text does not need a period at the end.

![TextField error](./images/guidance-error-text.png)

#### Internationalization

Match each international market's standard formatting and terminology for text fields.

Don't assume the format for country-specific inputs, such as phone numbers, postal codes, and dates. These input fields should be automatically formatted as the user types or have more guidance added using the helper text line.

Pay attention to the in-line label length as it can expand drastically when translated. Consider using a top label placement with the default appearance in such cases.

Collaborate with the [#i18n](https://squarespace.slack.com/archives/CAN2R6203) team early to best design for localization.

## Usage

### Inline

Text Field can be used inside of other Rosetta patterns, including Stepper in a [Cell](https://markdowntohtml.com/docs/components/elements/Cell), [Slider](https://markdowntohtml.com/docs/components/elements/Slider) in a Cell, and [Pagination](https://markdowntohtml.com/docs/patterns/other/Pagination).

![TextField cell inline inside Stepper](./images/textfield-cell-inline-1.png)

![TextField cell inline inside Slider](./images/textfield-cell-inline-2.png)

![TextField cell inline inside Pagination](./images/textfield-cell-inline-3.png)

### Behavior

#### Autocomplete

Wherever possible, use the appropriate [`autocomplete` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) when certain user data is collected, to make filling out forms easier. This attribute helps pre-populate fields for which users have already entered information.

Consider specifying `spellcheck` and `autocapitalize` to ensure intended behavior, with or without spellcheck and autocapitalization is present.

Consider leaving out autocorrect for certain inputs (e.g., "name" or "address") to help improve the user experience.

#### Overflow

Horizontal scroll is enabled when the length of the content exceeds the width of the Text Field. Content doesn't wrap in Text Field and component won't grow in height.

#### Validation and errors

Within forms, all inputs should be validated and errors clearly displayed to the user on submit.

#### Character limit

If a Text Field has a max character limit, include a text counter within the field.

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Text Input in a Cell" description="Pattern" url="/docs/patterns/other/CellFields/TextInput" />

  <RelatedLink name="Text Input" description="Pattern" url="/docs/components/elements/TextInput" />
</Box>
}
