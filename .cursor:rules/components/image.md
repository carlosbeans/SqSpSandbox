---
title: Image
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { imageStories } from './Image';
import ImageDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Image/Image';

{
<Description>
  A placeholder for loading images. Component has props for fallback while an
  image is loading and or is unavailable.
</Description>
}

<ComponentInformation
  title="Image"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6415%3A1"
/>

:::danger Component Deprecated
This component has been deprecated. Please use Web Performance's [Image Component](https://github.com/sqsp/web-performance-tools/tree/master/packages/image).
:::

## Code

### Import

```js
import { Image } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={imageStories} />

### Props

<PropTable docs={ImageDocs} />

## Guidance

Use the Web Performance team's [Image](https://github.com/sqsp/web-performance-tools/blob/master/packages/image/README.md) component.

### General guidance

Every image must have meaningful alt text (including empty alt text for decorative images). See the accessibility section below on how to write alt text.

### Content

Always consider [localization](https://squarespace.atlassian.net/wiki/spaces/INTL/pages/17440016690/Localization+team) when creating images because images that have words, currency symbols, flags, etc. are:

- Hard to translate/localize
- Difficult to convey in alt text
- Impossible to adjust for better readability; for example, change font style, increase font, etc.

When writing alt text for images, follow all proper grammatical rules. Capitalize the first word, and end full sentences with periods.

### Accessibility

Alternative text (alt text) is brief copy (ideally less than 250 characters) that describes an image. The copy should serve the equivalent purpose as the image, as screen readers can read it aloud and browser pages can display it when an image fails to load.

Here are key things to keep in mind when writing alt text:

- Consider what details the user would find most important
- Add any text contained inside the image to the alt text
- Use the alt text to describe where the link goes (e.g., if clicking the image links to a new page)
- Avoid using the phrase “image of” unless the medium is important (assistive technology will announce when something is an image [before reading the text](https://www.youtube.com/watch?v=NvqasTVoW98))

The only images that do not need alt text are decorative images, as they do not add information to the content of a page. Decorative images must be hidden from assistive technology (e.g., screen readers), by setting an empty alt attribute (`alt=""`) to avoid treating the image’s file name as alt text.

#### When alt text isn’t enough

In instances of complex information (e.g., charts, graphs, analytics), using a long description could be helpful in addition to alt text. The alt text should briefly describe the image, while the long description serves to capture all important details as text.

Long descriptions should be provided near the image, such as in the next paragraph, or somewhere close to the image.

#### Moving images

In addition to the guidelines above, moving images like gifs should also:

- Provide a way to pause or stop playback (e.g. by providing a pause button or swapping an animated image with a still image), or by hiding the image
- Ensure that animated images do not flash or flicker more than [three times per second](/docs/accessibility/guides/keyboard-navigation)

## Design

No guidance at this time.
