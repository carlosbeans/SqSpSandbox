---
title: Date Picker
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Flex } from '@sqs/rosetta-primitives';
import { Image } from '@site/src/components/Markdown/Image';
import DatePickerDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/DatePicker/DatePicker';
import { datepickerStories } from './DatePicker';
import behaviorNavigationImage from './images/behavior-navigation.gif';
import editableDropdownKeyboardImage from './images/editable-dropdown01.png';
import editableDropdownMouseImage from './images/editable-dropdown02.png';

{

<Description>A calendar for single date or date range selection.</Description>}

<ComponentInformation
  title="DatePicker"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6451%3A792"
/>

## Code

### Import

```js
import { DatePicker } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={datepickerStories} />

### Props

<PropTable docs={DatePickerDocs} />

## Usage

### General guidance

The Date Picker allows a user to select a single date or date range.

It's best suited for scheduling purposes when a user needs context for a date within a week, or when there's limited availability on the calendar.

---

### Anatomy

![Anatomy of a Date Picker, single date selection](./images/anatomy01.png)

![Anatomy of a Date Picker, date range selection](./images/anatomy02.png)

<AnatomyListItem number="1" title="Current month and year" />

<AnatomyListItem number="2" title="Month navigation" />

<AnatomyListItem number="3" title="Date grid" />

<AnatomyListItem number="4" title="Selected date" />

<AnatomyListItem number="5" title="Selected range" />

<AnatomyListItem number="6" title="Today" />

<AnatomyListItem number="7" title="Unavailable date" />

---

### Specs

The calendar fills the space of its container.

| Property | Value                                      |
| -------- | ------------------------------------------ |
| Width    | 100% of parent container                   |
| Height   | Determined by number of weeks in the month |

### Layout

#### Inline

The Date Picker can be placed inline when the user needs to quickly reference dates in context.

![Inline Date Picker](./images/layout-inline.png)

#### Editable Dropdown

A Date Picker can be placed inside an [Editable Dropdown](/docs/components/compositions/Dropdown/?story=editable-dropdown-with-date-range-selection#examples)’s dialog, allowing the user to either type in their date or select it on the calendar. This option is particularly useful for selecting a known date, like a birthday, where typing in a date is easier than selecting on a calendar.

<Flex gap={2}>
  <Image
    src={editableDropdownKeyboardImage}
    caption="Using the edtable dropdown in order to type in a known date"
    mx="auto"
  />

  <Image
    src={editableDropdownMouseImage}
    caption="Using the calendar action to open the calendar"
    mx="auto"
  />
</Flex>

---

### Behavior

#### Navigation

The user can use their mouse or keyboard to move between months and select a single date.

<Image
  src={behaviorNavigationImage}
  caption="Navigating through a Date Picker"
  maxWidth="sizes.700"
  mx="auto"
/>

### Range selection

Add two Editable Dropdowns to create date range inputs. The first date selected is the start date, and the second date selected is the end date.

![Date range using two Editable Dropdowns](./images/editable-dropdown03.png)

#### Unavailable dates

Dates can be unavailable by the user. For example, dates may be marked unavailable to align with a user's business hours or when all their appointment slots have been booked.

![Date picker with weekend dates inactive](./images/behavior-inactive.png)
