---
title: Divider
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Text } from '@sqs/rosetta-primitives';
import { Token } from '@site/src/components/Markdown/Token';
import DividerPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Divider/Divider';
import { dividerStories } from "./Divider";

{
<Description>
  A thin line that groups and separates content in lists and layouts.
</Description>
}

<ComponentInformation
  title="Divider"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6384%3A5443"
/>

## Code

### Import

```js
import { Divider } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={dividerStories} />

### Props

<PropTable docs={DividerPropDocs} />

## Guidance

### General guidance

Dividers bring clarity to a layout by grouping and separating content that's close in proximity. They can also be used to establish rhythm and hierarchy.

In Rosetta, Dividers are used to visually separate stacked [Cells](/docs/components/elements/Cell).

{
<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

![Dividers between Cells](./images/do.png)

- Use Dividers to separate stacked Cells.
- When not used with Cells, only use Dividers if elements can't be separated by white space.

{
<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- When not used with Cells, don't overuse Dividers. Dividers lose their value when overused because they add visual clutter.

### Content

No guidance.

### Accessibility

Dividers are not just visual. They play a role in contextualizing the surrounding content. Because of this, make sure your `HTML` element represents the Divider as a paragraph-level thematic break or transition.

**Note:** The color of the current Rosetta Divider does not pass WCAG color contrast on black, gray, or white backgrounds.

## Usage

### Specs

| Property         | Value                                                                                      |
|------------------|--------------------------------------------------------------------------------------------|
| Width            | 100% of container                                                                          |
| Height           | 1px                                                                                        |
| Margin           | 0px by default, or any [space token](/docs/develop/style-packages/tokens#space) top/bottom |
| Background color | <Token name="gray.800" themeKey="colors" />                                                |
