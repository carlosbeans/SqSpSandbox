---
title: Navigation Controller
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { navigationControllerStories } from './NavigationController';
import NavigationControllerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavigationController/NavigationController';

{
<Description>
  Creates navigation between panels and retains navigation history within the
  component.
</Description>
}

<ComponentInformation
  title="NavigationController"
  componentPackage="@sqs/rosetta-compositions"
/>

## Code

### Import

```js
import { NavigationController } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={navigationControllerStories} />

### Props

<PropTable docs={NavigationControllerPropDocs} />

## Usage

Navigation Controller is a utility that creates the back and forth navigation in Squarespace's sidebar.

There isn't visual representation that would make sense in Figma, so Navigation Controller is not present in the [Rosetta Figma libraries](https://www.figma.com/files/673231535337049172/project/1718865/Rosetta-Libraries).
