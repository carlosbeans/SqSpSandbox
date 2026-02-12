---
title: Flex
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { flexStories } from './Flex';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { commonPropDocs } from '@site/src/components/ComponentsPage/PropTable/primitivePropDocs';

{
<Description>
  Extension of Rosetta Box. Sets display to "flex," providing all CSS flexbox properties.
</Description>
}

Visit [css-tricks.com](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for a comprehensive guide to CSS flexbox layout.

<ComponentInformation title="Flex" componentPackage="@sqs/rosetta-primitives" />

## Code

### Import

```js
import { Flex } from '@sqs/rosetta-primitives';
```

### Examples

<StoryRenderer stories={flexStories} />

### Props

<PropTable docs={commonPropDocs(('Flex'))} />

## Usage

Flex is an extension of the [Box](/docs/components/primitives/Box) Primitive from Rosetta with Flexbox applied. [Learn more about Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

There isn't visual representation that would make sense in Figma, so Flex is not present in the [Rosetta Figma libraries](https://www.figma.com/files/673231535337049172/project/1718865/Rosetta-Libraries).
