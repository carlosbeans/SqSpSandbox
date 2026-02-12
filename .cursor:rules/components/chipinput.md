---
title: Chip Input
---

import { Box } from '@sqs/rosetta-primitives';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { Description } from '@site/src/components/Markdown/Description';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Token } from '@site/src/components/Markdown/Token';
import { chipInputStories } from './ChipInput';
import ChipInputDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/ChipInput/ChipInput';
import ChipDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/ChipInput/Chip';
import { KeyboardKey } from '@site/src/components/Markdown/KeyboardKey';

{
<Description>
An input that displays user entered text as a highlighted chip. Like Cell, the
component can be customized with an icons as prefix, suffix, etc.
</Description>
}

:::warning New Pattern Available
This component has been redesigned. Please use the new, updated [Chip Manager](/docs/patterns/forms/ChipManager/) pattern.
:::

<ComponentInformation
  title="ChipInput"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/KsnFq7m1J5yFaXMJeOGOu8/Chip-Input?node-id=0%3A1"
/>

## Code

### Import

```js
import { ChipInput } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={chipInputStories} />

### Props

<PropTable docs={ChipInputDocs} />

<PropTable docs={ChipDocs} />

## Usage

### General guidance

The Chip Input is an input that allows the user to type and create tokenized values as [Chips](/docs/components/elements/Chip). It is designed to help categorize information, and can be used in a variety of contexts such as product variants, tags, and categories.

---

### Anatomy

![Anatomy of a Banner](./images/anatomy.png)

<AnatomyListItem number="1" title="Cell" />

<AnatomyListItem number="2" title="Chip" />

<AnatomyListItem
  number="3"
  title="Text Input"
  description="Placeholder text should read 'Add' paired with a contextual noun (e.g. size, color, tag), followed by ellipsis"
/>

---

### Specs

Chip Input is a [Cell](/docs/components/elements/Cell) with both Chips and [Text Input](/docs/components/elements/TextInput) in the "body" slot. See each component's documentation for spec details.

#### Wrapping

Chips inside a Chip Input will wrap and the Cell will continue to increase in height as needed.

![Chip Input, wrapped](./images/specs-wrapping.png)

#### Focus State

Per Cell and Text Input guidelines, when focused, the Chip Input will display a caret and the Divider turns <Token name="gray.100" themeKey="colors" />.

![Chip Input, focused](./images/specs-focus.png)

---

### Layout

#### With a Label

Like any other form control, Chip Inputs should be paired with a label.

![Chip Input with a label](./images/layout-label.png)

#### With Search and action Buttons

A Chip Input can be combined with other [Cells](/docs/components/elements/Cell) to create certain functionality. The example below shows how you can create something similar to Core Components’ [Tag Manager](https://core-components.squarespace.net/core-components/components/TagManager/) with a Chip Input, [Search](/docs/components/compositions/Search) and two [Buttons](/docs/components/primitives/Button) in a Cell.

![Core Components Tag Manager constructed with Rosetta components](./images/layout-tag-manager.png)

---

### Behavior

#### Keyboard navigation

The Chip Input was built with keyboard navigation as a top priority. Users can <KeyboardKey name="Tab" /> through their [Chip](/docs/components/elements/Chip), hit <KeyboardKey name="Delete" /> once to focus the Chip, then a second time to delete it. Try it out for yourself in the [Code tab](/docs/components/compositions/ChipInput)!

![Chip Input keyboard navigation](./images/keyboard.gif)

#### Autocomplete

If the user is entering in data from a known database, providing an autocomplete can be helpful. Follow [Dropdown](/docs/components/compositions/Dropdown/Next) specs for the dialog.

![Chip Input with autocomplete](./images/specs-dialog.png)

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
<RelatedLink name="Cell" description="@sqs/rosetta-elements" url="/docs/components/elements/Cell" />

<RelatedLink name="Chip" description="@sqs/rosetta-elements" url="/docs/components/elements/Chip" />

<RelatedLink name="Text Input" description="@sqs/rosetta-elements" url="/docs/components/elements/TextInput" />
</Box>
}
