---
title: Time Input
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Box } from '@sqs/rosetta-primitives';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Checkmark } from '@sqs/rosetta-icons';
import { timeInputStories } from './TimeInput';
import TimeInputRootPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/TimeInput/TimeInput.Root';
import TimeInputControlPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/TimeInput/TimeInput.Control';
import TimeInputSegmentPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/TimeInput/TimeInput.Segment';
import TimeInputSeparatorPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/TimeInput/TimeInput.Separator';
import TimeInputHiddenControlPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/TimeInput/TimeInput.HiddenControl';
import TimeInputTimeZonePropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/TimeInput/TimeInput.TimeZone';

{

<Description>
Time Inputs allow users to enter localized time data. Composed of focusable segments that support keyboard input.
</Description>
}

<ComponentInformation
  title="TimeInput"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?node-id=8089-31044&t=RmtjJptxC50DHMmP-11"
/>

## Code

### Import

```js
import { TimeInput } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={timeInputStories} />

### Props

<PropTable docs={TimeInputRootPropDocs} />

<PropTable docs={TimeInputControlPropDocs} />

<PropTable docs={TimeInputSegmentPropDocs} />

<PropTable docs={TimeInputSeparatorPropDocs} />

<PropTable docs={TimeInputHiddenControlPropDocs} />

<PropTable docs={TimeInputTimeZonePropDocs} />

## Guidance

### General content guidance

Time Input is a composed of selectable segments, which support both arrow key and alphanumerical inputs. These segments support both 12-hour and 24-hour date formats, and supports granularity up to the second.

![Breakdown of the Number Input anatomy](./images/timeinput-anatomy.png)

| Element                              | Required?                       | Notes                                             |
| ------------------------------------ | ------------------------------- | ------------------------------------------------- |
| [**Field label**](#field-label)      | <Checkmark color="green.300" /> | Always include labels for accessibility.          |
| [**Error text**](#error-text)        | <Checkmark color="green.300" /> | Always provide context and resolution for errors. |
| [**Placeholder**](#placeholder-text) | <Checkmark color="green.300" /> | Time Input always includes placeholders.          |
| [**Suffix**](#suffix)                | -                               | Optional. Can be used to display timezone.        |
| [**Helper**](#helper)                | -                               | Only use when more context is necessary.          |

### Field label

Labels are required as they are critical for assistive-technology users. Use short, direct nouns.

![Labels are necessary for Number Inputs](./images/timeinput-labels.png)

### Error text

Error text should be attached to the field and pushes helper text below the field down when a form is submitted incorrectly.

![Error text are necessary for Number Inputs](./images/timeinput-error.png)

Error text should include why an input is invalid, supporting context, and resolution to the error. Ensure that error text communicates how to fix the input error (e.g., "End time cannot occur before the start time. Enter a valid time"). This text does not need a period at the end.

Review error messages with a content designer or check the [writing guidelines](/docs/content-design/mechanics/error-messages/) for more help.

### Placeholder text

Time Input, by default, has placeholders for its time segments (e.g. hh:mm). It also supports both 12-hour and 24-hour time formats.

![Prefixes and suffixes can help provide labels or units as helpful context](./images/timeinput-placeholder.png)

### Suffix

In certain cases, it can be useful to display timezones to users to reduce confusion. In these cases, use a suffix to display the user's localized timezone.
![Prefixes and suffixes can help provide labels or units as helpful context](./images/timeinput-suffix.png)

### Helper

Helper text is located below the field label. This text is used to provide context or instructions.

## Behavior

### Keyboard and input behavior

#### Looping numbers

After reaching the maximum value possible for that segment, numbers will loop from start. For example, if current minute selected is 59 and user attempts to click up arrow again, it will loop back to 00.

#### Automatic segment focus

Focus will jump to following segments based on input. For example, if a user types `1` in the hour slot it will not jump focus because user _could_ be typing a variety of possible hours. But if a user inputs `5` focus will automatically jump to the minute segment.

### Timezones and formatting

The Time Input component includes a translation layer which should account for timezone conversions and locale-specific formatting.

### Validation and errors

All inputs should be validated and errors clearly displayed to the user on submit.

{

<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
<RelatedLink
name="DateInput"
description="@sqs/rosetta-elements"
url="/docs/components/elements/DateInput"
/>
</Box>
}
