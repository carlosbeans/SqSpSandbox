---
title: Title Transition
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import ContentPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/containers/TitleTransition/TitleTransition.Content';
import ContentTitlePropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/containers/TitleTransition/TitleTransition.ContentTitle';
import HeaderPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/containers/TitleTransition/TitleTransition.Header';
import HeaderTitlePropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/containers/TitleTransition/TitleTransition.HeaderTitle';
import ProviderPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/containers/TitleTransition/TitleTransition.Provider';
import { titleTransitionStories } from "./TitleTransition";

{
<Description>
  Container that applies panel titles to header after a scroll transition.
</Description>
}

<ComponentInformation
  title="TitleTransition"
  componentPackage="@sqs/rosetta-elements"
/>

## Code

### Import

```js
import { TitleTransition } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={titleTransitionStories} />

### Props

<PropTable docs={ContentPropDocs} />

<PropTable docs={ContentTitlePropDocs} />

<PropTable docs={HeaderPropDocs} />

<PropTable docs={HeaderTitlePropDocs} />

<PropTable docs={ProviderPropDocs} />

## Usage

Title Transition is a utility that helps a title animate from the main content area to the [Toolbar](/docs/patterns/other/Toolbar) above it, as shown below.

![Scrolling in a Modal dialog](./images/modal-scroll.gif)

There isn't visual representation that would make sense in Figma, so Title Transition is not present in the [Rosetta Figma libraries](https://www.figma.com/files/673231535337049172/project/1718865/Rosetta-Libraries).
