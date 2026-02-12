---
title: Directory Tree
---

import { Box } from '@sqs/rosetta-primitives';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { Description } from '@site/src/components/Markdown/Description';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { Token } from '@site/src/components/Markdown/Token';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { directoryTreeStories } from './DirectoryTree';
import { Do } from '@site/src/components/Markdown/Do';
import { Dont } from '@site/src/components/Markdown/Dont';
import DirectoryTreeProps from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/DirectoryTree/DirectoryTree.json';
import DirectoryTreeData from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/DirectoryTree/DirectoryTreeData.json';

import treeDo1Image from './images/tree-do-01.gif';
import treeDo2Image from './images/tree-do-02.png';
import treeDo3Image from './images/tree-do-03.gif';
import treeDo4Image from './images/tree-do-04.png';
import treeDo5Image from './images/tree-do-05.png';
import treeDo6Image from './images/tree-do-06.png';
import treeDo7Image from './images/tree-do-07.png';
import treeDo8Image from './images/tree-do-08.png';
import treeDo9Image from './images/tree-do-09.png';
import treeDo10Image from './images/tree-do-10.png';
import treeDo11Image from './images/tree-do-11.png';
import treeDo12Image from './images/tree-do-12.png';

import treeDont1Image from './images/tree-dont-01.gif';
import treeDont2Image from './images/tree-dont-02.png';
import treeDont3Image from './images/tree-dont-03.png';
import treeDont4Image from './images/tree-dont-04.png';
import treeDont5Image from './images/tree-dont-05.png';
import treeDont6Image from './images/tree-dont-06.png';
import treeDont7Image from './images/tree-dont-07.png';
import treeDont8Image from './images/tree-dont-08.png';

import mobile1Image from './images/composition-mobile-01.png';
import mobile2Image from './images/composition-mobile-02.png';

{
<Description>
  Interactive menu for navigating hierarchically nested content groupings.
</Description>
}

<ComponentInformation
  title="DirectoryTree"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/bWmI5WE3HtivnpsiRsAFF2/03-Rosetta-Components-%5Bv2%5D?type=design&node-id=3295-472405&mode=design&t=YrmqrehtQRbcH8Ml-4"
/>

## Code

### Import

```js
import { DirectoryTree } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={directoryTreeStories} />

### Props

<PropTable docs={DirectoryTreeProps} />

<PropTable docs={DirectoryTreeData} />

## Usage

### Anatomy

![Elements of the Directory Tree as described here](./images/anatomy-diagram.png)

<AnatomyListItem
  number="1"
  title="Tab"
  description="Top-level directories can be displayed as mutually exclusive (only one can be opened at a time) tabs. This can help users maintain focus when the top-level directories represent meaningfully different content or workflows."
/>

<AnatomyListItem
  number="2"
  title="Glyph (Optional)"
  description="Glyphs can be used to differentiate Directory Tree children. They can reflect the child’s label or content type."
/>

<AnatomyListItem
  number="3"
  title="Folder"
  description="Folders contain nested subdirectories and assets. Folders are not mutually exclusive, meaning a user can have multiple folders open at the same time. Guidance for folders applies whether or not they use the Folder Glyph or are referred to as “folders” in the customer interface."
/>

<AnatomyListItem
  number="4"
  title="Folder Arrow"
  description="An affordance that signifies that a folder has nested subdirectories or assets."
/>

<AnatomyListItem
  number="5"
  title="Label"
  description="The name of the Directory Tree children. Labels can be determined by the Platform or customer as appropriate."
/>

<AnatomyListItem
  number="6"
  title="Tree Item"
  description="A document, asset, or other destination to which users can navigate through the Directory Tree."
/>

<AnatomyListItem
  number="7"
  title="Accessory (Optional)"
  description="A slot for static elements like Text or Chips, to display the number of items in a directory, status, file extension, or other supporting information."
/>

<AnatomyListItem
  number="8"
  title="Nested Item"
  description="A folder or tree Item that has been organized under a folder or tab higher in the Directory Tree hierarchy."
/>

<AnatomyListItem
  number="9"
  title="Unnested Item"
  description="A Tree item organized under the current folder or tab with no other nesting."
/>

---

### Behavior

#### Interaction

![The interactive states of Directory Tree children](./images/interaction-states.png)

##### Selecting and displaying content

The Directory Tree lets users navigate and view hierarchical data and content sets without leaving their current location in the product. Users can select a Directory Tree subdirectory or item to view by clicking, tapping, or keyboard shortcut.

##### Expanding and collapsing directories

When a user selects a tab or folder with nested children, it will both select the subdirectory as the current view and expand/collapse its children.

##### Indicating selected content

The selected child in the Directory Tree should stay in sync with the content currently visible in the workspace, even when users are navigating through links in the data or content set itself.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={treeDo1Image} description="Update content visible in the workspace based on Directory Tree selections." />

  <Dont src={treeDont1Image} description="Do not change anything outside of the Directory Tree or workspace—such as Page Headers—based on selections." />
</Box>
}

#### Text Overflow

Labels that exceed the available space in the Directory Tree should be truncated to preserve scannability of the menu. The full value of truncated labels can be made visible in a tooltip on hover or focus or as the title of the workspace view when selected.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={treeDo2Image} description="Keep accessory content visible." />

  <Dont src={treeDont2Image} description="Avoid displaying so many levels of nesting in a Directory Tree that labels stop being useful for distinguishing content." />
</Box>
}

#### Scrolling

Directory Trees may extend as far down vertically as needed. They can also be put inside a container with a set height and vertical overflow scrolling.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={treeDo3Image} description="When both the Directory Tree and workspace have vertical overflow, scroll workspace content with the page and make the Directory Tree scrollable when hovered or focused." />

  <Dont src={treeDont3Image} description="Avoid horizontal scrolling. Accessibility guidelines discourage scrolling along two axes within a single element. Instead, consider limiting the depth of the Directory Tree or using an alternative navigation pattern." />
</Box>
}

---

## Guidance

### General Guidance

Directory Trees allow easy navigation across potentially large data or content sets. Even when users can navigate through links in the content itself, Directory Trees can be a helpful alternative—letting them see more of the available pathways with less interaction.

---

### Composition

#### Layout

Directory Trees should appear to the left of the workspace where the selected content is displayed. Set a fixed width for the Directory Tree and keep workspace content fluid.

Internal spacing is handled by the component. Spacing around the Directory Tree should be set based on adjacent UI—ensuring adequate white space and strong visual alignment across the screen.

![Diagram showing the Directory Tree laid out next to a workspace](./images/composition-layout.png)

#### Workspace

The Directory Tree component provides the navigational structure only. The workspace in which selected content is displayed needs to be designed separately, based on the content and desired user experience.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={treeDo4Image} description="Use Rosetta guidelines and components as much as possible when designing the workspace." />

  <Do src={treeDo5Image} description="Consider including [Breadcrumbs](/docs/components/compositions/Breadcrumbs/) and [Titles](/docs/components/primitives/Text/#title) in the workspace for even greater navigability. " />

  <Do src={treeDo6Image} description="Maintain a strong visual relationship between the Directory tree and workspace." />

  <Do src={treeDo7Image} description="Signal when an action in the workspace will take users out of the Directory Tree structure." />
</Box>
}

#### Nesting

The folder arrow signals the presence of nested content. Only hide the arrow on directories that do not have nested content that can be expanded in the Directory Tree. Nested content is indented to distinguish between levels in the Directory Tree’s hierarchy. Increase the indentation for each successive level in the Tree.

![Diagram of nested children demonstrating the guidelines here](./images/composition-nesting.png)

If adjusting default indentation for visual alignment, follow these guidelines:

- Align directory children’s Glyphs to the start of their parent’s text label
- Align empty directories and unsorted items to the glyph of sibling directories, not the folder arrow
- If a nested level does not use Glyphs, ensure the child text label is indented <Token name="space[4]" /> from the start of its parent’s text label

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={treeDo8Image} description="Only hide the folder arrow on empty directory folders." />

  <Dont src={treeDont4Image} description="Create custom nesting affordances. " />
</Box>
}

#### Mobile

At mobile breakpoints, the Directory Tree label font size and spacing increases based on Rosetta’s default text styling.

On mobile, Directory Trees can be displayed as the main content, hidden, or collapsed in a Sheet—depending on what’s best for the user’s experience.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <img src={mobile1Image} alt="The default styles of the Directory Tree on desktop and on mobile" />

  <img src={mobile2Image} alt="Mock-up of a button that opens hidden Directory Tree on mobile" />
</Box>
}

---

### Content

Content items and folders should only appear in one location within the Directory Tree.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Dont src={treeDont5Image} description="Use Directory Trees to represent non-hierarchical content, like tags." />

  <Do src={treeDo9Image} description="Use filters when content is being found or browsed by non-hierarchical criteria." />
</Box>
}

---

### Accessibility

#### Interaction

Accessibility best practices discourage nesting interactive elements within larger interactive elements. Because each Directory Tree child acts as a single interactive element, avoid using the accessory slot for text or buttons.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={treeDo10Image} description="Use static accessory components to convey valuable information not provided by the label." />

  <Dont src={treeDont6Image} description="Nest interactive components inside Directory Tree children." />
</Box>
}

#### Keyboard Operation

Keyboard operability is built into the Directory Tree component. Users who navigate by keyboard can use the Tab, arrow, and space keys to use the Directory Tree.

#### Screen Readers

The component uses semantic elements, ARIA labels, and live descriptors to make the Directory Tree accessible to customers using screen readers.
Glyphs in Directory Tree children are hidden from screen readers by default. Ensure any information communicated visually by the Glyph is also available in the adjacent label or accessory text.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Dont src={treeDont7Image} description="Don’t use Directory Tree child Glyphs to convey information not conveyed in text labels or accessories." />

  <Do src={treeDo11Image} description="Make sure visual elements inside accessory components follow alt text requirements." />
</Box>
}

#### Visual Contrast

The default styling of the Directory Tree achieves accessible contrast between text, graphics, and their containers. Be mindful to maintain that contrast when customizing styles or accessory content.

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <Do src={treeDo12Image} description="Use default styling for the Directory children and accessory content whenever possible." />

  <Dont src={treeDont8Image} description="Do not apply disabled styling to closed tabs or folders unless they are truly inoperable." />
</Box>
}

---

## Related Components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Tabs" description="@sqs/rosetta-elements" url="/docs/components/elements/Tabs" />

  <RelatedLink name="Accordion" description="@sqs/rosetta-compositions" url="/docs/components/compositions/Accordion" />

  <RelatedLink name="Reveal" description="@sqs/rosetta-elements" url="/docs/components/elements/Reveal" />

  <RelatedLink name="Breadcrumbs" description="@sqs/rosetta-compositions" url="/docs/components/compositions/Breadcrumbs" />
</Box>
}
