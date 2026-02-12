---
title: Combobox
---

import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Description } from '@site/src/components/Markdown/Description';
import { Token } from '@site/src/components/Markdown/Token';
import SelectionInputRefTable from '@site/src/components/Markdown/SelectionInputRefTable.mdx';
import { Flex } from '@sqs/rosetta-primitives';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import { Image } from '@site/src/components/Markdown/Image';
import { comboboxStories } from './Combobox';
import dropdownUsage from './images/usage-dropdown-example.png';
import comboboxUsage from './images/usage-combobox-example.png';

import ComboboxHiddenControlPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.HiddenControl';
import ComboboxListPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.List';
import ComboboxOptionGroupPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Option.Group';
import ComboboxOptionGroupLabelPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Option.Group.Label';
import ComboboxOptionIconPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Option.Icon';
import ComboboxOptionLabelPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Option.Label';
import ComboboxOptionPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Option';
import ComboboxOverlayPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Overlay';
import ComboboxPortalPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Portal';
import ComboboxPositionerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Positioner';
import ComboboxSearchPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Search';
import ComboboxSearchIconPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Search.Icon';
import ComboboxSearchControlPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Search.Control';
import ComboboxSearchTriggerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Search.Trigger';
import ComboboxSearchValuePropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/Combobox.Search.Value';
import ComboboxRootPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Combobox/ComboboxRoot';

{

  <Description>
    Input that allows users to select from a list of options by typing to filter
    and search.
  </Description>
}

{/* TODO: update figma link! */}

<ComponentInformation
  title="Combobox"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl=""
/>

## Code

### Import

```js
import { Combobox } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={comboboxStories} />

### Props

<PropTable docs={ComboboxRootPropDocs} />

<PropTable docs={ComboboxHiddenControlPropDocs} />

<PropTable docs={ComboboxListPropDocs} />

<PropTable docs={ComboboxOptionGroupPropDocs} />

<PropTable docs={ComboboxOverlayPropDocs} />

<PropTable docs={ComboboxPortalPropDocs} />

<PropTable docs={ComboboxPositionerPropDocs} />

<PropTable docs={ComboboxSearchPropDocs} />

<PropTable docs={ComboboxSearchIconPropDocs} />

<PropTable docs={ComboboxSearchControlPropDocs} />

<PropTable docs={ComboboxSearchTriggerPropDocs} />

<PropTable docs={ComboboxSearchValuePropDocs} />

<PropTable docs={ComboboxRootPropDocs} />

## Usage

### General guidance

![Anatomy of a Combobox](./images/combobox-anatomy.png)

Combobox is a solution for allowing users to make a selection with autocomplete and searchability within longer lists.

### Combobox vs. Dropdown

[Dropdown](/docs/components/compositions/Dropdown/Next) may be a better option for:

- limited lists of options that don’t require a significant amount of scrolling
- lists in which options are arranged in a known pattern

Combobox may be a better fit for:

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

Combobox supports multi-select for use cases where users can select multiple options. This includes the Checkbox affordance inline with the option.

![Multi-select Combobox, desktop](./images/combobox-multiselect.png)

### Behavior

### Adding custom values

Combobox also supports use cases in which:

1. There is a set list of options from which users can choose
2. But it should also be possible to also add a new option which doesn't currently exist in the list

For this use case, users can type a string into the search field, select the Add Option action, and add that option to the list for selection.

![Adding a new option with Combobox](./images/combobox-add-option.png)

#### Grouping

To create separation and hierarchy between groups of options, use the Combobox's option group component.

![Dropdown dialog with optional group labels](./images/combobox-groups.png)

#### Scrolling

##### Desktop scrolling

![Combobox dialog overflow, desktop](./images/behavior-overflow.png)

Combobox doesn't have the same restrictions around long lists. By default, the dialog will cap <Token name="space[4]" /> from the edge of the viewport and scroll.

#### Overflow

Pay attention to the label length as it can expand drastically when translated. Interior labels should be kept as short as possible in [all supported languages](/docs/design/foundations/i18n). Use an external label instead for long labels. Collaborate with the [#i18n](https://squarespace.slack.com/archives/CAN2R6203) team early to best design for localization.

When options inside the dialog require more space, the label will wrap. Note that for long single-word options, the label will break with hyphens.

![Dropdown dialog mid-word break, desktop](./images/behavior-overflow-desktop-midword-break.png)

### Accessibility

Every Combobox must have an accessible name and label. Use the Field.Label to ensure proper accessibility. For more on composing Fields, refer to [Field](/docs/components/primitives/Field).
