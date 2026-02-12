---
title: Accordion
---

import { Text, Box } from '@sqs/rosetta-primitives';
import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Token } from '@site/src/components/Markdown/Token';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import AccordionPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Accordion/Accordion';
import AccordionItemPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Accordion/Item';
import AccordionHeaderPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Accordion/Header';
import AccordionBodyPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Accordion/Body';
import AccordionDividerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/Accordion/Divider';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { accordionStories } from './Accordion';
import accordionDo1Image from './images/accordion-do-1.png';
import accordionDo2Image from './images/accordion-do-2.png';
import accordionDont1Image from './images/accordion-dont-1.png';
import accordionDont2Image from './images/accordion-dont-2.png';
import accordionDont3Image from './images/accordion-dont-3.png';
import accordionNestedCheckboxesImage from './images/accordion-nested-checkboxes.png';

{
<Description>
  An accordion expands or collapses a grouped list of items.
</Description>
}

<ComponentInformation
  title="Accordion"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=9076%3A9892"
/>

## Code

### Import

```js
import { Accordion } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={accordionStories} />

### Props

<PropTable docs={AccordionPropDocs} />

<PropTable docs={AccordionItemPropDocs} />

<PropTable docs={AccordionHeaderPropDocs} />

<PropTable docs={AccordionBodyPropDocs} />

<PropTable docs={AccordionDividerPropDocs} />

## Usage

### General guidance

Accordions expand or collapse a grouped list of items.

{
<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use Accordions to collapse a large amount of content when there's limited space.
- Use Accordions to allow users to expand or collapse content that's relevant to them.

{
<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Don't use Accordions when content is important and needs to be displayed for the user.
- Don't use an Accordion for a single labeled section of content.

---

### Anatomy

![Anatomy of an Action Bar](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Chevron Icon"
  description="Arrow direction indicates whether an Accordion is expanded or collapsed."
/>

<AnatomyListItem
  number="2"
  title="Label"
  description="Title of the Accordion section that quickly communicates what a user can expect to find if they expand it. Keep labels concise to avoid overflow."
/>

<AnatomyListItem
  number="3"
  title="Divider"
  description="Line that separates each Accordion section."
/>

<AnatomyListItem number="4" title="Content" />

---

### Deciding between Accordions, Tabs, and Disclosures

Before using Accordions, consider whether it’s better to reduce the content, split it among multiple pages, use headers and links to separate the content, or use a different component. Use Accordions when the content is simple, when the user may want to view multiple sections at once, and if there are many sections of content.

#### Disclosures

If individual sections have long form content, use Disclosures instead. When an Accordion is expanded, the Accordion label may move out of view when users scroll down, making it difficult to collapse or navigate to another section. Additionally, Disclosures allow the user to focus on one section at a time.

#### Tabs

Consider using Tabs if the user needs to easily switch sections and for content that has fewer sections, as the Tab labels stay fixed. Tab labels usually stay visible and also require less clicks to navigate compared to Accordions and Disclosures.

---

### Composition

Accordions are designed to be flexible and can contain different types of content, such as [Cells](/docs/components/elements/Cell), [Text](/docs/components/primitives/Text), and [Images](/docs/components/elements/Image).

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={accordionDo1Image} description="Align content to Accordion labels." />

  <Dont src={accordionDont1Image} description="Don't indent content." />
</Box>
}

<Dont
  src={accordionDont2Image}
  description="Don't use Dividers to separate items in an Accordion when it's expanded. Doing so prevent clear definition of sections within the Accordion."
/>

#### Cells

<Dont
  src={accordionDont3Image}
  description="Avoid placing Cells that have a focus state inside an Accordion. Doing so creates a darker Divider that overlaps with the Accordion's Divider on the last nested Cell."
/>

<Do
  src={accordionDo2Image}
  description="Use Cells without a Divider to easily define different Accordion groups."
/>

### Nested Accordions

Nested Accordions should only be used to show a list of items with multiple levels of hierarchy. The child Accordion should be aligned to the parent Accordion's label.

![Nested Accordions](./images/accordion-nested.png)

<Do
  src={accordionNestedCheckboxesImage}
  description="Place Checkboxes on the right if Accordions are nested to prevent misaligned Checkboxes."
/>

---

### Specs

#### Accordion Cell (collapsed)

| Property                               | Value                                                               |
| -------------------------------------- | ------------------------------------------------------------------- |
| Width                                  | Flexible, aligned to the Grid, usually 100% within parent container |
| Height                                 | <Token name="sizes.250" themeKey="space" />                         |
| Top and bottom padding                 | <Token name="space[2]" />                                           |
| Spacing between Chevron icon and label | <Token name="space[2]" />                                           |
| Margin                                 | 0px                                                                 |

![Spec for collapsed Accordion](./images/spec-collapsed.png)

#### Accordion content (expanded)

Since Accordions can contain different components, the top and bottom padding that surrounds the content within the Accordion may be adjusted for context. For example, if Cells are nested within an Accordion, less padding is required because Cells include spacing. The same is true for an Accordion that includes nested Accordions.

Follow the guidelines below as a starting point, but adjust using
[space Tokens](/docs/develop/style-packages/tokens#space) for appropriate padding if needed.

| Property                          | Value                                                                                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Width                             | Flexible, aligned to the [Grid](/docs/components/elements/Grid), usually 100% within parent container |
| Height                            | Determined by content                                                                                 |
| Top padding                       | <Token name="space[2]" />                                                                             |
| Bottom padding                    | <Token name="space[4]" /> (adjustable)                                                                |
| Spacing between label and content | <Token name="space[4]" /> (adjustable, minimum <Token name="space[2]" />)                             |
| Spacing left of content           | <Token name="space[6]" />                                                                             |

![Spec for expanded Accordion](./images/spec-expanded.png)

#### Accordion label

Regular or medium weight text can be used for the Accordion label. Use medium weight to create more hierarchy within a section, but consider using regular weight to maintain consistency if there are other Cell components that use regular weight on the page.

#### Overflow

While best to avoid, the Accordion label can wrap to two lines if necessary.

![Overflow spec](./images/spec-overflow.png)

#### States

##### Collapsed

![Collapsed Accordion states](./images/accordion-states-collapsed.png)

##### Expanded

![Expanded Accordion states](./images/accordion-states-expanded.png)

---

### Behavior

#### Tap area

The horizontal space containing the label is tappable for expanding and collapsing an Accordion.

![Tappable area](./images/behavior-hover.png)

#### Expanding and collapsing

When expanding or collapsing the Accordion, the Chevron icon changes direction to indicate the expanded state, and the Divider moves down or up to reveal and hide the content.

![Expand and collapse animation](./images/accordion-animation.gif)

## Related Components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink
    name="Reveal"
    description="@sqs/rosetta-elements"
    url="/docs/components/elements/Reveal"
  />
  <RelatedLink
    name="Collapsible"
    description="@sqs/rosetta-primitives"
    url="/docs/components/primitives/Collapsible"
  />
</Box>
}
