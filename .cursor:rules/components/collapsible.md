---
title: Collapsible
---

import { Text, Box } from '@sqs/rosetta-primitives';
import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import CollapsiblePropDocs from '@sqs/rosetta-prop-docs/docs/packages/primitives/components/Collapsible/Collapsible';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { collapsibleStories } from './Collapsible';

{

<Description>
  The collapsible component is used to put long sections of information under a
  block that users can expand or collapse.
</Description>
}

<ComponentInformation
  title="Collapsible"
  componentPackage="@sqs/rosetta-primitives"
/>

## Code

### Import

```js
import { Collapsible } from '@sqs/rosetta-primitives';
```

### Examples

<StoryRenderer stories={collapsibleStories} />

### Props

<PropTable docs={CollapsiblePropDocs} />

## Usage

### General guidance

Collapsible expands or collapses an item.

{

<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use Collapsible to collapse a large amount of content when there's limited space.
- Use Collapsible to allow users to expand or collapse content that's relevant to them.

{

<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Don't use Collapsible when content is important and needs to be displayed for the user.
- Don't use Collapsible for a single labeled section of content.

There isn't visual representation that would make sense in Figma, so Collapsible is not present in the [Rosetta Figma libraries](https://www.figma.com/files/673231535337049172/project/1718865/Rosetta-Libraries).

## Related components

{

<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink
    name="Reveal"
    description="@sqs/rosetta-elements"
    url="/docs/components/elements/Reveal"
  />
</Box>
}
