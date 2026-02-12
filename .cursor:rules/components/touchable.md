---
title: Touchable
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { touchableStories } from "./Touchable";
import TouchablePropDocs from '@sqs/rosetta-prop-docs/docs/packages/primitives/components/Touchable/Touchable';
import SolidPropDocs from '@sqs/rosetta-prop-docs/docs/packages/primitives/components/Touchable/Solid';
import UnderlinePropDocs from '@sqs/rosetta-prop-docs/docs/packages/primitives/components/Touchable/Underline';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';

{
<Description>
  Container providing our common visual feedback for clickable elements.
</Description>
}

<ComponentInformation
  title="Touchable"
  componentPackage="@sqs/rosetta-primitives"
/>

## Code

### Import

```js
import { Touchable } from '@sqs/rosetta-primitives';
```

### Examples

<StoryRenderer stories={touchableStories} />

### Props

<PropTable docs={TouchablePropDocs} />

<PropTable docs={SolidPropDocs} />

<PropTable docs={UnderlinePropDocs} />

## Usage

Touchable is as a wrapper component that allows other components to have consistent hover and focus styles and interaction.

There isn't visual representation that would make sense in Figma, so Touchable is not present in the [Rosetta Figma libraries](https://www.figma.com/files/673231535337049172/project/1718865/Rosetta-Libraries).
