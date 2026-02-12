---
title: Date Input
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Box } from '@sqs/rosetta-primitives';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Checkmark } from '@sqs/rosetta-icons';
import { dateInputStories } from './DateInput';
import DateInputRootPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/DateInput/DateInput.Root';
import DateInputControlPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/DateInput/DateInput.Control';
import DateInputSegmentPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/DateInput/DateInput.Segment';
import DateInputSeparatorPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/DateInput/DateInput.Separator';
import DateInputHiddenControlPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/DateInput/DateInput.HiddenControl';
import DateInputTimeZonePropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/DateInput/DateInput.TimeZone';

{

<Description>
Date Inputs allow users to enter localized date data. Composed of focusable segments that support keyboard input.
</Description>
}

<ComponentInformation
  title="DateInput"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?node-id=8089-12292&t=RmtjJptxC50DHMmP-11"
/>

## Code

### Import

```js
import { DateInput } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={dateInputStories} />

### Props

<PropTable docs={DateInputRootPropDocs} />

<PropTable docs={DateInputControlPropDocs} />

<PropTable docs={DateInputSegmentPropDocs} />

<PropTable docs={DateInputSeparatorPropDocs} />

<PropTable docs={DateInputHiddenControlPropDocs} />

<PropTable docs={DateInputTimeZonePropDocs} />

## Guidance

### General content guidance

Date Input is a composed of selectable segments, which support both arrow key and alphanumerical inputs. These segments automatically format and localize dates based on locale.

![Breakdown of the Date Input anatomy](./images/dateinput-anatomy.png)

| Element                              | Required?                       | Notes                                             |
| ------------------------------------ | ------------------------------- | ------------------------------------------------- |
| [**Field label**](#field-label)      | <Checkmark color="green.300" /> | Always include labels for accessibility.          |
| [**Error text**](#error-text)        | <Checkmark color="green.300" /> | Always provide context and resolution for errors. |
| [**Placeholder**](#placeholder-text) | <Checkmark color="green.300" /> | Date Input always includes placeholders.          |
| [**Suffix**](#suffix)                | -                               | Optional. Can be used to display timezone.        |
| [**Helper**](#helper)                | -                               | Only use when more context is necessary.          |

### Field label

Labels are required as they are critical for assistive-technology users. Use short, direct nouns.

![Labels are necessary for Date Inputs](./images/dateinput-labels.png)

### Error text

Error text should be attached to the field and pushes helper text below the field down when a form is submitted incorrectly.

![Error text are necessary for Date Inputs](./images/dateinput-error.png)

Error text should include why an input is invalid, supporting context, and resolution to the error. Ensure that error text communicates how to fix the input error (e.g., "End date cannot occur before the start date. Enter a valid date"). This text does not need a period at the end.

Review error messages with a content designer or check the [writing guidelines](/docs/content-design/mechanics/error-messages/) for more help.

### Placeholder text

Date Input automatically includes locale-specific date placeholders (e.g. `mm/dd/yyyy` for US, `dd/mm/yyyy` for Europe, `yyyy/mm/dd` for East Asia) for each date segment to reduce confusion about date formatting.

![Date Input contains placeholder text by default. Timezones are optional.](./images/dateinput-placeholder.png)

### Suffix

It could be useful to display timezones to users to reduce confusion. In these cases, use the suffix to display the user's localized timezone.

### Helper

Helper text is located below the field label. This text is used to provide context or instructions, such as a valid date range.

## Behavior

### Keyboard and input behavior

#### Increment from current date

Date Input increments from user's local date by default. In other words, when a user selects the current month segment and hits up arrow, it will set the month to the user's current month.

#### Looping numbers

After reaching the maximum value possible for that segment, numbers will loop from start. For example, if current month selected is 12 and user attempts to click up arrow again, it will loop back to 01.

#### Automatic segment focus

Focus will jump to following segments based on input. For example, if a user types `1` in the month slot it will not jump focus because user _could_ be typing `01`, `10`, `11`, or `12`. But if a user inputs `5` focus will automatically jump to the date segment.

### Timezones and formatting

The Date Input component includes a translation layer which should account for timezone conversions and locale-specific formatting.

### Validation and errors

Date Input should only allow for "real" dates. Despite this, all inputs should be validated and errors clearly displayed to the user on submit.

{

<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
<RelatedLink
name="TimeInput"
description="@sqs/rosetta-elements"
url="/docs/components/elements/TimeInput"
/>
</Box>
}
