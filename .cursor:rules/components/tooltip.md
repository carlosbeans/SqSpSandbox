---
title: Tooltip
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Text, Flex, Box } from '@sqs/rosetta-primitives';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { KeyboardKey } from '@site/src/components/Markdown/KeyboardKey';
import { Token } from '@site/src/components/Markdown/Token';
import { Image } from '@site/src/components/Markdown/Image';
import TooltipPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Tooltip/Tooltip';
import { tooltipStories } from './Tooltip';

import usageDoImage from './images/usage-do.png';
import usageDontImage from './images/usage-dont.png';
import positioningCenterAlignedImage from './images/positioning-center-aligned.png';
import positioningEdgeAlignedImage from './images/positioning-edge-aligned.png';

{
<Description>
  Small dialogs that provide additional information upon hover or focus. The
  information should be contextual and useful.
</Description>
}

<ComponentInformation
  title="Tooltip"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6387%3A1287"
/>

## Code

### Import

```js
import { Tooltip } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={tooltipStories} />

### Props

<PropTable docs={TooltipPropDocs} />

## Guidance

### General guidance

Tooltips are non-Modal components and should never block a user from performing other tasks on the screen. They can be used to provide additional context or help for a user, and used as an alternative to [Modal](/docs/components/elements/Modal) or [Pop Over](/docs/components/elements/PopOver) when delivering contextual messages to users.

Tooltips help reduce UI content on screen until the user acts to reveal additional information. Because this information is initially hidden, limit the use of Tooltips, and only include information that is not critical to the functionality of the UI (such as support or help content).

In contrast to Pop Over or Modal, Tooltip should be used almost exclusively for short, additional context or text links. When actions or more content is required, consider Pop Over instead.

{
<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use Tooltips to tell the user about the functionality of the product or offer support
- Use Tooltips to reduce UI copy, but limit the information to non-critical content
- Have clear anchors like an icon or styled text to indicate that a Tooltip is available
- Use to provide context on what happens when a user takes an action
- Keep Tooltips directly related to the task at hand

### Content

A Tooltip is a help component, not a marketing tool. Avoid upsell language and provide only what is needed.

Tooltip descriptions should be written in full sentences without any rich text (bold, italics, etc.), and should be as concise as possible. Limit characters inside Tooltips to 160 characters, but aim to be under 100 characters as a best practice.

When designing Tooltips, collaborate with the [Content Design team](https://squarespace.slack.com/archives/CLXP6UWSD).

{
<Flex sx={{ gap: 2 }}>
  <Do src={usageDoImage} description="Write in full sentences without any rich text (e.g., bold, italics, code etc.)" />

  <Dont src={usageDontImage} description="Do not include rich text, links or any interactive elements. Do not exceed the character limit of 160." />
</Flex>
}

### Accessibility

Tooltips are not accessible for users on touch devices (like mobile) since they cannot hover or focus on an element without activating it. Aim to make all designs intuitive without needing help content through Tooltips or other hover and focus-enabled interactive elements.

Tooltip triggers (often icons) tend to be small. Consider making the click target around the icon larger by adding padding, so mouse and touch users can more easily activate it.

#### Keyboard navigation

When focused on the trigger, the Tooltip should automatically activate and remain in view until the user dismisses it. When focus is removed, the Tooltip should be dismissed. The <KeyboardKey name="ESC" /> key should close the Tooltip. Read the guide on [keyboard navigation](/docs/accessibility/guides/keyboard-navigation) to learn more.

## Usage

### Anatomy

![Anatomy of a Tooltip](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Trigger"
  description="Can be the default icon for help content or any icon that may require additional clarification"
/>

<AnatomyListItem
  number="2"
  title="Container"
  description="The box holding the Tooltip's content"
/>

<AnatomyListItem
  number="3"
  title="Content"
  description="The information in the Tooltip"
/>

<AnatomyListItem
  number="4"
  title="Close button"
  description="A button to dismiss the Tooltip, mobile only"
/>

---

### Specs

Tooltips are simply Body [text](/docs/design/foundations/typography) in a <Token name="gray.100" themeKey="colors" /> container. They take the width and height of their content. They have a maximum character length of 160.

| Property  | Value                                                                                 |
| --------- | ------------------------------------------------------------------------------------- |
| Width     | Set by inner content plus horizontal padding of <Token name="space[3]" />, max. 320px |
| Height    | Set by inner content plus vertical padding of <Token name="space[2]" />               |
| Elevation | <Token name="shadows[400]" />                                                         |

![Tooltip maximum width](./images/positioning-max-width.png)

The trigger should have a tap area of at least 38×44px.

![Tooltip trigger tap zone](./images/tap-zone.png)

#### Trigger positioning

Position the Tooltip's trigger either next to the label or on the opposite side of the parent element.

![Positioning of the trigger](./images/trigger-posititioning.png)

#### Tooltip positioning

##### Desktop

A Tooltip can be positioned in four different directions from the trigger, where right is the default. The space between a trigger and a Tooltip is <Token name="space[2]" />.

![Tooltip direction options](./images/positioning-direction.png)

Ideally, a Tooltip shouldn't cover related content, but it can float outside its parent element.

![Tooltip positioning](./images/positioning-related-content.png)

{
<Box display="grid" sx={{ gridTemplateColumns: "1fr 1fr", gap: 2 }}>
  <Flex flexDirection="column">
    <Text.Body mb={1}>
      By default, a Tooltip should be centered with its trigger. However, it should not cross the edge of the viewport.
    </Text.Body>

    <Image src={positioningCenterAlignedImage} />
  </Flex>

  <Flex flexDirection="column">
    <Text.Body mb={1}>
      If a trigger is at the edge of the viewport, right-align the Tooltip with the trigger.
    </Text.Body>

    <Image src={positioningEdgeAlignedImage} />
  </Flex>
</Box>
}

##### Mobile

On mobile, where it is not possible to align the Tooltip with its trigger, center the Tooltip in the viewport instead.

![Positioning on mobile](./images/positioning-mobile.png)

---

### Behavior

#### Display

##### Desktop

On desktop, the user activates the Tooltip by hovering on the related trigger.

![Display on desktop](./images/entry-desktop.png)

##### Touch devices

On touch devices, the user activates the Tooltip by tapping on the Trigger.

![Display on touch devices](./images/appearance-mobile.png)

#### Dismissal

##### Desktop

When the user moves their cursor away, the Tooltip should disappear.

![Dismissal on desktop](./images/dismissal-desktop.png)

##### Touch devices

To close the Tooltip on touch devices, the user should tap the Close Button. The Tooltip should also close on scroll.

![Dismissal on touch devices](./images/dismissal-mobile.png)

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Icon" description="@sqs/rosetta-icons" url="/develop/icons?tab=usage" />
</Box>
}
