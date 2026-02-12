---
title: Search
---

import { Box } from '@sqs/rosetta-primitives';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Description } from '@site/src/components/Markdown/Description';
import { Token } from '@site/src/components/Markdown/Token';
import { searchStories } from './Search';
import DropdownPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Dropdown/Dropdown';
import DropdownDisplayPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Dropdown/Display';
import SearchInputPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Search/Input';

{
<Description>
  Search allows users to find relevant content by typing in keywords.
</Description>
}

<ComponentInformation
  title="Search"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6465%3A74"
/>

The Search component uses the [Dropdown](/docs/components/compositions/Dropdown) under the hood, and accepts the same props.

## Code

### Import

```js
import { Search } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={searchStories} />

### Props

<PropTable docs={SearchInputPropDocs} />

<PropTable docs={DropdownPropDocs} />

<PropTable docs={DropdownDisplayPropDocs} />

## Usage

### General guidance

Search is a way for users to find content or navigate to where they want to go. Once a user types keywords into a search input, content is updated with relevant search results.

If Search is used multiple times across the same product area or flow, the placement should be consistent across these pages.

---

### Anatomy

#### Default

![Anatomy of a default Search](./images/anatomy-1.png)

<AnatomyListItem number="1" title="Search icon" />

<AnatomyListItem number="2" title="Text Input" />

<AnatomyListItem number="3" title="Cell" />

<AnatomyListItem number="4" title="Cross Icon" />

<AnatomyListItem number="5" title="Search Input" />

<AnatomyListItem
  number="6"
  title="Search dialog (desktop)"
  description="Optional"
/>

#### Compact Search (mobile)

![Anatomy of a compact Search on mobile](./images/anatomy-2.png)

<AnatomyListItem number="1" title="Search icon" />

#### Mobile Search Dialog

![Anatomy of a Sheet dialog on mobile](./images/anatomy-3.png)

<AnatomyListItem number="1" title="Sheet" />

<AnatomyListItem number="2" title="Search input" />

<AnatomyListItem number="3" title="Cancel Button" />

<AnatomyListItem number="4" title="Cell" />

---

### Variants

#### Default

Default Search has an exposed search input and can be used on either mobile or desktop.

![Default Search](./images/variants-default.png)

![Search input states](./images/states.png)

#### Compact (mobile only)

Use compact Search on mobile only when search is not an important action and there is limited space on the screen. Compact Search hides the search input until a user taps on the Search icon.

![Compact Search](./images/variants-compact.png)

---

### Specs

The construction of the Search input follows the specs of a Cell. In most circumstances, Search should use the floating style cell since it is a standalone input.

#### Default

| Property | Value                                       |
| -------- | ------------------------------------------- |
| Position | Above content                               |
| Width    | Flexible                                    |
| Height   | <Token name="sizes.250" themeKey="sizes" /> |
| Padding  | <Token name="space[2]" />                   |

![Search input specs](./images/spec-default.png)

#### Compact (mobile only)

| Property   | Value                                       |
| ---------- | ------------------------------------------- |
| Position   | Above content                               |
| Width      | Full width on mobile                        |
| Height     | <Token name="sizes.250" themeKey="sizes" /> |
| Top margin | <Token name="space[3]" />                   |

![Compact Search input specs when exposed](./images/spec-compact.png)

#### Search dialog (desktop)

The Search dialog on desktop follows the specs of the Dropdown dialog. See Dropdown for more details.

| Property   | Value                                    |
| ---------- | ---------------------------------------- |
| Position   | Below search input                       |
| Width      | Flexible                                 |
| Height     | Flexible, determined by content          |
| Top margin | <Token name="space[1]" />                |
| Padding    | <Token name="space[1]" /> top and bottom |

![Search dialog specs (desktop)](./images/spec-dialog.png)

#### Search dialog (mobile)

The construction of the Search dialog on mobile follows the specs of a Sheet with a Search input inside a fixed Toolbar. The list items are made of Cells that can be adapted for different needs.

##### Toolbar

The Search input and cancel Button sit vertically centered within a Toolbar fixed at the top of the Sheet.

| Property      | Value                                       |
| ------------- | ------------------------------------------- |
| Width         | Full width                                  |
| Height        | <Token name="sizes.400" themeKey="sizes" /> |
| Padding       | <Token name="space[3]" />                   |
| Bottom margin | <Token name="space[1]" />                   |

![Mobile Search dialog specs](./images/spec-sheet.png)

---

### Behavior

Search results can be loaded in two ways. Live search allows the search to run as each character is typed, returning results instantly to the user. Results can also be returned after the user hits enter on the keyboard. Do not use live search if it takes a long time to load the results after each character is entered.

#### Auto-complete

The Search dialog can be used to show auto-complete results, which gives selectable suggestions based on what a user types.

![Auto-complete search results](./images/behavior-autosuggest.png)

#### Desktop

On desktop, the Search dialog appears below when the Search input is selected.

![Search dialog on desktop](./images/behavior-desktop.png)

#### Mobile

When using compact Search without a dialog, the user taps the Search icon to expose the Search input.

![Compact Search with Search input (GIF)](./images/behavior-compact-search.gif)

##### With Search dialog

When using the Search dialog on mobile, the Sheet enters from the bottom once a user taps the Search icon or Search input. See Sheet for guidelines.

#### Clearing search

When a user starts typing, a Cross icon appears that allows the user to clear the search.

![Clear search with Cross icon](./images/behavior-clear-search.png)

## Accessibility

### Icon tap target

The Search icon has a tap target of 44px by 44px, and should be spaced out appropriately
so it does not overlap when placed next to other icons.

![Tap target size](./images/accesibility-tap-target.png)

### Focus state

For keyboard users, a focus state should appear around the Cross icon when focused.

![Focus state around Cross icon](./images/accesibility-clear-focus.png)

### Screen readers

Make sure that the placeholder text is labelled so that screen reader users understand
what they are searching and what should be typed in the input.

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Dropdown" description="@sqs/rosetta-compositions" url="/docs/components/compositions/Dropdown" />

  <RelatedLink name="Text Input" description="@sqs/rosetta-elements" url="/docs/components/elements/TextInput" />

  <RelatedLink name="Sheet" description="@sqs/rosetta-elements" url="/docs/components/elements/Sheet" />

  <RelatedLink name="Cell" description="@sqs/rosetta-elements" url="/docs/components/elements/Cell" />
</Box>
}
