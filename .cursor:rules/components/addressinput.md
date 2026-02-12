---
title: Address Input
---

import { Box } from '@sqs/rosetta-primitives';
import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { addressInputStories } from './AddressInput';
import AddressInputDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/AddressInput/AddressInput';

{
<Description>
  Input component that uses Google to search for addresses.
</Description>
}

<ComponentInformation
  title="AddressInput"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6451%3A570"
/>

## Code

### Import

```js
import { AddressInput } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={addressInputStories} />

### Props

<PropTable docs={AddressInputDocs} />

## Usage

### General guidance

The Address Input is an implementation of [Search](/docs/components/compositions/Search) that uses Google to search for addresses. Use the component whenever a user needs to enter an address.

---

### Anatomy

![Anatomy of an Address Input](./images/anatomy.png)

<AnatomyListItem number="1" title="Search" description="Search input" />

<AnatomyListItem
  number="2"
  title="Results"
  description="Displayed in a dialog on desktop, in a Sheet on mobile"
/>

<AnatomyListItem
  number="3"
  title="‘Powered by Google’ logo"
  description="Indicates to user where results are coming from, mandatory to include "
/>

---

### Specs

The Address Input follows all of [Search's](/docs/components/compositions/Search) specs.

---

### Behavior

The Address Input autocompletes address results from Google's data. See Google's documentation for more information on the Places API.

![Address Input](./images/addressinput.gif)

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Search" description="@sqs/rosetta-compositions" url="/docs/components/compositions/Search" />

  <RelatedLink name="Cell" description="@sqs/rosetta-elements" url="/docs/components/elements/Cell" />
</Box>
}
