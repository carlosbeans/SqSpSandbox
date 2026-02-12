---
title: Stack
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import StackPropsDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Stack/Stack';
import { stackStories } from "./Stack";

{
<Description>
  A utility component that manages spacing behavior between a group of components.
</Description>
}

<ComponentInformation
  title="Stack"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6384%3A5460"
/>

Stack renders child components as an `ul`, where each child is wrapped in an `li`.

## Code

### Import

```js
import { Stack } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={stackStories} />

### Props

<PropTable docs={StackPropsDocs} />

## Usage

A Stack is an extension of the [Flex](/docs/components/primitives/Flex) component that allows control of the gaps between the child elements. The direction can either be column (vertical) or row (horizontal). [Learn more about Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

There isn't visual representation that would make sense in Figma, so Stack is not present in the [Rosetta Figma libraries](https://www.figma.com/files/673231535337049172/project/1718865/Rosetta-Libraries).
