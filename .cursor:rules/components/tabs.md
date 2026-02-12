---
title: Tabs
---

import { Description } from '@site/src/components/Markdown/Description';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Text, Box } from '@sqs/rosetta-primitives';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { Token } from '@site/src/components/Markdown/Token';
import { KeyboardKey } from '@site/src/components/Markdown/KeyboardKey';
import TabsPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Tabs/Tabs';
import TabsOptionPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Tabs/TabsOption';
import BaseTabsPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Tabs/BaseTabs';
import BaseTabsOptionPropDocs from '@sqs/rosetta-prop-docs/docs/packages/elements/components/Tabs/BaseTabsOption';

import overflowDontImage from './images/overflow.png';
import overflowDoImage from './images/overflow-do.png';
import overflowDoImage2 from './images/overflow-do-usage.png';
import { tabsStories } from './Tabs';

{

<Description>
  Tabs organize content across different panes. The component allows a user to
  navigate between different sets of content from one area.
</Description>
}

<ComponentInformation
  title="Tabs"
  componentPackage="@sqs/rosetta-elements"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6415%3A100"
/>

## Code

### Import

```js
import { Tabs } from '@sqs/rosetta-elements';
```

### Examples

<StoryRenderer stories={tabsStories} />

### Props

<PropTable
  docs={{
    reactnative: {
      ...TabsPropDocs.reactnative,
      props: [
        ...BaseTabsPropDocs.reactnative.props,
        ...TabsPropDocs.reactnative.props,
      ],
    },
    web: {
      ...TabsPropDocs.web,
      props: [...BaseTabsPropDocs.web.props, ...TabsPropDocs.web.props],
    },
  }}
/>

<PropTable
  docs={{
    reactnative: {
      ...TabsOptionPropDocs.reactnative,
      props: [
        ...BaseTabsOptionPropDocs.reactnative.props,
        ...TabsOptionPropDocs.reactnative.props,
      ],
    },
    web: {
      ...TabsOptionPropDocs.web,
      props: [
        ...BaseTabsOptionPropDocs.web.props,
        ...TabsOptionPropDocs.web.props,
      ],
    },
  }}
/>

## Guidance

### General guidance

Tabs should be used to allow a user to navigate quickly between views within the same context. They can use either words or an icon as the label, but not both.

One — and only one — tab should be active at any given time.

{

<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Use Tabs for quick navigation between different sets of content
- Use text or an Icon for a tab label, but not both

{

<Text.Subtitle as="h2" color="red.300" mt={4} mb={2}>
  Don't
</Text.Subtitle>
}

- Don’t use Tabs as an alternative to [Segmented Controls](/docs/components/elements/SegmentedControl). Segmented Controls are inputs for single selection, similar to a [Radio Button](/docs/components/primitives/Radio/Next); Tabs are for switching between sections
- If more than four Tabs are necessary, consider a different navigation paradigm
  Don’t force users to jump between Tabs to complete a task

### Content

{

<Text.Subtitle as="h2" color="green.300" mt={4} mb={2}>
  Do
</Text.Subtitle>
}

- Ensure label lengths are checked in all supported languages
- Write tab labels as simple, recognizable nouns
- Keep tab labels at one to two words to account for limited space

### Accessibility

Tabs follow WCAG specifications. Users can use the <KeyboardKey name="Tab" /> key to focus on the active tab. Keyboard navigation is allowed by using the right and left arrow keys to change the active tab. If the user hits the right arrow on the last tab option, the first tab option becomes active (and vice-versa).

The Default variant of Tabs, with overflow, is slightly different. The user can use the Tab key to focus into the [Overflow Box](/docs/components/elements/OverflowBox) container first, and then use the right and left arrow key to navigate through the container. Using the <KeyboardKey name="Tab" /> key again allows the user to interact with the tab options as described above.

## Usage

### Anatomy

![Anatomy of Tabs](./images/anatomy.png)

<AnatomyListItem
  number="1"
  title="Tab item"
  description="Single tab, can be in default or selected state"
/>

<AnatomyListItem
  number="2"
  title="Label"
  description="Short, concise label that describes the content in the pane"
/>

<AnatomyListItem
  number="3"
  title="Indicator"
  description="Indicates selected tab"
/>

<AnatomyListItem number="4" title="Container" />

<AnatomyListItem
  number="5"
  title="Pane"
  description="Space for the content associated with each tab, note that the gray background is only for demonstrative purposes in this diagram"
/>

---

### Variants

#### Default

By default, the first tab is left-aligned in the component, and every tab after the first aligns horizontally. The tab label determines the width of each tab,though it shouldn't be too long in any supported language.

To ensure a proper tap zone, avoid the following:

- Use labels that are longer than four characters
- Don't use Icons as labels; use the Fitted variant instead

![Default Tabs](./images/type-default.png)

#### Fitted

In some situations, fitted Tabs are more appropriate to help instill the desired hierarchy in the view. Fitted Tabs should be used when Icons are being used for labels.

![Fitted Tabs](./images/type-fitted.png)

---

### Specs

For both variants, the Tabs container, including the bottom border line, fills the entire width of its parent element. There should be (at least) <Token name="space[2]" /> between the Tabs and the pane below.

#### Default

| Property | Value                                                                                      |
| -------- | ------------------------------------------------------------------------------------------ |
| Width    | 100%, individual tab is set by the width of the inner label                                |
| Height   | <Token name="space[10]" /> plus 1px divider line; total of 56px                            |
| Margin   | <Token name="space[4]" /> between tab items, <Token name="space[2]" /> below the component |

![Default Tabs specs](./images/specs-default.png)

#### Fitted

| Property | Value                                                                                      |
| -------- | ------------------------------------------------------------------------------------------ |
| Width    | 100%, individual tab is 100% ÷ number of tabs                                              |
| Height   | <Token name="space[10]" /> plus 1px divider line; total of 56px                            |
| Margin   | <Token name="space[4]" /> between tab items, <Token name="space[2]" /> below the component |

![Fitted Tabs specs](./images/specs-fitted.png)

---

### Behavior

#### Overflow

##### Default

Use default Tabs with overflow prop when content surpasses the given space.

##### Fitted

Fitted Tabs is specifically designed to not overflow gracefully. Long labels wrap and grow in height.

<Do src={overflowDoImage} description="Use concise labels that won't wrap" />

<Do
  src={overflowDoImage2}
  description="Use default Tabs with overflow prop to handle overflow content gracefully"
/>

<Dont
  src={overflowDontImage}
  description="Don't use lengthy labels that will wrap in fitted Tabs"
/>

#### Motion

Upon selection of a different tab, the indicator transitions smoothly between the two tabs.

![Selected state transition](./images/motion.png)

---

## Related Components

{

<Box display="grid" sx={{ gridTemplateColumns: "1fr 1fr", gap: 2 }}>
  <RelatedLink name="Segmented Control" description="@sqs/rosetta-elements" url="/docs/components/elements/SegmentedControl" />

  <RelatedLink name="Overflow Box" description="@sqs/rosetta-elements" url="/docs/components/elements/OverflowBox" />
</Box>
}
