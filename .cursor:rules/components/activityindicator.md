---
title: Activity Indicator
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import ActivityIndicatorDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/ActivityIndicator/ActivityIndicator';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { Box } from '@sqs/rosetta-primitives';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Token } from '@site/src/components/Markdown/Token';
import { activityIndicatorStories } from "./ActivityIndicator";

{
<Description>
  The Activity Indicator shows the progression of a system operation such as downloading, uploading or processing in a visual way.
</Description>
}

<ComponentInformation
  title="ActivityIndicator"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6413%3A3787"
/>

## Code

### Import

```js
import { ActivityIndicator } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={activityIndicatorStories} />

### Props

<PropTable docs={ActivityIndicatorDocs} />

## Guidance

### General guidance

The Activity Indicator is implemented when the user has to wait for a process to complete. It should be shown when performing slow computations, to help notify users that loading is underway. Use it when it's hard to predict how long an operation or task will take.

It’s best to display the Activity Indicator for asynchronous actions (such as a network request or a local database operation). Delay displaying it on the screen by about one second to avoid flickering for users who may have the action complete in less than a second.

If you need an indicator for determinate progress (like a file conversion), or when you want to show progress using a line shape, use the [Progress Indicator](/docs/components/elements/ProgressIndicator/) instead.

### Content

The Activity Indicator component does not include content. However, content added to a page and associated with an Activity Indicator can add value by being accurate, helpful, and succinct.

Consider adding content to the page to inform the user if progress is not happening, or if there are negative consequences if progress is stopped. If data will be lost if the user leaves the page, provide an option to confirm the cancellation or to continue the process.

### Accessibility

To make sure the Activity Indicator is accessible to users of assistive technologies (such as screen reader and voice-assistant users), implement it as an [ARIA live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).

#### Motion

When selecting the Activity Indicator component, consider how many loading Indicators could be visible to the user at the same time. Having more than one may lead to extra on-screen motion, which may be disruptive to some users.

## Usage

### Variants

#### Size

##### Large

The default size of the Activity Indicator is Large. It should be used in larger UI spaces such as panels and large modals.

![Large Activity Indicator](./images/variant-large.gif)

##### Small

The small Activity Indicator should be used in smaller spaces where the large size is not appropriate, such as inside a [Button](/docs/components/primitives/Button) or an input.

![Small Activity Indicator](./images/variant-small.gif)

#### Color

##### Dark

By default, the Activity Indicator is “dark” — or <Token name="gray.100" themeKey="colors" /> — so it can be easily used on <Token name="base" themeKey="colors" /> or <Token name="gray.900" themeKey="colors" /> backgrounds.

![Dark Activity Indicator](./images/variant-dark.gif)

##### Light

The Activity Indicator is also available in “light”—or <Token name="white" themeKey="colors" /> — so it can be used on <Token name="gray.100" themeKey="colors" /> backgrounds.

![Light Activity Indicator](./images/variant-light.gif)

---

### Specs

The Activity Indicator should always be placed horizontally and vertically centered in its parent space, regardless of the size.

![Activity Indicator inside a Panel](./images/example-panel.gif)

![Activity Indicator inside a File List, inside the Link Editor](./images/example-link-editor.gif)

![Activity Indicator inside a Modal](./images/example-skinny-modal.gif)

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: "1fr 1fr", gap: 2 }}>
  <RelatedLink name="Progress Indicator" description="@sqs/rosetta-elements" url="/docs/components/elements/ProgressIndicator" />
</Box>
}
