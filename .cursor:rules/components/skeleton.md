---
title: Skeleton
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import SkeletonProps from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Skeleton/Skeleton.json';
import { skeletonStories } from './Skeleton';
import { Text } from '@sqs/rosetta-primitives';

{
<Description>
  Skeleton is a placeholder for content while a page loads.
</Description>
}

<ComponentInformation
  title="Skeleton"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl=""
/>

## Code

### Import

```js
import { Skeleton } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={skeletonStories} />

### Props

<PropTable docs={SkeletonProps} />

## Guidance

### General guidance

Skeleton is designed to serve as a placeholder for content while a page is loading. It provides users with a basic framework of the page layout, helping to improve the perceived load time and overall user experience.

{
<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do use Skeleton for
</Text.Subtitle>
}

1. Dynamic content that requires asynchronous loading
2. Data that needs to be fetched from an API or database
3. Content that is generated or calculated based on user input or activity

{
<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Do not use Skeleton for
</Text.Subtitle>
}

1. Static content that loads immediately with the page
2. Fixed elements such as labels, headers, or navigation menus
3. Content that is always present and does not depend on external data sources

### Usage within components

Skeleton can and should be used within other components that contain fetched data.

Avoid replacing entire components, patterns, or compositions with a giant Skeleton, as it doesn't help preserve page layout. Instead, selectively replace content within the component with an appropriate Skeleton.

### Examples

![Example with Key Figure](./images/example-key-figure.png)

- This example selectively uses Skeleton to replace the dynamic content within the Key Figure component
- Static content like Title, Subtitle, and Tooltips is kept as is

![Example with Table](./images/example-table.png)

- The individual cell content is replaced with Skeletons
- The structure and layout of the table, including its table headers, is preserved
