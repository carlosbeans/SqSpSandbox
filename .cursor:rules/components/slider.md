---
title: Slider (next)
sidebar_position: 1
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Box, Text } from '@sqs/rosetta-primitives';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import SliderRootPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Slider/Slider.Root';
import SliderControlPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Slider/Slider.Control';
import { sliderStories } from './Slider';

{
<Description>
Slider allows users to select a value within a defined range. The component works with the Field primitive for labels, descriptions, and error states.
</Description>
}

<ComponentInformation
  title="Slider"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6384%3A5665"
/>

## Code

### Import

```js
import { Slider } from '@sqs/rosetta-elements/slider/next';
```

### Examples

<StoryRenderer stories={sliderStories} />

### Props

<PropTable docs={SliderRootPropDocs} />

<PropTable docs={SliderControlPropDocs} />

## Guidance

### General guidance

Sliders provide a visual indication of adjustable content; for example, units of measurement or percentages. The user can move the handle along the track to increase or decrease the value.

In its default variant, a Slider should be accompanied by a label and a number input that doubles as a display for the Slider's current value.

{
<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
Do use a Slider when:
</Text.Subtitle>
}

- The user must select a value within a defined range that has a minimum and maximum
- The specific value does not matter to the user, but an approximate is good enough
- The user benefits from sliding the value along the track and seeing the result of the output; for example, the padding in a section

{
<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
Don't use a Slider when:
</Text.Subtitle>
}

- A precise value is important

### Content

By default, Sliders should be implemented with a label in the [Field](/docs/components/primitives/Field) so the user knows exactly what input they are changing. Make sure the label is clear and succinct.

### Accessibility

An accessible name is required for all Sliders, even if there is an icon on the Slider. If an icon is serving as the visual label, it should always have a text alternative. However, if icons are there for decorative purposes (in addition to the label), they should be hidden from assistive technologies (`aria-hidden="true"`).

![Label specs](../images/specs-labels.png)

## Usage

### Anatomy

![Anatomy of a Slider](../images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Handle"
  description="What the user drags to change the value"
/>

<AnatomyListItem
  number="2"
  title="Fill"
  description="Shows the selected range"
/>

<AnatomyListItem
  number="3"
  title="Track"
  description="Shows the full range of acceptable values"
/>

---

### Composition

The new Slider component is built as a compound component with the following parts:

- `Slider.Root` - The container for the slider
- `Slider.Control` - The actual range input control
- `Slider.NumberInput` - An optional integrated number input
- `Slider.TickContainer` and `Slider.Tick` - Optional tick marks for discrete values

```jsx
<Slider.Root>
  <Moon />
  <Slider.Control
    max={100}
    min={0}
    onChange={(e) => setValue(Number(e.target.value))}
    value={value}
  />
  <Brightness />
</Slider.Root>
```

### Behavior

#### Input

There are three ways for a user to change the value of the Slider:

- Drag the handle along the track
- Press the left or right arrow button on their keyboard while focused on the slider
- Type directly into the number input (when using `Slider.NumberInput`)

Note that if a Slider has a wide range, it will be harder for the user to select a precise value by dragging alone.

#### Minimums and maximums

Sliders must have minimum and maximum values. If the user enters a value that is outside of the acceptable range (when using the number input), the value resets to the closest acceptable value.

#### Disabled state

When a slider is disabled, both the slider control and any associated number input are disabled. Set the disabled state on the `Field.Root` component or directly on `Slider.Control`.

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
<RelatedLink 
name="Number Input" 
description="@sqs/rosetta-elements" 
url="/docs/components/elements/NumberInput" 
/>

<RelatedLink 
name="Text Input (next)" 
description="@sqs/rosetta-elements/textinput/next" 
url="/docs/components/elements/TextInput/Next" 
/>

<RelatedLink 
name="Field" 
description="@sqs/rosetta-primitives" 
url="/docs/components/primitives/Field" 
/>
</Box>
}
