---
title: Reveal
---

import { Text, Box } from '@sqs/rosetta-primitives';
import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Token } from '@site/src/components/Markdown/Token';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Do } from '@site/src/components/Markdown/Do';
import RevealPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Reveal/Reveal';
import RevealTriggerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Reveal/Reveal.Trigger';
import RevealBodyPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Reveal/Reveal.Body';
import { revealStories } from './Reveal';

{
<Description>
  Reveal is a generic, flexible component that expands or collapses content.
</Description>
}

<ComponentInformation
  title="Reveal"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/SfehdpDsuGMzZCuT6RKf1R/Reveal?type=design&node-id=57-3211&mode=design&t=mu0qjXZBF3T4qFCB-0"
/>

## Code

### Import

```js
import { Reveal } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={revealStories} />

### Props

<PropTable docs={RevealPropDocs} />

<PropTable docs={RevealTriggerPropDocs} />

<PropTable docs={RevealBodyPropDocs} />

## Guidance

### General guidance

Reveal expands or collapses content relevant help text, additional text information, image, or components. Reveal should never hide critical content.

Reveal is a more flexible alternative to [Accordion](/docs/components/compositions/Accordion) because it can be styled as needed and can contain any number or type of content. While Accordion has fixed styling and a divider at the bottom, Reveal accepts any styling for both the trigger and its collapsed content. As a result, Reveal can be used in many contexts including:

- by itself
- inline with text
- within other layouts or components

Consider using Accordion if [Cells](/docs/components/elements/Cell) are the primary hidden content.

#### By itself

![Example of standalone usage](./images/reveal-standalone.png)

#### Inline with text

![Example of inline usage](./images/reveal-inline.png)

#### Within other layouts or components

![Example of contained usage](./images/reveal-contained.png)

### Content

The trigger label should be succinct but indicate that there is help, information, or other content available.

If the label contains a specific action (e.g. "Show" or "Expand"), use a corresponding action in the expanded state (e.g. "Hide" or "Collapse").

Alternatively, the label can use general help language that remains persistent regardless of state (e.g. "What is this?")

### Accessibility

By default the component is styled with blue accent text, has an underline styling on hover, and a border around the entire trigger when focused.

When applying custom text styles, include clear visual differences on hover using color, text decorations like underlining, or changes in font weight.

---

## Usage

### Anatomy

![Anatomy of an Action Bar](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Trigger"
  description="User selects this to reveal hidden content. The chevron is optional, and the label can use any text styling."
/>

<AnatomyListItem
  number="2"
  title="Chevron (Optional)"
  description="The chevron can be hidden when used within a paragraph, within other components, or in other cases when text should be visually left aligned."
/>

<AnatomyListItem
  number="3"
  title="Trigger Label"
  description="Text element that indicates "
/>

<AnatomyListItem number="4" title="Content" description="Text element" />

---

### Composition

Reveal can contain different types of content including [Text](/docs/components/primitives/Text), [Images](/docs/components/elements/Image), or other encapsulated components.

### Variants

Although Reveal can be styled as needed, there are two pre-styled variants you can immediately use.

#### Default

![Default variant](./images/variants-default.png)

The default variant includes the Chevron and content is indented to align with text.

#### Contained

![Contained variant](./images/variants-contained.png)

The contained variant has no Chevron icon and content will have no indentation. Use this variant when this is contained within a larger composition or another component, as it visually aligns the label, content, and surrounding or nearby text.

---

### Behavior

#### Tap area

The entire label is interactable and expands the inner content.

![Tappable area](./images/behavior-area.png)

#### Expanding and collapsing

If the Chevron is present, expanding or collapsing causes the Chevron changes direction to indicate its state.

---

## Related Components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Accordion" description="@sqs/rosetta-compositions" url="/docs/components/compositions/Accordion" />
  <RelatedLink name="Collapsible" description="@sqs/rosetta-primitives" url="/docs/components/primitives/Collapsible" />
</Box>
}
