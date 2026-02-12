---
title: Color Picker
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import SwatchPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/ColorPicker/Swatch';
import SliderPropDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/ColorPicker/Slider';
import ColorPickerDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/ColorPicker/ColorPicker';
import { colorPickerStories } from "./ColorPicker";

{
<Description>
  Color Picker allows users to select or input a color value.
</Description>
}

<ComponentInformation
  title="ColorPicker"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6827%3A7734"
/>

## Code

### Import

```js
import { ColorPicker } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={colorPickerStories} />

### Props

<PropTable docs={ColorPickerDocs} />

<PropTable docs={SwatchPropDocs} />

<PropTable docs={SliderPropDocs} />

## Guidance

### General guidance

The Color Picker allows users to input a color value. It defaults to Hex format, but users can switch between RGB and HSL values as well.

---

### Anatomy

![Anatomy of a Color Picker](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Map"
  description="Map for visually selecting the saturation and luminosity of a color"
/>

<AnatomyListItem
  number="2"
  title="Handle"
  description="User control across color map and sliders, indicates the selected value"
/>

<AnatomyListItem
  number="3"
  title="Alpha slider"
  description="User control to change transparency of the selected color"
/>

<AnatomyListItem
  number="4"
  title="Hue slider"
  description="User control to select hue"
/>

<AnatomyListItem
  number="5"
  title="Format dropdown"
  description="Allows the user to switch between Hex, RGB, and HSL formats"
/>

<AnatomyListItem
  number="6"
  title="Value input"
  description="Allows the user to type (and extract) a color value"
/>

<AnatomyListItem
  number="7"
  title="Alpha input"
  description="Allows the user to type an opacity value"
/>

<AnatomyListItem
  number="8"
  title="Swatch"
  description="Displays the selected color"
/>

---

### Pieces

#### Map

The map is where the user can tweak the saturation and luminosity of their color.

The saturation is a color’s degree of richness, intensity, purity, or grayness and is input on the horizontal axis of the map.

Luminosity is a measure of how bright or dark a hue is and is input on the vertical axis of the map.

![Color Picker map](./images/part-map.png)

#### Alpha slider

The alpha slider allows the user to change the transparency of their color selection, as indicated by the checkerboard background.

Only include the alpha slider if the color value can change transparency.

![Color Picker alpha slider](./images/part-alpha.png)

#### Hue slider

The hue slider is where the user selects from a more defined color range (red, orange, yellow, etc.), which they can then adjust with the map and alpha slider.

![Color Picker hue slider](./images/part-hue.png)

#### Input

If a user has a hex, RGB or HSL value for a color on hand, the input offers a more direct way for the user to enter it.

The user can switch between the three color formats — hex, RGB, and HSL — manually with a [Dropdown](/docs/components/compositions/Dropdown/Next), or they can paste their copied value into the input and it will automatically switch modes. For example, if a user pastes "rgb(255, 255, 255)" into the input while in hex mode, it will switch to RGB mode. If a user pasted "red," it will convert the named color to a hex code.

If alpha is enabled, display a text input so that the user can directly type in a number instead of using the slider.

![Color Picker input](./images/part-input.png)

#### Swatch

The color swatch is a simple circle that displays a color. It can be used as a static indicator in a [Cell](/docs/components/elements/Cell), or as an interactive selectable button (e.g. website palette).

![Color swatch](./images/part-swatch.png)

---

### Layout

There are two ways to display a Color Picker; inline or in a [Dropdown](/docs/components/compositions/Dropdown/Next).

#### Inline

Color Pickers can be displayed inline in a panel or view. Include a swatch nearby to indicate the selected color.

![Inline Color Picker](./images/layout-inline.png)

#### Dropdown

If it makes more sense for the user to stay in the existing view while selecting a color—rather than navigating to a new one—you can display the Color Picker inside a [Dropdown](/docs/components/compositions/Dropdown/Next) dialog. Include a swatch in the Cell to indicate the selected color.

![Color Picker in a Dropdown](./images/layout-dropdown.png)
