---
title: Nav Dialog
---

import { Box } from '@sqs/rosetta-primitives';
import { ComponentInformation } from '@site/src/components/ComponentsPage/ComponentInformation';
import { StoryRenderer } from '@site/src/components/ComponentsPage/StoryHelpers/StoryRenderer';
import { PropTable } from '@site/src/components/ComponentsPage/PropTable';
import { AnatomyListItem } from '@site/src/components/ComponentsPage/AnatomyListItem';
import { RelatedLink } from '@site/src/components/RelatedLink';
import { Description } from '@site/src/components/Markdown/Description';
import { Token } from '@site/src/components/Markdown/Token';
import { navDialogStories } from './NavDialog';
import NavDialogDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavDialog/NavDialog';
import BodyDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavDialog/Body';
import ContentDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavDialog/Content';
import ContentTitleDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavDialog/ContentTitle';
import HeaderDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavDialog/Header';
import HeaderSectionDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavDialog/HeaderSection';
import HeaderTitleDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavDialog/HeaderTitle';
import OverlayNavDialogDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavDialog/OverlayNavDialog';
import SidebarDocs from '@sqs/rosetta-prop-docs/docs/packages/compositions/components/NavDialog/Sidebar';

{
<Description>
  Modal with a navigation menu and a content panel, often used for settings.
</Description>
}

<ComponentInformation
  title="NavDialog"
  componentPackage="@sqs/rosetta-compositions"
  figmaUrl="https://www.figma.com/file/Vbg8BlxWrH6yIF0HOacFIu/03-Rosetta-Components?node-id=6465%3A74"
/>

## Code

### Import

```js
import { NavDialog } from '@sqs/rosetta-compositions';
```

### Examples

<StoryRenderer stories={navDialogStories} />

### Props

<PropTable docs={NavDialogDocs} />

<PropTable docs={BodyDocs} />

<PropTable docs={ContentDocs} />

<PropTable docs={ContentTitleDocs} />

<PropTable docs={HeaderDocs} />

<PropTable docs={HeaderSectionDocs} />

<PropTable docs={HeaderTitleDocs} />

<PropTable docs={OverlayNavDialogDocs} />

<PropTable docs={SidebarDocs} />

## Usage

### General guidance

Nav Dialog is essentially a [Modal](/docs/components/elements/Modal) that includes a [Nav Menu](/docs/components/compositions/NavMenu) to left controlling a content area to the right. The component uses the <Token name="sizes.900" themeKey="sizes" /> dialog to better display complex UI or account settings.

To consolidate the number of nav items, keep the following in mind:

- Break items into groups with section labels to aids in better information architecture
- Prioritize items in long menus, where less important items are only visible to the user after scrolling

---

### Anatomy

![Anatomy of a Nav Dialog](./images/anatomy.png)

<AnatomyListItem number="1" title="Modal dialog" />

<AnatomyListItem number="2" title="Modal overlay" />

<AnatomyListItem
  number="3"
  title="Panel Toolbar"
  description="Toolbar that holds the “Close” or “Save”/”Cancel” Buttons"
/>

<AnatomyListItem
  number="4"
  title="Nav Menu"
  description="Side navigation for the dialog"
/>

<AnatomyListItem
  number="5"
  title="Panel title"
  description="Title for the active section"
/>

<AnatomyListItem
  number="6"
  title="Panel description"
  description="Optional description for the active section"
/>

<AnatomyListItem
  number="7"
  title="Content area"
  description="Holds any components"
/>

---

### Specs

See [Modal](/docs/components/elements/Modal) and [Nav Menu](/docs/components/compositions/NavMenu) for specs on the dialog and menu used by Nav Dialog.

#### Mobile

To allow an optimal experience on smaller screens, the navigation and content panel are separated into separate views on mobile devices.

![Specs of a Nav Dialog, nav menu, mobile](./images/specs-mobile-nav.png)

![Specs of a Nav Dialog, content panel, mobile](./images/specs-mobile-panel.png)

#### Desktop

On desktop, the Nav Menu and content area sit side-by-side. The width of the [Nav Menu](/docs/components/compositions/NavMenu) is 36% of the dialog.

![Specs of a Nav Dialog, desktop](./images/specs-desktop.png)

---

### Behavior

#### Scrolling and overflow

Per [Modal](/docs/components/elements/Modal) specs, content can be longer than the height of the dialog itself. When this happens, the title should remain visible inside the Toolbar by using [TitleTransition](/docs/components/elements/TitleTransition).

![Scrolling panel content in a Nav Dialog](./images/behavior-scrolling.png)

#### Responsiveness

Display Modals in a [Sheet](/docs/components/elements/Sheet) on mobile devices. This guideline is provided in Modal specs.

#### Saving

By default, Nav Dialogs have a “Close” [Button](/docs/components/primitives/Button) in the navigation [Toolbar](/docs/patterns/other/Toolbar) which is replaced by “Save” and “Cancel” Buttons once the user makes a change. These Buttons respond to changes in any content area.

If more granular save controls are needed, display a “Save” button in the content
area Toolbar. This can be helpful to make form validation more prominent.

![Nav Dialog with a save Button in the content area Toolbar](./images/behavior-save.png)

---

## Related components

{
<Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 2 }}>
  <RelatedLink name="Modal" description="@sqs/rosetta-elements" url="/docs/components/elements/Modal" />

  <RelatedLink name="Sheet" description="@sqs/rosetta-elements" url="/docs/components/elements/Sheet" />

  <RelatedLink name="Nav Menu" description="@sqs/rosetta-elements" url="/docs/components/compositions/NavMenu" />
</Box>
}
