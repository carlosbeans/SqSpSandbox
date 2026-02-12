---
title: Dropdown (next)
sidebar_position: 1
---

import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Description } from '@site/src/components/Markdown/Description';
import { Token } from '@site/src/components/Markdown/Token';
import { Image } from '@site/src/components/Markdown/Image';
import { dropdownStories } from './Dropdown';
import SelectionInputRefTable from '@site/src/components/Markdown/SelectionInputRefTable.mdx';
import { Flex } from '@sqs/rosetta-primitives';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import optionsDo from './images/dropdown-options-do.png';
import optionsDont from './images/dropdown-options-dont.png';
import dropdownUsage from './images/usage-dropdown-example.png';
import comboboxUsage from './images/usage-combobox-example.png';

import DropdownHiddenControlPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Dropdown/Dropdown.HiddenControl';
import DropdownListPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Dropdown/Dropdown.List';
import DropdownOptionGroupPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Dropdown/Dropdown.Option.Group';
import DropdownOverlayPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Dropdown/Dropdown.Overlay';
import DropdownPortalPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Dropdown/Dropdown.Portal';
import DropdownPositionerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Dropdown/Dropdown.Positioner';
import DropdownTriggerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Dropdown/Dropdown.Trigger';
import DropdownTriggerIconPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Dropdown/Dropdown.Trigger.Icon';
import DropdownTriggerValuePropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Dropdown/Dropdown.Trigger.Value';
import DropdownRootPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Dropdown/DropdownRoot';

<Description>
  Collapsible and expandable list for selection by user.
</Description>

<ComponentInformation
  title="Dropdown"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/design/M2xGuHjR4N2ADYD6wSaJUq/03.-Rosetta-Components?node-id=1-830"
/>

## Code

### Import

```js
import { Dropdown } from '@sqs/rosetta-compositions/dropdown/next';
```

### Examples

<StoryRenderer stories={dropdownStories} />

### Props

<PropTable docs={DropdownRootPropDocs} />

<PropTable docs={DropdownHiddenControlPropDocs} />

<PropTable docs={DropdownListPropDocs} />

<PropTable docs={DropdownOptionGroupPropDocs} />

<PropTable docs={DropdownOverlayPropDocs} />

<PropTable docs={DropdownPortalPropDocs} />

<PropTable docs={DropdownPositionerPropDocs} />

<PropTable docs={DropdownTriggerPropDocs} />

<PropTable docs={DropdownTriggerIconPropDocs} />

<PropTable docs={DropdownTriggerValuePropDocs} />

## Usage

### General guidance

![Anatomy of a Dropdown](./images/dropdown-anatomy.png)

<AnatomyListItem
  number="1"
  title="Field label"
  description="Describes the selection being made"
  backgroundColor="cyan.300"
/>

<AnatomyListItem
  number="2"
  title="Helper text (optional)"
  description="Gives additional context for the field. For example, if a selection made for this field may affect other options for the user later like in settings"
  backgroundColor="cyan.300"
/>

<AnatomyListItem
  number="3"
  title="Trigger"
  description="The main click target area"
  backgroundColor="cyan.300"
/>

<AnatomyListItem
  number="4"
  title="Placeholder/Value"
  description="Placeholder text for dropdowns should either be: “Select” or a preselected default option: “All”, {intermediate option}, “None”, or today’s date for a date format."
  backgroundColor="cyan.300"
/>

<AnatomyListItem
  number="5"
  title="Option"
  description="Options should be 1-4 words or 1 numeral. Sort alphabetically, by default usage, or by popularity. They can also be grouped."
  backgroundColor="cyan.300"
/>

<AnatomyListItem
  number="6"
  title="List"
  description="Try to keep lists under 10 items. Use Combobox for longer lists."
  backgroundColor="cyan.300"
/>

Dropdowns allow users to select one, or multiple, options from a list. They are useful when the space is too limited to display the whole list unconcealed.

Dropdowns should be used thoughtfully, and only when they make the data input easier for the user. For example, it is much easier to type a state (e.g., NY) or birth year (e.g., 1991) than it is to select them in a Dropdown. [Combobox](/docs/components/compositions/Combobox) can get the best of both worlds: properly formatted information while providing the more ergonomic search. Read about when to use either pattern [below](#dropdown-vs-combobox).

Golden Krishna and Eric Campbell gave a [great talk](http://www.fuckdropdowns.com/) about bad dropdowns at SXSW in 2016.

<Flex gap={2}>
  <Do
    src={optionsDo}
    description="Use Dropdowns for limited lists of options"
  />

  <Dont
    src={optionsDont}
    description="Don't use Dropdowns for binary options; use Toggle or Radio instead"
  />
</Flex>

### Dropdown vs. Combobox

Dropdown may be a better option for:

- limited lists of options that don’t require a significant amount of scrolling
- lists in which options are arranged in a known pattern

[Combobox](/docs/components/compositions/Combobox) may be a better fit for:

- longer lists that can benefit from search
- use cases where users should be able to create an option that aren't on the list

<Flex
  gap={4}
  sx={{
'& figure': { margin: 0, width: "100%" },
'& img': { margin: 0, marginBottom: 2 },
'& figcaption, & figcaption *': { lineHeight: 1.2 },
}}
>
  <Image
    src={dropdownUsage}
    caption="Dropdown is more restrictive; the user can only select from a mutually exclusive set of options. Here, there are only a few days of the week that are arranged in a known order."
    my={0}
  />

  <Image
    src={comboboxUsage}
    caption="Combobox can be especially helpful for helping users find an option in a long list. The additional Checkbox affordance on a multiselect Combobox can be helpful as well for indicating multiple choices."
    my={0}
  />
</Flex>

### Selection inputs

<SelectionInputRefTable />

### Multi-select

Dropdown also supports multi-select for use cases where users can select multiple options.

![Multi-select Dropdown, desktop](./images/dropdown-multiselect.png)

### Behavior

#### Grouping

To create separation and hierarchy between groups of options,
use the Dropdown's option group component.

![Dropdown dialog with optional group labels](./images/anatomy-dividers.png)

<AnatomyListItem
  number="1"
  title="Option Group"
  description="Contains a related group of options"
  backgroundColor="cyan.300"
/>

<AnatomyListItem
  number="2"
  title="Option group label"
  description="Descriptive label for the option group"
  backgroundColor="cyan.300"
/>

#### Scrolling

##### Desktop scrolling

![Dropdown dialog overflow, desktop](./images/behavior-overflow.png)

While extremely long lists should be avoided, the dialog will cap <Token name="space[4]" /> from the edge of the viewport and scroll.

#### Overflow

Pay attention to the label length as it can expand drastically when translated. Interior labels should be kept as short as possible in [all supported languages](/docs/design/foundations/i18n). Use an external label instead for long labels. Collaborate with the [#i18n](https://squarespace.slack.com/archives/CAN2R6203) team early to best design for localization.

When options inside the dialog require more space, the label will wrap. Note that for long single-word options, the label will break with hyphens.

![Dropdown dialog mid-word break, desktop](./images/behavior-overflow-desktop-midword-break.png)

### Accessibility

Every Dropdown must have an accessible name and label. Use the Field.Label to ensure proper accessibility. For more on composing Fields, refer to [Field](/docs/components/primitives/Field).
