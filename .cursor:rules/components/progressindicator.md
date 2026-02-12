---
title: Progress Indicator
---

import { Description } from "@site/src/components/Markdown/Description";
import { ComponentInformation } from "@site/src/components/ComponentsPage/ComponentInformation";
import { PropTable } from "@site/src/components/ComponentsPage/PropTable";
import { StoryRenderer } from "@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer";
import { Box } from '@sqs/rosetta-primitives';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Token } from '@site/src/components/Markdown/Token';
import ProgressIndicatorPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/ProgressIndicator/ProgressIndicator';
import TrackPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/ProgressIndicator/Track';
import { progressIndicatorStories } from "./ProgressIndicator";

{
<Description>
  A track that shows the progression of a task. Progress Indicators are not interactive, though they often have a button for cancelling the corresponding task.
</Description>
}

<ComponentInformation
  title="ProgressIndicator"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=8996%3A18"
/>

## Code

### Import

```js
import { ProgressIndicator } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={progressIndicatorStories} />

### Props

<PropTable docs={ProgressIndicatorPropDocs} />

<PropTable docs={TrackPropDocs} />

## Guidance

### General guidance

Progress Indicators come in two variants: determinate and indeterminate. Use the determinate version when displaying progress like file conversions or data uploads. Use the indeterminate version for asynchronous actions, or as an alternative to the [Activity Indicator](/docs/components/elements/ActivityIndicator) for when a line shape is more desirable.

When possible, opt for a determinate Progress Indicator, as it can reduce cognitive load by helping the user estimate the remaining wait time.

### Content

The Progress Indicator component does not include content. But, content added to a page and associated with the component can add value by being accurate, helpful, and succinct.

Consider adding content to the page to inform the user if progress is not happening, or if there are negative consequences to stopping ongoing progress. If data will be lost if a user leaves the page, provide an option to confirm the cancellation or to continue the process.

### Accessibility

To make sure the Progress Indicator is accessible to users of assistive technologies (such as screen reader and voice-assistant users), implement it as an [ARIA live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).

## Usage

### Anatomy

![Anatomy of a Progress Indicator](./images/anatomy.png)

<AnatomyListItem number="1" title="Track" description="Displays the progress" />

<AnatomyListItem number="2" title="Container" />

---

### Variants

#### Determinate

Determinate Progress Indicators should be used when the process time is **known**. The length of the track shows progression of the process or task to the user.

![Determinate Progress Indicator](./images/determinate.gif)

#### Indeterminate

Use an indeterminate Progress Indicator when the process time is **not known**. The user will still be given an indication the process is happening, but they will not be given an indication of how far along it is.

![Indeterminate Progress Indicator](./images/indeterminate.gif)

---

### Specs

| Property        | Value                                                                                                             |
|-----------------|-------------------------------------------------------------------------------------------------------------------|
| Width           | 100% of container                                                                                                 |
| Height          | <Token name="sizes.50" themeKey="sizes" />, or <Token name="sizes.25" themeKey="sizes" /> if used as Cell divider |
| Container color | <Token name="gray.800" themeKey="colors" />                                                                       |
| Track color     | <Token name="gray.100" themeKey="colors" />                                                                       |

---

### Layout

Progress Indicators are flexible and can be used alongside a number of other components.

#### Cards

Progress Indicators can be attached to a [Card](/docs/components/elements/Card),
for use cases like uploading an asset.

![Progress indicator with a Card](./images/layout-card-1.png)

![Progress indicator with a Card](./images/layout-card-2.png)

#### Cells

Progress Indicators can also be used as an alternative to Dividers between Cells. In this case, reduce the height to 1px for consistency with the Divider.

![Progress indicators as Cell dividers](./images/layout-cells.png)

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: "1fr 1fr", gap: 2 }}>
  <RelatedLink name="Activity Indicator" description="@sqs/rosetta-elements" url="/docs/components/elements/ActivityIndicator" />
</Box>
}
