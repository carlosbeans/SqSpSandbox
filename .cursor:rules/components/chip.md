---
title: Chip
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Box, Flex, Text } from '@sqs/rosetta-primitives';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Token } from '@site/src/components/Markdown/Token';
import ChevronDownProps from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Chip/ChevronDown';
import ChevronUpProps from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Chip/ChevronUp';
import ChipProps from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Chip/Chip';
import CloseButtonProps from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Chip/CloseButton';
import ContainerProps from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Chip/Container';
import LabelProps from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Chip/Label';
import { chipStories } from './Chip';

import chipDo1Image from './images/chip-do-1.png';
import chipDo2Image from './images/chip-do-2.png';
import chipDo3Image from './images/chip-do-3.png';
import chipDo4Image from './images/chip-do-4.png';
import chipDo5Image from './images/chip-do-5.png';
import chipDo6Image from './images/chip-do-6.png';
import chipDont1Image from './images/chip-dont-1.png';
import chipDont2Image from './images/chip-dont-2.png';
import chipDont3Image from './images/chip-dont-3.png';
import chipDont4Image from './images/chip-dont-4.png';

{
<Description>
  Chips are a button-like affordance that can be used to display or manage
  status or other information associated with a piece of content.
</Description>
}

<ComponentInformation
  title="Chip"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6492%3A491"
/>

## Code

### Import

```js
import { Chip } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={chipStories} />

### Props

<PropTable docs={ChipProps} />

<PropTable docs={LabelProps} />

<PropTable docs={CloseButtonProps} />

<PropTable docs={ChevronDownProps} />

<PropTable docs={ChevronUpProps} />

<PropTable docs={ContainerProps} />

## Usage

Chips have several uses in Rosetta. They can be used interactively as to make selections or manage tags, or used as non-interactive badges.

### Anatomy

![Anatomy of a Chip](./images/anatomy.png)

<AnatomyListItem number="1" title="Container" />

<AnatomyListItem
  number="2"
  title="Label"
  description="Use concise nouns or status labels"
/>

<AnatomyListItem
  number="3"
  title="Leading Glyph"
  description="Conveys contextual meaning—not functionality—of chip, appearing before Label"
/>

<AnatomyListItem
  number="4"
  title="Accessory Glyph"
  description="Conveys contextual meaning—not functionality—of chip, appearing after Label"
/>

<AnatomyListItem
  number="5"
  title="Chevron Button"
  description="Indicates the Chip controls a PopOver, appearing in the accessory slot"
/>

<AnatomyListItem
  number="6"
  title="Close Button"
  description="Indicates the Chip is dismissible, appearing in the accessory slot"
/>

---

### Variants

#### Info Chips

![Examples of Info Chips used for tags and statuses](./images/variant-info-chip.png)

Info Chips add, display, or remove information about the UI element they are attached to. For example, Info Chips can be used to add and remove tags from a project card or display filters currently applied to a table. They can be a static display or interactive.

| Can trigger dropdown | Can be dismissible | Can use Glyph | Can be themed |
| -------------------- | ------------------ | ------------- | ------------- |
| No                   | Yes                | Yes           | Yes           |

#### Compact Info Chips

![Examples of Compact Info Chips used to convey status in a table](./images/variant-info-chip-compact.png)

Info Chips are also available in a smaller, Compact size (formerly known as Badge). Compact Info Chips are not interactive. However, if they are wrapped in a touchable element like a card or table cell, their styling should reflect the container element’s state. For example, if a touchable card is hovered, the Badge should transition to Chip :hover styling.

| Can trigger dropdown | Can be dismissible | Can use Glyph | Can be themed |
| -------------------- | ------------------ | ------------- | ------------- |
| No                   | No                 | Yes           | Yes           |

#### Choice Chips

![Examples of Choice Chips in use](./images/variant-choice-chips.png)

Choice Chips represent a selection the user can or has made. They are always interactive and are stateful, showing whether the selection is active or not. Choice Chips can function as single or multiple select choices or they can trigger a popover to enable a multiple choice selection.

| Can trigger dropdown | Can be dismissible | Can use Glyph | Can be themed |
| -------------------- | ------------------ | ------------- | ------------- |
| Yes                  | No                 | No            | No            |

{
<Flex sx={{ gap: 2 }}>
  <Do src={chipDo1Image} description="Use Choice Chips when a moderate amount of options need to be presented in a row. " />

  <Dont src={chipDont1Image} description="Don’t use Choice Chips to hide and display content when tabs would be more appropriate." />
</Flex>
}

---

### Status theming

Chips can be themed using color and Glyphs to:

- Display success, warning, and error messages
- Communicate status
- Color code information

Themes should not be used to provide visual emphasis to Chips not performing these functions.

![Chips displaying the status themes described](./images/chip-themes.png)

#### Default themes

| Status  | Color  | Usage                                                                             | Recommended Glyph         |
| ------- | ------ | --------------------------------------------------------------------------------- | ------------------------- |
| Default | Gray   | Neutral or default information and selections                                     | None, Chevron Down, Cross |
| Accent  | Blue   | To differentiate Chips conveying special information from Default Chips           | Info Circle               |
| Success | Green  | Success, completion of a desired outcome                                          | Checkmark Circle          |
| Warning | Yellow | Caution about potential or non-blocking issues, such as an approaching expiration | Exclamation Point Circle  |
| Danger  | Red    | An error or blocking issue, like payment failure                                  | Cross, Octagon            |

#### Changing status

By default, display statuses in static Info Chips (standard or compact sizing). However, if a user can change the status of an item, use an interactive Info Chip to trigger a popover, not a Choice Chip.

{
<Flex sx={{ gap: 2 }}>
  <Do src={chipDo2Image} description="Use Info Chips over Choice Chips when the action is changing the status displayed by the Chip." />

  <Dont src={chipDont2Image} description="Don’t make Chips that communicate status dismissible." />
</Flex>
}

---

### Behavior

#### Overflow

When a set of Chips exceed their container’s width, you can enable overflow on the container. Allow Chips to overflow when they are secondary to a UI’s main content (for example, filters applied to a table).

![Filter Chips overflow](./images/behavior-overflow.png)

#### Wrapping

Chips can stack when they exceed their container’s width. When stacked, the tappable clear space built into interactive chips creates a 16px visual margin. Additional margins between rows of interactive Chips is not necessary. When stacking non-interactive Chips, add 16px between rows of Info Chips and 6px between rows of Badges.

#### Truncation

By avoiding long Chip labels, you can avoid needing to truncate Chip text. However, for very long labels—like displaying an applied filter with several selections—you may need to set a max character length. If truncating chip text, use trailing ellipses, keep any icons visible, and display the full chip value on hover in a tooltip on hover or focus.

{
<Flex sx={{ gap: 2 }}>
  <Do src={chipDo3Image} description="Use stacking when Chips represent the primary focus of the UI (for example, the list of applied tags in a tag management modal)." />

  <Do src={chipDo4Image} description="If truncation is unavoidable, display full label value in a tooltip upon hover or focus." />
</Flex>
}

{
<Flex sx={{ gap: 2 }}>
  <Do src={chipDo5Image} description="Make sure that the Chip has enough horizontal space, wrapping to the next line if necessary." />

  <Dont src={chipDont3Image} description="Don’t allow Chips to truncate or wrap within its container if possible." />
</Flex>
}

---

## Guidance

### Content

The content inside a Chip should be as brief and direct as possible.

{
<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use a concise and direct noun
- Wrap longer content to the next line instead of truncating it if needed

{
<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Phrase the Chip as a question
- Rely on long, descriptive phrases

  <Flex sx={{ gap: 2 }}>
    <Do
      src={chipDo6Image}
      description="Use direct noun labels to refer to a category or data set."
    />

    <Dont
      src={chipDont4Image}
      description="Create descriptive labels that are difficult to scan in a sequence."
    />
  </Flex>

### Accessibility

#### Tap target

Default Chips have a tap target of at least 44x44px on mobile devices, requiring
a horizontal margin of 11px and vertical margin of 16px so they do not overlap.

![Tap target on Chip](./images/accessibility-tap-target.png)

#### Focus indicators

Focus order should move from left to right. Dismissible chips that are focused can
be removed with keyboard backspace.

#### Screen readers

Make sure that Chip labels are sufficient for screen reader users to understand
the meaning of the Chip.

When Chips are dismissible, the screen reader should announce the Chip text first. Then the “Remove” button.

Announce choice Chips like the input element they behave like: checkbox, radio, or dropdown.

Hide Glyphs that are redundant to the Chip label from screen readers. Only provide alt text for Glyphs used in Chips when they provide information on top of the text.

#### Color Theming

Chips support semantic color theming, but using color alone to convey information can make that information inaccessible to color blind and low vision users. Always pair color-coded information with text, icon, or other affordances at an accessible contrast level.

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Filtering" description="Pattern" url="/develop/patterns/components/Filtering" />
</Box>
}
