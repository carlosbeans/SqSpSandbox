---
title: Overflow Box
---

import { Description } from "@site/src/components/Markdown/Description";
import { ComponentInformation } from "@site/src/components/ComponentsPage/ComponentInformation";
import { PropTable } from "@site/src/components/ComponentsPage/PropTable";
import { StoryRenderer } from "@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer";
import { Box } from "@sqs/rosetta-primitives";
import { RelatedLink } from '@site/src/components/RelatedLink';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { KeyboardKey } from '@site/src/components/Markdown/KeyboardKey';
import OverflowBoxPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/OverflowBox/OverflowBox';
import { overflowBoxStories } from "./OverflowBox";

{
<Description>
  A container with pagination that reveals or hides overflowing content.
</Description>
}

<ComponentInformation
  title="OverflowBox"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=16017%3A12872"
/>

## Code

### Import

```js
import { OverflowBox } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={overflowBoxStories} />

### Props

<PropTable docs={OverflowBoxPropDocs} />

## Guidance

### General guidance

Use an Overflow Box when the layout of the page or nested elements may break because of overflowing content. When content overflows, users are still aware of hidden content because of the gradient and pagination buttons used by the component.

![An Overflow Box used in Tabs](./images/overflowbox-usage.png)

Keep in mind that overflowing content remains _hidden_ from the user until they click on either the next or previous pagination button. For this reason, keep the number of clicks to reveal hidden content to a **minimum**.

### Content

No guidance.

### Accessibility

For screen readers, the Overflow Box can be focused by using the <KeyboardKey name="Tab" /> key. Keyboard navigation is also allowed by using the arrow keys to scroll left or right through the container. For these two reasons, users cannot focus on the component’s pagination buttons.

## Usage

### Anatomy

![Anatomy of an Overflow Box](./images/anatomy.png)

<AnatomyListItem number="1" title="Overflow container" description="" />

<AnatomyListItem
  number="2"
  title="Pagination buttons"
  description="Appear only when there's overflow content."
/>

---

### Behavior

#### Responsiveness

If there is no set width on the parent container, then the Overflow Box adapts to its parent container and detects overflow dynamically.

#### Motion

Clicking either the next or previous pagination button makes the container scroll in that direction.

![Overflow Box motion](./images/motion.gif)

---

## Related Components

{
<Box display="grid" sx={{ gridTemplateColumns: "1fr 1fr", gap: 2 }}>
  <RelatedLink name="Tabs" description="@sqs/rosetta-elements" url="/docs/components/elements/Tabs?story=overflow-tabs#example" />
</Box>
}
