---
title: Box
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from "@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer";
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { commonPropDocs } from '@site/src/components/ComponentsPage/PropTable/primitivePropDocs';
import { boxStories } from "./Box";

{
<Description>
  Basic component of Rosetta design system often used to create cross-platform interfaces with minimal effort. On web, `Box` represents a DOM element; in React Native, it represents a `View`.
</Description>
}

<ComponentInformation title="Box" componentPackage="@sqs/rosetta-primitives" />

## Code

### Import

```js
import { Box } from '@sqs/rosetta-primitives';
```

### Examples

<StoryRenderer stories={boxStories} />

### Props

<PropTable docs={commonPropDocs(('Box'))} />

## Usage

A Box essentially creates a `div` that allows for easy application of Rosetta's color and sizing [Tokens](/docs/develop/style-packages/tokens#borders)

There isn't visual representation that would make sense in Figma, so Box is not present in the [Rosetta Figma libraries](https://www.figma.com/files/673231535337049172/project/1718865/Rosetta-Libraries).
