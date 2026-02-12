---
title: Grid
---

import { Description } from "@site/src/components/Markdown/Description";
import { ComponentInformation } from "@site/src/components/ComponentsPage/ComponentInformation";
import { PropTable } from "@site/src/components/ComponentsPage/PropTable";
import { StoryRenderer } from "@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer";
import { Text, Flex, Box } from '@sqs/rosetta-primitives';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import { Token } from '@site/src/components/Markdown/Token';
import { Image } from '@site/src/components/Markdown/Image';
import GridContainerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Grid/Container';
import GridItemPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Grid/Item';
import { gridStories } from "./Grid";

import alignmentDoImage from './images/alignment-do.png';
import alignmentDontImage from './images/alignment-dont.png';
import gapsDontImage from './images/gaps-dont.png';
import glossaryColumnSpanImage from './images/glossary-column-span.png';
import glossaryColumnsImage from './images/glossary-columns.png';
import glossaryGuttersImage from './images/glossary-gutters.png';
import glossaryMarginsImage from './images/glossary-margins.png';
import glossaryOffsetImage from './images/glossary-offset.png';

{
<Description>
  The Grid is a container-based system for organizing layout. It has 12 columns that scale responsively, with pre-defined paddings and margins. All layouts should rely on the Grid.
</Description>
}

<ComponentInformation
  title="Grid"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/nOdp1Kmnhf7h3dVFfk3YpO/01-Rosetta-Styles?node-id=1047%3A4"
/>

:::info
For more information on [responsive design](/docs/develop/guides/responsive-design/) and developing [responsive layouts](/docs/develop/guides/layout), read each linked guide.
:::

## Code

### Import

```js
import { Grid } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={gridStories} />

### Props

<PropTable docs={GridContainerPropDocs} />

<PropTable docs={GridItemPropDocs} />

## Usage

### General guidance

Rosetta's Grid is an important way to ensure layout consistency throughout Squarespace's product suite. Rosetta's responsive grid is applied to containers, not entire views. This is because of the side panel often featured in Squarespace UIs—both the left-side panel and the right-side workspace have their own grid.

See [layout](/docs/design/interface-guidelines/overview) for guidelines on designing with the Grid.

---

### Glossary

{
<Box display="grid" sx={{ gridTemplateColumns: "1fr 1fr", gap: 4 }}>
  <Flex flexDirection="column">
    <Text.Subtitle mb={-2}>Columns</Text.Subtitle>

    <Image src={glossaryColumnsImage} caption="Columns" />

    <Text.Body>
      There are 12 columns in the responsive grid. Column widths change with the size of the grid.
    </Text.Body>
  </Flex>

  <Flex flexDirection="column">
    <Text.Subtitle mb={-2}>Gutters</Text.Subtitle>

    <Image src={glossaryGuttersImage} caption="Gutters" />

    <Text.Body>
      Gutters are the gaps between the columns. They are fixed values based on the container width.
    </Text.Body>
  </Flex>

  <Flex flexDirection="column">
    <Text.Subtitle mb={-2}>Margins</Text.Subtitle>

    <Image src={glossaryMarginsImage} caption="Margins" />

    <Text.Body>
      Grid margins are the outer margins of the grid. They are fixed values based on the device.
    </Text.Body>
  </Flex>

  <Flex flexDirection="column">
    <Text.Subtitle mb={-2}>Column span</Text.Subtitle>

    <Image src={glossaryColumnSpanImage} caption="Column span" />

    <Text.Body>
      The area of the layout that contains content, which spans over a number of columns.
    </Text.Body>
  </Flex>

  <Flex flexDirection="column">
    <Text.Subtitle mb={-2}>Offset</Text.Subtitle>

    <Image src={glossaryOffsetImage} caption="Offset" />

    <Text.Body mb={0}>
      The number of columns the column span is pushed over by.
    </Text.Body>
  </Flex>
</Box>
}

---

### Specs

The grid always takes the full width of the container. It has fixed gutters and margins (detailed below) and percentage-based columns widths. Note that the grid has a maximum width of 1680px and should be centered within its container beyond that point.

| Device  | Container size | Columns | Gutter                    | Margin                    |
|---------|----------------|---------|---------------------------|---------------------------|
| Mobile  | Any            | 12      | <Token name="space[3]" /> | <Token name="space[3]" /> |
| Desktop | 320–879px      | 12      | <Token name="space[3]" /> | <Token name="space[6]" /> |
| Desktop | 880–1680px     | 12      | <Token name="space[6]" /> | <Token name="space[6]" /> |

---

### Designing with the Grid

See [layout](/docs/design/interface-guidelines/overview) for Rosetta's recommended layout options.

#### Alignment

Do not align every element to the grid. The responsive grid is for creating layouts that adapt or change to accommodate various viewport sizes. Layout regions are the only aspect of your design that should align to the responsive grid. If you try to align and implement individual elements to the responsive grid, you will compromise the design of the elements and their behavior.

{
<Flex sx={{ gap: 2 }}>
  <Do src={alignmentDoImage} description="Align elements with each other where it makes more sense." />

  <Dont src={alignmentDontImage} description="Don't align every single element to the Grid if it compromises the design." />
</Flex>
}

#### Gutters

The grid gutters are there to create spacing between your content. Do not extend your content into the gutters; each content area should span from the outer edges of the columns they cover.

<Dont
  src={gapsDontImage}
  description="Don't align elements to the Grid gutters."
/>

---

## Related links

{
<Box display="grid" sx={{ gridTemplateColumns: "1fr 1fr", gap: 2 }}>
  <RelatedLink name="Layout" description="Rosetta foundations" url="/docs/design/interface-guidelines/overview" />

  <RelatedLink name="Rosetta Styles Library" description="Figma library containing all text, color, shadow, grid and spacing styles." url="https://www.figma.com/file/nOdp1Kmnhf7h3dVFfk3YpO/01-Rosetta-Styles?node-id=0%3A1" />
</Box>
}
