---
title: Back Button
---

import { Box } from '@sqs/rosetta-primitives';
import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { AnatomyListItem } from "@site/src/components/ComponentsPage/AnatomyListItem";
import { Token } from '@site/src/components/Markdown/Token';
import { StoryRenderer } from "@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer";
import { backButtonStories } from "./BackButton";
import BackButtonPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/BackButton/BackButton';

{
<Description>
  Special button for navigating to the previous section in Panels and Modals.
</Description>
}

<ComponentInformation
  title="BackButton"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6781%3A6271"
/>

## Code

### Import

```js
import { BackButton } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={backButtonStories} />

### Props

<PropTable docs={BackButtonPropDocs} />

## Guidance

### General guidance

The Back Button is a special button that navigates back a level in panels or other content areas. It should always be used in a [Toolbar](/docs/patterns/other/Toolbar).

### Content

No guidance.

### Accessibility

If a Back Button only has an [Icon](/docs/components/icons) instead of a title, it must be given a name via alt text or through an **ARIA** label.

## Usage

### Anatomy

![Anatomy of a Back Button](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Arrow Icon"
  description="Icon that indicates travel direction with a special animation"
/>

<AnatomyListItem
  number="2"
  title="Label"
  description="“Back” by default, or the parent panel's title"
/>

---

### Specs

The Back Button mimics the styling of a medium-sized, tertiary [Button](/docs/components/primitives/Button), but with a unique hover design. Note the Back Button now has a negative <Token name="space[1]" /> left margin **built in**, so that the chevron icon aligns with the grid.

![Back Button unique hover state](./images/hover.png)

![Back Button built-in alignment](./images/specs.png)

---

### Layout

Back Buttons should always be placed in a Toolbar that sits in a panel or other content area.

![Back Button in a panel](./images/specs-usage-panel.png)

![Back Button in a Modal](./images/specs-usage-modal.png)

---

### Behavior

Selecting a Back Button should always take the user back one step, or up one level in the navigation tree. It should not jump them to another part of the product.

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: "1fr 1fr", gap: 2 }}>
  <RelatedLink name="Button" description="@sqs/rosetta-elements" url="/docs/components/primitives/Button" />

  <RelatedLink name="Toolbar" url="/docs/patterns/other/Toolbar" />
</Box>
}
